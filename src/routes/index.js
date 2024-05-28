const { Router } = require('express');

const userRoutes = require('./users');
const clientRoutes = require('./clients');
const authRoutes = require('./auth');
const healthRoutes = require('./health');

const routes = Router();

routes.use('/user', userRoutes);
routes.use('/client', clientRoutes);
routes.use('/auth', authRoutes);
routes.use('/health', healthRoutes);

module.exports = routes;