import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Track {
  @ApiProperty({
    type: String,
    format: 'uuid',
    example: 'b9e073d9-e98c-4816-b20e-59280d933aa4',
  })
  @IsString()
  id: string;

  @ApiProperty({
    type: String,
    example: 'The Show Must Go On',
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    format: 'uuid',
    nullable: true,
    example: 'b9e073d9-e98c-4816-b20e-59280d933aa4',
  })
  @IsString()
  artistId: string | null;

  @ApiProperty({
    type: String,
    format: 'uuid',
    nullable: true,
    example: 'b9e073d9-e98c-4816-b20e-59280d933aa4',
  })
  @IsString()
  albumId: string | null;

  @ApiProperty({
    type: Number,
    description: 'In seconds',
    example: 262,
  })
  @IsNumber()
  duration: number;
}

export class CreateTrackDto {
  @ApiProperty({
    type: String,
    example: 'The Show Must Go On',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    format: 'uuid',
    nullable: true,
    example: 'b9e073d9-e98c-4816-b20e-59280d933aa4',
  })
  @IsOptional()
  @IsString()
  artistId: string | null;

  @ApiProperty({
    type: String,
    format: 'uuid',
    nullable: true,
    example: 'b9e073d9-e98c-4816-b20e-59280d933aa4',
  })
  @IsOptional()
  @IsString()
  albumId: string | null;

  @ApiProperty({
    type: Number,
    description: 'In seconds',
    example: 262,
  })
  @IsNumber()
  duration: number;
}

export class UpdateTrackDto {
  @ApiProperty({
    type: String,
    example: 'The Show Must Go On',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    type: String,
    format: 'uuid',
    nullable: true,
    example: 'b9e073d9-e98c-4816-b20e-59280d933aa4',
  })
  @IsOptional()
  @IsString()
  artistId?: string | null;

  @ApiProperty({
    type: String,
    format: 'uuid',
    nullable: true,
    example: 'b9e073d9-e98c-4816-b20e-59280d933aa4',
  })
  @IsOptional()
  @IsString()
  albumId?: string | null;

  @ApiProperty({
    type: Number,
    description: 'In seconds',
    example: 262,
  })
  @IsOptional()
  @IsNumber()
  duration?: number;
}
