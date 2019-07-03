
module.exports = function(sequelize, DataTypes) {
  let Category = sequelize.define("category", {
    name: {
      type:DataTypes.STRING
    },
    pic: {
      type:DataTypes.STRING
    }
  });

  Category.associate = function(models) {
    Category.hasMany(models.picture)
  }
  
  return Category;
}

