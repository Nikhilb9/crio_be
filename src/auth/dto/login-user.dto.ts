import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { CreateUserDTOI } from '../interface/internal.interface';

export class LoginUserDTO implements CreateUserDTOI {
  @ApiProperty({ description: 'User name', required: true })
  @IsString()
  @IsEmail()
  email!: string;

  @ApiProperty({ description: 'User image', required: true })
  @IsString()
  password!: string;
}
