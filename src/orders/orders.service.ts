import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  // ======================
  // CREATE ORDER
  // ======================
  async create(data: CreateOrderDto) {
    const menu = await this.prisma.menu.findUnique({
      where: { id: data.menuId },
    });

    if (!menu) {
      throw new NotFoundException('Menu tidak ditemukan');
    }

    if (menu.stock < data.quantity) {
      throw new BadRequestException('Stock menu tidak cukup');
    }

    const totalPrice = menu.price * data.quantity;

    const order = await this.prisma.order.create({
      data: {
        userId: data.userId,
        menuId: data.menuId,
        quantity: data.quantity,
        totalPrice,
      },
    });

    // 🔥 KURANGI STOCK
    await this.prisma.menu.update({
      where: { id: data.menuId },
      data: {
        stock: menu.stock - data.quantity,
      },
    });

    return {
      message: 'Order berhasil dibuat',
      order,
    };
  }

  // ======================
  // GET ALL
  // ======================
  async findAll() {
    return this.prisma.order.findMany({
      include: {
        user: true,
        menu: true,
        payment: true,
      },
    });
  }

  // ======================
  // GET ONE
  // ======================
  async findOne(id: number) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        user: true,
        menu: true,
        payment: true,
      },
    });

    if (!order) {
      throw new NotFoundException('Order tidak ditemukan');
    }

    return order;
  }

  // ======================
  // UPDATE ORDER
  // ======================
  async update(id: number, data: UpdateOrderDto) {
    const order = await this.prisma.order.findUnique({
      where: { id },
    });

    if (!order) {
      throw new NotFoundException('Order tidak ditemukan');
    }

    return this.prisma.order.update({
      where: { id },
      data: {
        quantity: data.quantity,
      },
    });
  }

  // ======================
  // DELETE ORDER (FIX + RESTORE STOCK)
  // ======================
  async delete(id: number) {
    const order = await this.prisma.order.findUnique({
      where: { id },
    });

    if (!order) {
      throw new NotFoundException('Order tidak ditemukan');
    }

    // 🔥 AMBIL MENU
    const menu = await this.prisma.menu.findUnique({
      where: { id: order.menuId },
    });

    // 🔥 BALIKKAN STOCK
    if (menu) {
      await this.prisma.menu.update({
        where: { id: order.menuId },
        data: {
          stock: menu.stock + order.quantity,
        },
      });
    }

    // 🔥 HAPUS PAYMENT DULU
    await this.prisma.payment.deleteMany({
      where: { orderId: id },
    });

    // 🔥 HAPUS ORDER
    await this.prisma.order.delete({
      where: { id },
    });

    return {
      message: 'Order berhasil dihapus dan stock dikembalikan',
      data: { id },
    };
  }
}
