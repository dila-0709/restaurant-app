import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
export declare class PaymentsController {
    private paymentsService;
    constructor(paymentsService: PaymentsService);
    create(body: CreatePaymentDto): Promise<{
        message: string;
        payment: {
            id: number;
            orderId: number;
            paymentMethod: string;
            paymentStatus: string;
        };
    }>;
    findAll(): Promise<({
        order: {
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
        } & {
            id: number;
            quantity: number;
            totalPrice: number;
            createdAt: Date;
            userId: number;
            menuId: number;
        };
    } & {
        id: number;
        orderId: number;
        paymentMethod: string;
        paymentStatus: string;
    })[]>;
    findOne(id: string): Promise<{
        order: {
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
        } & {
            id: number;
            quantity: number;
            totalPrice: number;
            createdAt: Date;
            userId: number;
            menuId: number;
        };
    } & {
        id: number;
        orderId: number;
        paymentMethod: string;
        paymentStatus: string;
    }>;
    update(id: string, body: UpdatePaymentDto): Promise<{
        id: number;
        orderId: number;
        paymentMethod: string;
        paymentStatus: string;
    }>;
    delete(id: string): Promise<{
        message: string;
        data: {
            id: number;
        };
    }>;
}
