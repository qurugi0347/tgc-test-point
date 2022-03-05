import { Injectable, HttpException, HttpStatus } from "@nestjs/common";

import { User } from "src/entity";
import {
  IPagination,
  IPaginationResult,
  ISearch,
} from "src/feature/common/common.interface";
import { UserRepository } from "./";

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll(
    pagination: IPagination,
    search: ISearch
  ): Promise<IPaginationResult<User>> {
    const userSelectQuery = this.userRepository
      .makeQueryBuilder()
      .select(User.summaryData("user"));
    if (search.search) {
      userSelectQuery.andWhere(
        `
          (
            user.name like :search
            or user.email like :search
            or user.phone like :phoneSearch
          )
        `,
        {
          search: `%${search.search}%`,
          phoneSearch: `%${search.search.replace(/-/, "")}%`,
        }
      );
    }
    const total = await userSelectQuery.getCount();
    const userData = await userSelectQuery
      .offset(pagination.limit * (pagination.page - 1))
      .limit(pagination.limit)
      .getMany();
    return {
      ...pagination,
      total: total,
      data: userData,
    };
  }

  async findOne(userId: number): Promise<User> {
    const user = await this.userRepository.findOne(userId);
    if (!user) {
      throw new HttpException(
        `해당하는 유저를 찾을 수 없습니다. ID: ${userId}`,
        HttpStatus.NOT_FOUND
      );
    }
    return user;
  }
}
