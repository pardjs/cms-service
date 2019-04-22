import { ApiModelProperty } from '@nestjs/swagger';

export class CategoryResponseDto {
    @ApiModelProperty()
    id: number;

    @ApiModelProperty()
    name: string;
}
