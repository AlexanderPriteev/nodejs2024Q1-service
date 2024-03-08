import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class MCreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNumber()
  year: number;

  @IsOptional()
  @IsString()
  artistId: string | null;
}

export class MUpdateAlbumDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  year?: number;

  @IsOptional()
  @IsString()
  artistId?: string | null;
}
