import { Router } from 'express';
const router = Router();

import deportesController from '../controllers/deportesControllers.js';

// GET /productos -> listar todos los productos.
router.get('/', deportesController.obtener);

// GET /productos/:id -> ver un producto específico.
router.get('/:id', deportesController.obtenerPorId);
 
export default router;