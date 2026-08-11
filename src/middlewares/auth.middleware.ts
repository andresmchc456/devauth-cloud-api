import type { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

// Extendemos la interfaz de Express para inyectar los datos del usuario autenticado
export interface AuthRequest extends Request {
    user?: {
        userId: string;
        role: string;
    };
}

export const authenticateJWT = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;
    // Verificamos que exista la cabecera Authorization y empiece con 'Bearer '
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res
            .status(401)
            .json({ error: 'Acceso denegado. Token no proporcionado' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res
            .status(401)
            .json({ error: 'Acceso denegado. Token no proporcionado' });
    }

    try {
        const secret = process.env.JWT_SECRET || 'fallback_secret';
        const decoded = jwt.verify(token, secret) as unknown as {
            userId: string;
            role: string;
        };

        // Inyectamos la información del usuario en el request
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Token inválido o expirado' });
    }
};