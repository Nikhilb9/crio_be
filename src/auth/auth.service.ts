import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDTOI, LoginResponse } from './interface/internal.interface';
import { AuthRepositoryService } from './auth.repository.service';
import { UserRole } from './enum/user-role.enum';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(
    private readonly repoService: AuthRepositoryService,
    private readonly jwtService: JwtService,
  ) {
    this.registerUser();
  }
  async loginUser(data: CreateUserDTOI): Promise<LoginResponse> {
    const isExist = await this.repoService.getUserByEmail(data.email);
    if (!isExist) {
      throw new UnauthorizedException('User not found');
    }
    const isMatch = await bcrypt.compare(data.password, isExist.password);

    if (!isMatch) {
      throw new BadRequestException('Wrong password');
    }
    const payload = {
      sub: isExist._id.toString(),
      email: isExist.email,
      role: isExist.role,
    };

    return {
      token: await this.jwtService.signAsync(payload),
      role: isExist.role,
    };
  }

  async registerUser(): Promise<void> {
    const users = await this.repoService.getAllUsers();
    if (!users.length) {
      const password = '12345';
      const hash = await bcrypt.hash(password, 8);

      const user = [
        {
          email: 'n@gmail.com',
          role: UserRole.ADMIN,
          password: hash,
        },
        {
          email: 'ni@gmail.com',
          role: UserRole.USER,
          password: hash,
        },
        {
          email: 'nik@gmail.com',
          role: UserRole.USER,
          password: hash,
        },
        {
          email: 'nikh@gmail.com',
          role: UserRole.USER,
          password: hash,
        },
        {
          email: 'nikhi@gmail.com',
          role: UserRole.USER,
          password: hash,
        },
        {
          email: 'nikhil@gmail.com',
          role: UserRole.USER,
          password: hash,
        },
      ];
      await this.repoService.createManyUser(user);
    }
  }
}
