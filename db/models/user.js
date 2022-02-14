'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    userName: DataTypes.STRING,
    profileUrl: DataTypes.TEXT,
    hashedPassword: DataTypes.STRING.BINARY
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Question, { foreignKey: 'userId' })
    User.hasMany(models.Answer, { foreignKey: 'userId' })
    User.hasMany(models.Upvote, { foreignKey: 'userId' })
    User.hasMany(models.Downvote, { foreignKey: 'userId' })
  };
  return User;
};
