import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Request,
  Param,
  ParseIntPipe,
} from "@nestjs/common";

import { User } from "src/entity";
import { UserService } from "./user.service";

@ApiTags("User")
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("/")
  async findAllUser(): Promise<User[]> {
    return this.userService.findAll();
  }
}
