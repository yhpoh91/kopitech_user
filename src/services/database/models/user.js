module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    passwordHash: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    passwordSalt: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    deleted: {
      type: DataTypes.INTEGER,
      allowNull: false,
      default: 0,
    },
  }, {
    timestamps: true,
  });

  User.associate = (models) => {
    // associations can be defined here
  };

  return User;
};