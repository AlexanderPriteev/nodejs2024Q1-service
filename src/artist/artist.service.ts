import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { memoryDB } from '../database/memoryDB';
import { v4 as uuidv4, validate } from 'uuid';
import { Artist, CreateArtistDto, UpdateArtistDto } from './artist.model';

@Injectable()
export class ArtistService {
  getArtists(): Artist[] {
    return Array.from(memoryDB.artists.values());
  }

  getArtist(id: string): Artist {
    if (!validate(id)) {
      throw new HttpException('Invalid ArtistID', HttpStatus.BAD_REQUEST);
    }
    const artist = memoryDB.artists.get(id);
    if (artist) return artist;
    throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
  }

  postArtist(dto: CreateArtistDto): Artist {
    const newArtist: Artist = {
      id: uuidv4(),
      name: dto.name,
      grammy: dto.grammy,
    };
    memoryDB.artists.set(newArtist.id, newArtist);
    return newArtist;
  }

  putArtist(id: string, dto: UpdateArtistDto): Artist {
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
