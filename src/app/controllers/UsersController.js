const { User } = require('../models');

class UsersController {
  // eslint-disable-next-line class-methods-use-this
  async create(req, res) {
    if (!req.body.name) {
      res.json({ message: 'Nome é um campo obrigatório' });
      return;
    }

    if (!req.body.email) {
      res.json({ message: 'Email é um campo obrigatório' });
      return;
    }

    if (!req.body.password) {
      res.json({ message: 'Senha é um campo obrigatório' });
      return;
    }

    await User.create(req.body)
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.json({ message: `${error}: Erro ao realizar cadastro, tente novamente` });
      });
  }
}

module.exports = new UsersController();
