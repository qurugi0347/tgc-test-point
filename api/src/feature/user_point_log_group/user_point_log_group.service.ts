import { Injectable, HttpException, HttpStatus } from "@nestjs/common";

import { UserPointLogGroupRepository } from "./";
import { UserPointLogGroup, User } from "src/entity";

import { LogFilterDto } from "./user_point_log_group.dto";
import dayjs from "dayjs";

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
    pagination: IPagination,
    filter: LogFilterDto
  ): Promise<IPaginationResult<UserPointLogGroup>> {
    const selectQuery = this.userPointLogGroupRepository
      .findAllPointLogsQuery()
      .innerJoin("user_point_log_group.user", "user")
      .addSelect([...User.summaryData("user")]);

    if (filter.userId) {
      selectQuery.andWhere("user_point_log_group.user_id = :filterUserId", {
        filterUserId: filter.userId,
      });
    }
    if (filter.startDate) {
      selectQuery.andWhere(
        "date(user_point_log_group.createdAt) >= date(:filterStartDate)",
        { filterStartDate: dayjs(filter.startDate).format("YYYY-MM-DD") }
      );
    }
    if (filter.endDate) {
      selectQuery.andWhere(
        "date(user_point_log_group.createdAt) <= date(:filterEndDate)",
        { filterEndDate: dayjs(filter.endDate).format("YYYY-MM-DD") }
      );
    }

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
