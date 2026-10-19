export type Role = 'client' | 'vendor' | 'admin';
export type OrderStatus = 'pending' | 'accepted' | 'rejected' | 'cancelled' | 'delivered';
export interface AuthUser { id: number; role: Role }
export interface User { id: number; name: string; phone: string; role: Role; passwordHash: string }
export type PublicUser = Omit<User, 'passwordHash'>;
export interface Building { id: number; campusId: number; name: string }
export interface Product { id: number; vendorId: number; name: string; price: number; available: boolean }
export interface OrderLine { productId: number; name: string; price: number; qty: number }
export interface Order {
  id: number; clientId: number; vendorId: number; buildingId: number; room: string | null;
  items: OrderLine[]; total: number; status: OrderStatus; createdAt: string;
}
declare global { namespace Express { interface Request { user?: AuthUser } } }
