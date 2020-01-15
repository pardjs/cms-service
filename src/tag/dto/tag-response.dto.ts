import { ApiProperty } from '@nestjs/swagger';

export class TagResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}
