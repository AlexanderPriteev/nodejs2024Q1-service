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

import { AlbumService } from './album.service';
import { Album, CreateAlbumDto, UpdateAlbumDto } from './album.model';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Album')
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  @ApiResponse({ status: 200, type: [Album] })
  getUsers(): Album[] {
    return this.albumService.getAlbums();
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: Album })
  @ApiResponse({ status: 400, description: 'albumId is invalid' })
  @ApiResponse({ status: 404, description: 'Album not found' })
  getUser(@Param('id') id: string): Album {
    return this.albumService.getAlbum(id);
  }

  @Post()
  @ApiResponse({ status: 201, type: Album })
  @ApiResponse({ status: 400, description: 'Does not contain required fields' })
  postUser(@Body() dto: CreateAlbumDto): Album {
    return this.albumService.postAlbum(dto);
  }

  @Put(':id')
  @ApiResponse({ status: 200, type: Album })
  @ApiResponse({ status: 400, description: 'albumId is invalid' })
  @ApiResponse({ status: 404, description: 'Album not found' })
  putUser(@Param('id') id: string, @Body() dto: UpdateAlbumDto): Album {
    return this.albumService.putAlbum(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: 204, description: 'Album removed' })
  @ApiResponse({ status: 400, description: 'albumId is invalid' })
  @ApiResponse({ status: 404, description: 'Album not found' })
  deleteUser(@Param('id') id: string) {
    return this.albumService.deleteAlbum(id);
  }
}
