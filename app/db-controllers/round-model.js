const Sequelize = require('sequelize');
const sequelize = require('./database-controller');
const Model = Sequelize.Model;

DataTypes = Sequelize.DataTypes;

const word_db = require('../db-controllers/word-database-controller.js');
const MAXS_WORDS_PER_ROUND = 5

class Round extends Model {}
Round.init({
  // attributes
  UUID: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    unique: true
  },
  IsFinished: {
    type:DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  WordPull: {
    type:DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
    allowNull: false,
  },
  GuessedWords: {
    type:DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
    allowNull: false,
  },
  SkippedWords: {
    type:DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
    allowNull: false,
  },
  TotalScore: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  PlayerToken: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'round'
  // options
});

Round.createNew = async function(playerToken)
{
  let wordPull = await Round.createWordPull(MAXS_WORDS_PER_ROUND);
  let round = await Round.create({ PlayerToken: playerToken, WordPull:wordPull});
  console.log(round);
  return round;
}

Round.createWordPull = async function(wordsCount)
{
  let wordPull = []
  for (let i = 0; i < wordsCount; i++) {
      let word = word_db.getRandomWord();
      console.log(word);
      wordPull.push(word);
    }
  return wordPull;
}
sequelize.sync();

module.exports = Round;
