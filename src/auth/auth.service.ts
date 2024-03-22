import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../user/user.model';
import { JwtService } from '@nestjs/jwt';
import { IToken } from './auth.model';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(dto: CreateUserDto): Promise<IToken> {
    const newUser = await this.userService.postUser(dto);
    const payload = { id: newUser.id, login: newUser.login };
    return { token: this.jwtService.sign(payload) };
  }

  async login(dto: CreateUserDto): Promise<IToken> {
    const user = await this.userService.getUserByData(dto);
    const payload = { id: user.id, login: user.login };
    return { token: this.jwtService.sign(payload) };
  }
}
