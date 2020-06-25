const Sequelize = require('sequelize');
const sequelize = require('./database-controller');
const Model = Sequelize.Model;

class User extends Model {}
User.init({
  // attributes
  Name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  Token: {
    type: Sequelize.STRING,
    allowNull: false
  },
  Score: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'user'
  // options
});

sequelize.sync();

module.exports = User;