import { Controller, Post, Body, UseGuards, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MatrixStatsService } from './matrix-stats.service';
import { MatrixStatsRequestDto } from './dto/matrix-stats.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LoginDto } from './dto/login.dto';
import {
  DocLogin,
  DocCalculateStats
} from './docs/swagger.docs';


@Controller('matrix-stats')
export class MatrixStatsController {
  constructor(
    private readonly matrixStatsService: MatrixStatsService,
    private readonly jwtService: JwtService
  ) {}

@Post('login')
@DocLogin()
async login(@Body() loginDto: LoginDto) {
  const { username, password } = loginDto;
  console.log(process.env.APP_USER, ' USER');
  if (username === process.env.APP_USER && password === process.env.APP_PASSWORD) {
    const payload = { username, sub: 1 };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  throw new UnauthorizedException('Credenciales inválidas');
}

  @Post()
  @DocCalculateStats()
  @UseGuards(JwtAuthGuard)  
  calculateStats(@Body() dto: MatrixStatsRequestDto) {
    return this.matrixStatsService.calculateStats(dto);
  }
  
}


