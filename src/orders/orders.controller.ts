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

import { OrdersService } from './orders.service';

import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { RolesGuard } from '../auth/guards/roles.guard';

import { Roles } from '../auth/decorators/roles.decorator';

import { Role } from '@prisma/client';

@ApiTags('Orders')
@ApiBearerAuth()

@Controller('orders')
export class OrdersController {

  constructor(
    private ordersService: OrdersService,
  ) {}

  // CUSTOMER ONLY
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )

  @Roles(Role.CUSTOMER)

  @Post()

  @ApiOperation({
    summary: 'Customer membuat order',
  })

  create(@Body() body: CreateOrderDto) {

    return this.ordersService.create(body);

  }

  // ADMIN & KASIR
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )

  @Roles(
    Role.ADMIN,
    Role.KASIR,
  )

  @Get()

  @ApiOperation({
    summary: 'Melihat semua order',
  })

  findAll() {

    return this.ordersService.findAll();

  }

  // ADMIN & KASIR
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )

  @Roles(
    Role.ADMIN,
    Role.KASIR,
  )

  @Get(':id')

  @ApiOperation({
    summary: 'Melihat detail order',
  })

  findOne(@Param('id') id: string) {

    return this.ordersService.findOne(
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
    summary: 'Update order (ADMIN only)',
  })

  update(
    @Param('id') id: string,
    @Body() body: UpdateOrderDto,
  ) {

    return this.ordersService.update(
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
    summary: 'Hapus order (ADMIN only)',
  })

  delete(@Param('id') id: string) {

    return this.ordersService.delete(
      Number(id),
    );

  }
}
