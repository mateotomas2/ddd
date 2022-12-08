export type EventMap = {
  TodoListCreated: {
    id: string;
    name: string;
  };
  TodoAdded: {
    id: string;
    done: boolean;
    text: string;
  };
  MarkedDone: {
    id: string;
  };
  MarkedUndone: {
    id: string;
  };
  Removed: {
    id: string;
  };
};

export type EventType = keyof EventMap;

export type Mapped = {
  [P in keyof EventMap]: {
    aggregateId: string;
    type: P;
    timestamp: number;
    payload: EventMap[P];
  };
};
export type EventTypeMapped = Mapped[EventType];

export const createEvent = <T extends keyof EventMap>(
  aggregateId: string,
  eventType: T,
  payload: EventMap[T]
) => {
  return {
    aggregateId: aggregateId,
    type: eventType,
    timestamp: Date.now(),
    payload,
  };
};
