const jwt = require('jsonwebtoken');
const { User } = require('../models');
const authConfig = require('../../config/auth');

class SessionController {
  // eslint-disable-next-line class-methods-use-this
  async create(req, res) {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      return res.status(400).json({ error: 'E-mail não cadastrado ' });
    }

    if (!await user.validPassword(req.body.password)) {
      return res.status(400).json({ error: 'Senha Inválida' });
    }

    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: authConfig.ttl,
    });

    return res.json({ user, token });
  }
}

module.exports = new SessionController();
