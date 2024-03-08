import { IAlbum, IArtist, IDB, ITrack, IUser } from '../schemas/interfaces';

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
