import { IUser } from '../../user/schemas/user.interface';
import { IArtist } from '../../artist/schemas/artist.interface';
import { IAlbum } from '../../album/schemas/album.interface';
import { ITrack } from '../../track/schemas/track.interface';

export interface IDB {
  users: Map<string, IUser>;
  artists: Map<string, IArtist>;
  albums: Map<string, IAlbum>;
  tracks: Map<string, ITrack>;
  favorites: {
    artists: Set<string>;
    albums: Set<string>;
    tracks: Set<string>;
  };
}
