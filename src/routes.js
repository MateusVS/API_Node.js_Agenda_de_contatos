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
route.patch('/dashboard/contact/:id', upload.single('image'), controllers.ContactController.update);

route.post('/dashboard/contact-info', controllers.ContactInfoController.create);
route.put('/dashboard/contact-info/:id', controllers.ContactInfoController.update);
route.delete('/dashboard/contact-info/:id', controllers.ContactInfoController.destroy);

module.exports = route;
