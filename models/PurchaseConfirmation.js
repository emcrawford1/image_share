module.exports = function(sequelize, DataTypes) {
  let PurchaseConfirmation = sequelize.define("purchase_confirmation", {
    confirmationNumber: {
     autoIncrement: true,  
     primaryKey: true,
     type: DataTypes.INTEGER
    },

    description: {
      type: DataTypes.STRING
    }

   
  });

  PurchaseConfirmation.associate = function(models) {
    PurchaseConfirmation.belongsTo(models.user, {
      as: 'userId',
      foreignKey: 'email',
      constraints: false
    });
    
    PurchaseConfirmation.associate = function(models) {
      PurchaseConfirmation.hasMany(models.purchases)
    }
  }

  

  return PurchaseConfirmation;
}