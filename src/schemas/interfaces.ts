export interface IUser {
  id: string;
  login: string;
  password?: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

export interface ICreateUserDto {
  login: string;
  password: string;
}

export interface IUpdatePasswordDto {
  oldPassword: string;
  newPassword: string;
}

export interface IArtist {
  id: string;
  name: string;
  grammy: boolean;
}

export interface ICreateArtistDto {
  name: string;
  grammy: boolean;
}

export interface IUpdateArtistDto {
  name?: string;
  grammy?: boolean;
}

export interface ITrack {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}

export interface ICreateTrackDto {
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}

export interface IUpdateTrackDto {
  name?: string;
  artistId?: string | null;
  albumId?: string | null;
  duration?: number;
}

export interface IAlbum {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
}

export interface ICreateAlbumDto {
  name: string;
  year: number;
  artistId: string | null;
}

export interface IUpdateAlbumDto {
  name?: string;
  year?: number;
  artistId?: string | null;
}

export interface IFavoritesResponse {
  artists: IArtist[];
  albums: IAlbum[];
  tracks: ITrack[];
}

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
