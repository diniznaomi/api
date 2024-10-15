const { Router } = require('express');

const usersRoutes = require('./users');
const companiesRoutes = require('./Companies');
const authRoutes = require('./auth');
const postsRoutes = require('./posts');

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/companies', companiesRoutes);
routes.use('/auth', authRoutes);
routes.use('/posts', postsRoutes);

module.exports = routes;