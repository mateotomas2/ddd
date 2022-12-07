import { Injectable } from "@nestjs/common";
import { EventEmitter } from "stream";

@Injectable()
export class EventService {
  eventEmitter = new EventEmitter();
}
