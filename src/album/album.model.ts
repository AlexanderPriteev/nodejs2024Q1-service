import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Album {
  @ApiProperty({
    type: String,
    format: 'uuid',
    example: 'b9e073d9-e98c-4816-b20e-59280d933aa4',
  })
  @IsString()
  id: string;

  @ApiProperty({
    type: String,
    example: 'Innuendo',
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    example: 1991,
  })
  @IsNumber()
  year: number;

  @ApiProperty({
    type: String,
    format: 'uuid',
    nullable: true,
    example: 'b9e073d9-e98c-4816-b20e-59280d933aa4',
  })
  artistId: string | null;
}

export class CreateAlbumDto {
  @ApiProperty({
    type: String,
    example: 'Innuendo',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    example: 1991,
  })
  @IsNumber()
  year: number;

  @ApiProperty({
    type: String,
    format: 'uuid',
    nullable: true,
    example: 'b9e073d9-e98c-4816-b20e-59280d933aa4',
  })
  @IsOptional()
  @IsString()
  artistId: string | null;
}

export class UpdateAlbumDto {
  @ApiProperty({
    type: String,
    example: 'Innuendo',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    type: String,
    example: 1991,
  })
  @IsOptional()
  @IsNumber()
  year?: number;

  @ApiProperty({
    type: String,
    format: 'uuid',
    nullable: true,
    example: 'b9e073d9-e98c-4816-b20e-59280d933aa4',
  })
  @IsOptional()
  @IsString()
  artistId?: string | null;
}
