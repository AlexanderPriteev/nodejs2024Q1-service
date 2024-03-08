import { IArtist } from '../../artist/schemas/artist.interface';
import { IAlbum } from '../../album/schemas/album.interface';
import { ITrack } from '../../track/schemas/track.interface';

export interface IFavoritesResponse {
  artists: IArtist[];
  albums: IAlbum[];
  tracks: ITrack[];
}
