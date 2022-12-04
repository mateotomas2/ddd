import { Injectable } from "@nestjs/common";
import { initTRPC } from "@trpc/server";

@Injectable()
export class TRCPInitService {
  t = initTRPC.create()
}

