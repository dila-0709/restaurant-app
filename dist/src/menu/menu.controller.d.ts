import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
export declare class MenuController {
    private menuService;
    constructor(menuService: MenuService);
    create(body: CreateMenuDto): Promise<{
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
    findOne(id: string): Promise<{
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
    update(id: string, body: UpdateMenuDto): Promise<{
        id: number;
        name: string;
        price: number;
        stock: number;
        categoryId: number;
    }>;
    delete(id: string): Promise<{
        id: number;
        name: string;
        price: number;
        stock: number;
        categoryId: number;
    }>;
}
