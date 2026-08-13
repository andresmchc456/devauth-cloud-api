// import { Request, Response } from 'express';
import type { Request, Response } from 'express';
import { AuthService } from '../services/auth.service.js';
import { RegisterSchema, LoginSchema } from '../schemas/auth.schema.js';
import type { AuthRequest } from '../middlewares/auth.middleware.js';

export class AuthController {
    static async register(req: Request, res: Response) {
        try {
            // Validar datos de entrada con Zod
            const validatedData = RegisterSchema.parse(req.body);
            const result = await AuthService.register(validatedData);

            return res.status(201).json({
                message: 'Usuario registrado exitosamente',
                data: result,
            });
        } catch (error: any) {
            if (error.name === 'ZodError') {
                return res
                    .status(400)
                    .json({ error: 'Errores de validación', details: error.issues || error.errors });
            }
            return res
                .status(400)
                .json({ error: error.message || 'Error en el servidor' });
        }
    }

    static async login(req: Request, res: Response) {
        try {
            // Validar datos de entrada con Zod 
            const validatedData = LoginSchema.parse(req.body);
            const result = await AuthService.login(validatedData);

            return res.status(200).json({
                message: 'Inicio de sesión exitoso',
                data: result,
            });
        } catch (error: any) {
            if (error.name === 'ZodError') {
                return res
                    .status(400)
                    .json({ error: 'Errores de validación', details: error.issues || error.errors });
            }
            return res
                .status(400)
                .json({ error: error.message || 'Credenciales incorrectas' });
        }
    }

    static async profile(req: AuthRequest, res: Response) {
        return res.status(200).json({
            message: 'Acceso autorizado al perfil',
            user: req.user,
        });
    }
}