const fs = require('fs');
const helpers = require('../helpers.js');

function getWordsArray() {
    // console.log(process.env.WORDS_FILE);
    let array = fs.readFileSync(process.env.WORDS_FILE).toString().split("\r\n");
    return array;
}
let methods = {
    getRandomWord: function () {
        let words = getWordsArray();
        let wordsCount = words.length;
        let randomInt = helpers.getRandomInt(wordsCount);
        return words[randomInt];
    }
};

module.exports = methods;
