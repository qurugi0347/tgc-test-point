import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { createApp } from "./app";

async function bootstrap() {
  const app = await createApp();

  const config = new DocumentBuilder()
    .setTitle("APP API")
    .setDescription("API description")
    .setVersion("0.1")
    .addBearerAuth(
      { type: "http", scheme: "bearer", bearerFormat: "JWT" },
      "JWT"
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document, {
    swaggerOptions: { defaultModelsExpandDepth: -1 },
  });

  await app.listen(3000);
}
bootstrap();
