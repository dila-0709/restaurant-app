import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
export declare class OrdersController {
    private ordersService;
    constructor(ordersService: OrdersService);
    create(body: CreateOrderDto): Promise<{
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
    findOne(id: string): Promise<{
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
    update(id: string, body: UpdateOrderDto): Promise<{
        id: number;
        quantity: number;
        totalPrice: number;
        createdAt: Date;
        userId: number;
        menuId: number;
    }>;
    delete(id: string): Promise<{
        message: string;
        data: {
            id: number;
        };
    }>;
}
