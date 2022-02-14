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
    Answer.belongsTo(models.User, { foreignKey: 'userId' })
    Answer.belongsTo(models.Question, { foreignKey: 'questionId' })
    Answer.hasMany(models.Downvote, { foreignKey: 'answerId' })
    Answer.hasMany(models.Upvote, { foreignKey: 'answerId' })
  };
  return Answer;
};
