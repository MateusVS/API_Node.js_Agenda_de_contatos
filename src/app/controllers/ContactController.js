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
      .then((data) => res.status(200).json(data))
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
      .then((data) => res.status(200).json({ data }))
      .catch((error) => res.status(500).json({ error: `Impossivel criar contato, erro ${error}` }));
  }

  async show(req, res) {
    const { id } = req.params;

    await Contact.findByPk(id, {
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
      .then((data) => {
        if (data.owner.id == req.userId) {
          res.status(200).json(data);
        } else {
          res.status(401).json({ error: 'Acesso inválido' });
        }
      })
      .catch((error) => res.status(500).json({ error: `Impossivel encontrar contato, erro: ${error}` }));
  }

  async update(req, res) {
    const data = await Contact.findByPk(req.params.id);
    let { image } = data;

    if (req.file !== undefined) {
      image = req.file.path;
    }
    await Contact.update({ ...req.body, image },
      { where: { id: req.params.id, UserId: req.userId } })
      .then((ok) => {
        if (ok == true) {
          res.status(200).json({ message: 'Contato atualizado com sucesso' });
        } else {
          res.status(401).json({ message: 'Erro ao tentar atualizar contato, talvez o mesmo não exista' });
        }
      })
      .catch((error) => res.status(500).json({ error: `Impossivel atualizar contato, erro: ${error}` }));
  }

  async destroy(req, res) {
    await Contact.destroy({
      where: {
        id: req.params.id,
        UserId: req.userId,
      },
      include: [{
        association: 'contactInfo',
        where: {
          ContactId: req.params.id,
        },
      }],
    })
      .then((ok) => {
        if (ok == true) {
          res.status(200).json({ message: 'Contato deletado com sucesso' });
        } else {
          res.status(401).json({ message: 'Erro ao tentar deletar contato, talvez o mesmo não exista' });
        }
      })
      .catch((error) => res.status(500).json({ error: `Impossivel deletar contato, erro: ${error}` }));
  }
}

module.exports = new ContactController();
