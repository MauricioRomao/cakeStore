import { Router } from 'express';
import { auth, roles, validate } from '../../shared/middlewares/index.js';
import { createUser } from '../auth/auth.service.js';

const r = Router();
r.use(auth, roles('admin'));
r.post('/vendors', validate({ name: 'string', phone: 'string', password: 'string' }),
  (req, res) => res.status(201).json(createUser({ ...req.body, role: 'vendor' })));
export default r;
