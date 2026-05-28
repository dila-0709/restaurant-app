import { PrismaService } from '../prisma/prisma.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
export declare class MenuService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: CreateMenuDto): Promise<{
        id: number;
        name: string;
        price: number;
        stock: number;
        categoryId: number;
    }>;
    findAll(): Promise<({
        category: {
            id: number;
            name: string;
        };
    } & {
        id: number;
        name: string;
        price: number;
        stock: number;
        categoryId: number;
    })[]>;
    findOne(id: number): Promise<{
        category: {
            id: number;
            name: string;
        };
    } & {
        id: number;
        name: string;
        price: number;
        stock: number;
        categoryId: number;
    }>;
    update(id: number, data: UpdateMenuDto): Promise<{
        id: number;
        name: string;
        price: number;
        stock: number;
        categoryId: number;
    }>;
    delete(id: number): Promise<{
        id: number;
        name: string;
        price: number;
        stock: number;
        categoryId: number;
    }>;
}
