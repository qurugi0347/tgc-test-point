import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ScheduleModule } from "@nestjs/schedule";
import { MySqlConfigModule } from "src/module/database/config.module";
import { MySqlConfigService } from "src/module/database/config.service";
import { UserModule } from "src/feature/user/user.module";
import { UserPointModule } from "src/feature/user_point/user_point.module";
import { UserPointLogGroupModule } from "src/feature/user_point_log_group/user_point_log_group.module";

const { ENV_PATH } = process.env;
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ENV_PATH,
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [MySqlConfigService],
      useClass: MySqlConfigService,
      inject: [MySqlConfigModule],
    }),
    UserModule,
    UserPointModule,
    UserPointLogGroupModule,
  ],
})
export class AppModule {}
