import {
  IsNumber,
  IsDefined,
  IsOptional,
  IsArray,
  IsString,
  IsIn,
  ValidateNested,
} from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class LogFilterDto {
  @ApiPropertyOptional()
  @IsOptional()
  userId: number;

  @ApiPropertyOptional()
  @IsOptional()
  startDate: string;

  @ApiPropertyOptional()
  @IsOptional()
  endDate: string;
}
