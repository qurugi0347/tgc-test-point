import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, QueryRunner } from "typeorm";

import { UserPointRepository } from "./user_point.repository";
import { UserPoint, UserPointLogGroup } from "src/entity";
import { UserRepository } from "../user";
import { IModifyUserPoint } from "./user_point.interface";

@Injectable()
export class UserPointService {
  constructor(
    private readonly userPointRepository: UserPointRepository,
    @InjectRepository(UserPointLogGroup)
    private userPointLogGroupRepository: Repository<UserPointLogGroup>
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
}
