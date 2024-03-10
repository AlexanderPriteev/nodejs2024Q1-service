import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from '../track/track.model';
import { Artist } from './artist.model';
import { Album } from '../album/album.model';
import { Favorite } from '../favorites/favorites.model';

@Module({
  imports: [TypeOrmModule.forFeature([Artist, Album, Track, Favorite])],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
