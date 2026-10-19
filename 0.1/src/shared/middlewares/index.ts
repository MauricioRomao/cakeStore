import type { NextFunction, Request, RequestHandler, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';
import { AppError } from '../errors.js';
import type { Role } from '../types.js';

export const auth: RequestHandler = (req, _res, next) => {
  let user;
  try {
    const p = jwt.verify(req.headers.authorization?.split(' ')[1] ?? '', JWT_SECRET) as { sub: string; role: Role };
    user = { id: Number(p.sub), role: p.role };
  } catch { throw new AppError(401, 'Sessão inválida'); }
  req.user = user;
  next();
};

export const roles = (...allowed: Role[]): RequestHandler => (req, _res, next) => {
  if (!allowed.includes(req.user!.role)) throw new AppError(403, 'Sem permissão');
  next();
};

// schema: { campo: 'string' | 'number' | 'boolean' | 'object'; 'tipo?' = opcional }
export const validate = (schema: Record<string, string>): RequestHandler => (req, _res, next) => {
  for (const [k, t] of Object.entries(schema)) {
    const v = req.body?.[k], type = t.replace('?', '');
    if (v === undefined) { if (t.endsWith('?')) continue; throw new AppError(400, `${k} é obrigatório`); }
    if (typeof v !== type) throw new AppError(400, `${k} deve ser do tipo ${type}`);
  }
  next();
};

export const errorHandler = (err: Error & { status?: number }, _req: Request, res: Response, _next: NextFunction) => {
  if (!err.status) console.error(err);
  res.status(err.status || 500).json({ error: err.status ? err.message : 'Erro interno' });
};
