module.exports = function(sequelize, DataTypes) {
  let UserInfo = sequelize.define("user_info", {
    id: {
     autoIncrement: true,  
     primaryKey: true,
     type: DataTypes.INTEGER
    },

    firstName: {
      type: DataTypes.STRING
    },

    lastName: {
      type: DataTypes.STRING
    },

    firstName: {
      type: DataTypes.STRING
    },

    aboutMe: {
      type: DataTypes.STRING
    },
    
    userType: {
      type: DataTypes.INTEGER,
      validate: {
        is: [0,1]
      }
    },

    profilePic: {
      type: DataTypes.STRING
    }

  });

  UserInfo.associate = function(models) {
    UserInfo.belongsTo(models.user, {
      onDelete: 'CASCADE'
    });
  }

  return UserInfo;
}



