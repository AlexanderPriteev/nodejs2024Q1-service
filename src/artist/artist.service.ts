import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4, validate } from 'uuid';
import { Artist, CreateArtistDto, UpdateArtistDto } from './artist.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
  ) {}
  async getArtists(): Promise<Artist[]> {
    return await this.artistRepository.find();
  }

  async getArtist(id: string): Promise<Artist> {
    if (!validate(id)) {
      throw new HttpException('Invalid ArtistID', HttpStatus.BAD_REQUEST);
    }
    const artist = await this.artistRepository.findOneBy({ id });
    if (artist) return artist;
    throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
  }

  async postArtist(dto: CreateArtistDto): Promise<Artist> {
    const newArtist: Artist = {
      id: uuidv4(),
      name: dto.name,
      grammy: dto.grammy,
    };
    return await this.artistRepository.save(newArtist);
  }

  async putArtist(id: string, dto: UpdateArtistDto): Promise<Artist> {
    if (!validate(id)) {
      throw new HttpException('Invalid ArtistID', HttpStatus.BAD_REQUEST);
    }
    const artist = await this.artistRepository.findOneBy({ id });
    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
    if (dto.name) artist.name = dto.name;
    if (dto.grammy || dto.grammy === false) artist.grammy = dto.grammy;
    await this.artistRepository.update({ id }, artist);
    return artist;
  }

  async deleteArtist(id: string): Promise<void> {
    if (!validate(id)) {
      throw new HttpException('Invalid ArtistID', HttpStatus.BAD_REQUEST);
    }
    const artist = await this.artistRepository.findOneBy({ id });
    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
    await this.artistRepository.delete({ id });
  }
}
