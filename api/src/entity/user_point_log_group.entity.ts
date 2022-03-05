import {
  BaseEntity,
  Entity,
  PrimaryColumn,
  Generated,
  Column,
  ManyToOne,
  ManyToMany,
  CreateDateColumn,
  JoinColumn,
} from "typeorm";
import { User, UserPoint } from "./";
import { IModifyUserPoint } from "src/feature/user_point/user_point.interface";

@Entity({ name: "user_point_log_group" })
export class UserPointLogGroup extends BaseEntity implements IModifyUserPoint {
  @Generated()
  @PrimaryColumn({
    type: "int",
    unsigned: true,
  })
  id: number;

  @Column({
    type: "int",
    unsigned: true,
    nullable: false,
  })
  userId: number;

  @ManyToOne(() => User, (user) => user.id, {
    nullable: false,
  })
  user: User;

  @ManyToMany(() => UserPoint, (userPoint) => userPoint.id)
  userPoints: UserPoint[];

  @Column({
    nullable: false,
    unsigned: true,
  })
  amount: number;

  @Column({
    nullable: false,
  })
  reason: string;

  @Column({
    nullable: true,
  })
  detail: string;

  @CreateDateColumn({
    type: "datetime",
  })
  createdAt: Date;
}
