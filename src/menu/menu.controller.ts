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

import { MenuService } from './menu.service';

import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { RolesGuard } from '../auth/guards/roles.guard';

import { Roles } from '../auth/decorators/roles.decorator';

import { Role } from '@prisma/client';

@ApiTags('Menu')
@ApiBearerAuth()

@Controller('menu')
export class MenuController {

  constructor(
    private menuService: MenuService,
  ) {}

  // ADMIN ONLY
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )

  @Roles(Role.ADMIN)

  @Post()

  @ApiOperation({
    summary: 'Tambah menu (ADMIN only)',
  })

  create(@Body() body: CreateMenuDto) {

    return this.menuService.create(body);

  }

  // SEMUA USER LOGIN
  @UseGuards(JwtAuthGuard)

  @Get()

  @ApiOperation({
    summary: 'Menampilkan semua menu',
  })

  findAll() {

    return this.menuService.findAll();

  }

  // SEMUA USER LOGIN
  @UseGuards(JwtAuthGuard)

  @Get(':id')

  @ApiOperation({
    summary: 'Menampilkan detail menu',
  })

  findOne(@Param('id') id: string) {

    return this.menuService.findOne(
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
    summary: 'Update menu (ADMIN only)',
  })

  update(
    @Param('id') id: string,
    @Body() body: UpdateMenuDto,
  ) {

    return this.menuService.update(
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
    summary: 'Hapus menu (ADMIN only)',
  })

  delete(@Param('id') id: string) {

    return this.menuService.delete(
      Number(id),
    );

  }
}
