/* eslint-disable class-methods-use-this */
const { ContactInfo } = require('../models');

class ContactInfoController {
  async create(req, res) {
    await ContactInfo.create(req.body)
      .then((data) => res.status(200).json({ data }))
      .catch((error) => res.status(400).json({ error: `Erro ao criar informacoes de contato ${error}` }));
  }

  async update(req, res) {
    await ContactInfo.update(req.body, { where: { id: req.params.id } })
      .then((ok) => {
        // eslint-disable-next-line eqeqeq
        if (ok == true) {
          res.status(200).json({ message: 'Contato atualizado com sucesso' });
        } else {
          res.status(401).json({ message: 'Erro ao tentar atualizar contato, talvez o mesmo não exista' });
        }
      })
      .catch((error) => res.status(500).json({ error: `Impossivel atualizar contato, erro: ${error}` }));
  }

  async destroy(req, res) {
    await ContactInfo.destroy({ where: { id: req.params.id } })
      .then((ok) => {
        // eslint-disable-next-line eqeqeq
        if (ok == true) {
          res.status(200).json({ message: 'Informacoes deletadas com sucesso' });
        } else {
          res.status(400).json({ error: 'Erro ao tentar deletar informacoes, talvez as mesmas nao existam' });
        }
      })
      .catch((error) => res.status(500).json({ error: `Impossivel deletar informacao, erro: ${error}` }));
  }
}

module.exports = new ContactInfoController();
