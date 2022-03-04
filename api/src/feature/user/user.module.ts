import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserPointService, UserPointRepository } from "src/feature/user_point";
import { UserRepository, UserService, UserController } from "./";

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository, UserPointRepository])],
  controllers: [UserController],
  providers: [UserService, UserPointService],
})
export class UserModule {}
