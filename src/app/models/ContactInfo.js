module.exports = (Sequelize, Datatypes) => {
  const ContactInfo = Sequelize.define('ContactInfo', {
    type: Datatypes.INTEGER,
    contact: Datatypes.STRING,
    ContactId: Datatypes.INTEGER,
  });
  // relacionamento 1:1
  // eslint-disable-next-line func-names
  ContactInfo.associate = function (models) {
    ContactInfo.belongsTo(models.Contact, {
      foreignKey: 'ContactId',
      as: 'contacts',
    });
  };

  return ContactInfo;
};
