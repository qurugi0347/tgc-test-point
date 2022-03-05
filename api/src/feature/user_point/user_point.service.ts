import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { Repository, QueryRunner } from "typeorm";

import { UserPointRepository } from "./user_point.repository";
import { UserPointLogGroupRepository } from "../user_point_log_group/";
import { UserPoint, UserPointLogGroup } from "src/entity";
import { UserRepository } from "../user";
import { IModifyUserPoint } from "./user_point.interface";
import {
  IPaginationResult,
  IPagination,
} from "src/feature/common/common.interface";
import { transactionRunner } from "src/module/database/transaction";

@Injectable()
export class UserPointService {
  constructor(
    private readonly userPointRepository: UserPointRepository,
    private readonly userPointLogGroupRepository: UserPointLogGroupRepository
  ) {}

  async findTotalPoint(userId: number): Promise<number> {
    const userPoints = await this.userPointRepository.findUserTotalPoint([
      userId,
    ]);
    return userPoints[userId] ?? 0;
  }

  async modifyPoint(modify: IModifyUserPoint, queryRunner: QueryRunner) {
    const { amount: diffAmount, userId } = modify;
    if (diffAmount === 0) {
      throw new HttpException(
        "포인트를 0 만큼 수정할 수 없습니다.",
        HttpStatus.BAD_REQUEST
      );
    }

    if (diffAmount < 0) {
      const totalPoint = await this.findTotalPoint(userId);
      if (totalPoint < -1 * diffAmount) {
        throw new HttpException(
          `현재 보유한 포인트(${totalPoint})보다 더 많이 차감할 수 없습니다.`,
          HttpStatus.BAD_REQUEST
        );
      }
      const points = await this.userPointRepository.findUserPoints(
        userId,
        queryRunner
      );
      let leftAmount = Math.abs(diffAmount);
      const updatedPoints = [];
      for (let i = 0; i < points.length; i++) {
        const userPoint = points[i];
        const diffValue = Math.min(leftAmount, userPoint.amount);
        userPoint.amount -= diffValue;
        leftAmount -= diffValue;
        updatedPoints.push(userPoint);
        if (leftAmount === 0) break;
        if (leftAmount < 0) {
          throw new HttpException(
            `차감 예정 포인트보다 더 차감되었습니다.`,
            HttpStatus.INTERNAL_SERVER_ERROR
          );
        }
      }
      if (leftAmount > 0) {
        throw new HttpException(
          `차감 예정 포인트보다 덜 차감되었습니다.`,
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
      await queryRunner.manager.save(updatedPoints);
    } else {
      await this.userPointRepository.addUserPoint(
        userId,
        diffAmount,
        queryRunner
      );
    }

    const logGroup = new UserPointLogGroup();
    Object.assign(logGroup, modify);
    await queryRunner.manager.save(logGroup);
  }

  async findUserPoingLog(
    userId: number,
    pagination: IPagination
  ): Promise<IPaginationResult<UserPointLogGroup>> {
    const total = await this.userPointLogGroupRepository
      .findUserPointLogsQuery(userId)
      .getCount();

    const logs = await this.userPointLogGroupRepository
      .findUserPointLogsQuery(userId)
      .offset((pagination.page - 1) * pagination.limit)
      .limit(pagination.limit)
      .getMany();
    return {
      ...pagination,
      data: logs,
      total,
    };
  }

  // @Cron("*/10 * * * * *") // 테스트용
  @Cron("0 0 * * *") // 자정마다 Expire
  async expirePoints(): Promise<void> {
    await transactionRunner(async (queryRunner: QueryRunner) => {
      const expPoints = await this.userPointRepository
        .findExpirePointQuery(queryRunner)
        .getMany();

      // 로그 쌓기
      const logRecordByUserId = {};
      expPoints.forEach((expPoint) => {
        const { userId } = expPoint;
        let logGroup = logRecordByUserId[userId];
        if (!logGroup) {
          logGroup = new UserPointLogGroup();
          logGroup.amount = 0;
          logGroup.userId = userId;
          logGroup.reason = "유효기간 만료";
          logRecordByUserId[userId] = logGroup;
        }
        logGroup.amount -= Number(expPoint.amount);
        expPoint.amount = 0;
      });

      await queryRunner.manager.save(Object.values(logRecordByUserId));
      await queryRunner.manager.save(expPoints);
    });
  }
}
