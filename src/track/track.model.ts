import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Artist } from '../artist/artist.model';
import { Album } from '../album/album.model';

@Entity()
export class Track {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    type: String,
    format: 'uuid',
    example: 'b9e073d9-e98c-4816-b20e-59280d933aa4',
  })
  @IsString()
  id: string;

  @Column('text')
  @ApiProperty({
    type: String,
    example: 'The Show Must Go On',
  })
  @IsString()
  name: string;

  @Column('uuid', { nullable: true })
  @ApiProperty({
    type: String,
    format: 'uuid',
    nullable: true,
    example: 'b9e073d9-e98c-4816-b20e-59280d933aa4',
  })
  @IsString()
  artistId: string | null;

  @Column('uuid', { nullable: true })
  @ApiProperty({
    type: String,
    format: 'uuid',
    nullable: true,
    example: 'b9e073d9-e98c-4816-b20e-59280d933aa4',
  })
  @IsString()
  albumId: string | null;

  @Column('int')
  @ApiProperty({
    type: Number,
    description: 'In seconds',
    example: 262,
  })
  @IsNumber()
  duration: number;

  @ManyToOne(() => Artist, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'artistId' })
  artist?: Artist;

  @ManyToOne(() => Album, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'albumId' })
  album?: Album;
}

export class CreateTrackDto {
  @ApiProperty({
    type: String,
    example: 'The Show Must Go On',
  })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({
    type: String,
    format: 'uuid',
    nullable: true,
    example: 'b9e073d9-e98c-4816-b20e-59280d933aa4',
  })
  @IsOptional()
  @IsString()
  readonly artistId: string | null;

  @ApiProperty({
    type: String,
    format: 'uuid',
    nullable: true,
    example: 'b9e073d9-e98c-4816-b20e-59280d933aa4',
  })
  @IsOptional()
  @IsString()
  readonly albumId: string | null;

  @ApiProperty({
    type: Number,
    description: 'In seconds',
    example: 262,
  })
  @IsNumber()
  readonly duration: number;
}

export class UpdateTrackDto {
  @ApiProperty({
    type: String,
    example: 'The Show Must Go On',
  })
  @IsOptional()
  @IsString()
  readonly name?: string;

  @ApiProperty({
    type: String,
    format: 'uuid',
    nullable: true,
    example: 'b9e073d9-e98c-4816-b20e-59280d933aa4',
  })
  @IsOptional()
  @IsString()
  readonly artistId?: string | null;

  @ApiProperty({
    type: String,
    format: 'uuid',
    nullable: true,
    example: 'b9e073d9-e98c-4816-b20e-59280d933aa4',
  })
  @IsOptional()
  @IsString()
  readonly albumId?: string | null;

  @ApiProperty({
    type: Number,
    description: 'In seconds',
    example: 262,
  })
  @IsOptional()
  @IsNumber()
  readonly duration?: number;
}
