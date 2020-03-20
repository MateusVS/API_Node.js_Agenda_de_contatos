const express = require('express');

const route = express.Router();

const authMiddleware = require('./app/middlewares/auth');

const controllers = require('./app/controllers');

route.post('/signup', controllers.UsersController.create);
route.post('/signin', controllers.SessionController.create);

route.use('/dashboard', authMiddleware);
route.post('/dashboard/new-contact', controllers.ContactController.create);

route.get('/dashboard/test', (req, res) => res.json({ ok: 'true' }));

module.exports = route;
