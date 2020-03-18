const express = require('express');

const route = express.Router();

const UsersController = require('./app/controllers/auth/UsersController');
const SessionController = require('./app/controllers/auth/SessionController');

route.post('/signup', UsersController.create);
route.post('/signin', SessionController.create);

module.exports = route;
