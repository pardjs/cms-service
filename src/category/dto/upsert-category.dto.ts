import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpsertCategoryDto {
  @ApiProperty()
  @IsString()
  name: string;
}
