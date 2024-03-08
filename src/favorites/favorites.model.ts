import { ApiProperty } from '@nestjs/swagger';
import { Artist } from '../artist/artist.model';
import { Album } from '../album/album.model';
import { Track } from '../track/track.model';

export class FavoritesResponse {
  @ApiProperty({
    type: [Artist],
    example: [
      {
        id: 'b9e073d9-e98c-4816-b20e-59280d933aa4',
        name: 'Freddie Mercury',
        grammy: false,
      },
    ],
  })
  artists: Artist[];

  @ApiProperty({
    type: [Album],
    example: [
      {
        id: 'b9e073d9-e98c-4816-b20e-59280d933aa4',
        name: 'Innuendo',
        year: 1991,
        artistId: null,
      },
    ],
  })
  albums: Album[];

  @ApiProperty({
    type: [Track],
    example: [
      {
        id: 'b9e073d9-e98c-4816-b20e-59280d933aa4',
        name: 'The Show Must Go On',
        year: 1991,
        artistId: null,
        albumId: null,
        duration: 262,
      },
    ],
  })
  tracks: Track[];
}
