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
import { MCreateArtistDto, MUpdateArtistDto } from './schemas/artist.model';
import { IArtist } from './schemas/artist.interface';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  getUsers(): IArtist[] {
    return this.artistService.getArtists();
  }

  @Get(':id')
  getUser(@Param('id') id: string): IArtist {
    return this.artistService.getArtist(id);
  }

  @Post()
  postUser(@Body() dto: MCreateArtistDto): IArtist {
    return this.artistService.postArtist(dto);
  }

  @Put(':id')
  putUser(@Param('id') id: string, @Body() dto: MUpdateArtistDto): IArtist {
    return this.artistService.putArtist(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUser(@Param('id') id: string) {
    return this.artistService.deleteArtist(id);
  }
}
