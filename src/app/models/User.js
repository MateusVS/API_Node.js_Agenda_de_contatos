const bcrypt = require('bcryptjs');

module.exports = (Sequelize, DataTypes) => {
  const User = Sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
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
