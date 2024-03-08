import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class MCreateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  artistId: string | null;

  @IsOptional()
  @IsString()
  albumId: string | null;

  @IsNumber()
  duration: number;
}

export class MUpdateTrackDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  artistId?: string | null;

  @IsOptional()
  @IsString()
  albumId?: string | null;

  @IsOptional()
  @IsNumber()
  duration?: number;
}
