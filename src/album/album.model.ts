import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Album {
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
    example: 'Innuendo',
  })
  @IsString()
  name: string;

  @Column('int')
  @ApiProperty({
    type: String,
    example: 1991,
  })
  @IsNumber()
  year: number;

  @Column('uuid', { nullable: true })
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
  readonly name: string;

  @ApiProperty({
    type: String,
    example: 1991,
  })
  @IsNumber()
  readonly year: number;

  @ApiProperty({
    type: String,
    format: 'uuid',
    nullable: true,
    example: 'b9e073d9-e98c-4816-b20e-59280d933aa4',
  })
  @IsOptional()
  @IsString()
  readonly artistId: string | null;
}

export class UpdateAlbumDto {
  @ApiProperty({
    type: String,
    example: 'Innuendo',
  })
  @IsOptional()
  @IsString()
  readonly name?: string;

  @ApiProperty({
    type: String,
    example: 1991,
  })
  @IsOptional()
  @IsNumber()
  readonly year?: number;

  @ApiProperty({
    type: String,
    format: 'uuid',
    nullable: true,
    example: 'b9e073d9-e98c-4816-b20e-59280d933aa4',
  })
  @IsOptional()
  @IsString()
  readonly artistId?: string | null;
}
