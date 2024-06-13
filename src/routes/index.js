const { Router } = require('express');

const userRoutes = require('./users');
const clientRoutes = require('./clients');
const packageRoutes = require('./packages');
const paymentRoutes = require('./payments');
const authRoutes = require('./auth');
const healthRoutes = require('./health');

const routes = Router();

routes.use('/user', userRoutes);
routes.use('/client', clientRoutes);
routes.use('/packages', packageRoutes);
routes.use('/payments', paymentRoutes);
routes.use('/auth', authRoutes);
routes.use('/health', healthRoutes);

module.exports = routes;