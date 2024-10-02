import { Controller, Body, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginResponseDTO } from './dto/login-response.dto';
import { LoginUserDTO } from './dto/login-user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOkResponse({
    status: 200,
    description: 'Login user',
    type: () => LoginResponseDTO,
  })
  @Post('/login')
  async loginUser(@Body() body: LoginUserDTO): Promise<LoginResponseDTO> {
    return this.authService.loginUser(body);
  }
}
