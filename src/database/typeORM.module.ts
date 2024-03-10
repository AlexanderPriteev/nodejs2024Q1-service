import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { env } from 'node:process';
import { ConfigModule } from '@nestjs/config';
import { User } from '../user/user.model';
import { Track } from '../track/track.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: env.DB_HOST,
      port: Number(env.DB_PORT),
      database: env.DB_NAME,
      username: env.DB_USERNAME,
      password: env.DB_PASSWORD,
      entities: [User, Track],
      synchronize: true,
      logging: true,
    }),
  ],
})
export class TypeOrmOptionsModule {}
