import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, User } from '../user/user.model';
import { IToken } from './auth.model';
import { LoggingInterceptor } from '../logger/logger.interceptor';

@Controller('auth')
@UseInterceptors(LoggingInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: CreateUserDto): Promise<User> {
    return this.authService.signup(dto);
  }

  @Post('login')
  login(@Body() dto: CreateUserDto): Promise<IToken> {
    return this.authService.login(dto);
  }
}
