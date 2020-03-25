module.exports = (Sequelize, DataTypes) => {
  const Contact = Sequelize.define('Contact', {
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    UserId: DataTypes.STRING,
  }); // relacionamento 1:1
  // eslint-disable-next-line func-names
  Contact.associate = function (models) {
    Contact.belongsTo(models.User, {
      foreignKey: 'UserId',
      as: 'user',
    });
    // relacionamento 1:n
    Contact.hasMany(models.ContactInfo, { as: 'contactInfo' });
  };

  return Contact;
};
