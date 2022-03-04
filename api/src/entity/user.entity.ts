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

import { IUser } from "src/feature/user/user.interface";

@Entity({ name: "user" })
export class User extends BaseEntity implements IUser {
  @Generated()
  @PrimaryColumn({
    type: "int",
    unsigned: true,
  })
  id: number;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    nullable: false,
  })
  email: string;

  @CreateDateColumn({
    comment: "작성일",
  })
  createdAt: Date;

  @UpdateDateColumn({
    comment: "수정일",
  })
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
