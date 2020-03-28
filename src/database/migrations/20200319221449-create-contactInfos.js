module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('ContactInfos', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    type: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },

    contact: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    ContactId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Contacts',
        key: 'id',
      },
      onDelete: 'CASCADE',
      allowNull: false,
    },

    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },

    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  }),

  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) => queryInterface.dropTable('ContactInfos'),
};
