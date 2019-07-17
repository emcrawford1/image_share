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
      allowNull: false
    },
    
    lastLogin: {
      type: DataTypes.DATE
    },

    accountType: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 1
      }
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
    let pwHash = "nothing";
    let saltPassword = user.password;
    console.log(saltPassword)

    return new Promise((resolve, reject) => {
    bcrypt.genSalt(saltRounds)
    .then(salt => {
      console.log("Salt: " + salt);
      return bcrypt.hash(saltPassword, salt)
    })
    .catch(err => {
      console.log(err);
      reject(err);
    })
    .then(hash => {
      console.log("User password before: " + user.password);
      user.password = hash;
      console.log("User Password: " + user.password);
      if(hash) {
        resolve("resolved");
      }
    })
    .catch(err => {
      console.log(err);
      reject(err);
    })
  
  })
});
  

  return User;
}

