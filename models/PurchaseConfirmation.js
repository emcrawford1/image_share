module.exports = function(sequelize, DataTypes) {
  let PurchaseConfirmation = sequelize.define("purchase_confirmation", {
   

    dateOfPurchase: {
      type: DataTypes.DATE
    }

   
  });

  PurchaseConfirmation.associate = function(models) {
    // PurchaseConfirmation.belongsTo(models.user, {
    //   as: 'userId',
    //   foreignKey: 'email',
    //   constraints: false
    // });
    
      PurchaseConfirmation.hasMany(models.purchases)
    
  }

  

  return PurchaseConfirmation;
}