import { Module } from '@nestjs/common';
import { MatrixStatsService } from './matrix-stats.service';
import { MatrixStatsController } from './matrix-stats.controller';

@Module({
  controllers: [MatrixStatsController],
  providers: [MatrixStatsService],
})
export class MatrixStatsModule {}
