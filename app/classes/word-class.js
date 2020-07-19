const WordStatus = Object.freeze({"Undefined":0, "Skipped":1, "Guessed":2})

class Word{
    constructor(wordStr)
    {
        this.Word = wordStr;
        this.Status = WordStatus.Undefined;
    }

    skip()
    {
        this.Status = WordStatus.Skipped;
    }

    guess()
    {
        this.Status = WordStatus.Guessed;
    }

    dict()
    {
        return {"Word":this.Word, "Status":this.Status};
    }

}

module.exports = Word;
