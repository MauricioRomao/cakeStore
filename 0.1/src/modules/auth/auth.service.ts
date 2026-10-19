import jwt from 'jsonwebtoken';
import { scryptSync, randomBytes, timingSafeEqual } from 'node:crypto';
import { db, id } from '../../shared/db.js';
import { JWT_SECRET } from '../../shared/config.js';
import { AppError } from '../../shared/errors.js';
import type { PublicUser, Role, User } from '../../shared/types.js';

const hash = (p: string) => { const s = randomBytes(16).toString('hex'); return `${s}:${scryptSync(p, s, 32).toString('hex')}`; };
const check = (p: string, h: string) => { const [s, k] = h.split(':'); return timingSafeEqual(scryptSync(p, s, 32), Buffer.from(k, 'hex')); };
const pub = ({ passwordHash: _, ...u }: User): PublicUser => u;

export interface NewUser { name: string; phone: string; password: string; role: Role }

export const createUser = ({ name, phone, password, role }: NewUser): PublicUser => {
  if (db.users.some((u) => u.phone === phone)) throw new AppError(409, 'Telefone já registado');
  const user: User = { id: id(), name, phone, role, passwordHash: hash(password) };
  db.users.push(user);
  return pub(user);
};

export const login = ({ phone, password }: { phone: string; password: string }) => {
  const u = db.users.find((x) => x.phone === phone);
  if (!u || !check(password, u.passwordHash)) throw new AppError(401, 'Telefone ou senha inválidos');
  const token = jwt.sign({ sub: String(u.id), role: u.role }, JWT_SECRET, { expiresIn: '7d' });
  return { token, user: pub(u) };
};

// Admin de arranque (só para desenvolvimento): troca a senha!
createUser({ name: 'Admin', phone: '900000000', password: 'admin123', role: 'admin' });
