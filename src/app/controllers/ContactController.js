/* eslint-disable eqeqeq */
/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
const { Contact, User } = require('../models');

class ContactController {
  async index(req, res) {
    await Contact.findAll({
      where: {
        UserId: req.userId,
      },
      attributes: ['id', 'name', 'image'],
      include: [{
        association: 'owner',
        attributes: ['id', 'name', 'email'],
      }, {
        association: 'contactInfo',
        attributes: ['id', 'type', 'contact'],
      }],
      order: [
        'name', 'name',
      ],
    })
      .then((data) => res.json(data))
      .catch((error) => res.status(400).json({ error: `Falha ao carregar contatos, erro: ${error}` }));
  }

  async create(req, res) {
    const { name, UserId } = req.body;
    let image = null;
    if (req.file !== undefined) {
      image = req.file.path;
    }
    if (!name) {
      return res.status(400).json({ error: 'Nome é um campo obrigatório' });
    }
    await User.findByPk(UserId)
      .catch((error) => res.status(400).json({ error: `Usuario invalido ${error}` }));

    await Contact.create({ ...req.body, image }, { include: 'contactInfo' })
      .then((data) => res.json({ data }))
      .catch((error) => res.status(500).json({ error: `Impossivel criar contato, erro ${error}` }));
  }

  async show(req, res) {
    const { id } = req.params;

    await Contact.findByPk(id, {
      where: {
        UserId: req.userId,
      },
      attributes: ['id', 'name', 'image'],
      include: [{
        association: 'owner',
        attributes: ['id', 'name', 'email'],
      }, {
        association: 'contactInfo',
        attributes: ['id', 'type', 'contact'],
      }],
      order: [
        'name', 'name',
      ],
    })
      .then((data) => res.json(data))
      .catch((error) => res.status(400).json({ error: `Impossivel encontrar contato, erro: ${error}` }));
  }

  async update(req, res) {
    const data = await Contact.findByPk(req.params.id);
    let { image } = data;

    if (req.file !== undefined) {
      image = req.file.path;
    }
    await Contact.update({ ...req.body, image }, { where: { id: req.params.id } })
      .then((ok) => {
        if (ok == true) {
          res.json({ message: 'Contato atualizado com sucesso' });
        } else {
          res.json({ message: 'Erro ao tentar atualizar contato, talvez o mesmo não exista' });
        }
      })
      .catch((error) => res.status(500).json({ error: `Impossivel atualizar contato, erro: ${error}` }));
  }

  async destroy(req, res) {
    await Contact.destroy({ where: { id: req.params.id } })
      .then((ok) => {
        if (ok == true) {
          res.json({ message: 'Contato deletado com sucesso' });
        } else {
          res.json({ message: 'Erro ao tentar deletar contato, talvez o mesmo não exista' });
        }
      })
      .catch((error) => res.status(500).json({ error: `Impossivel deletar contato, erro: ${error}` }));
  }
}

module.exports = new ContactController();
