import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { env } from 'node:process';
import { ConfigModule } from '@nestjs/config';
import { User } from '../user/user.model';
import { Track } from '../track/track.model';
import { Album } from '../album/album.model';
import { Artist } from '../artist/artist.model';
import {
  FavoriteAlbum,
  FavoriteArtist,
  FavoriteTrack,
} from '../favorites/favorites.model';
import 'dotenv/config';

const HOST =
  process.env.NODE_ENV === 'docker'
    ? process.env.DB_HOST_DOCKER
    : process.env.DB_HOST;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: HOST,
      port: Number(env.DB_PORT),
      database: env.DB_NAME,
      username: env.DB_USERNAME,
      password: env.DB_PASSWORD,
      entities: [
        User,
        Track,
        Album,
        Artist,
        FavoriteArtist,
        FavoriteAlbum,
        FavoriteTrack,
      ],
      synchronize: false,
      logging: false,
    }),
  ],
})
export class TypeOrmOptionsModule {}
