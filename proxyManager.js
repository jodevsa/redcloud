const instanceController = require("./controllers/instances").controllerFunctions;
var express = require('express');
var proxy = require('http-proxy-middleware');

module.exports = () => {
    var app = express();
    instanceController.getAll((err, data) => {
        var ROUTER = {};
        if (err) {
            console.log(err);
        } else {
            for (x in data) {
                var instance = data[x];
                ROUTER["/"+instance.instanceName] = 'http://localhost:'+instance.port+"/"
            }
            app.use(proxy({
                target: 'http://example.com',
                changeOrigin: true,
                ws:true,
                router: ROUTER
              }));
        }
    })
    app.listen(1025);

}
