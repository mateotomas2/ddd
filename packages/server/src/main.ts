import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { logFancyText } from "@monorepo/shared";
import { ApplicationModule } from "./app.module";
import { TRPCService } from "./infrastructure/interfaces/trpc/trpcService";
import mongoose from "mongoose";

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  const logger = new Logger("Bootstrap");

  app.listen(3002, () => logger.log("Application is listening on port 3002"));

  const trpcService = app.get(TRPCService);
  trpcService.start();

  logger.log(await logFancyText("Server started", "Pagga"));

  mongoose.set("strictQuery", false);

  await mongoose.connect(
    "mongodb://todolist:todolistpass@localhost:27017/todolist"
  );
}

bootstrap();
