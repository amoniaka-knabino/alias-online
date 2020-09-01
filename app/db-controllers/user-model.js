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
    allowNull: false,
    unique: true
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

User.createNew = function(name, token)
{
  User.create({ Name: name, Token: token, Score:0 }).then(user => {
    console.log("New user's id:", user.id);
  });
}

User.logAllUsers = function()
{
  User.findAll().then(users => {
    console.log("All users:", JSON.stringify(users, null, 4));
  });
}

User.deleteUserByToken = function(token)
{
  User.destroy({
    where: {
      Token: token
    }
  }).then(() => {
    console.log("Deleted " + token);
  });
}

sequelize.sync();

module.exports = User;
