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
