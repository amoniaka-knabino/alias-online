const Sequelize = require('sequelize');
const sequelize = require('./database-controller');
const Model = Sequelize.Model;

DataTypes = Sequelize.DataTypes;

const User = require('../db-controllers/user-model.js');
const Round = require('../db-controllers/round-model.js');
const GameStatus = Object.freeze({"NotStarted":0, "Started":1, "Finished":2})


class Game extends Model {}
Game.init({
  // attributes
  UUID: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    unique: true
  },
  Status: {
    type:Sequelize.INTEGER,
    defaultValue: GameStatus.NotStarted,
    allowNull: false,
  },
  PlayersTokens: {
    type:DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
    allowNull: false,
  },
  RoundsUUIDs: {
    type:DataTypes.ARRAY(DataTypes.UUID),
    defaultValue: [],
    allowNull: false,
  },
  CurrentRoundNumber: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  RoundCount: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 10
  },
  RoundTimeSeconds: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 60
  }
}, {
  sequelize,
  modelName: 'game'
  // options
});

Game.createNew = async function(playerToken, roundCount, roundTimeSec)
{
  let game = await Game.create({PlayersTokens: [playerToken], RoundCount:roundCount, RoundTimeSeconds:roundTimeSec});
  console.log("created game uuid " + game.UUID);
  return game.UUID;
}

Game.deleteByUUID = async function(gameUUID)
{
  await Game.destroy({
    where: {
      UUID: gameUUID
    }
  });
  console.log("Deleted " + gameUUID);
}

Game.getByUUID = async function(gameUUID)
{
  let game = await Game.findOne({
    where: {
      UUID: gameUUID
  }});
  return game;
}

Game.startByUUID = async function(gameUUID)
{
  await Game.update({ Status:  GameStatus.Started }, {
    where: {
      UUID: gameUUID
    }
  });
}

Game.finishByUUID = async function(gameUUID)
{
  await Game.update({ Status:  GameStatus.Finished }, {
    where: {
      UUID: gameUUID
    }
  });
}

Game.addPlayer = async function(gameUUID, playerToken)
{
  let game = await Game.findOne({
    where: {
      UUID: gameUUID
  }});
  let playersTokens = game.PlayersTokens;
  if (playersTokens.includes(playerToken))
  {
    return "player have already been added";
  }
  else
  {
    playersTokens.push(playerToken);
    await Game.update({ PlayersTokens: playersTokens }, {
      where: {
        UUID: gameUUID
      }
    });
    return "ok";
  }
}

Game.getCurrentPlayerToken = async function(gameUUID)
{
    let game = await Game.findOne({
        where: {
          UUID: gameUUID
      }});
    let ans = game.PlayersTokens[(game.CurrentRoundNumber-1) % game.PlayersTokens.length];
    return ans;
}

Game.startRound = async function(gameUUID)
{
    let game = await Game.findOne({
        where: {
          UUID: gameUUID
      }});
    let newCurrentRoundNumber = game.CurrentRoundNumber+1;
    await Game.update({ CurrentRoundNumber: newCurrentRoundNumber }, {
        where: {
          UUID: gameUUID
        }
      });
      let currentPlayerToken = await Game.getCurrentPlayerToken(gameUUID);
      let currentRoundUUID = await Round.createNew(currentPlayerToken);
      let roundsUUIDs = game.RoundsUUIDs;
      roundsUUIDs.push(currentRoundUUID);
      console.log(roundsUUIDs);
      await Game.update({ RoundsUUIDs: roundsUUIDs }, {
          where: {
            UUID: gameUUID
          }
        });
      return currentRoundUUID;
}

Game.getCurrentRoundUUID = async function(gameUUID)
{
    let game = await Game.findOne({
        where: {
          UUID: gameUUID
      }});
    let uuid = game.RoundsUUIDs[game.CurrentRoundNumber-1];
    return uuid;
}

Game.finishRound = async function(gameUUID)
{
    let game = await Game.findOne({
        where: {
          UUID: gameUUID
      }});
    let curRoundUUID = await Game.getCurrentRoundUUID(gameUUID);
    await Round.finishByUUID(curRoundUUID);
    if (game.CurrentRoundNumber == game.RoundCount)
    {
      Game.finishByUUID(gameUUID);
    }
}

sequelize.sync();

module.exports = Game;
