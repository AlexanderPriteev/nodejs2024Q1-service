import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class MCreateArtistDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsBoolean()
  grammy: boolean;
}

export class MUpdateArtistDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsBoolean()
  grammy?: boolean;
}
