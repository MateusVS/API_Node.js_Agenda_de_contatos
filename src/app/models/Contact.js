module.exports = (Sequelize, DataTypes) => {
  const Contact = Sequelize.define('Contact', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Esse campo nao pode ser vazio',
        },
        len: {
          args: [3, 25],
          msg: 'Esse campo deve ter entre 3 e 25 caracteres',
        },
      },
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true,
        isInt: true,
      },
    },
  }); // relacionamento 1:1
  // eslint-disable-next-line func-names
  Contact.associate = function (models) {
    Contact.belongsTo(models.User, {
      foreignKey: 'UserId',
      as: 'owner',
    });
    // relacionamento 1:n
    Contact.hasMany(models.ContactInfo, { as: 'contactInfo' });
  };

  return Contact;
};
