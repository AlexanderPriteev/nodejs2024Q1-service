import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4, validate } from 'uuid';
import { Album, CreateAlbumDto, UpdateAlbumDto } from './album.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
  ) {}

  async getAlbums(): Promise<Album[]> {
    return await this.albumRepository.find();
  }

  async getAlbum(id: string): Promise<Album> {
    if (!validate(id)) {
      throw new HttpException('Invalid AlbumID', HttpStatus.BAD_REQUEST);
    }
    const album = await this.albumRepository.findOneBy({ id });
    if (album) return album;
    throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
  }

  async postAlbum(dto: CreateAlbumDto): Promise<Album> {
    const newAlbum: Album = {
      id: uuidv4(),
      name: dto.name,
      year: dto.year,
      artistId: dto.artistId || null,
    };
    return await this.albumRepository.save(newAlbum);
  }

  async putAlbum(id: string, dto: UpdateAlbumDto): Promise<Album> {
    if (!validate(id)) {
      throw new HttpException('Invalid AlbumID', HttpStatus.BAD_REQUEST);
    }
    const album = await this.albumRepository.findOneBy({ id });
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    if (dto.name) album.name = dto.name;
    if (dto.year) album.year = dto.year;
    if (dto.artistId) album.artistId = dto.artistId;
    await this.albumRepository.update({ id }, album);
    return album;
  }

  async deleteAlbum(id: string): Promise<void> {
    if (!validate(id)) {
      throw new HttpException('Invalid AlbumID', HttpStatus.BAD_REQUEST);
    }
    const album = await this.albumRepository.findOneBy({ id });
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    await this.albumRepository.delete({ id });
  }
}
