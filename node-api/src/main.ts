import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Reto Interseguro')
    .setDescription('Factorización QR y estadísticas de matrices')
    .setVersion('1.0')
    .addBearerAuth() 
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document); 

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (validationErrors = []) => {
        const messages = validationErrors.map(
          (err) =>
            `${err.property} has wrong value ${err.value}, ${Object.values(
              err.constraints,
            ).join(', ')}`,
        );
        return new BadRequestException(messages);
      },
    }),
  );

  const port = process.env.PORT || 4000;
  
  await app.listen(port, '0.0.0.0'); 
  
  console.log(`Servidor escuchando en el puerto ${port}`);
  console.log(`Documentación disponible en la ruta: /docs`);
}
bootstrap();