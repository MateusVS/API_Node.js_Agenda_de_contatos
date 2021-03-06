const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    dotenv.config();
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    // eslint-disable-next-line global-require
    this.app.use(('/api'), require('./routes'));
  }
}

module.exports = new App().app;
