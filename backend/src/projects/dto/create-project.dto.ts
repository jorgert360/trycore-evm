import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({
    example: 'Proyecto EVM Demo',
    description: 'Project name',
  })
  @IsString()
  @MinLength(3)
  @MaxLength(120)
  name!: string;

  @ApiPropertyOptional({
    example: 'Proyecto para seguimiento de costos y cronograma',
    description: 'Optional project description',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;
}