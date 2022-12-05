import { logFancyText } from '@monorepo/shared';
import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import { TRPCService } from './infrastructure/interfaces/trpc/trpcService';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  app.listen(3002, () => console.log('Application is listening on port 3001.'));

  const trpcService = app.get(TRPCService)
  trpcService.start();

  logFancyText("Started");
}

bootstrap();
