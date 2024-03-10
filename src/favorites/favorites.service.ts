import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { validate } from 'uuid';
import {
  FavoriteAlbum,
  FavoriteArtist,
  FavoritesResponse,
  FavoriteTrack,
} from './favorites.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from '../artist/artist.model';
import { Repository } from 'typeorm';
import { Album } from '../album/album.model';
import { Track } from '../track/track.model';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(FavoriteArtist)
    private readonly favoriteArtistRepository: Repository<FavoriteArtist>,
    @InjectRepository(FavoriteAlbum)
    private readonly favoriteAlbumRepository: Repository<FavoriteAlbum>,
    @InjectRepository(FavoriteTrack)
    private readonly favoriteTrackRepository: Repository<FavoriteTrack>,
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
  ) {}
  async getFavorites(): Promise<FavoritesResponse> {
    const artistsId = await this.favoriteArtistRepository.find();
    const albumsId = await this.favoriteAlbumRepository.find();
    const trackId = await this.favoriteTrackRepository.find();
    const artists = [] as Artist[];
    const albums = [] as Album[];
    const tracks = [] as Track[];
    for (const { id } of artistsId) {
      artists.push(await this.artistRepository.findOneBy({ id }));
    }
    for (const { id } of albumsId) {
      albums.push(await this.albumRepository.findOneBy({ id }));
    }
    for (const { id } of trackId) {
      tracks.push(await this.trackRepository.findOneBy({ id }));
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
    await this.favoriteTrackRepository.save({ id });
  }
  async deleteTrack(id: string): Promise<void> {
    if (!validate(id)) {
      throw new HttpException('Invalid trackID', HttpStatus.BAD_REQUEST);
    }
    const favorite = await this.favoriteTrackRepository.findOneBy({ id });
    if (!favorite) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
    await this.favoriteTrackRepository.delete({ id });
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
    await this.favoriteArtistRepository.save({ id });
  }
  async deleteArtist(id: string): Promise<void> {
    if (!validate(id)) {
      throw new HttpException('Invalid artistID', HttpStatus.BAD_REQUEST);
    }
    const favorite = await this.favoriteArtistRepository.findOneBy({ id });
    if (!favorite) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
    await this.favoriteArtistRepository.delete({ id });
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
    await this.favoriteAlbumRepository.save({ id });
  }
  async deleteAlbum(id: string): Promise<void> {
    if (!validate(id)) {
      throw new HttpException('Invalid albumID', HttpStatus.BAD_REQUEST);
    }
    const favorite = await this.favoriteAlbumRepository.findOneBy({ id });
    if (!favorite) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    await this.favoriteAlbumRepository.delete({ id });
  }
}
