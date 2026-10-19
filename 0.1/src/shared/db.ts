import type { Building, Order, Product, User } from './types.js';

// "Base de dados" em memória. Para usar uma BD real, troca isto por repositories.
let seq = 0;
export const id = () => ++seq;
export const db: { buildings: Building[]; users: User[]; products: Product[]; orders: Order[] } = {
  buildings: [1, 2, 3].map((n) => ({ id: n, campusId: 1, name: `Edifício ${n}` })),
  users: [],
  products: [],
  orders: [],
};
