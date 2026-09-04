import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    example: 'Desarrollo backend',
  })
  @IsString()
  @MinLength(3)
  @MaxLength(120)
  name!: string;

  @ApiProperty({
    example: 20000,
    description: 'Budget at Completion (BAC)',
  })
  @IsNumber()
  @Min(0)
  bac!: number;

  @ApiProperty({
    example: 60,
    minimum: 0,
    maximum: 100,
    description: 'Planned progress percentage',
  })
  @IsNumber()
  @Min(0)
  @Max(100)
  plannedProgress!: number;

  @ApiProperty({
    example: 50,
    minimum: 0,
    maximum: 100,
    description: 'Actual completed percentage',
  })
  @IsNumber()
  @Min(0)
  @Max(100)
  actualProgress!: number;

  @ApiProperty({
    example: 11000,
    description: 'Actual Cost (AC)',
  })
  @IsNumber()
  @Min(0)
  actualCost!: number;

  @ApiProperty({
    example: 2,
    description: 'Project identifier',
  })
  @IsInt()
  @IsPositive()
  projectId!: number;
}