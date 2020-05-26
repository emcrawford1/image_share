module.exports = function(sequelize, DataTypes) {
  let Picture = sequelize.define("picture", {
   
    id: {
     primaryKey: true,
     type: DataTypes.STRING
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

    unrestrictedFilePath: {
      type: DataTypes.STRING
    },

    restrictedFilePath: { 
      type: DataTypes.STRING
    },

    disabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: '0'
    },

    picType: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 1
      }
    }
  });

  Picture.associate = function(models) {
    Picture.belongsTo(models.category);

      Picture.belongsTo(models.user, {
        onDelete: 'CASCADE'
      });
  }
  return Picture;
}
  
  

  