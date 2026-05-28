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

import { CategoriesService } from './categories.service';

import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { RolesGuard } from '../auth/guards/roles.guard';

import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Categories')
@ApiBearerAuth()

@Controller('categories')
export class CategoriesController {

  constructor(
    private categoriesService: CategoriesService,
  ) {}

  // ADMIN ONLY
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )

  @Roles('ADMIN')

  @Post()

  @ApiOperation({
    summary: 'Menambahkan category (ADMIN only)',
  })

  create(@Body() body: CreateCategoryDto) {

    return this.categoriesService.create(body);

  }

  // SEMUA USER LOGIN BISA LIHAT CATEGORY
  @UseGuards(JwtAuthGuard)

  @Get()

  @ApiOperation({
    summary: 'Menampilkan semua category',
  })

  findAll() {

    return this.categoriesService.findAll();

  }

  // SEMUA USER LOGIN BISA LIHAT DETAIL
  @UseGuards(JwtAuthGuard)

  @Get(':id')

  @ApiOperation({
    summary: 'Menampilkan detail category',
  })

  findOne(@Param('id') id: string) {

    return this.categoriesService.findOne(
      Number(id),
    );

  }

  // ADMIN ONLY
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )

  @Roles('ADMIN')

  @Put(':id')

  @ApiOperation({
    summary: 'Update category (ADMIN only)',
  })

  update(
    @Param('id') id: string,
    @Body() body: UpdateCategoryDto,
  ) {

    return this.categoriesService.update(
      Number(id),
      body,
    );

  }

  // ADMIN ONLY
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )

  @Roles('ADMIN')

  @Delete(':id')

  @ApiOperation({
    summary: 'Hapus category (ADMIN only)',
  })

  delete(@Param('id') id: string) {

    return this.categoriesService.delete(
      Number(id),
    );

  }
}
