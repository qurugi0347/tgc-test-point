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
import { transactionRunner } from "src/module/database/transaction";

import { User, UserPointLogGroup } from "src/entity";
import { IPaginationResult } from "src/feature/common/common.interface";
import { PaginationDto } from "src/feature/common/common.dto";
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

  @Put("/")
  async updateUserPoint(
    @Param("userId", ParseIntPipe) userId: number,
    @Body() body: ModifyPointDto
  ): Promise<string> {
    await this.userService.findOne(userId);
    body.userId = userId;

    await transactionRunner(async (queryRunner) => {
      return await this.userPointService.modifyPoint(body, queryRunner);
    });
    return `${Math.abs(body.amount)}P ${
      body.amount > 0 ? "부여" : "차감"
    } 완료`;
  }

  @Get("/logs")
  @UsePipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    })
  )
  async findUserPointLogs(
    @Param("userId", ParseIntPipe) userId: number,
    @Query() pagination: PaginationDto
  ): Promise<IPaginationResult<UserPointLogGroup>> {
    return this.userPointService.findUserPoingLog(userId, pagination);
  }
}
