import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4, validate } from 'uuid';
import { CreateTrackDto, Track, UpdateTrackDto } from './track.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from '../favorites/favorites.model';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,
  ) {}

  async getTracks(): Promise<Track[]> {
    return await this.trackRepository.find();
  }

  async getTrack(id: string): Promise<Track> {
    if (!validate(id)) {
      throw new HttpException('Invalid trackID', HttpStatus.BAD_REQUEST);
    }
    const track = await this.trackRepository.findOneBy({ id });
    if (track) return track;
    throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
  }

  async postTrack(dto: CreateTrackDto): Promise<Track> {
    const newTrack: Track = {
      id: uuidv4(),
      name: dto.name,
      artistId: dto.artistId || null,
      albumId: dto.albumId || null,
      duration: dto.duration,
    };
    return await this.trackRepository.save(newTrack);
  }

  async putTrack(id: string, dto: UpdateTrackDto): Promise<Track> {
    if (!validate(id)) {
      throw new HttpException('Invalid trackID', HttpStatus.BAD_REQUEST);
    }
    const track = await this.trackRepository.findOneBy({ id });
    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
    if (dto.name) track.name = dto.name;
    if (dto.artistId) track.artistId = dto.artistId;
    if (dto.albumId) track.albumId = dto.albumId;
    if (dto.duration || dto.duration === 0) track.duration = dto.duration;

    await this.trackRepository.update({ id }, track);
    return track;
  }

  async deleteTrack(id: string): Promise<void> {
    if (!validate(id)) {
      throw new HttpException('Invalid trackID', HttpStatus.BAD_REQUEST);
    }
    const track = await this.trackRepository.findOneBy({ id });
    if (track) {
      await this.trackRepository.delete({ id });
      await this.favoriteRepository.delete({ id });
    } else {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
  }
}
