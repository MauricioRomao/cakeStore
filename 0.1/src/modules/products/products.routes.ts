import { Router } from 'express';
import { auth, roles, validate } from '../../shared/middlewares/index.js';
import { list, create, update } from './products.service.js';

const r = Router();
r.use(auth);
r.get('/', (_req, res) => res.json(list()));
r.post('/', roles('vendor'), validate({ name: 'string', price: 'number' }),
  (req, res) => res.status(201).json(create(req.user!.id, req.body)));
r.patch('/:id', roles('vendor'), validate({ price: 'number?', available: 'boolean?' }),
  (req, res) => res.json(update(req.user!.id, Number(req.params.id), req.body)));
export default r;
