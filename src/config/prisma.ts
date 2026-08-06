import { PrismaClient } from '@prisma/client';

// Instancia única de Prisma Client para reutilizar conexiones en la nube
export const prisma = new PrismaClient();

