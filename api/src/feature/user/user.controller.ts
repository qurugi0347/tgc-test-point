import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import {
  Controller,
  Post,
  Get,
  Query,
  Body,
  UseGuards,
  Request,
  Param,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from "@nestjs/common";

import { User } from "src/entity";
import { UserService } from "./";
import { UserPointService } from "src/feature/user_point";
import { IPaginationResult } from "src/feature/common/common.interface";
import { PaginationDto } from "src/feature/common/common.dto";

@ApiTags("User")
@Controller("users")
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userPointService: UserPointService
  ) {}

  @Get("/")
  @UsePipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    })
  )
  async findAllUser(
    @Query() query: PaginationDto
  ): Promise<IPaginationResult<User>> {
    return this.userService.findAll(query);
  }

  @Get("/:userId/points")
  async findUserPoint(@Param("userId", ParseIntPipe) userId: number) {
    return this.userPointService.findTotalPoint(userId);
  }
}
