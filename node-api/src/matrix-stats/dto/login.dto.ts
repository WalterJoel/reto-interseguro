import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; 

export class LoginDto {
  @ApiProperty({ 
    example: 'walter_admin',
    description: 'Nombre de usuario para el login' 
  })
  @IsString({ message: 'El usuario debe ser un texto' })
  @IsNotEmpty({ message: 'El usuario es requerido' })
  username: string;

  @ApiProperty({ 
    example: 'Interseguro2026!', 
    description: 'Contraseña del usuario' 
  })
  @IsString({ message: 'El password debe ser un texto' })
  @IsNotEmpty({ message: 'El password es requerido' })
  password: string;
}