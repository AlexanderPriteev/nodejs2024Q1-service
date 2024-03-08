import { IDB } from './interface';
import { Track } from '../track/track.model';
import { User } from '../user/user.model';
import { Album } from '../album/album.model';
import { Artist } from '../artist/artist.model';

export const memoryDB: IDB = {
  users: new Map<string, User>(),
  artists: new Map<string, Artist>(),
  albums: new Map<string, Album>(),
  tracks: new Map<string, Track>(),
  favorites: {
    artists: new Set<string>(),
    albums: new Set<string>(),
    tracks: new Set<string>(),
  },
};
