import { Test, TestingModule } from '@nestjs/testing';
import { MatrixStatsService } from './matrix-stats.service';

describe('MatrixStatsService', () => {
  let service: MatrixStatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MatrixStatsService],
    }).compile();

    service = module.get<MatrixStatsService>(MatrixStatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
