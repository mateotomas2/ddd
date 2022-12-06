import { logFancyText } from "@monorepo/shared";
import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { ApplicationModule } from "./app.module";
import { TRPCService } from "./infrastructure/interfaces/trpc/trpcService";

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  const logger = new Logger("Bootstrap");

  app.listen(3002, () => logger.log("Application is listening on port 3002"));

  const trpcService = app.get(TRPCService);
  trpcService.start();

  logger.log(await logFancyText("Server started", "Pagga"));
}

bootstrap();
