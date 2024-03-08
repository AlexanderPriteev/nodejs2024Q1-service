import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  IAlbum,
  ICreateAlbumDto,
  IUpdateAlbumDto,
} from '../schemas/interfaces';
import { memoryDB } from '../database/memoryDB';
import { v4 as uuidv4, validate } from 'uuid';

@Injectable()
export class AlbumService {
  getAlbums(): IAlbum[] {
    return Array.from(memoryDB.albums.values());
  }

  getAlbum(id: string): IAlbum {
    if (!validate(id)) {
      throw new HttpException('Invalid AlbumID', HttpStatus.BAD_REQUEST);
    }
    const Album = memoryDB.albums.get(id);
    if (Album) return Album;
    throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
  }

  postAlbum(dto: ICreateAlbumDto): IAlbum {
    const newAlbum: IAlbum = {
      id: uuidv4(),
      name: dto.name,
      year: dto.year,
      artistId: dto.artistId || null,
    };
    memoryDB.albums.set(newAlbum.id, newAlbum);
    return newAlbum;
  }

  putAlbum(id: string, dto: IUpdateAlbumDto): IAlbum {
    if (!validate(id)) {
      throw new HttpException('Invalid AlbumID', HttpStatus.BAD_REQUEST);
    }
    const album = memoryDB.albums.get(id);
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    if (dto.name) album.name = dto.name;
    if (dto.year) album.year = dto.year;
    if (dto.artistId) album.artistId = dto.artistId;

    return album;
  }

  deleteAlbum(id: string): void {
    if (!validate(id)) {
      throw new HttpException('Invalid AlbumID', HttpStatus.BAD_REQUEST);
    }
    if (memoryDB.albums.has(id)) {
      memoryDB.albums.delete(id);
      for (const obj of memoryDB.tracks.values()) {
        if (obj.albumId === id) {
          obj.albumId = null;
          break;
        }
      }
      memoryDB.favorites.albums.delete(id);
    } else {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
  }
}
