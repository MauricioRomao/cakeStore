import { Router } from 'express';
import { db } from '../../shared/db.js';

const r = Router();
r.get('/', (_req, res) => res.json(db.buildings));
export default r;
