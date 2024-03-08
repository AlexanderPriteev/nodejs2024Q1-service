import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({
    type: String,
    format: 'uuid',
    example: 'b9e073d9-e98c-4816-b20e-59280d933aa4',
  })
  @IsString()
  id: string;

  @IsString()
  password?: string;

  @ApiProperty({
    type: String,
    example: 'TestUser',
  })
  @IsNotEmpty()
  @IsString()
  login: string;

  @ApiProperty({
    type: Number,
    example: '1',
  })
  @IsNumber()
  version: number;

  @ApiProperty({
    type: Number,
    example: '1655000000',
  })
  @IsNumber()
  createdAt: number;

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
  login: string;

  @ApiProperty({
    type: String,
    example: 'Pass12345',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class UpdatePasswordDto {
  @ApiProperty({
    type: String,
    example: 'oldPass12345',
  })
  @IsNotEmpty()
  @IsString()
  oldPassword: string;

  @ApiProperty({
    type: String,
    example: 'NewPass12345',
  })
  @IsNotEmpty()
  @IsString()
  newPassword: string;
}
