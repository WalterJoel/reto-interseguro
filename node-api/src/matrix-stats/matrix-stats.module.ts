import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MatrixStatsController } from './matrix-stats.controller';
import { MatrixStatsService } from './matrix-stats.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [MatrixStatsController],
  providers: [MatrixStatsService],
})
export class MatrixStatsModule {}