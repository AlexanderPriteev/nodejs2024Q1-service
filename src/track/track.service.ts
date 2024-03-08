import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { memoryDB } from '../database/memoryDB';
import { v4 as uuidv4, validate } from 'uuid';
import { CreateTrackDto, Track, UpdateTrackDto } from './track.model';

@Injectable()
export class TrackService {
  getTracks(): Track[] {
    return Array.from(memoryDB.tracks.values());
  }

  getTrack(id: string): Track {
    if (!validate(id)) {
      throw new HttpException('Invalid trackID', HttpStatus.BAD_REQUEST);
    }
    const track = memoryDB.tracks.get(id);
    if (track) return track;
    throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
  }

  postTrack(dto: CreateTrackDto): Track {
    const newTrack: Track = {
      id: uuidv4(),
      name: dto.name,
      artistId: dto.artistId || null,
      albumId: dto.albumId || null,
      duration: dto.duration,
    };
    memoryDB.tracks.set(newTrack.id, newTrack);
    return newTrack;
  }

  putTrack(id: string, dto: UpdateTrackDto): Track {
    if (!validate(id)) {
      throw new HttpException('Invalid trackID', HttpStatus.BAD_REQUEST);
    }
    const track = memoryDB.tracks.get(id);
    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
    if (dto.name) track.name = dto.name;
    if (dto.artistId) track.artistId = dto.artistId;
    if (dto.albumId) track.albumId = dto.albumId;
    if (dto.duration || dto.duration === 0) track.duration = dto.duration;

    return track;
  }

  deleteTrack(id: string): void {
    if (!validate(id)) {
      throw new HttpException('Invalid trackID', HttpStatus.BAD_REQUEST);
    }
    if (memoryDB.tracks.has(id)) {
      memoryDB.tracks.delete(id);
      memoryDB.favorites.tracks.delete(id);
    } else {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
  }
}
