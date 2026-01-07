import {
  ApiBody,
  ApiOperation,
  ApiTags,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { MatrixStatsRequestDto } from '../dto/matrix-stats.dto';

export function DocLogin() {
  return applyDecorators(
    ApiTags('Login'),
    ApiOperation({
      summary: 'Obtener token',
      description:
        '✅ Este endpoint permite obtener el token para interactuar con el sistema".\n\n',
    }),
    ApiBody({
      description: 'Único usuario permitido',
      type: LoginDto,
    }),
    ApiOkResponse({
      description:
        'Login correcto.',
    }),
    ApiBadRequestResponse({
      description: 'El cuerpo de la solicitud está incompleto o ausente.',
    }),
    ApiInternalServerErrorResponse({
      description: 'Ocurrió un error al loguearse',
    }),
  );
}


export function DocCalculateStats() {
  return applyDecorators(
    ApiTags('Calcular QR y estadísticas'),
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Generar QR y estadisticas',
      description:
        '✅ Este endpoint, envia la matriz de entrada a la API DE GO para calcular Q R".\n\n ' +
        '✅ Luego la API DE NODE recibe el QR y obtiene las estadisticas".\n\n ',
    }),
    ApiBody({
      description: 'Input de ejemplo',
      type: MatrixStatsRequestDto,
    }),
    ApiOkResponse({
      description:
        'Calculo Correcto.',
    }),
    ApiBadRequestResponse({
      description: 'El cuerpo de la solicitud está incompleto o ausente.',
    }),
    ApiInternalServerErrorResponse({
      description: 'Ocurrió un error al calcular',
    }),
  );
}
