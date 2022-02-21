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
    User.hasMany(models.Question, { foreignKey: 'userId',onDelete: "cascade", foreignKeyConstraint: true })
    User.hasMany(models.Answer, { foreignKey: 'userId',onDelete: "cascade", foreignKeyConstraint: true })
    User.hasMany(models.Upvote, { foreignKey: 'userId',onDelete: "cascade", foreignKeyConstraint: true })
    User.hasMany(models.Downvote, { foreignKey: 'userId',onDelete: "cascade", foreignKeyConstraint: true })
  };
  return User;
};
