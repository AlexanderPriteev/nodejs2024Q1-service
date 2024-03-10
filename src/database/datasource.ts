import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from '../user/user.model';
import { Track } from '../track/track.model';
import { Album } from '../album/album.model';
import { Artist } from '../artist/artist.model';
import {
  FavoriteAlbum,
  FavoriteArtist,
  FavoriteTrack,
} from '../favorites/favorites.model';
import 'dotenv/config';

const options: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: [
    User,
    Track,
    Album,
    Artist,
    FavoriteArtist,
    FavoriteAlbum,
    FavoriteTrack,
  ],
  migrations: ['dist/database/migrations/*.js'],
};

const datasource = new DataSource(options);
export default datasource;
