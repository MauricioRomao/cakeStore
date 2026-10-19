import express from 'express';
import { errorHandler } from './shared/middlewares/index.js';
import { AppError } from './shared/errors.js';
import authRoutes from './modules/auth/auth.routes.js';
import adminRoutes from './modules/admin/admin.routes.js';
import locationsRoutes from './modules/locations/locations.routes.js';
import productsRoutes from './modules/products/products.routes.js';
import ordersRoutes from './modules/orders/orders.routes.js';

const app = express();
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/locations', locationsRoutes);
app.use('/products', productsRoutes);
app.use('/orders', ordersRoutes);
app.use(() => { throw new AppError(404, 'Rota não encontrada'); });
app.use(errorHandler);
export default app;
