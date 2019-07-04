module.exports = function (sequelize, DataTypes) {
  let PurchaseConfirmation = sequelize.define("purchase_confirmation", {


  });

  PurchaseConfirmation.associate = function (models) {
    PurchaseConfirmation.belongsTo(models.user);
    PurchaseConfirmation.hasMany(models.purchases)

  }



  return PurchaseConfirmation;
}