/* eslint-disable consistent-return */
const { User } = require('../models');

class UsersController {
  // eslint-disable-next-line class-methods-use-this
  async create(req, res) {
    if (!req.body.name) {
      return res.status(400).json({ error: 'Nome é um campo obrigatório' });
    }

    if (!req.body.email) {
      return res.status(400).json({ error: 'Email é um campo obrigatório' });
    }

    if (!req.body.password) {
      return res.status(400).json({ error: 'Senha é um campo obrigatório' });
    }

    await User.create(req.body)
      .then((data) => res.status(200).json({ data }))
      .catch((error) => res.status(500).json({ error: `${error}: Erro ao realizar cadastro, tente novamente` }));
  }
}

module.exports = new UsersController();
