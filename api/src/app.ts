// src/app.ts
import { NestFactory } from "@nestjs/core";
import { ExpressAdapter } from "@nestjs/platform-express";
import { INestApplication } from "@nestjs/common";
import { AppModule } from "./app.module";
import { Express } from "express";
import { ValidationPipe } from "@nestjs/common";
import { AllExceptionsFilter } from "./module/exception-filter";

export async function createApp(
  expressApp?: Express
): Promise<INestApplication> {
  const app = await NestFactory.create(
    AppModule,
    expressApp ? new ExpressAdapter(expressApp) : undefined
  );
  // app.use(cookieParser());
  app.enableCors({
    origin: (origin, callback) => {
      callback(null, false);
    },
    credentials: true,
  });

  app.useGlobalFilters(new AllExceptionsFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // validation을 위한 decorator가 붙어있지 않은 속성들은 제거
      forbidNonWhitelisted: false, // whitelist 설정을 켜서 걸러질 속성이 있다면 아예 요청 자체를 막도록 (400 에러)
      transform: true, // 요청에서 넘어온 자료들의 형변환
    })
  );
  return app;
}
