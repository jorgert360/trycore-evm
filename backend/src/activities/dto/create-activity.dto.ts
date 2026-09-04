import {
  IsInt,
  IsNumber,
  IsPositive,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateActivityDto {
  @IsString()
  @MinLength(3)
  @MaxLength(120)
  name!: string;

  @IsNumber()
  @Min(0)
  bac!: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  plannedProgress!: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  actualProgress!: number;

  @IsNumber()
  @Min(0)
  actualCost!: number;

  @IsInt()
  @IsPositive()
  projectId!: number;
}