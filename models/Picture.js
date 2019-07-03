module.exports = function(sequelize, DataTypes) {
  let Picture = sequelize.define("picture", {
    id: {
     autoIncrement: true,  
     primaryKey: true,
     type: DataTypes.INTEGER
    },

    title: {
      type: DataTypes.STRING
    },

    description: {
      type: DataTypes.STRING
    },

    price: {
      type: DataTypes.INTEGER
    },

    filePath: {
      type: DataTypes.STRING
    },

    disabled: {
      type: DataTypes.BOOLEAN
    }
  });

  Picture.associate = function(models) {
    Picture.belongsTo(models.category, 
      {
        as: 'Category',
        foreignKey: 'categoryPic',
        constraints: false
      });

      Picture.belongsTo(models.user, {
        onDelete: 'CASCADE'
      });
  }
  return Picture;
}
  
  

  