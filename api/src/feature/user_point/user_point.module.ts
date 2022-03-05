import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserPointService, UserPointRepository, UserPointController } from "./";
import { UserRepository, UserService } from "src/feature/user";

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository, UserPointRepository])],
  controllers: [UserPointController],
  providers: [UserService, UserPointService],
})
export class UserPointModule {}
