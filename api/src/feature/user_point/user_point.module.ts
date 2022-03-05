import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserPointLogGroup } from "src/entity";
import { UserPointService, UserPointRepository, UserPointController } from "./";
import { UserRepository, UserService } from "../user";
import { UserPointLogGroupRepository } from "../user_point_log_group";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository,
      UserPointRepository,
      UserPointLogGroupRepository,
    ]),
  ],
  controllers: [UserPointController],
  providers: [UserService, UserPointService],
})
export class UserPointModule {}
