const fs = require('fs');
const helpers = require('./helpers.js');

function getWordsArray() {
    console.log(process.env.WORDS_FILE);
    var array = fs.readFileSync(process.env.WORDS_FILE).toString().split("\r\n");
    return array;
}
var methods = {
    getRandomWord: function () {
        var words = getWordsArray();
        var wordsCount = words.length;
        var randomInt = helpers.getRandomInt(wordsCount);
        return words[randomInt];
    }
};

module.exports = methods;
