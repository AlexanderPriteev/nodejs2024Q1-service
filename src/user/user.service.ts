import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { memoryDB } from '../database/memoryDB';
import { validate, v4 as uuidv4 } from 'uuid';
import {
  ICreateUserDto,
  IUpdatePasswordDto,
  IUser,
} from './schemas/user.interface';

@Injectable()
export class UserService {
  getUsers(): IUser[] {
    return Array.from(memoryDB.users.values());
  }

  getUser(id: string): IUser {
    if (!validate(id)) {
      throw new HttpException('Invalid ID', HttpStatus.BAD_REQUEST);
    }
    const user = memoryDB.users.get(id);
    if (user) return user;
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  postUser(dto: ICreateUserDto): IUser {
    const newUser: IUser = {
      id: uuidv4(),
      login: dto.login,
      version: 1,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    };
    const userDB = { ...newUser, password: dto.password };
    memoryDB.users.set(newUser.id, userDB);
    return newUser;
  }

  putUser(id: string, dto: IUpdatePasswordDto): IUser {
    if (!validate(id)) {
      throw new HttpException('Invalid ID', HttpStatus.BAD_REQUEST);
    }
    const user = memoryDB.users.get(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    if (user.password !== dto.oldPassword) {
      throw new HttpException('Incorrect oldPassword', HttpStatus.FORBIDDEN);
    }
    user.password = dto.newPassword;
    user.version += 1;
    user.updatedAt = new Date().getTime();
    return Object.keys(user)
      .filter((key) => key !== 'password')
      .reduce((res, key) => {
        res[key] = user[key];
        return res;
      }, {} as IUser);
  }

  deleteUser(id: string): void {
    if (!validate(id)) {
      throw new HttpException('Invalid ID', HttpStatus.BAD_REQUEST);
    }
    if (memoryDB.users.has(id)) {
      memoryDB.users.delete(id);
    } else {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
}
