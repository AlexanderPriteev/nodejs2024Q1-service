import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4, validate } from 'uuid';
import { Artist, CreateArtistDto, UpdateArtistDto } from './artist.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from '../album/album.model';
import { Repository } from 'typeorm';
import { Track } from '../track/track.model';
import { Favorite } from '../favorites/favorites.model';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,
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
    if (artist) {
      await this.artistRepository.delete({ id });
      const albums = await this.albumRepository.findBy({ artistId: id });
      for (const album of albums) {
        album.artistId = null;
        await this.albumRepository.update({ id: album.id }, album);
      }

      const tracks = await this.trackRepository.findBy({ artistId: id });
      for (const track of tracks) {
        track.artistId = null;
        await this.trackRepository.update({ id: track.id }, track);
      }
      await this.favoriteRepository.delete({ id });
    } else {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
  }
}
