import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserRepository, UserService, UserController } from "./";
import { UserPointService, UserPointRepository } from "../user_point";
import { UserPointLogGroupRepository } from "../user_point_log_group";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository,
      UserPointRepository,
      UserPointLogGroupRepository,
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, UserPointService],
})
export class UserModule {}
