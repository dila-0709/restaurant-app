import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';

import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
} from '@nestjs/swagger';

import { UsersService } from './users.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { RolesGuard } from '../auth/guards/roles.guard';

import { Roles } from '../auth/decorators/roles.decorator';

import { Role } from '@prisma/client';

@ApiTags('Users')
@ApiBearerAuth()

@Controller('users')
export class UsersController {

  constructor(
    private usersService: UsersService,
  ) {}

  // ADMIN ONLY
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )

  @Roles(Role.ADMIN)

  @Post()

  @ApiOperation({
    summary: 'Tambah user (ADMIN only)',
  })

  create(@Body() body: CreateUserDto) {

    return this.usersService.create(body);

  }

  // ADMIN ONLY
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )

  @Roles(Role.ADMIN)

  @Get()

  @ApiOperation({
    summary: 'Melihat semua user',
  })

  findAll() {

    return this.usersService.findAll();

  }

  // ADMIN ONLY
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )

  @Roles(Role.ADMIN)

  @Get(':id')

  @ApiOperation({
    summary: 'Melihat detail user',
  })

  findOne(@Param('id') id: string) {

    return this.usersService.findOne(
      Number(id),
    );

  }

  // ADMIN ONLY
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )

  @Roles(Role.ADMIN)

  @Put(':id')

  @ApiOperation({
    summary: 'Update user (ADMIN only)',
  })

  update(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
  ) {

    return this.usersService.update(
      Number(id),
      body,
    );

  }

  // ADMIN ONLY
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )

  @Roles(Role.ADMIN)

  @Delete(':id')

  @ApiOperation({
    summary: 'Hapus user (ADMIN only)',
  })

  delete(@Param('id') id: string) {

    return this.usersService.delete(
      Number(id),
    );

  }
}
