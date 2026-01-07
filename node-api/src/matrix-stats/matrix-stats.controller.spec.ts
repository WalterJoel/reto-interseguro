import { Test, TestingModule } from '@nestjs/testing';
import { MatrixStatsController } from './matrix-stats.controller';
import { MatrixStatsService } from './matrix-stats.service';
import { MatrixStatsRequestDto } from './dto/matrix-stats.dto';

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
      ],
    }).compile();

    controller = module.get(MatrixStatsController);
    service = module.get(MatrixStatsService);
  });

  it('should call service and return stats', async () => {
    const dto: MatrixStatsRequestDto = {
      matrices: {
        matrix1: [
          [1, 0],
          [0, 2],
        ],
      },
    };

    const result = await controller.calculateStats(dto);

    expect(result).toEqual({
      max: 2,
      min: 0,
      sum: 3,
      average: 1.5,
      hasDiagonalMatrix: true,
    });

    expect(service.calculateStats).toHaveBeenCalledWith(dto);
  });
});
