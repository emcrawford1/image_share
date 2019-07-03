
module.exports = function(sequelize, DataTypes) {
  let User = sequelize.define("user", {
    email: {
     primaryKey: true,
     type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING,
      notEmpty: true,
      allowNull: false,
      len: [3, 30]
    },
    
    lastLogin: {
      type: DataTypes.DATE
    },

    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active"
    }
  });


  User.associate = function(models) {
    User.hasOne(models.user_info, {
      as: 'Category',
      foreignKey: 'categoryPic',
      constraints: false
    });

    User.hasMany(models.purchase_confirmation)
  }

  

  return User;
}

