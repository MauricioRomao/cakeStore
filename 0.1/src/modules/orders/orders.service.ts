import { db, id } from '../../shared/db.js';
import { AppError } from '../../shared/errors.js';
import type { AuthUser, Order, OrderLine, OrderStatus, Role } from '../../shared/types.js';

// acção: [estado de origem, estado novo, quem pode]
const FLOW: Record<string, [OrderStatus, OrderStatus, Role]> = {
  accept: ['pending', 'accepted', 'vendor'],
  reject: ['pending', 'rejected', 'vendor'],
  cancel: ['pending', 'cancelled', 'client'],
  deliver: ['accepted', 'delivered', 'vendor'],
};

export interface CreateOrderInput {
  vendorId: number; buildingId: number; room?: string; items: { productId: number; qty?: number }[];
}

export const create = (clientId: number, { vendorId, buildingId, room, items }: CreateOrderInput): Order => {
  if (!db.buildings.some((b) => b.id === buildingId)) throw new AppError(400, 'Edifício inválido');
  if (!Array.isArray(items) || !items.length) throw new AppError(400, 'Pedido sem itens');
  const lines: OrderLine[] = items.map(({ productId, qty = 1 }) => {
    const p = db.products.find((x) => x.id === productId && x.vendorId === vendorId && x.available);
    if (!p || !(qty > 0)) throw new AppError(400, 'Produto indisponível');
    return { productId: p.id, name: p.name, price: p.price, qty };
  });
  const order: Order = {
    id: id(), clientId, vendorId, buildingId, room: room ?? null, items: lines,
    total: lines.reduce((s, l) => s + l.price * l.qty, 0),
    status: 'pending', createdAt: new Date().toISOString(),
  };
  db.orders.push(order);
  return order;
};

export const list = ({ id: uid, role }: AuthUser): Order[] => db.orders.filter((o) =>
  role === 'admin' || (role === 'client' ? o.clientId === uid : o.vendorId === uid));

export const act = (user: AuthUser, orderId: number, action: string): Order => {
  const step = FLOW[action];
  if (!step) throw new AppError(400, 'Acção inválida');
  const [from, to, by] = step;
  const o = db.orders.find((x) => x.id === orderId);
  const owner = by === 'client' ? o?.clientId : o?.vendorId;
  if (!o || user.role !== by || owner !== user.id) throw new AppError(404, 'Pedido não encontrado');
  if (o.status !== from) throw new AppError(409, `O pedido está ${o.status}`);
  o.status = to;
  return o;
};
