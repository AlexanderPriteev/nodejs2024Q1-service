import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Artist {
  @ApiProperty({
    type: String,
    format: 'uuid',
    example: 'b9e073d9-e98c-4816-b20e-59280d933aa4',
  })
  @IsString()
  id: string;

  @ApiProperty({
    type: String,
    example: 'Freddie Mercury',
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: Boolean,
    example: false,
  })
  @IsBoolean()
  grammy: boolean;
}

export class CreateArtistDto {
  @ApiProperty({
    type: String,
    example: 'Freddie Mercury',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: Boolean,
    example: false,
  })
  @IsBoolean()
  grammy: boolean;
}

export class UpdateArtistDto {
  @ApiProperty({
    type: String,
    example: 'Freddie Mercury',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    type: Boolean,
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  grammy?: boolean;
}
