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
import { ITrack } from '../schemas/interfaces';
import { TrackService } from './track.service';
import { MCreateTrackDto, MUpdateTrackDto } from './track.model';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  getUsers(): ITrack[] {
    return this.trackService.getTracks();
  }

  @Get(':id')
  getUser(@Param('id') id: string): ITrack {
    return this.trackService.getTrack(id);
  }

  @Post()
  postUser(@Body() dto: MCreateTrackDto): ITrack {
    return this.trackService.postTrack(dto);
  }

  @Put(':id')
  putUser(@Param('id') id: string, @Body() dto: MUpdateTrackDto): ITrack {
    return this.trackService.putTrack(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUser(@Param('id') id: string) {
    return this.trackService.deleteTrack(id);
  }
}
