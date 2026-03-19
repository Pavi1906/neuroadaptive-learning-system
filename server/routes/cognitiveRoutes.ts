import express from 'express';
import { getCognitiveMap } from '../controllers/cognitiveController';

const router = express.Router();

router.post('/map', getCognitiveMap);

export default router;
