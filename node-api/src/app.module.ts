import { Module } from '@nestjs/common';
import { MatrixStatsModule } from './matrix-stats/matrix-stats.module';

@Module({
  imports: [MatrixStatsModule]
})
export class AppModule {}
