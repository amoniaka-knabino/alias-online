let methods = {
    getRandomInt: function(max) {
        return Math.floor(Math.random() * Math.floor(max));
    },
    randStr: function() {
        return Math.random().toString(36).substr(2); // remove `0.`
    }
};

module.exports = methods;
