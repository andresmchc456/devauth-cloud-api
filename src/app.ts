import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';

dotenv.config();

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());


// Montaje de rutas de la API
app.use('/api/v1/auth', authRoutes);


// Ruta de bienvenida (Raíz)
app.get('/', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Bienvenido a DevAuth Cloud API 🚀' });
});

// Ruta de comprobación de estado (Health Check)
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'DevAuth Cloud API en línea' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
    console.log(`📡 Rutas activas:`);
    console.log(`   - POST http://localhost:${PORT}/api/v1/auth/register`);
    console.log(`   - POST http://localhost:${PORT}/api/v1/auth/login`);
    console.log(`   - GET  http://localhost:${PORT}/api/v1/auth/me`);
});