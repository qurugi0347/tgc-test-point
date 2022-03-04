import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MySqlConfigModule } from "src/module/database/config.module";
import { MySqlConfigService } from "src/module/database/config.service";
import { UserModule } from "src/feature/user/user.module";

const { ENV_PATH } = process.env;
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ENV_PATH,
    }),
    TypeOrmModule.forRootAsync({
      imports: [MySqlConfigService],
      useClass: MySqlConfigService,
      inject: [MySqlConfigModule],
    }),
    UserModule,
  ],
})
export class AppModule {}
