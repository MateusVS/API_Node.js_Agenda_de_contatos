/* eslint-disable eqeqeq */
/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
const { Contact, User } = require('../models');

class ContactController {

  async index(req, res) {
    await Contact.findAll({ where: { userId: req.userId } })
      .then((data) => res.json(data))
      .catch((error) => res.status(400).json({ error: `Falha ao carregar contatos, erro: ${error}` }));
  }

  async create(req, res) {
    const { name, userId } = req.body;
    const image = req.file.path;
    if (!name) {
      return res.status(400).json({ error: 'Nome é um campo obrigatório' });
    }
    await User.findByPk(userId)
      .catch((error) => res.status(400).json({ error: `Usuario invalido ${error}` }));

    await Contact.create({ ...req.body, image })
      .then((data) => res.json({ data }))
      .catch((error) => res.status(500).json({ error: `Impossivel criar contato, erro ${error}` }));
  }

  async show(req, res) {
    const { id } = req.params;

    await Contact.findByPk(id)
      .then((data) => res.json(data))
      .catch((error) => res.status(400).json({ error: `Impossivel encontrar contato, erro: ${error}` }));
  }

  async update(req, res) {
    await Contact.update({ image: req.file.path }, { where: { id: req.params.id } })
      .then((ok) => {
        if (ok == true) {
          res.json({ message: 'Contato atualizado com sucesso' });
        } else {
          res.json({ message: 'Erro ao tentar atualizar contato, talvez o mesmo não exista' });
        }
      });
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
      .catch((error) => res.status(500).json(`Impossivel deletar contato, erro: ${error}`));
  }
}

module.exports = new ContactController();
