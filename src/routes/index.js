const { Router } = require('express');

const usersRoutes = require('./paths/users');
const companiesRoutes = require('./paths/Companies');
const authRoutes = require('./paths/auth');
const postsRoutes = require('./paths/posts');

const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/users', usersRoutes);
routes.use('/companies', companiesRoutes);
routes.use('/posts', postsRoutes);

module.exports = routes;