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

User.createNew = async function(name, token)
{
  let user = await User.create({ Name: name, Token: token, Score:0 });
  console.log("New user's id:", user.id);
  return token;
}

User.getByToken = async function(token)
{
  let user = await User.findOne({
    where: {
      Token: token
  }});
  return user;
}

User.logAllUsers = async function()
{
  let users = await User.findAll();
  console.log("All users:", JSON.stringify(users, null, 4));
}

User.deleteUserByToken = async function(token)
{
  let a = await User.destroy({
    where: {
      Token: token
    }
  });
  console.log("Deleted " + token);
}

User.updateScoreByToken = async function(token, delta)
{
  let user = await User.findOne({
    where: {
      Token: token
  }});
  console.log("token " + token + " user " + user);
  let currentScore = user.Score;
  console.log(token + "'s score " + currentScore)
  let newScore = currentScore + delta;
  let a = await User.update({ Score: newScore }, {
    where: {
      Token: token
    }
  });
  console.log("Updated " + token + " score from " + currentScore + " to " + newScore);
}

sequelize.sync();

module.exports = User;
