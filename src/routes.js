const express = require('express');

const route = express.Router();
const upload = require('./config/multer');
const authMiddleware = require('./app/middlewares/auth');

const controllers = require('./app/controllers');

route.post('/signup', controllers.UsersController.create);
route.post('/signin', controllers.SessionController.create);

route.use('/dashboard', authMiddleware);
route.get('/dashboard', controllers.ContactController.index);
route.get('/dashboard/contact/:id', controllers.ContactController.show);
route.post('/dashboard/new-contact', upload.single('image'), controllers.ContactController.create);
route.delete('/dashboard/contact/:id', controllers.ContactController.destroy);
route.patch('/dashboard/contact/:id', controllers.ContactController.update);

route.get('/dashboard/test', (req, res) => res.json({ ok: 'true' }));

module.exports = route;
