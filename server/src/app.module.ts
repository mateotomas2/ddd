import { Module } from "@nestjs/common";
import { EventsModule } from "./events/events.module";
import { TRPCModule } from "./infrastructure/interfaces/trpc/trpcModule";

@Module({
  imports: [EventsModule, TRPCModule],
})
export class ApplicationModule {}
