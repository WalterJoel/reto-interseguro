import { Test, TestingModule } from '@nestjs/testing';
import { MatrixStatsService } from './matrix-stats.service';
import axios from 'axios';
import { HttpException } from '@nestjs/common';
import { MatrixStatsRequestDto } from './dto/matrix-stats.dto';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('MatrixStatsService', () => {
  let service: MatrixStatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MatrixStatsService],
    }).compile();

    service = module.get(MatrixStatsService);
  });

  it('should calculate stats correctly', async () => {
    const dto: MatrixStatsRequestDto = {
      matrix: [
        [1, 0],
        [0, 2],
      ],
    };

    mockedAxios.post.mockResolvedValue({
      data: {
        matrices: {
          matrix1: {
            q: [[1, 0], [0, 1]],
            r: [[1, 0], [0, 2]]
          },
        },
      },
    });

    const result = await service.calculateStats(dto);

    expect(result.statistics).toBeDefined();
    expect(result.qr_decomposition).toBeDefined();
  });

  it('should throw HttpException if Go API fails', async () => {
    const dto: MatrixStatsRequestDto = {
      matrix: [
        [1, 0],
        [0, 2],
      ],
    };

    mockedAxios.post.mockRejectedValue(new Error('fail'));
    await expect(service.calculateStats(dto)).rejects.toThrow(HttpException);
  });
});