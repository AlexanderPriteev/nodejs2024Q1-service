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
import { UserService } from './user.service';
import { CreateUserDto, UpdatePasswordDto, User } from './user.model';

import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoggingInterceptor } from '../logger/logger.interceptor';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('User')
@Controller('user')
@UseInterceptors(LoggingInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, type: [User] })
  getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, type: User })
  @ApiResponse({ status: 400, description: 'userId is invalid' })
  @ApiResponse({ status: 404, description: 'User not found' })
  getUser(@Param('id') id: string): Promise<User> {
    return this.userService.getUser(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 201, type: User })
  @ApiResponse({ status: 400, description: 'Does not contain required fields' })
  postUser(@Body() dto: CreateUserDto): Promise<User> {
    return this.userService.postUser(dto);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, type: User })
  @ApiResponse({ status: 400, description: 'userId is invalid' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 403, description: 'oldPassword is wrong' })
  putUser(
    @Param('id') id: string,
    @Body() dto: UpdatePasswordDto,
  ): Promise<User> {
    return this.userService.putUser(id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: 204, description: 'User removed' })
  @ApiResponse({ status: 400, description: 'userId is invalid' })
  @ApiResponse({ status: 404, description: 'User not found' })
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
