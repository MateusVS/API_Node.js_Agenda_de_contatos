const express = require('express');

const route = express.Router();

const UsersController = require('./app/controllers/UsersController');

route.post('/signup', UsersController.create);

module.exports = route;
