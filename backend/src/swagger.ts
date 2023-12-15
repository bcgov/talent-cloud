import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { PrivateModule } from './private/private.module';

export const Documentation = (app: INestApplication) => {
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('TC API Docs')
    .setVersion(process.env.API_VERSION || '0.0.1')
    .setDescription('TC API')
    .build();

  const baseDocument = SwaggerModule.createDocument(app, options, {
    include: [AppModule, PrivateModule],
  });

  SwaggerModule.setup('api', app, baseDocument, {
    swaggerOptions: {
      docExpansion: 'none',
      displayRequestDuration: true,
      operationsSorter: 'alpha',
      tagsSorter: 'alpha',
      defaultModelsExpandDepth: 2,
      defaultModelExpandDepth: 2,
    },
  });
};
