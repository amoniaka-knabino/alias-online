function randStr() {
    return Math.random().toString(36).substr(2); // remove `0.`
};

var methods = {
    getRandomInt: function(max) {
        return Math.floor(Math.random() * Math.floor(max));
    },    
    token: function() {
        return randStr() + randStr(); // to make it longer
    }
};

module.exports = methods;