import { IsNotEmpty, IsString, Length } from 'class-validator'

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 16)
  username: string

  @IsNotEmpty()
  @IsString()
  @Length(6)
  password: string
}
