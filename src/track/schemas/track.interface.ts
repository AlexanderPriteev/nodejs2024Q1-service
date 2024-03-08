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
