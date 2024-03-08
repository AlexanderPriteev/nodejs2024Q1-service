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
