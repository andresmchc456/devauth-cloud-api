import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';
import { authenticateJWT } from '../middlewares/auth.middleware.js';

const router = Router();

// Rutas Públicas
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

// Ruta Protegida (requiere token JWT en la cabecera Authorization)
router.get('/me', authenticateJWT, AuthController.profile);

export default router; 