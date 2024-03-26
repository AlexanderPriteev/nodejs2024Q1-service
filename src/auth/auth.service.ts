import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto, User } from '../user/user.model';
import { JwtService } from '@nestjs/jwt';
import { IPayload, IToken, RefreshTokenDto } from './auth.model';
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
  private refreshSecret = env.JWT_SECRET_REFRESH_KEY || 'root';

  async signup(dto: CreateUserDto): Promise<User> {
    return await this.userService.postUser(dto);
  }

  async login(dto: CreateUserDto): Promise<IToken> {
    const user = await this.userService.getUserByData(dto);
    return this.getTokens(user);
  }

  refresh(dto: RefreshTokenDto): IToken {
    const { refreshToken } = dto;
    if (!refreshToken)
      throw new HttpException(
        'No refreshToken in body',
        HttpStatus.UNAUTHORIZED,
      );
    try {
      const payload = this.jwtService.verify(refreshToken) as IPayload;
      return this.getTokens(payload);
    } catch {
      throw new HttpException(
        'Refresh token is invalid or expired',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  private getTokens(user: User | IPayload): IToken {
    const userId = user instanceof User ? user.id : user.userId;
    const payload = { userId, login: user.login };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.refreshSecret,
      expiresIn: this.refreshTime,
    } as any);
    return { accessToken, refreshToken };
  }
}
