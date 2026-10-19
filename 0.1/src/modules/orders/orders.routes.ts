import { Router } from 'express';
import { auth, roles, validate } from '../../shared/middlewares/index.js';
import { create, list, act } from './orders.service.js';

const r = Router();
r.use(auth);
r.post('/', roles('client'),
  validate({ vendorId: 'number', buildingId: 'number', room: 'string?', items: 'object' }),
  (req, res) => res.status(201).json(create(req.user!.id, req.body)));
r.get('/', (req, res) => res.json(list(req.user!)));
r.patch('/:id/:action', (req, res) => res.json(act(req.user!, Number(req.params.id), String(req.params.action))));
export default r;
