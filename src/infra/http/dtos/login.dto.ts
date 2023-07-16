import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, Length } from 'class-validator'

export class LoginDto {
  @ApiProperty({ example: 'username' })
  @IsNotEmpty()
  @IsString()
  @Length(3, 16)
  username: string

  @ApiProperty({ example: 'pass1234' })
  @IsNotEmpty()
  @IsString()
  @Length(6)
  password: string
}

export class LoginOutputDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  })
  accessToken: string
}
