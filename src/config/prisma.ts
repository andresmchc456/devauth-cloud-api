import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const connectionString = (process.env.DATABASE_URL || '').replace('sslmode=require', 'sslmode=no-verify');

// Inicializar el pool de conexiones con pg
const pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false },
});

// Configurar el adaptador de Prisma para PostgreSQL
const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({ adapter });

