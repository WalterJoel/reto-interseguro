import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { MatrixStatsRequestDto } from './dto/matrix-stats.dto';

interface GoApiResponse {
  matrices: Record<string, { q: number[][]; r: number[][] }>;
}

@Injectable()
export class MatrixStatsService {
  private readonly GO_API_URL = process.env.GO_API_URL || 'http://localhost:8081';

  async calculateStats(dto: MatrixStatsRequestDto) {
    try {
      const payloadForGo = {
        matrices: {
          matrix1: dto.matrix
        }
      };

      const goResponse = await axios.post<GoApiResponse>(
        `${this.GO_API_URL}/matrix-qr`,
        payloadForGo,
      );

      const qrResult = goResponse.data.matrices.matrix1;
      const { q, r } = qrResult;

      let max = -Infinity;
      let min = Infinity;
      let sum = 0;
      let count = 0;

      const hasDiagonalMatrix = this.isDiagonalMatrix(r);

      [q, r].forEach(matrix => {
        for (const row of matrix) {
          for (const value of row) {
            max = Math.max(max, value);
            min = Math.min(min, value);
            sum += value;
            count++;
          }
        }
      });

      return {
        qr_decomposition: { q, r },
        statistics: {
          max,
          min,
          sum,
          average: count ? sum / count : 0,
          hasDiagonalMatrix,
        },
      };

    } catch (error) {
      throw new HttpException(
        'Error communicating with Go API',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  private isDiagonalMatrix(matrix: number[][]): boolean {
    const rows = matrix.length;
    const cols = matrix[0]?.length ?? 0;
    if (rows !== cols || rows === 0) return false;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (i !== j && Math.abs(matrix[i][j]) > 1e-10) return false;
      }
    }

    return true;
  }
}