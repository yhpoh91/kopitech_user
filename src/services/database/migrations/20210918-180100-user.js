module.exports = {
  up: (queryInterface, Sequelize) => {
    const createUsersTable = () => queryInterface.createTable('Users', {
      id: {
        type: Sequelize.STRING(45),
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      username: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      passwordHash: {
        type: Sequelize.STRING(1000),
        allowNull: false,
      },
      passwordSalt: {
        type: Sequelize.STRING(1000),
        allowNull: false,
      },
      deleted: {
        type: Sequelize.INTEGER,
        allowNull: false,
        default: 0,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    const addUniqueConstraint = () => queryInterface.addConstraint('Users', ['username', 'deleted'], {
      name: 'unique_users_username',
      type: 'unique',
    });

    return Promise.resolve()
      .then(createUsersTable)
      .then(addUniqueConstraint);
  },
  down: (queryInterface) => {
    const dropUsersTable = () => queryInterface.dropTable('Users');
    const removeUniqueConstraint = () => queryInterface.removeConstraint('Users', 'unique_users_username', {});

    return Promise.resolve()
      .then(removeUniqueConstraint)
      .then(dropUsersTable);
  },
};