import { Track } from '../track/track.model';
import { User } from '../user/user.model';
import { Album } from '../album/album.model';
import { Artist } from '../artist/artist.model';

export interface IDB {
  users: Map<string, User>;
  artists: Map<string, Artist>;
  albums: Map<string, Album>;
  tracks: Map<string, Track>;
  favorites: {
    artists: Set<string>;
    albums: Set<string>;
    tracks: Set<string>;
  };
}
