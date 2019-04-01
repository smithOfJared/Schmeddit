'use strict';
module.exports = (sequelize, DataTypes) => {
  var Banner = sequelize.define('Banner', {
    source: DataTypes.STRING,
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
  Banner.associate = function(models) {
    Banner.belongsTo(models.Topic, {
      foreignKey: "topicID",
      onDelete: "CASCADE",
    });
  };
  return Banner;
};
