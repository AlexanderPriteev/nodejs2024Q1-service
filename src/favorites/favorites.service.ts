import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { memoryDB } from '../database/memoryDB';
import { validate } from 'uuid';
import { FavoritesResponse } from './favorites.model';

@Injectable()
export class FavoritesService {
  getFavorites(): FavoritesResponse {
    const artists = [...memoryDB.favorites.artists].map((id) =>
      memoryDB.artists.get(id),
    );
    const albums = [...memoryDB.favorites.albums].map((id) =>
      memoryDB.albums.get(id),
    );
    const tracks = [...memoryDB.favorites.tracks].map((id) =>
      memoryDB.tracks.get(id),
    );
    return { artists, albums, tracks };
  }

  addTrack(id: string): void {
    if (!validate(id)) {
      throw new HttpException('Invalid ArtistID', HttpStatus.BAD_REQUEST);
    }
    if (!memoryDB.tracks.has(id)) {
      throw new HttpException(
        'Artist not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    memoryDB.favorites.tracks.add(id);
  }
  deleteTrack(id: string): void {
    if (!validate(id)) {
      throw new HttpException('Invalid ArtistID', HttpStatus.BAD_REQUEST);
    }
    if (!memoryDB.favorites.tracks.has(id)) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
    memoryDB.favorites.tracks.delete(id);
  }

  addArtist(id: string): void {
    if (!validate(id)) {
      throw new HttpException('Invalid ArtistID', HttpStatus.BAD_REQUEST);
    }
    if (!memoryDB.artists.has(id)) {
      throw new HttpException(
        'Artist not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    memoryDB.favorites.artists.add(id);
  }
  deleteArtist(id: string): void {
    if (!validate(id)) {
      throw new HttpException('Invalid ArtistID', HttpStatus.BAD_REQUEST);
    }
    if (!memoryDB.favorites.artists.has(id)) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
    memoryDB.favorites.artists.delete(id);
  }

  addAlbum(id: string): void {
    if (!validate(id)) {
      throw new HttpException('Invalid ArtistID', HttpStatus.BAD_REQUEST);
    }
    if (!memoryDB.albums.has(id)) {
      throw new HttpException(
        'Artist not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    memoryDB.favorites.albums.add(id);
  }
  deleteAlbum(id: string): void {
    if (!validate(id)) {
      throw new HttpException('Invalid ArtistID', HttpStatus.BAD_REQUEST);
    }
    if (!memoryDB.favorites.albums.has(id)) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
    memoryDB.favorites.albums.delete(id);
  }
}
