/* eslint-disable class-methods-use-this */
const { Contact, User } = require('../models');

class ContactController {
  async create(req, res) {
    const { name, image, id } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Nome é um campo obrigatório' });
    }

    await User.findByPk(id)
      .catch((error) => res.status(400).json({ error: `Usuario invalido ${error}` }));

    await Contact.create(req.body)
      .then((data) => res.json({ data }))
      .catch((error) => res.status(500).json({ error: `Impossivel criar contato, erro ${error}` }));
  }
}

module.exports = new ContactController();
