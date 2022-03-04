import { Injectable, HttpException } from "@nestjs/common";

import { UserRepository } from "./user.repository";
import { User } from "src/entity";

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll(): Promise<User[]> {
    return this.userRepository
      .makeQueryBuilder()
      .select(User.summaryData("user"))
      .getMany();
  }
}
