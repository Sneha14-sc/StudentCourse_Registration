import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log("in Main.ts")
  const app = await NestFactory.create(AppModule);
  await app.listen(3002);
}
bootstrap();
