import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
  @ApiProperty({ example: 'username' })
  @IsNotEmpty()
  @IsString()
  @Length(3, 16)
  username: string

  @ApiProperty({ example: 'email@email.com' })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string

  @ApiProperty({ example: 'pass1234' })
  @IsNotEmpty()
  @IsString()
  @Length(6)
  password: string
}

export class CreateUserOutputDto {
  @ApiProperty({ example: '680412a0-d720-4163-88dc-14858b2b7963' })
  id: string

  @ApiProperty({ example: 'username' })
  username: string

  @ApiProperty({ example: 'email@email.com' })
  email: string

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date
}
