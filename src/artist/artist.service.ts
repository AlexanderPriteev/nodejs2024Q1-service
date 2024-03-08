import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  ICreateArtistDto,
  IArtist,
  IUpdateArtistDto,
} from '../schemas/interfaces';
import { memoryDB } from '../database/memoryDB';
import { v4 as uuidv4, validate } from 'uuid';

@Injectable()
export class ArtistService {
  getArtists(): IArtist[] {
    return Array.from(memoryDB.artists.values());
  }

  getArtist(id: string): IArtist {
    if (!validate(id)) {
      throw new HttpException('Invalid ArtistID', HttpStatus.BAD_REQUEST);
    }
    const artist = memoryDB.artists.get(id);
    if (artist) return artist;
    throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
  }

  postArtist(dto: ICreateArtistDto): IArtist {
    const newArtist: IArtist = {
      id: uuidv4(),
      name: dto.name,
      grammy: dto.grammy || false,
    };
    memoryDB.artists.set(newArtist.id, newArtist);
    return newArtist;
  }

  putArtist(id: string, dto: IUpdateArtistDto): IArtist {
    if (!validate(id)) {
      throw new HttpException('Invalid ArtistID', HttpStatus.BAD_REQUEST);
    }
    const artist = memoryDB.artists.get(id);
    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
    if (dto.name) artist.name = dto.name;
    if (dto.grammy || dto.grammy === false) artist.grammy = dto.grammy;
    return artist;
  }

  deleteArtist(id: string): void {
    if (!validate(id)) {
      throw new HttpException('Invalid ArtistID', HttpStatus.BAD_REQUEST);
    }
    if (memoryDB.artists.has(id)) {
      memoryDB.artists.delete(id);
      for (const obj of memoryDB.tracks.values()) {
        if (obj.artistId === id) {
          obj.artistId = null;
          break;
        }
      }
      for (const obj of memoryDB.albums.values()) {
        if (obj.artistId === id) {
          obj.artistId = null;
          break;
        }
      }
      memoryDB.favorites.artists.delete(id);
    } else {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
  }
}
