const Round = require("./round-class");
const helpers = require('../helpers.js');

const GameStatus = Object.freeze({"NotStarted":0, "Started":1, "Finished":2})

class Game
{
    constructor(roundCount, roundTime, firstPlayer)
    {
        this.Status = GameStatus.NotStarted;
        this.RoundCount = roundCount;
        this.Players = [firstPlayer]
        this.currentRoundNumber = 0;
        this.Rounds = []
        this.InviteToken = helpers.randStr();
    }

    startGame()
    {
        this.Status = GameStatus.Started;
    }

    finishGame()
    {
        this.Status = GameStatus.Finished;
    }

    addPlayer(player)
    {
        this.Players.push(player);
    }

    startRound()
    {
        this.currentRoundNumber++;
        var currentPlayer = this.getCurrentPlayer();
        var currentRound = new Round(currentPlayer);
        this.Rounds.push(currentRound);
        if (this.currentRoundNumber == this.RoundCount) this.finishGame();
    }

    finishRound()
    {
        this.getCurrentRound().finish();
    }

    getCurrentPlayer()
    {
        return this.Players[this.currentRoundNumber-1 % this.Players.length];
    }

    getCurrentRound()
    {
        return this.Rounds[this.currentRoundNumber-1];
    }

    nextRound()
    {
        this.finishRound();
        this.startRound();
    }

    dict()
    {
        return {"Players": this.Players, "Rounds": this.Rounds, "currentRound": this.currentRoundNumber, "Status":this.Status};
    }
}

module.exports = Game;