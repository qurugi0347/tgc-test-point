import { Injectable, HttpException } from "@nestjs/common";

import { User } from "src/entity";
import {
  IPagination,
  IPaginationResult,
} from "src/feature/common/common.interface";
import { UserRepository } from "./";

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll(pagination: IPagination): Promise<IPaginationResult<User>> {
    const userSelectQuery = this.userRepository
      .makeQueryBuilder()
      .select(User.summaryData("user"));
    const total = await userSelectQuery.getCount();
    const userData = await userSelectQuery
      .skip(pagination.limit * (pagination.page - 1))
      .take(pagination.limit)
      .getMany();
    return {
      ...pagination,
      total: total,
      data: userData,
    };
  }
}
