module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Contacts', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    image: {
      type: Sequelize.STRING,
    },

    UserId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Contacts'),
};
