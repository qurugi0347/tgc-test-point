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
import { UserPointLogGroupService } from "./user_point_log_group.service";
import { LogFilterDto } from "./user_point_log_group.dto";

@ApiTags("UserPointLogs")
@Controller("/point")
export class UserPointLogGroupController {
  constructor(
    private readonly userPointLogGroupService: UserPointLogGroupService
  ) {}

  @Get("/logs")
  @UsePipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    })
  )
  async findUserPointLogs(
    @Query() pagination: PaginationDto,
    @Query() filter: LogFilterDto
  ): Promise<IPaginationResult<UserPointLogGroup>> {
    return this.userPointLogGroupService.findAllPointLogs(pagination, filter);
  }
}
