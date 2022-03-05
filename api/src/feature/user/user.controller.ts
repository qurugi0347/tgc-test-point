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
import { PaginationDto, SearchDto } from "src/feature/common/common.dto";

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
    @Query() page: PaginationDto,
    @Query() search: SearchDto
  ): Promise<IPaginationResult<User>> {
    return this.userService.findAll(page, search);
  }

  @Get("/:userId")
  async findUser(@Param("userId", ParseIntPipe) userId: number): Promise<User> {
    return this.userService.findOne(userId);
  }
}
