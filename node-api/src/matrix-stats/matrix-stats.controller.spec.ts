import { Test, TestingModule } from '@nestjs/testing';
import { MatrixStatsController } from './matrix-stats.controller';
import { MatrixStatsService } from './matrix-stats.service';

describe('MatrixStatsController', () => {
  let controller: MatrixStatsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MatrixStatsController],
      providers: [MatrixStatsService],
    }).compile();

    controller = module.get<MatrixStatsController>(MatrixStatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
