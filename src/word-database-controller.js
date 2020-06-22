import 'dotenv/config';



const fs = require('fs');
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getWordsArray() {
    var array = fs.readFileSync(process.env.WORDS_FILE).toString().split("\r\n");
    return array;
}
var methods = {
    getRandomWord: function () {
        var words = getWordsArray();
        var wordsCount = words.length;
        var randomInt = getRandomInt(wordsCount);
        return words[randomInt];
    }
};

module.exports = methods;