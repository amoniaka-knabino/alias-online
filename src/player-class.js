const Round = require('./round-class.js');
class Player{
    constructor(name, token)
    {
        this.Name = name;
        this.Token = token;
        this.Score = 0;
        this.Round = new Round();
    }

    finishRound()
    {
        this.Round.finishRound();
        this.updateScore(this.Round.TotalScore)
    }

    updateScore(delta)
    {
        this.Score += delta;
    }

    dict()
    {
        return {"Name": this.Name, "Token": this.Token, "Score":this.Score, "Round":this.Round};
    }
}

module.exports = Player;