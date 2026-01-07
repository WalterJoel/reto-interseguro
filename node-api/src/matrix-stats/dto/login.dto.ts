import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsString({ message: 'El usuario debe ser un texto' })
  @IsNotEmpty({ message: 'El usuario es requerido' })
  username: string;

  @IsString({ message: 'El password debe ser un texto' })
  @IsNotEmpty({ message: 'El password es requerido' })
  password: string;
} 