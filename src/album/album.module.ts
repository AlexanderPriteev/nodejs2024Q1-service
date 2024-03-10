import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './album.model';
import { Track } from '../track/track.model';
import { Favorite } from '../favorites/favorites.model';

@Module({
  imports: [TypeOrmModule.forFeature([Album, Track, Favorite])],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}
