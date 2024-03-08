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
import { MCreateUserDto, MUpdatePasswordDto } from './schemas/user.model';
import { IUser } from './schemas/user.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(): IUser[] {
    return this.userService.getUsers();
  }

  @Get(':id')
  getUser(@Param('id') id: string): IUser {
    return this.userService.getUser(id);
  }

  @Post()
  postUser(@Body() dto: MCreateUserDto): IUser {
    return this.userService.postUser(dto);
  }

  @Put(':id')
  putUser(@Param('id') id: string, @Body() dto: MUpdatePasswordDto): IUser {
    return this.userService.putUser(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
