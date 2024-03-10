import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './album.model';
import { Track } from '../track/track.model';

@Module({
  imports: [TypeOrmModule.forFeature([Album, Track])],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}
