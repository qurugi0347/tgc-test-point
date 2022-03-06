import { Injectable, HttpException, HttpStatus } from "@nestjs/common";

import { UserPointLogGroupRepository } from "./";
import { UserPointLogGroup, User } from "src/entity";

import {
  IPaginationResult,
  IPagination,
} from "src/feature/common/common.interface";

@Injectable()
export class UserPointLogGroupService {
  constructor(
    private readonly userPointLogGroupRepository: UserPointLogGroupRepository
  ) {}

  async findAllPointLogs(
    pagination: IPagination
  ): Promise<IPaginationResult<UserPointLogGroup>> {
    const selectQuery = this.userPointLogGroupRepository
      .findAllPointLogsQuery()
      .innerJoin("user_point_log_group.user", "user")
      .addSelect([...User.summaryData("user")]);

    const total = await selectQuery.getCount();

    const logs = await selectQuery
      .offset((pagination.page - 1) * pagination.limit)
      .limit(pagination.limit)
      .getMany();
    return {
      ...pagination,
      data: logs,
      total,
    };
  }
}
