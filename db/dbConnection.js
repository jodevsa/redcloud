var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var Mongoose = (function () {
    var instance;
    function createInstance() {
        //mongoose.connect(process.env.MONGOOSE_HOST);
         mongoose.connect("mongodb://redcloud:redcloud123@ds123852.mlab.com:23852/redcloud");
        return mongoose;
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