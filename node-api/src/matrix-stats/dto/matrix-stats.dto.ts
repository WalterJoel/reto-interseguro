
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ArrayMinSize } from 'class-validator';

export class MatrixStatsRequestDto {
  @ApiProperty({
    description: 'Matriz rectangular',
    example: [
      [1, 0, 0],
      [0, 2, 0],
      [0, 0, 3]
    ],
    type: 'array',
    items: {
      type: 'array',
      items: { type: 'number' }
    }
  })
  @IsArray()
  @ArrayMinSize(1)
  matrix: number[][];
}