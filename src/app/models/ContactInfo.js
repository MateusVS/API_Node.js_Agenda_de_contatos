module.exports = (Sequelize, Datatypes) => {
  const ContactInfo = Sequelize.define('ContactInfo', {
    type: {
      type: Datatypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true,
        isInt: true,
      },
    },
    contact: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    ContactId: {
      type: Datatypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true,
        isInt: true,
      },
    },
  });
  // relacionamento 1:1
  // eslint-disable-next-line func-names
  ContactInfo.associate = function (models) {
    ContactInfo.belongsTo(models.Contact, {
      foreignKey: 'ContactId',
      as: 'contacts',
      onDelete: 'CASCADE',
    });
  };

  return ContactInfo;
};
