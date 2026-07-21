import { Router } from 'express';
const router = Router();

import statusRoutes from './statusRoutes.js';
import deportesRoutes from "./deportesRoutes.js"


// Todas las rutas de statusRoutes estarán disponibles bajo /status.
router.use('/status', statusRoutes);

// Todas las rutas de turnosRoutes estarán disponibles bajo /turnos.
router.use('/deportes', deportesRoutes);


export default router;