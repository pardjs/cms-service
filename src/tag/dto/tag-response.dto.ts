import { ApiModelProperty } from '@nestjs/swagger';

export class TagResponseDto {
    @ApiModelProperty()
    id: number;

    @ApiModelProperty()
    name: string;
}
