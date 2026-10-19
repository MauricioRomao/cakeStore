import { Router } from 'express';
import { validate } from '../../shared/middlewares/index.js';
import { createUser, login } from './auth.service.js';

const r = Router();
r.post('/register', validate({ name: 'string', phone: 'string', password: 'string' }),
  (req, res) => res.status(201).json(createUser({ ...req.body, role: 'client' })));
r.post('/login', validate({ phone: 'string', password: 'string' }),
  (req, res) => res.json(login(req.body)));
export default r;
