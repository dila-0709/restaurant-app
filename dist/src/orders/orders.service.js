"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let OrdersService = class OrdersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const menu = await this.prisma.menu.findUnique({
            where: { id: data.menuId },
        });
        if (!menu) {
            throw new common_1.NotFoundException('Menu tidak ditemukan');
        }
        if (menu.stock < data.quantity) {
            throw new common_1.BadRequestException('Stock menu tidak cukup');
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
    async findAll() {
        return this.prisma.order.findMany({
            include: {
                user: true,
                menu: true,
                payment: true,
            },
        });
    }
    async findOne(id) {
        const order = await this.prisma.order.findUnique({
            where: { id },
            include: {
                user: true,
                menu: true,
                payment: true,
            },
        });
        if (!order) {
            throw new common_1.NotFoundException('Order tidak ditemukan');
        }
        return order;
    }
    async update(id, data) {
        const order = await this.prisma.order.findUnique({
            where: { id },
        });
        if (!order) {
            throw new common_1.NotFoundException('Order tidak ditemukan');
        }
        return this.prisma.order.update({
            where: { id },
            data: {
                quantity: data.quantity,
            },
        });
    }
    async delete(id) {
        const order = await this.prisma.order.findUnique({
            where: { id },
        });
        if (!order) {
            throw new common_1.NotFoundException('Order tidak ditemukan');
        }
        const menu = await this.prisma.menu.findUnique({
            where: { id: order.menuId },
        });
        if (menu) {
            await this.prisma.menu.update({
                where: { id: order.menuId },
                data: {
                    stock: menu.stock + order.quantity,
                },
            });
        }
        await this.prisma.payment.deleteMany({
            where: { orderId: id },
        });
        await this.prisma.order.delete({
            where: { id },
        });
        return {
            message: 'Order berhasil dihapus dan stock dikembalikan',
            data: { id },
        };
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map