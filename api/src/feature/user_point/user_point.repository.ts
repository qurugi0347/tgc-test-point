import {
  EntityRepository,
  Repository,
  QueryRunner,
  SelectQueryBuilder,
  InsertResult,
} from "typeorm";
import { UserPoint } from "src/entity/";
import { IUserPoint } from "./user_point.interface";

@EntityRepository(UserPoint)
export class UserPointRepository extends Repository<UserPoint> {
  makeQueryBuilder(queryRunner?: QueryRunner): SelectQueryBuilder<UserPoint> {
    return this.createQueryBuilder("user_point", queryRunner);
  }

  findActiveUserPointQuery(
    userIds: number[],
    queryRunner?: QueryRunner
  ): SelectQueryBuilder<UserPoint> {
    const findQuery = this.makeQueryBuilder(queryRunner).where(
      "user_point.expire_at >= date(now())"
    );
    if (userIds.length > 0) {
      findQuery.andWhere("user_point.user_id in (:findPointUserIds)", {
        findPointUserIds: userIds,
      });
    } else {
      findQuery.andWhere("user_point.user_id is null");
    }

    return findQuery;
  }

  async findUserTotalPoint(
    userIds: number[],
    queryRunner?: QueryRunner
  ): Promise<Record<number, number>> {
    if (userIds.length === 0) return {};
    const userPoints: IUserPoint[] = await this.findActiveUserPointQuery(
      userIds,
      queryRunner
    )
      .select([
        "user_point.user_id as userId",
        "sum(user_point.amount) as amount",
      ])
      .groupBy("user_point.user_id")
      .getRawMany();
    const userPointRecord: Record<number, number> = {};
    userPoints.forEach((userPoint) => {
      userPointRecord[userPoint.userId] = Number(userPoint.amount);
    });
    return userPointRecord;
  }

  async findUserPoints(
    userId: number,
    queryRunner?: QueryRunner
  ): Promise<UserPoint[]> {
    const userPoints: UserPoint[] = await this.findActiveUserPointQuery(
      [userId],
      queryRunner
    )
      .orderBy("user_point.expire_at", "ASC")
      .addOrderBy("user_point.id", "ASC")
      .getMany();
    return userPoints;
  }

  async addUserPoint(
    userId: number,
    amount: number,
    queryRunner?: QueryRunner
  ): Promise<InsertResult> {
    return this.makeQueryBuilder(queryRunner)
      .insert()
      .into(UserPoint)
      .values([
        {
          userId,
          amount,
          expireAt: () => "date_add(now(), interval 365 day)",
        },
      ])
      .execute();
  }
}
