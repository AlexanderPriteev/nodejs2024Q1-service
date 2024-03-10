import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { validate } from 'uuid';
import { Favorite, FavoritesResponse } from './favorites.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from '../artist/artist.model';
import { Repository } from 'typeorm';
import { Album } from '../album/album.model';
import { Track } from '../track/track.model';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
  ) {}
  async getFavorites(): Promise<FavoritesResponse> {
    const favorites = await this.favoriteRepository.find();
    const artists = [] as Artist[];
    const albums = [] as Album[];
    const tracks = [] as Track[];
    for (const { id, type } of favorites) {
      if (type === 'artist') {
        const artist = await this.artistRepository.findOneBy({ id });
        artists.push(artist);
      }
      if (type === 'album') {
        const album = await this.albumRepository.findOneBy({ id });
        albums.push(album);
      }
      if (type === 'track') {
        const track = await this.trackRepository.findOneBy({ id });
        tracks.push(track);
      }
    }
    return { artists, albums, tracks };
  }

  async addTrack(id: string): Promise<void> {
    if (!validate(id)) {
      throw new HttpException('Invalid trackID', HttpStatus.BAD_REQUEST);
    }
    const track = await this.trackRepository.findOneBy({ id });
    if (!track) {
      throw new HttpException(
        'Track not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    await this.favoriteRepository.save({ id, type: 'track' });
  }
  async deleteTrack(id: string): Promise<void> {
    if (!validate(id)) {
      throw new HttpException('Invalid trackID', HttpStatus.BAD_REQUEST);
    }
    const favorite = await this.favoriteRepository.findOneBy({ id });
    if (!favorite) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
    await this.favoriteRepository.delete({ id });
  }

  async addArtist(id: string): Promise<void> {
    if (!validate(id)) {
      throw new HttpException('Invalid artistID', HttpStatus.BAD_REQUEST);
    }
    const artist = await this.artistRepository.findOneBy({ id });
    if (!artist) {
      throw new HttpException(
        'Artist not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    await this.favoriteRepository.save({ id, type: 'artist' });
  }
  async deleteArtist(id: string): Promise<void> {
    if (!validate(id)) {
      throw new HttpException('Invalid artistID', HttpStatus.BAD_REQUEST);
    }
    const favorite = await this.favoriteRepository.findOneBy({ id });
    if (!favorite) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
    await this.favoriteRepository.delete({ id });
  }

  async addAlbum(id: string): Promise<void> {
    if (!validate(id)) {
      throw new HttpException('Invalid AlbumID', HttpStatus.BAD_REQUEST);
    }
    const album = await this.albumRepository.findOneBy({ id });
    if (!album) {
      throw new HttpException(
        'Album not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    await this.favoriteRepository.save({ id, type: 'album' });
  }
  async deleteAlbum(id: string): Promise<void> {
    if (!validate(id)) {
      throw new HttpException('Invalid albumID', HttpStatus.BAD_REQUEST);
    }
    const favorite = await this.favoriteRepository.findOneBy({ id });
    if (!favorite) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    await this.favoriteRepository.delete({ id });
  }
}
