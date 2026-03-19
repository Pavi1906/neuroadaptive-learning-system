import express from 'express';
import { processTopic } from '../controllers/retentionController';

const router = express.Router();

router.post('/analyze', processTopic);

export default router;
