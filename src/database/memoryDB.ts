import { IDB } from './schemas/interfaces';
import { IUser } from '../user/schemas/user.interface';
import { IArtist } from '../artist/schemas/artist.interface';
import { IAlbum } from '../album/schemas/album.interface';
import { ITrack } from '../track/schemas/track.interface';

export const memoryDB: IDB = {
  users: new Map<string, IUser>(),
  artists: new Map<string, IArtist>(),
  albums: new Map<string, IAlbum>(),
  tracks: new Map<string, ITrack>(),
  favorites: {
    artists: new Set<string>(),
    albums: new Set<string>(),
    tracks: new Set<string>(),
  },
};
