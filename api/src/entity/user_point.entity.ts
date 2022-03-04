import {
  BaseEntity,
  Entity,
  PrimaryColumn,
  Generated,
  Column,
  ManyToOne,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { User } from "./";
import { IUserPoint } from "src/feature/user_point/user_point.interface";

@Entity({ name: "user_point" })
export class UserPoint extends BaseEntity implements IUserPoint {
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

  @Column({
    nullable: false,
    unsigned: true,
  })
  amount: number;

  @Column({
    type: "date",
    nullable: false,
  })
  expireAt: Date;

  @CreateDateColumn({
    type: "datetime",
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: "datetime",
  })
  updatedAt: Date;
}
