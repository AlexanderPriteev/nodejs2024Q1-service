import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './track.model';
import { Favorite } from '../favorites/favorites.model';

@Module({
  imports: [TypeOrmModule.forFeature([Track, Favorite])],
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}
