import { z } from 'zod';

// Esquema de validacion para registro
export const RegisterSchema = z.object({
    email: z.string().email('Formato de correo electrónico inválido'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
    firstName: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
    lastName: z.string().min(2, 'El apellido debe tener al menos 2 caracteres'),
})

// Esquema de validación para Login
export const LoginSchema = z.object({
    email: z.string().email('Formato de correo electrónico inválido'),
    password: z.string().min(1, 'La contraseña es requerida'),
});

export type RegisterInput = z.infer<typeof RegisterSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;
