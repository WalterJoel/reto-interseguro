import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MatrixStatsService } from './matrix-stats.service';
import { MatrixStatsRequestDto } from './dto/matrix-stats.dto';

@Controller('matrix-stats')
export class MatrixStatsController {
  constructor(private readonly matrixStatsService: MatrixStatsService) {}

  @Post()
  calculateStats(@Body() dto: MatrixStatsRequestDto) {
    return this.matrixStatsService.calculateStats(dto);
  }
}
      