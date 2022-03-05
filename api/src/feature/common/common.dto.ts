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

import { IPagination, ISearch } from "./common.interface";

export class PaginationDto implements IPagination {
  @ApiPropertyOptional()
  @IsOptional()
  page: number;

  @ApiPropertyOptional()
  @IsOptional()
  limit: number;

  constructor() {
    this.limit = 30;
    this.page = 1;
  }
}

export class SearchDto implements ISearch {
  @ApiPropertyOptional()
  @IsOptional()
  search: string;
}
