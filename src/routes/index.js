const { Router } = require('express');

const userRoutes = require('./users');
const clientRoutes = require('./clients');
const companyRoutes = require('./Company');
const paymentRoutes = require('./payments');
const authRoutes = require('./auth');
const healthRoutes = require('./health');
const postRoutes = require('./post');

const routes = Router();

routes.use('/user', userRoutes);
routes.use('/client', clientRoutes);
routes.use('/company', companyRoutes);
routes.use('/payments', paymentRoutes);
routes.use('/auth', authRoutes);
routes.use('/health', healthRoutes);
routes.use('/post', postRoutes);

module.exports = routes;