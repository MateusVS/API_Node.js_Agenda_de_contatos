const express = require('express');

const route = express.Router();

const authMiddleware = require('./app/middlewares/auth');

const controllers = require('./app/controllers');

route.post('/signup', controllers.UsersController.create);
route.post('/signin', controllers.SessionController.create);

route.get('/teste', authMiddleware, (req, res) => res.json({ ok: 'true' }));

module.exports = route;
