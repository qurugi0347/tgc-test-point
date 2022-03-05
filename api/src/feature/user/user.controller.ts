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
import { UserService } from "./";
import { IPaginationResult } from "src/feature/common/common.interface";
import { PaginationDto } from "src/feature/common/common.dto";

@ApiTags("User")
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

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

  @Get("/:userId")
  async findUser(@Param("userId", ParseIntPipe) userId: number): Promise<User> {
    return this.userService.findOne(userId);
  }
}
