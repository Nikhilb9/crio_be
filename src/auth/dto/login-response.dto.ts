import { ApiProperty } from '@nestjs/swagger';

import { LoginResponse, LoginUser } from '../interface/internal.interface';
import { UserRole } from '../enum/user-role.enum';

export class LoginResponseDTO implements LoginResponse {
  @ApiProperty({ description: 'User toke' })
  token: string;

  @ApiProperty({ description: 'user role' })
  role: UserRole;
}
