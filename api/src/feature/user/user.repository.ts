import { EntityRepository, Repository, QueryRunner } from "typeorm";
import { User } from "src/entity/user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  makeQueryBuilder(queryRunner?: QueryRunner) {
    return this.createQueryBuilder("user", queryRunner);
  }
}
