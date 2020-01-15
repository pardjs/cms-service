import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpsertContentDto {
  @ApiProperty()
  @IsString()
  content: string;
}
