require('module-alias/register')
import { addAlias } from 'module-alias'
import { resolve } from 'path'

import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

import { AppModule } from './app.module'
import env from './config/env'

addAlias('@', resolve(process.env.TS_NODE_DEV === undefined ? 'dist' : 'src'))

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api')
  const config = new DocumentBuilder()
    .setTitle('Tasks Management Service')
    .setDescription('Service for manage tasks')
    .setVersion('1.0')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(env.port)
}
bootstrap()
