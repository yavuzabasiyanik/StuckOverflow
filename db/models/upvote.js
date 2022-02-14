'use strict';
module.exports = (sequelize, DataTypes) => {
  const Upvote = sequelize.define('Upvote', {
    userId: DataTypes.INTEGER,
    answerId: DataTypes.INTEGER
  }, {});
  Upvote.associate = function(models) {
    Upvote.belongsTo(models.Answer, { foreignKey: 'answerId' })
    Upvote.belongsTo(models.User, { foreignKey: 'userId' })
  };
  return Upvote;
};
