import { IsObject } from 'class-validator';

export class MatrixStatsRequestDto {
  @IsObject()
  matrices: Record<string, number[][]>;
}
