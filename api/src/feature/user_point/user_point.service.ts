import { Injectable, HttpException } from "@nestjs/common";

import { UserPointRepository } from "./user_point.repository";
import { UserPoint } from "src/entity";
import { UserRepository } from "src/feature/user";

@Injectable()
export class UserPointService {
  constructor(private readonly userPointRepository: UserPointRepository) {}

  async findTotalPoint(userId: number): Promise<number> {
    const userPoints = await this.userPointRepository.findUserTotalPoint([
      userId,
    ]);
    return userPoints[userId];
  }
}
