module.exports = (Sequelize, DataTypes) => {
  const Contact = Sequelize.define('Contact', {
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    userId: DataTypes.STRING,
  }); // relacionamento 1:1
  // eslint-disable-next-line func-names
  Contact.associate = function (models) {
    Contact.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
    // relacionamento 1:n
    Contact.hasMany(models.ContacInfo, { as: 'contactInfo' });
  };

  return Contact;
};