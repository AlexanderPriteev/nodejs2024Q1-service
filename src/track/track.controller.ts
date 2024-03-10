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
import { TrackService } from './track.service';
import { CreateTrackDto, Track, UpdateTrackDto } from './track.model';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Track')
@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  @ApiResponse({ status: 200, type: [Track] })
  getUsers(): Promise<Track[]> {
    return this.trackService.getTracks();
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: Track })
  @ApiResponse({ status: 400, description: 'trackId is invalid' })
  @ApiResponse({ status: 404, description: 'Track not found' })
  getUser(@Param('id') id: string): Promise<Track> {
    return this.trackService.getTrack(id);
  }

  @Post()
  @ApiResponse({ status: 201, type: Track })
  @ApiResponse({ status: 400, description: 'Does not contain required fields' })
  postUser(@Body() dto: CreateTrackDto): Promise<Track> {
    return this.trackService.postTrack(dto);
  }

  @Put(':id')
  @ApiResponse({ status: 200, type: Track })
  @ApiResponse({ status: 400, description: 'trackId is invalid' })
  @ApiResponse({ status: 404, description: 'Track not found' })
  putUser(
    @Param('id') id: string,
    @Body() dto: UpdateTrackDto,
  ): Promise<Track> {
    return this.trackService.putTrack(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: 204, description: 'Track removed' })
  @ApiResponse({ status: 400, description: 'trackId is invalid' })
  @ApiResponse({ status: 404, description: 'Track not found' })
  deleteUser(@Param('id') id: string) {
    return this.trackService.deleteTrack(id);
  }
}
