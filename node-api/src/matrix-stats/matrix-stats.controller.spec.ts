import { Test, TestingModule } from '@nestjs/testing';
import { MatrixStatsController } from './matrix-stats.controller';
import { MatrixStatsService } from './matrix-stats.service';
import { MatrixStatsRequestDto } from './dto/matrix-stats.dto';
import { JwtService } from '@nestjs/jwt'; 

describe('MatrixStatsController', () => {
  let controller: MatrixStatsController;
  let service: MatrixStatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MatrixStatsController],
      providers: [
        {
          provide: MatrixStatsService,
          useValue: {
            calculateStats: jest.fn().mockResolvedValue({
              max: 2,
              min: 0,
              sum: 3,
              average: 1.5,
              hasDiagonalMatrix: true,
            }),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
            verify: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get(MatrixStatsController);
    service = module.get(MatrixStatsService);
  });

  it('should call service and return stats', async () => {
    const dto: MatrixStatsRequestDto = {
      matrix: [[1, 0], [0, 2]],
    };

    const result = await controller.calculateStats(dto);
    expect(result).toBeDefined();
    expect(service.calculateStats).toHaveBeenCalledWith(dto);
  });
});