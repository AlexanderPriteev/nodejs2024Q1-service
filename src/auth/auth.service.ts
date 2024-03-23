import { Injectable } from '@nestjs/common';
import { CreateUserDto, User } from '../user/user.model';
import { JwtService } from '@nestjs/jwt';
import { IToken } from './auth.model';
import { UserService } from '../user/user.service';
import { env } from 'node:process';
import 'dotenv/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  private refreshTime = env.TOKEN_REFRESH_EXPIRE_TIME || '6h';
  async signup(dto: CreateUserDto): Promise<User> {
    const user = await this.userService.postUser(dto);
    console.log(user);
    return user;
    // return this.getTokens(user);
  }

  async login(dto: CreateUserDto): Promise<IToken> {
    const user = await this.userService.getUserByData(dto);
    return this.getTokens(user);
  }

  private getTokens(user: User): IToken {
    const payload = { id: user.id, login: user.login };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.refreshTime,
    } as any);
    return { accessToken, refreshToken };
  }
}
