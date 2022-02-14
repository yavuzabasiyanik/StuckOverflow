'use strict';
module.exports = (sequelize, DataTypes) => {
  const Downvote = sequelize.define('Downvote', {
    userId: DataTypes.INTEGER,
    answerId: DataTypes.INTEGER
  }, {});
  Downvote.associate = function(models) {
    Downvote.belongsTo(models.Answer, { foreignKey: 'answerId' })
    Downvote.belongsTo(models.User, { foreignKey: 'userId' })
  };
  return Downvote;
};
