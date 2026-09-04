import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateProjectDto {
  @ApiPropertyOptional({
    example: 'Proyecto EVM Actualizado',
  })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(120)
  name?: string;

  @ApiPropertyOptional({
    example: 'Descripción actualizada del proyecto',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;
}