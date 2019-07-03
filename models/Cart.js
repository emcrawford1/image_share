module.exports = function(sequelize, DataTypes) {
  let Cart = sequelize.define("cart", {
    id: {
     autoIncrement: true,  
     primaryKey: true,
     type: DataTypes.INTEGER
    }

  });

  Cart.associate = function(models) {
    Cart.belongsTo(models.user);
    Cart.belongsTo(models.picture)
  }
  return Cart;
}