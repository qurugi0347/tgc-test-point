import {
  EntityRepository,
  Repository,
  QueryRunner,
  SelectQueryBuilder,
  InsertResult,
} from "typeorm";
import { UserPointLogGroup } from "src/entity/";
import { IPagination } from "src/feature/common/common.interface";

@EntityRepository(UserPointLogGroup)
export class UserPointLogGroupRepository extends Repository<UserPointLogGroup> {
  makeQueryBuilder(
    queryRunner?: QueryRunner
  ): SelectQueryBuilder<UserPointLogGroup> {
    return this.createQueryBuilder("user_point_log_group", queryRunner);
  }

  findAllPointLogsQuery(
    queryRunner?: QueryRunner
  ): SelectQueryBuilder<UserPointLogGroup> {
    return this.makeQueryBuilder(queryRunner).orderBy(
      "user_point_log_group.created_at",
      "DESC"
    );
  }

  findUserPointLogsQuery(
    userId: number,
    queryRunner?: QueryRunner
  ): SelectQueryBuilder<UserPointLogGroup> {
    return this.findAllPointLogsQuery(queryRunner).andWhere(
      "user_point_log_group.user_id = :findLogUserId",
      {
        findLogUserId: userId,
      }
    );
  }
}
