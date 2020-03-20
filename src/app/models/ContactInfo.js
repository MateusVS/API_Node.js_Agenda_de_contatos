module.exports = (Sequelize, Datatypes) => {
  const ContactInfo = Sequelize.define('ContactInfo', {
    type: Datatypes.INTEGER,
    contact: Datatypes.STRING,
    contactId: Datatypes.INTEGER,
  });
  // relacionamento 1:1
  // eslint-disable-next-line func-names
  ContactInfo.associate = function (models) {
    ContactInfo.belongsTo(models.Contact, {
      foreignKey: 'contactId',
      as: 'contact',
    });
  };

  return ContactInfo;
};
