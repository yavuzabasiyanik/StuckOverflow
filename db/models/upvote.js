'use strict';
module.exports = (sequelize, DataTypes) => {
  const Upvote = sequelize.define('Upvote', {
    userId: DataTypes.INTEGER,
    answerId: DataTypes.INTEGER
  }, {});
  Upvote.associate = function(models) {
    Upvote.belongsTo(models.Answer, { foreignKey: 'answerId', onDelete: "cascade", foreignKeyConstraint: true })
    Upvote.belongsTo(models.User, { foreignKey: 'userId', onDelete: "cascade", foreignKeyConstraint: true })
  };
  return Upvote;
};
