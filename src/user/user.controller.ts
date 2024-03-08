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
import { UserService } from './user.service';
import { CreateUserDto, UpdatePasswordDto, User } from './user.model';

import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiResponse({ status: 200, type: [User] })
  getUsers(): User[] {
    return this.userService.getUsers();
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: User })
  @ApiResponse({ status: 400, description: 'userId is invalid' })
  @ApiResponse({ status: 404, description: 'User not found' })
  getUser(@Param('id') id: string): User {
    return this.userService.getUser(id);
  }

  @Post()
  @ApiResponse({ status: 201, type: User })
  @ApiResponse({ status: 400, description: 'Does not contain required fields' })
  postUser(@Body() dto: CreateUserDto): User {
    return this.userService.postUser(dto);
  }

  @Put(':id')
  @ApiResponse({ status: 200, type: User })
  @ApiResponse({ status: 400, description: 'userId is invalid' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 403, description: 'oldPassword is wrong' })
  putUser(@Param('id') id: string, @Body() dto: UpdatePasswordDto): User {
    return this.userService.putUser(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: 204, description: 'User removed' })
  @ApiResponse({ status: 400, description: 'userId is invalid' })
  @ApiResponse({ status: 404, description: 'User not found' })
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
