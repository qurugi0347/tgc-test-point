import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import {
  Controller,
  Post,
  Put,
  Get,
  Query,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from "@nestjs/common";

import { User } from "src/entity";
import { UserService } from "src/feature/user";
import { UserPointService } from "src/feature/user_point";

@ApiTags("UserPoint")
@Controller("users/:userId/points")
export class UserPointController {
  constructor(
    private readonly userService: UserService,
    private readonly userPointService: UserPointService
  ) {}

  @Get("/")
  async findUserPoint(
    @Param("userId", ParseIntPipe) userId: number
  ): Promise<number> {
    await this.userService.findOne(userId);
    return this.userPointService.findTotalPoint(userId);
  }
}
