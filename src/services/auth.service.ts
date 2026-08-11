import { prisma } from '../config/prisma.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import { generateTokens } from '../utils/jwt.js';
import type { RegisterInput, LoginInput } from '../schemas/auth.schema.js';

export class AuthService {
    // Lógica de Registro
    static async register(data: RegisterInput) {
        // 1. Verificar si el correo ya existe
        const existingUser = await prisma.user.findUnique({
            where: { email: data.email }
        });

        if (existingUser) {
            throw new Error('El correo electrónico ya está registrado');
        }

        // 2. Hashear la contraseña
        const hashedPassword = await hashPassword(data.password);

        // 3. Crear el usuario en la BD
        const user = await prisma.user.create({
            data: {
                email: data.email,
                password: hashedPassword,
                firstName: data.firstName,
                lastName: data.lastName
            }
        });

        // 4. Generar tokens JWT
        const tokens = generateTokens({ userId: user.id, role: user.role });

        // 5. Guardar el Refresh Token en la BD
        await prisma.user.update({
            where: { id: user.id },
            data: { refreshToken: tokens.refreshToken }
        });

        return {
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role
            },
            ...tokens
        };
    }

    // Lógica de Login
    static async login(data: LoginInput) {
        // 1. Buscar al usuario por email
        const user = await prisma.user.findUnique({
            where: { email: data.email }
        });

        if (!user || !user.isActive) {
            throw new Error('Credenciales inválidas');
        }

        // 2. Comparar contraseñas
        const isValidPassword = await comparePassword(data.password, user.password);
        if (!isValidPassword) {
            throw new Error('Credenciales inválidas');
        }

        // 3. Generar nuevos tokens
        const tokens = generateTokens({ userId: user.id, role: user.role });

        // 4. Actualizar el Refresh Token en la BD
        await prisma.user.update({
            where: { id: user.id },
            data: { refreshToken: tokens.refreshToken }
        });

        return {
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role
            },
            ...tokens
        };
    }
}


