import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
export declare class OrdersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: CreateOrderDto): Promise<{
        message: string;
        order: {
            id: number;
            quantity: number;
            totalPrice: number;
            createdAt: Date;
            userId: number;
            menuId: number;
        };
    }>;
    findAll(): Promise<({
        user: {
            id: number;
            email: string;
            name: string;
            password: string;
            role: import("@prisma/client").$Enums.Role;
        };
        menu: {
            id: number;
            name: string;
            price: number;
            stock: number;
            categoryId: number;
        };
        payment: {
            id: number;
            orderId: number;
            paymentMethod: string;
            paymentStatus: string;
        } | null;
    } & {
        id: number;
        quantity: number;
        totalPrice: number;
        createdAt: Date;
        userId: number;
        menuId: number;
    })[]>;
    findOne(id: number): Promise<{
        user: {
            id: number;
            email: string;
            name: string;
            password: string;
            role: import("@prisma/client").$Enums.Role;
        };
        menu: {
            id: number;
            name: string;
            price: number;
            stock: number;
            categoryId: number;
        };
        payment: {
            id: number;
            orderId: number;
            paymentMethod: string;
            paymentStatus: string;
        } | null;
    } & {
        id: number;
        quantity: number;
        totalPrice: number;
        createdAt: Date;
        userId: number;
        menuId: number;
    }>;
    update(id: number, data: UpdateOrderDto): Promise<{
        id: number;
        quantity: number;
        totalPrice: number;
        createdAt: Date;
        userId: number;
        menuId: number;
    }>;
    delete(id: number): Promise<{
        message: string;
        data: {
            id: number;
        };
    }>;
}
