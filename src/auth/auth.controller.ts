import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';

import {
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';

import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@ApiTags('Auth')

@Controller('auth')
export class AuthController {

  constructor(
    private authService: AuthService,
  ) {}

  @Post('register')

  @ApiOperation({
    summary: 'Register user',
  })

  register(@Body() body: RegisterDto) {

    return this.authService.register(body);

  }

  @Post('login')

  @ApiOperation({
    summary: 'Login user dan mendapatkan JWT token',
  })

  login(@Body() body: LoginDto) {

    return this.authService.login(body);

  }
}
