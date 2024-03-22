import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/user.model';
import { IToken } from './auth.model';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: CreateUserDto): Promise<IToken> {
    return this.authService.signup(dto);
  }

  @Post('login')
  login(@Body() dto: CreateUserDto): Promise<IToken> {
    return this.authService.login(dto);
  }
}
