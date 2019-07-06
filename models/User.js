const bcrypt = require('bcrypt');
const saltRounds = 12;

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
    User.hasOne(models.user_info);
    User.hasMany(models.purchase_confirmation)
  }

  User.beforeCreate((user) => {
     user.password = "password";
    //  user.save();
  
  });
  

  return User;
}

