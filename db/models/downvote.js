'use strict';
module.exports = (sequelize, DataTypes) => {
  const Downvote = sequelize.define('Downvote', {
    userId: DataTypes.INTEGER,
    answerId: DataTypes.INTEGER
  }, {});
  Downvote.associate = function(models) {
    Downvote.belongsTo(models.Answer, { foreignKey: 'answerId', onDelete: "cascade", foreignKeyConstraint: true })
    Downvote.belongsTo(models.User, { foreignKey: 'userId', onDelete: "cascade", foreignKeyConstraint: true })
  };
  return Downvote;
};
