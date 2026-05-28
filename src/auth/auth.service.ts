import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { Role } from '@prisma/client';

@Injectable()
export class AuthService {

  constructor(
    private prisma: PrismaService,

    private jwtService: JwtService,
  ) {}

  async register(data: any) {

    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existingUser) {

      throw new BadRequestException(
        'Email sudah terdaftar',
      );

    }

    const hashedPassword = await bcrypt.hash(
      data.password,
      10,
    );

    const user = await this.prisma.user.create({
      data: {
        name: data.name,

        email: data.email,

        password: hashedPassword,

        role: data.role || Role.CUSTOMER,
      },
    });

    return {
      message: 'Register berhasil',

      user: {
        id: user.id,

        name: user.name,

        email: user.email,

        role: user.role,
      },
    };

  }

  async login(data: any) {

    const user = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) {

      throw new UnauthorizedException(
        'Email salah',
      );

    }

    const isPasswordValid = await bcrypt.compare(
      data.password,
      user.password,
    );

    if (!isPasswordValid) {

      throw new UnauthorizedException(
        'Password salah',
      );

    }

    const payload = {
      id: user.id,

      email: user.email,

      role: user.role,
    };

    const token = await this.jwtService.signAsync(
      payload,
    );

    return {
      message: 'Login berhasil',

      token,

      user: {
        id: user.id,

        email: user.email,

        role: user.role,
      },
    };

  }

}
