import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    type: String,
    format: 'uuid',
    example: 'b9e073d9-e98c-4816-b20e-59280d933aa4',
  })
  @IsString()
  id: string;

  @Column('text')
  @IsString()
  password?: string;

  @Column('text')
  @ApiProperty({
    type: String,
    example: 'TestUser',
  })
  @IsNotEmpty()
  @IsString()
  login: string;

  @Column('int')
  @ApiProperty({
    type: Number,
    example: '1',
  })
  @IsNumber()
  version: number;

  @Column('bigint')
  @ApiProperty({
    type: Number,
    example: '1655000000',
  })
  @IsNumber()
  createdAt: number;

  @Column('bigint')
  @ApiProperty({
    type: Number,
    example: '1655000000',
  })
  @IsNumber()
  updatedAt: number;
}

export class CreateUserDto {
  @ApiProperty({
    type: String,
    example: 'TestUser',
  })
  @IsNotEmpty()
  @IsString()
  readonly login: string;

  @ApiProperty({
    type: String,
    example: 'Pass12345',
  })
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}

export class UpdatePasswordDto {
  @ApiProperty({
    type: String,
    example: 'oldPass12345',
  })
  @IsNotEmpty()
  @IsString()
  readonly oldPassword: string;

  @ApiProperty({
    type: String,
    example: 'NewPass12345',
  })
  @IsNotEmpty()
  @IsString()
  readonly newPassword: string;
}
