import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AuthModule } from './auth/auth.module';
import { BcwsModule } from './bcws/bcws.module';
import { EmcrModule } from './emcr/emcr.module';
import { FormModule } from './form/form.module';
import { MailModule } from './mail/mail.module';
import { PersonnelModule } from './personnel/personnel.module';
import { RegionsAndLocationsModule } from './region-location/region-location.module';

export const Documentation = (app: INestApplication) => {
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('TC API Docs')
    .setVersion(process.env.API_VERSION || '1.0.0')
    .setDescription('TC API')
    .build();

  const baseDocument = SwaggerModule.createDocument(app, options, {
    include: [
      AppModule,
      AuthModule,
      PersonnelModule,
      BcwsModule,
      EmcrModule,
      FormModule,
      RegionsAndLocationsModule,
      MailModule,
    ],
  });

  SwaggerModule.setup('/api/v1', app, baseDocument, {
    swaggerOptions: {
      docExpansion: 'none',
      displayRequestDuration: true,
      operationsSorter: 'alpha',
      tagsSorter: 'alpha',
      defaultModelsExpandDepth: 2,
      defaultModelExpandDepth: 2,
      useUnsafeMarkdown: true, // This is required to render markdown in the description
    },
  });
};
