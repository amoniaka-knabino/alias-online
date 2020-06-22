const word_db = require('./word-database-controller.js');
const Word = require('./word-class.js');

const MAXS_WORDS_PER_ROUND = 2

class Round{
    constructor()
    {
        this.TotalScore = 0;
        this.IsFinished = false;
        this.WordPull = this.createWordsPull(MAXS_WORDS_PER_ROUND)
    }

    createWordsPull(wordsCount)
    {
        var wordPull = []
        for (let i = 0; i < wordsCount; i++) {
            var word = word_db.getRandomWord();
            wordPull.push(word);
          }
        return wordPull;
    }

    getPull()
    {
        return this.WordPull;
    }
}

module.exports = Round;