import {
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class UpdateActivityDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(120)
  name?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  bac?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  plannedProgress?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  actualProgress?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  actualCost?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  projectId?: number;
}