import { Injectable } from "@nestjs/common";
import { initTRPC } from "@trpc/server";
import { inferAsyncReturnType } from "@trpc/server";
/*
const createContext = () => {
  return {
    aggregateId: "holi",
  };
};
export type Context = inferAsyncReturnType<typeof createContext>;*/

@Injectable()
export class TRCPInitService {
  t = initTRPC.create();
}
