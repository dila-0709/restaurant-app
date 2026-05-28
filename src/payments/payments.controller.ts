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

import { PaymentsService } from './payments.service';

import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { RolesGuard } from '../auth/guards/roles.guard';

import { Roles } from '../auth/decorators/roles.decorator';

import { Role } from '@prisma/client';

@ApiTags('Payments')
@ApiBearerAuth()

@Controller('payments')
export class PaymentsController {

  constructor(
    private paymentsService: PaymentsService,
  ) {}

  // ADMIN & KASIR
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )

  @Roles(
    Role.ADMIN,
    Role.KASIR,
  )

  @Post()

  @ApiOperation({
    summary: 'Membuat pembayaran',
  })

  create(@Body() body: CreatePaymentDto) {

    return this.paymentsService.create(body);

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
    summary: 'Melihat semua pembayaran',
  })

  findAll() {

    return this.paymentsService.findAll();

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
    summary: 'Melihat detail pembayaran',
  })

  findOne(@Param('id') id: string) {

    return this.paymentsService.findOne(
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
    summary: 'Update pembayaran (ADMIN only)',
  })

  update(
    @Param('id') id: string,
    @Body() body: UpdatePaymentDto,
  ) {

    return this.paymentsService.update(
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
    summary: 'Hapus pembayaran (ADMIN only)',
  })

  delete(@Param('id') id: string) {

    return this.paymentsService.delete(
      Number(id),
    );

  }
}
