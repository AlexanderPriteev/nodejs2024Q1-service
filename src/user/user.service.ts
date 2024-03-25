import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { validate, v4 as uuidv4 } from 'uuid';
import { CreateUserDto, UpdatePasswordDto, User } from './user.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { env } from 'node:process';
import 'dotenv/config';

@Injectable()
export class UserService {
  private SALT = Number(env.CRYPT_SALT) || 10;
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getUser(id: string): Promise<User> {
    if (!validate(id)) {
      throw new HttpException('Invalid ID', HttpStatus.BAD_REQUEST);
    }
    const user = await this.userRepository.findOneBy({ id });
    if (user) return user;
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }
  async getUserByData(dto: CreateUserDto): Promise<User> {
    const { login, password } = dto;
    const user = await this.userRepository.findOneBy({ login });
    if (!user) {
      throw new HttpException('Invalid User Name', HttpStatus.FORBIDDEN);
    }
    const passwordEquals = await bcrypt.compare(password, user.password);
    if (!passwordEquals) {
      throw new HttpException('Invalid User Password', HttpStatus.FORBIDDEN);
    }
    return user;
  }

  async postUser(dto: CreateUserDto): Promise<User> {
    const { login, password } = dto;
    // const user = await this.userRepository.findOneBy({ login });
    // if (user) {
    //   throw new HttpException(
    //     'User With Such Name Already Exists',
    //     HttpStatus.BAD_REQUEST,
    //   );
    // }
    const newUser: User = {
      id: uuidv4(),
      login: login,
      version: 1,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    };
    const hash = await bcrypt.hash(password, this.SALT);
    const userDB = { ...newUser, password: hash };
    await this.userRepository.save(userDB);
    return newUser;
  }

  async putUser(id: string, dto: UpdatePasswordDto): Promise<User> {
    if (!validate(id)) {
      throw new HttpException('Invalid ID', HttpStatus.BAD_REQUEST);
    }
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const passwordEquals = await bcrypt.compare(dto.oldPassword, user.password);
    if (!passwordEquals) {
      throw new HttpException('Incorrect oldPassword', HttpStatus.FORBIDDEN);
    }
    user.password = await bcrypt.hash(dto.newPassword, this.SALT);
    user.version += 1;
    user.createdAt = Number(user.createdAt);
    user.updatedAt = new Date().getTime();
    await this.userRepository.update({ id }, user);
    return Object.keys(user)
      .filter((key) => key !== 'password')
      .reduce((res, key) => {
        res[key] = user[key];
        return res;
      }, {} as User);
  }

  async deleteUser(id: string): Promise<void> {
    if (!validate(id)) {
      throw new HttpException('Invalid ID', HttpStatus.BAD_REQUEST);
    }
    const user = await this.userRepository.findOneBy({ id });
    if (user) {
      await this.userRepository.delete({ id });
    } else {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
}
