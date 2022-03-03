import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { SnakeNamingStrategy } from "typeorm-snake-naming-strategy";
import * as entities from "src/entity/";

@Injectable()
export class MySqlConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: "mysql",
      replication: {
        master: {
          url: `mysql://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
        },
        slaves: [
          {
            url: `mysql://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
          },
        ],
      },
      entities: Object.values(entities),
      namingStrategy: new SnakeNamingStrategy(),
      charset: "utf8mb4",
      synchronize: true,
      logging: false,
      extra: {
        connectionLimit: 100000,
      },
    };
  }
}
