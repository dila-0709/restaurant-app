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
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let PaymentsService = class PaymentsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const order = await this.prisma.order.findUnique({
            where: { id: data.orderId },
        });
        if (!order) {
            throw new common_1.NotFoundException('Order tidak ditemukan');
        }
        const existingPayment = await this.prisma.payment.findUnique({
            where: { orderId: data.orderId },
        });
        if (existingPayment) {
            throw new common_1.BadRequestException('Order sudah dibayar');
        }
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
    async findOne(id) {
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
            throw new common_1.NotFoundException('Payment tidak ditemukan');
        }
        return payment;
    }
    async update(id, data) {
        const payment = await this.prisma.payment.findUnique({
            where: { id },
        });
        if (!payment) {
            throw new common_1.NotFoundException('Payment tidak ditemukan');
        }
        return this.prisma.payment.update({
            where: { id },
            data: {
                paymentMethod: data.paymentMethod,
                paymentStatus: data.paymentStatus,
            },
        });
    }
    async delete(id) {
        const payment = await this.prisma.payment.findUnique({
            where: { id },
        });
        if (!payment) {
            throw new common_1.NotFoundException('Payment tidak ditemukan');
        }
        await this.prisma.payment.delete({
            where: { id },
        });
        return {
            message: 'Payment berhasil dihapus',
            data: { id },
        };
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map