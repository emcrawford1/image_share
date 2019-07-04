module.exports = function(sequelize, DataTypes) {
  let Purchases = sequelize.define("purchases", {
    id: {
     autoIncrement: true,  
     primaryKey: true,
     type: DataTypes.INTEGER
    },

    priceAtPurchase: {
      type: DataTypes.INTEGER
    }

   
  });

  Purchases.associate = function(models) {
    Purchases.belongsTo(models.purchase_confirmation);
    Purchases.belongsTo(models.picture);
    Purchases.belongsTo(models.user);
    Purchases.belongsTo(models.user, {
      as: "email",
      foreignKey: "photographerEmail"
    });
  }

  return Purchases;
}