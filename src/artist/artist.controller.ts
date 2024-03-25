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
import { ArtistService } from './artist.service';
import { Artist, CreateArtistDto, UpdateArtistDto } from './artist.model';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Artist')
@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  @ApiResponse({ status: 200, type: [Artist] })
  getUsers(): Promise<Artist[]> {
    return this.artistService.getArtists();
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: Artist })
  @ApiResponse({ status: 400, description: 'artistId is invalid' })
  @ApiResponse({ status: 404, description: 'Artist not found' })
  getUser(@Param('id') id: string): Promise<Artist> {
    return this.artistService.getArtist(id);
  }

  @Post()
  @ApiResponse({ status: 201, type: Artist })
  @ApiResponse({ status: 400, description: 'Does not contain required fields' })
  postUser(@Body() dto: CreateArtistDto): Promise<Artist> {
    return this.artistService.postArtist(dto);
  }

  @Put(':id')
  @ApiResponse({ status: 200, type: Artist })
  @ApiResponse({ status: 400, description: 'artistId is invalid' })
  @ApiResponse({ status: 404, description: 'Artist not found' })
  putUser(
    @Param('id') id: string,
    @Body() dto: UpdateArtistDto,
  ): Promise<Artist> {
    return this.artistService.putArtist(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: 204, description: 'Artist removed' })
  @ApiResponse({ status: 400, description: 'artistId is invalid' })
  @ApiResponse({ status: 404, description: 'Artist not found' })
  deleteUser(@Param('id') id: string) {
    return this.artistService.deleteArtist(id);
  }
}
