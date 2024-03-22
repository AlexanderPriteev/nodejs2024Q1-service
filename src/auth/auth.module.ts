import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoggerModule } from '../logger/logger.module';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'node:process';
import 'dotenv/config';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UserModule,
    LoggerModule,
    JwtModule.register({
      secret: env.JWT_SECRET_KEY || 'root',
      signOptions: { expiresIn: env.TOKEN_EXPIRE_TIME },
    }),
  ],
  providers: [AuthService, UserService],
  controllers: [AuthController],
})
export class AuthModule {}
