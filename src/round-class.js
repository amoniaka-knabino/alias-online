const word_db = require('./word-database-controller.js');
const Word = require('./word-class.js');

const MAXS_WORDS_PER_ROUND = 5

class Round{
    constructor()
    {
        this.TotalScore = 0;
        this.IsFinished = false;
        this.WordPull = this.createWordsPull(MAXS_WORDS_PER_ROUND)
        this.CurrentWord = this.WordPull.pop()
        this.GuessedWords = []
        this.SkippedWords = []
    }

    finish()
    {
        this.IsFinished = true;
    }

    guessCurrentWord()
    {
        this.CurrentWord.guess();
        this.TotalScore++;
        this.GuessedWords.push(this.CurrentWord);
        this.changeCurrentWord()
    }

    skipCurrentWord()
    {
        this.CurrentWord.skip();
        this.TotalScore--;
        this.SkippedWords.push(this.CurrentWord);
        this.changeCurrentWord()
    }

    createWordsPull(wordsCount)
    {
        var wordPull = []
        for (let i = 0; i < wordsCount; i++) {
            var word = new Word(word_db.getRandomWord());
            wordPull.push(word);
          }
        return wordPull;
    }

    getPull()
    {
        return this.WordPull;
    }

    changeCurrentWord()
    {
        this.CurrentWord = this.WordPull.pop();
    }

    dict()
    {
        return {"TotalScore": this.TotalScore, "IsFinished": this.IsFinished, "GuessedWords": this.GuessedWords, "SkippedWords": this.SkippedWords}
    }
}

module.exports = Round;