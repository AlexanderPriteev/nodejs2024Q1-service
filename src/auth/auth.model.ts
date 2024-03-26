import { Optional } from '@nestjs/common';

export interface IToken {
  accessToken: string;
  refreshToken: string;
}
export interface IPayload {
  userId: string;
  login: string;
  iat: number;
  exp: number;
}

export class RefreshTokenDto {
  @Optional()
  refreshToken: string;
}
