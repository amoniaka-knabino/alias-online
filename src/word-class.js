class Word{
    constructor(wordStr)
    {
        this.Word = wordStr;
        this.IsGuessed = false;
        this.IsSkipped = false;
    }

    skip()
    {
        this.IsSkipped = true;
    }

    guess()
    {
        this.IsGuessed = true;
    }

    dict()
    {
        return {"Word":this.Word, "IsGuessed":this.IsGuessed, "IsSkipped":this.IsSkipped};
    }

}

module.exports = Word;