const Round = require('./round-class.js');

class Player{
    constructor(name)
    {
        this.Name = name;
        this.Token = token();
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

var rand = function() {
    return Math.random().toString(36).substr(2); // remove `0.`
};

var token = function() {
    return rand() + rand(); // to make it longer
};

module.exports = Player;