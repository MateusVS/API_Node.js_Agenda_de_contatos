/* eslint-disable class-methods-use-this */
const { Contact, User } = require('../models');

class ContactController {
  async create(req, res) {
    const { name, id } = req.body;
    const image = req.file.path;
    if (!name) {
      return res.status(400).json({ error: 'Nome é um campo obrigatório' });
    }

    await User.findByPk(id)
      .catch((error) => res.status(400).json({ error: `Usuario invalido ${error}` }));

    await Contact.create({ ...req.body, image })
      .then((data) => res.json({ data }))
      .catch((error) => res.status(500).json({ error: `Impossivel criar contato, erro ${error}` }));
  }
}

module.exports = new ContactController();
