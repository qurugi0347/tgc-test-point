import { EntityRepository, Repository, QueryRunner } from "typeorm";
import { UserPoint } from "src/entity/";
import { IUserPoint } from "./user_point.interface";

@EntityRepository(UserPoint)
export class UserPointRepository extends Repository<UserPoint> {
  makeQueryBuilder(queryRunner?: QueryRunner) {
    return this.createQueryBuilder("user_point", queryRunner);
  }

  async findUserTotalPoint(
    userIds: number[],
    queryRunner?: QueryRunner
  ): Promise<Record<number, number>> {
    if (userIds.length === 0) return {};
    const userPoints: IUserPoint[] = await this.makeQueryBuilder(queryRunner)
      .select([
        "user_point.user_id as userId",
        "sum(user_point.amount) as amount",
      ])
      .where("user_point.expire_at >= date(now())")
      .andWhere("user_point.user_id in (:userIds)", { userIds })
      .groupBy("user_point.user_id")
      .getRawMany();
    const userPointRecord: Record<number, number> = {};
    userPoints.forEach((userPoint) => {
      userPointRecord[userPoint.userId] = Number(userPoint.amount);
    });
    return userPointRecord;
  }
}
