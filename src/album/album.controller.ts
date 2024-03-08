import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { IAlbum } from '../schemas/interfaces';
import { AlbumService } from './album.service';
import { MCreateAlbumDto, MUpdateAlbumDto } from './album.model';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  getUsers(): IAlbum[] {
    return this.albumService.getAlbums();
  }

  @Get(':id')
  getUser(@Param('id') id: string): IAlbum {
    return this.albumService.getAlbum(id);
  }

  @Post()
  postUser(@Body() dto: MCreateAlbumDto): IAlbum {
    return this.albumService.postAlbum(dto);
  }

  @Put(':id')
  putUser(@Param('id') id: string, @Body() dto: MUpdateAlbumDto): IAlbum {
    return this.albumService.putAlbum(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUser(@Param('id') id: string) {
    return this.albumService.deleteAlbum(id);
  }
}
