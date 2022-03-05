import {
  IsNumber,
  IsDefined,
  IsOptional,
  IsArray,
  IsString,
  IsIn,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import { IUserPoint, IModifyUserPoint } from "./user_point.interface";

export class ModifyPointDto implements IModifyUserPoint {
  // params에서 cast
  userId: number;

  @ApiProperty({ description: "증감량", default: 0 })
  @IsNumber()
  @IsDefined()
  amount: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  reason: string;
}
