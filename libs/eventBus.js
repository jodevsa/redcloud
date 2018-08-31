var EventEmitter = require("events");

var Mongoose = (function () {
    var instance;
    function createInstance() {
        instance = new EventEmitter();
        return instance;
    }
    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();
module.exports.getInstance = () => {
    return Mongoose.getInstance()
};