import {
  EventTypeMapped,
  initialTodoListState,
  todoListReducer,
  TodoListType,
} from "@monorepo/shared";
import { Inject, Injectable } from "@nestjs/common";
import { EventBus } from "@nestjs/cqrs";
import mongoose, { InferSchemaType, Schema, Types } from "mongoose";
import { TodoList } from "../models/todo-list.model";

const EventDBSchema = new Schema({
  aggregateId: { type: String, required: true },
  type: { type: String, required: true },
  timestamp: { type: Number, required: true },
  payload: { type: Object, required: true },
});

type EventDBType = InferSchemaType<typeof EventDBSchema>;
const EventDB = mongoose.model<EventDBType>("events", EventDBSchema);

// TODO: Complicate logic so we need to recreate the state and add snapshots
@Injectable()
export class TodoRepository {
  state: Record<string, TodoListType> = {};

  constructor(@Inject(EventBus) private readonly eventBus: EventBus) {
    this.eventBus.subscribe(async (event: EventTypeMapped) => {
      const eventEntity = new EventDB({
        aggregateId: event.aggregateId,
        type: event.type,
        timestamp: event.timestamp,
        payload: event.payload,
      });
      await eventEntity.save();

      if (!this.state[event.aggregateId]) {
        // TODO: This should not be needed
        this.state[event.aggregateId] = {
          id: event.aggregateId,
          name: "s",
          todos: [],
        };
      }

      this.state[event.aggregateId] = todoListReducer(
        { ...this.state[event.aggregateId] },
        event
      );
    });
  }

  async new(id: string): Promise<TodoList> {
    return new TodoList(id);
  }

  async get(aggregateId: string): Promise<TodoList> {
    return new TodoList(aggregateId);
  }

  async findAll(aggregateId: string): Promise<TodoListType> {
    const events = await EventDB.find({ aggregateId: { $eq: aggregateId } });
    return events.reduce(
      (result, current) =>
        todoListReducer(result, {
          aggregateId: current.aggregateId,
          type: current.type,
          timestamp: current.timestamp,
          payload: current.payload,
        } as EventTypeMapped),
      { ...initialTodoListState }
    );
  }

  async getEvents(aggregateId: string): Promise<EventTypeMapped[]> {
    const events = await EventDB.find({ aggregateId: { $eq: aggregateId } });

    return events.map((event) => ({
      aggregateId: event.aggregateId,
      type: event.type,
      timestamp: event.timestamp,
      payload: event.payload,
    })) as EventTypeMapped[];
  }
}
