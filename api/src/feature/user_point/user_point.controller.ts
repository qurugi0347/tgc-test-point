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
import { getConnection } from "typeorm";
import { transactionRunner } from "src/module/database/transaction";

import { User } from "src/entity";
import { UserService } from "../user";
import { UserPointService } from "./";
import { ModifyPointDto } from "./user_point.dto";

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

  @Put("/")
  async updateUserPoint(
    @Param("userId", ParseIntPipe) userId: number,
    @Body() body: ModifyPointDto
  ) {
    await this.userService.findOne(userId);
    body.userId = userId;

    await transactionRunner(async (queryRunner) => {
      return await this.userPointService.modifyPoint(body, queryRunner);
    });
  }
}
