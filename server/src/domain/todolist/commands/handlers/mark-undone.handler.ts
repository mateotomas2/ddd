import { Inject } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { TodoRepository } from '../../repository/todolist.repository';
import { MarkUndoneCommand } from '../impl/mark-undone.command';

@CommandHandler(MarkUndoneCommand)
export class MarkUndoneHandler implements ICommandHandler<MarkUndoneCommand> {
  constructor(
    @Inject(TodoRepository) private readonly repository: TodoRepository,
    @Inject(EventPublisher) private readonly publisher: EventPublisher,
  ) { }

  async execute(command: MarkUndoneCommand) {
    const todoList = this.publisher.mergeObjectContext(
      await this.repository.get(),
    );
    todoList.markUndone(command.id);
    todoList.commit();
  }
}
