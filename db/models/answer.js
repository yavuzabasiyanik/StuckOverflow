'use strict';
module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('Answer', {
    message: DataTypes.TEXT,
    answerImg1: DataTypes.TEXT,
    answerImg2: DataTypes.TEXT,
    answerImg3: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    questionId: DataTypes.INTEGER
  }, {});
  Answer.associate = function(models) {
    Answer.belongsTo(models.User, { foreignKey: 'userId', onDelete: "cascade", foreignKeyConstraint: true })
    Answer.belongsTo(models.Question, { foreignKey: 'questionId', onDelete: "cascade", foreignKeyConstraint: true })
    Answer.hasMany(models.Downvote, { foreignKey: 'answerId',onDelete: "cascade", foreignKeyConstraint: true})
    Answer.hasMany(models.Upvote, { foreignKey: 'answerId',onDelete: "cascade", foreignKeyConstraint: true })
  };
  return Answer;
};
