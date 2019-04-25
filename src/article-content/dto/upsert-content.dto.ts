import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpsertContentDto {
    @ApiModelProperty()
    @IsString()
    content: string;
}
