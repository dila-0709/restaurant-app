import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  // ======================
  // CREATE PAYMENT
  // ======================
  async create(data: CreatePaymentDto) {
    // cek order
    const order = await this.prisma.order.findUnique({
      where: { id: data.orderId },
    });

    if (!order) {
      throw new NotFoundException('Order tidak ditemukan');
    }

    // cek apakah sudah ada payment
    const existingPayment = await this.prisma.payment.findUnique({
      where: { orderId: data.orderId },
    });

    if (existingPayment) {
      throw new BadRequestException('Order sudah dibayar');
    }

    // buat payment
    const payment = await this.prisma.payment.create({
      data: {
        orderId: data.orderId,
        paymentMethod: data.paymentMethod,
        paymentStatus: data.paymentStatus || 'PAID',
      },
    });

    return {
      message: 'Pembayaran berhasil',
      payment,
    };
  }

  // ======================
  // GET ALL PAYMENT
  // ======================
  async findAll() {
    return this.prisma.payment.findMany({
      include: {
        order: {
          include: {
            user: true,
            menu: true,
          },
        },
      },
    });
  }

  // ======================
  // GET ONE PAYMENT
  // ======================
  async findOne(id: number) {
    const payment = await this.prisma.payment.findUnique({
      where: { id },
      include: {
        order: {
          include: {
            user: true,
            menu: true,
          },
        },
      },
    });

    if (!payment) {
      throw new NotFoundException('Payment tidak ditemukan');
    }

    return payment;
  }

  // ======================
  // UPDATE PAYMENT
  // ======================
  async update(id: number, data: UpdatePaymentDto) {
    const payment = await this.prisma.payment.findUnique({
      where: { id },
    });

    if (!payment) {
      throw new NotFoundException('Payment tidak ditemukan');
    }

    return this.prisma.payment.update({
      where: { id },
      data: {
        paymentMethod: data.paymentMethod,
        paymentStatus: data.paymentStatus,
      },
    });
  }

  // ======================
  // DELETE PAYMENT
  // ======================
  async delete(id: number) {
    const payment = await this.prisma.payment.findUnique({
      where: { id },
    });

    if (!payment) {
      throw new NotFoundException('Payment tidak ditemukan');
    }

    await this.prisma.payment.delete({
      where: { id },
    });

    return {
      message: 'Payment berhasil dihapus',
      data: { id },
    };
  }
}
