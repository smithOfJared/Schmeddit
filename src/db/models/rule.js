'use strict';
module.exports = (sequelize, DataTypes) => {
  var Rule = sequelize.define('Rule', {
    description: DataTypes.STRING,
    topicID: {
     type: DataTypes.INTEGER,
     onDelete: "CASCADE",
     references: {
       model: "Topics",
       key: "id",
       as: "topicID",
     }
   }
  }, {});
  Rule.associate = function(models) {
    Rule.belongsTo(models.Topic, {
      foreignKey: "topicID",
      onDelete: "CASCADE",
    });
  };
  return Rule;
};
