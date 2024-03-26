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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto, Track, UpdateTrackDto } from './track.model';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoggingInterceptor } from '../logger/logger.interceptor';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('Track')
@Controller('track')
@UseInterceptors(LoggingInterceptor)
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, type: [Track] })
  getUsers(): Promise<Track[]> {
    return this.trackService.getTracks();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, type: Track })
  @ApiResponse({ status: 400, description: 'trackId is invalid' })
  @ApiResponse({ status: 404, description: 'Track not found' })
  getUser(@Param('id') id: string): Promise<Track> {
    return this.trackService.getTrack(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 201, type: Track })
  @ApiResponse({ status: 400, description: 'Does not contain required fields' })
  postUser(@Body() dto: CreateTrackDto): Promise<Track> {
    return this.trackService.postTrack(dto);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
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
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: 204, description: 'Track removed' })
  @ApiResponse({ status: 400, description: 'trackId is invalid' })
  @ApiResponse({ status: 404, description: 'Track not found' })
  deleteUser(@Param('id') id: string) {
    return this.trackService.deleteTrack(id);
  }
}
