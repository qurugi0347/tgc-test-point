import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserRepository, UserService } from "../user";
import {
  UserPointLogGroupRepository,
  UserPointLogGroupService,
  UserPointLogGroupController,
} from "./";

@Module({
  imports: [TypeOrmModule.forFeature([UserPointLogGroupRepository])],
  controllers: [UserPointLogGroupController],
  providers: [UserPointLogGroupService],
  exports: [UserPointLogGroupService],
})
export class UserPointLogGroupModule {}
