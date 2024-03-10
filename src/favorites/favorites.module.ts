import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from '../artist/artist.model';
import { Album } from '../album/album.model';
import { Track } from '../track/track.model';
import {
  FavoriteAlbum,
  FavoriteArtist,
  FavoriteTrack,
} from './favorites.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FavoriteArtist,
      FavoriteAlbum,
      FavoriteTrack,
      Artist,
      Album,
      Track,
    ]),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
