import { ApiPropertyOptional } from '@nestjs/swagger';
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
  @ApiPropertyOptional({
    example: 'Desarrollo backend actualizado',
  })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(120)
  name?: string;

  @ApiPropertyOptional({
    example: 20000,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  bac?: number;

  @ApiPropertyOptional({
    example: 70,
    minimum: 0,
    maximum: 100,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  plannedProgress?: number;

  @ApiPropertyOptional({
    example: 60,
    minimum: 0,
    maximum: 100,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  actualProgress?: number;

  @ApiPropertyOptional({
    example: 12500,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  actualCost?: number;

  @ApiPropertyOptional({
    example: 2,
  })
  @IsOptional()
  @IsInt()
  @IsPositive()
  projectId?: number;
}