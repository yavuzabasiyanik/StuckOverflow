'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    title: DataTypes.STRING,
    questionImg1: DataTypes.TEXT,
    questionImg2: DataTypes.TEXT,
    questionImg3: DataTypes.TEXT,
    message: DataTypes.TEXT,
    userId: DataTypes.INTEGER
  }, {});
  Question.associate = function(models) {
    Question.belongsTo(models.User, { foreignKey: 'userId' , onDelete: "cascade", foreignKeyConstraint: true })
    Question.hasMany(models.Answer, { foreignKey: 'questionId',onDelete: "cascade", foreignKeyConstraint: true})
  };
  return Question;
};
