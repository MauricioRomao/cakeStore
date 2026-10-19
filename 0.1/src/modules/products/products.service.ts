import { db, id } from '../../shared/db.js';
import { AppError } from '../../shared/errors.js';
import type { Product } from '../../shared/types.js';

export const list = () => db.products.filter((p) => p.available)
  .map((p) => ({ ...p, vendor: { id: p.vendorId, name: db.users.find((u) => u.id === p.vendorId)?.name } }));

export const create = (vendorId: number, { name, price }: { name: string; price: number }): Product => {
  const p: Product = { id: id(), vendorId, name, price, available: true };
  db.products.push(p);
  return p;
};

export const update = (vendorId: number, productId: number, { price, available }: { price?: number; available?: boolean } = {}): Product => {
  const p = db.products.find((x) => x.id === productId && x.vendorId === vendorId);
  if (!p) throw new AppError(404, 'Produto não encontrado');
  if (price !== undefined) p.price = price;
  if (available !== undefined) p.available = available;
  return p;
};
