import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateCategoryDto } from './dto/create-category.dto';

import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {

  constructor(
    private prisma: PrismaService,
  ) {}

  async create(data: CreateCategoryDto) {

    return this.prisma.category.create({
      data: {
        name: data.name,
      },
    });

  }

  async findAll() {

    return this.prisma.category.findMany();

  }

  async findOne(id: number) {

    return this.prisma.category.findUnique({
      where: { id },
    });

  }

  async update(
    id: number,
    data: UpdateCategoryDto,
  ) {

    const category =
      await this.prisma.category.findUnique({
        where: { id },
      });

    if (!category) {

      throw new NotFoundException(
        'Category tidak ditemukan',
      );

    }

    return this.prisma.category.update({
      where: { id },

      data: {
        name: data.name,
      },
    });

  }

  async delete(id: number) {

    const category =
      await this.prisma.category.findUnique({
        where: { id },
      });

    if (!category) {

      throw new NotFoundException(
        'Category tidak ditemukan',
      );

    }

    return this.prisma.category.delete({
      where: { id },
    });

  }

}
