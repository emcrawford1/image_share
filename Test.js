

// class Test extends Model {}
//   Test.init({
//     name: Datatypes.STRING,
//     email: Datatypes.STRING
//   }, sequelize, 
//     modelName: 'test'
//   });


  class Test extends Model {}
Test.init({
  name: Sequelize.STRING,
  email: Sequelize.STRING
}, {
  sequelize,
  modelName: 'test'
});

module.exports = Test;