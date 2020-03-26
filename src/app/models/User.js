const bcrypt = require('bcryptjs');

module.exports = (Sequelize, DataTypes) => {
  const User = Sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Esse campo nao pode ser vazio',
        },
        len: {
          args: [3, 20],
          msg: 'Esse campo deve ter entre 3 e 20 caracteres',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Esse campo nao pode ser vazio',
        },
        isEmail: {
          msg: 'Esse campo precisa ser um e-mail',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Esse campo nao pode ser vazio',
        },
        len: {
          args: [8, 16],
          msg: 'Esse campo deve ter entre 8 e 16 caracteres',
        },
      },
    },
  }, {
    hooks: {
      // eslint-disable-next-line no-shadow
      beforeCreate: (User) => {
        const salt = bcrypt.genSaltSync(8);
        // eslint-disable-next-line no-param-reassign
        User.password = bcrypt.hashSync(User.password, salt);
      },
    },
  });
  // relacionamento 1:n
  // eslint-disable-next-line func-names
  User.associate = function (models) {
    User.hasMany(models.Contact, { as: 'contacts' });
  };

  // eslint-disable-next-line func-names
  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  return User;
};
