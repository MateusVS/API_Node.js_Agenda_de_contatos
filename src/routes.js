const express = require('express');

const route = express.Router();
const upload = require('./config/multer');
const authMiddleware = require('./app/middlewares/auth');

const controllers = require('./app/controllers');
const validations = require('./app/validations');

route.post('/signup', validations.User.userValidation(), validations.User.validate, controllers.UsersController.create);
route.post('/signin', validations.Session.SessionValidator(), validations.Session.validate, controllers.SessionController.create);

route.use('/dashboard', authMiddleware);
route.get('/dashboard', controllers.ContactController.index);
route.get('/dashboard/contact/:id', controllers.ContactController.show);
route.post('/dashboard/new-contact', validations.Contact.contactValidation(), validations.Contact.validate, upload.single('image'), controllers.ContactController.create);
route.delete('/dashboard/contact/:id', controllers.ContactController.destroy);
route.patch('/dashboard/contact/:id', validations.patchContact.contactValidation(), validations.patchContact.validate, upload.single('image'), controllers.ContactController.update);

route.post('/dashboard/contact-info', validations.ContactInfo.infoValidation(), validations.ContactInfo.validate, controllers.ContactInfoController.create);
route.patch('/dashboard/contact-info/:id', controllers.ContactInfoController.update);
route.delete('/dashboard/contact-info/:id', validations.patchContactInfo.infoValidation(), validations.patchContactInfo.validate, controllers.ContactInfoController.destroy);

module.exports = route;
