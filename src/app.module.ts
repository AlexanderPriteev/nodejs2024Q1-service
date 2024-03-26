import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TrackModule } from './track/track.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { FavoritesModule } from './favorites/favorites.module';
import { TypeOrmOptionsModule } from './database/typeORM.module';
import { LoggerModule } from './logger/logger.module';
import { ExceptionModule } from './exception/exception.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UserModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    FavoritesModule,
    TypeOrmOptionsModule,
    LoggerModule,
    ExceptionModule,
    AuthModule,
  ],
})
export class AppModule {}
