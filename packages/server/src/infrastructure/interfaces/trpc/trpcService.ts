/* eslint-disable no-console */
import { Inject, Injectable } from "@nestjs/common";
import { applyWSSHandler } from "@trpc/server/adapters/ws";
import { WebSocketServer } from "ws";
import { TRCPInitService } from "./trpc.init.service";
import { TRPCTodo } from "./todo/todo.router";

const createContext = () => {
  return {};
};

@Injectable()
export class TRPCService {
  constructor(
    @Inject(TRCPInitService) private readonly trpcInit: TRCPInitService,
    @Inject(TRPCTodo) private readonly trpcTodo: TRPCTodo
  ) {}

  appRouter = this.trpcInit.t.router({
    todo: this.trpcTodo.todoRouter,
  });

  // https://trpc.io/docs/subscriptions
  wss = new WebSocketServer({
    port: 3001,
  });

  start = () => {
    const handler = applyWSSHandler({
      wss: this.wss,
      router: this.appRouter,
      createContext,
    });

    this.wss.on("connection", (ws) => {
      console.log(`➕➕ Connection (${this.wss.clients.size})`);
      ws.once("close", () => {
        console.log(`➖➖ Connection (${this.wss.clients.size})`);
      });
    });
    console.log("✅ WebSocket Server listening on ws://localhost:3001");
    /*process.on("SIGTERM", () => {
      console.log("SIGTERM");
      handler.broadcastReconnectNotification();
      this.wss.close();
    });*/
  };
}
export type AppRouter = TRPCService["appRouter"];
