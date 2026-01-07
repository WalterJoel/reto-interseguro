import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { MatrixStatsRequestDto } from './dto/matrix-stats.dto';


interface GoApiResponse {
  matrices: Record<string, number[][]>; // nombre de cada matriz → matriz de números
}

@Injectable()
export class MatrixStatsService {
  private readonly GO_API_URL = process.env.GO_API_URL || 'http://localhost:8081';

  async calculateStats(dto: MatrixStatsRequestDto) {
    console.log(this.GO_API_URL, ' GO URL ');
    try {
      const goResponse = await axios.post<GoApiResponse>(
        `${this.GO_API_URL}/matrix-qr`,
        dto,
      );

      const matricesQR = goResponse.data.matrices; 
      console.log(matricesQR, ' RPTA FROM GO');
      //Mock momentaneo
    //   const matricesQR = {
    //   matrix1: [
    //     [1, 0, 0],
    //     [0, 2, 0],
    //     [0, 0, 3],
    //   ],
    //   matrix2: [
    //     [4, 0],
    //     [0, 5],
    //   ],
    // };

      
      let max = -Infinity;
      let min = Infinity;
      let sum = 0;
      let count = 0;
      let hasDiagonalMatrix = false;

      for (const matrix of Object.values(matricesQR)) {
        if (this.isDiagonalMatrix(matrix)) hasDiagonalMatrix = true;

        for (const row of matrix) {
          for (const value of row) {
            max = Math.max(max, value);
            min = Math.min(min, value);
            sum += value;
            count++;
          }
        }
      }

      return {
        max,
        min,
        sum,
        average: count ? sum / count : 0,
        hasDiagonalMatrix,
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
    if (rows !== cols) return false;

    for (let i = 0; i < rows; i++)
      for (let j = 0; j < cols; j++)
        if (i !== j && matrix[i][j] !== 0) return false;

    return true;
  }
}
