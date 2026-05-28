import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(body: RegisterDto): Promise<{
        message: string;
        user: {
            id: number;
            name: string;
            email: string;
            role: import("@prisma/client").$Enums.Role;
        };
    }>;
    login(body: LoginDto): Promise<{
        message: string;
        token: string;
        user: {
            id: number;
            email: string;
            role: import("@prisma/client").$Enums.Role;
        };
    }>;
}
