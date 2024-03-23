import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const auth: string | undefined =
      context.getArgByIndex(0).headers.authorization;
    if (!auth) throw new UnauthorizedException();
    const [bearer, token] = auth.split(' ');
    if (bearer !== 'Bearer' || !token) throw new UnauthorizedException();
    try {
      this.jwtService.verify(token);
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}
