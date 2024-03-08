import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesResponse } from './favorites.model';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Track } from '../track/track.model';
import { Album } from '../album/album.model';

@ApiTags('Favorites')
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @ApiResponse({ status: 200, type: FavoritesResponse })
  getUsers(): FavoritesResponse {
    return this.favoritesService.getFavorites();
  }

  @Post('/track/:id')
  @ApiResponse({ status: 201, type: Track })
  @ApiResponse({ status: 400, description: 'trackId is invalid' })
  @ApiResponse({ status: 422, description: 'Track not found' })
  @HttpCode(HttpStatus.CREATED)
  addTrack(@Param('id') id: string) {
    return this.favoritesService.addTrack(id);
  }

  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: 204, description: 'Track removed from favorites' })
  @ApiResponse({ status: 400, description: 'trackId is invalid' })
  @ApiResponse({ status: 422, description: 'Track not found' })
  deleteTrack(@Param('id') id: string) {
    return this.favoritesService.deleteTrack(id);
  }

  @Post('/album/:id')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: 201, type: Album })
  @ApiResponse({ status: 400, description: 'albumId is invalid' })
  @ApiResponse({ status: 422, description: 'Album not found' })
  addAlbum(@Param('id') id: string) {
    return this.favoritesService.addAlbum(id);
  }

  @Delete('/album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: 204, description: 'Album removed from favorites' })
  @ApiResponse({ status: 400, description: 'albumId is invalid' })
  @ApiResponse({ status: 422, description: 'Album not found' })
  deleteAlbum(@Param('id') id: string) {
    return this.favoritesService.deleteAlbum(id);
  }

  @Post('/artist/:id')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: 201, type: Album })
  @ApiResponse({ status: 400, description: 'artistId is invalid' })
  @ApiResponse({ status: 422, description: 'Artist not found' })
  addArtist(@Param('id') id: string) {
    return this.favoritesService.addArtist(id);
  }

  @Delete('/artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: 204, description: 'Artist removed from favorites' })
  @ApiResponse({ status: 400, description: 'artistId is invalid' })
  @ApiResponse({ status: 422, description: 'Artist not found' })
  deleteArtist(@Param('id') id: string) {
    return this.favoritesService.deleteArtist(id);
  }
}
