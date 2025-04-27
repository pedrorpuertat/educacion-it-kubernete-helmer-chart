import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true,
  }),
MongooseModule.forRoot(process.env.MONGO_DB_URI,{
  dbName: process.env.MONGO_DB_NAME,
  user: process.env.MONGO_DB_USER,
  pass: process.env.MONGO_DB_PASS,
})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
