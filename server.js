const http = require('http');
const express = require("express");
var bodyParser = require('body-parser')

//Controllers
const instanceController = require("./controllers/instances").webControllers

//Express App
var app = express();
const proxy = require("./proxyManager")(app);

app.use(bodyParser.json());
app.use("/", express.static("public"));

var server = http.createServer(app);

//PROXY Logic

//TODO: Move to routs 
app.get('/instance/:instanceRefID', (req, res) => {
    instanceController.getOne(req, res)
})

app.get('/instances', (req, res) => {
    instanceController.getAll(req, res);
})

app.get('/instances/stopAll', (req, res) => {
    instanceController.stopAllInstances(req, res);
})

app.get('/instance/restart/:instanceRefID', (req, res) => {
    instanceController.restartInstance(req, res);
})

app.post('/instance', (req, res) => {
    if (!("instanceRefID" in req.body)) {
        res.statusCode = 406;
        res.send("instanceRefID is required.").end();
    }
    else if (!("instanceName" in req.body)) {
        res.statusCode = 406;
        res.send("instanceName is required.").end();
    }
    else if (!("nodeRedGlobalContext" in req.body)) {
        console.log(req.body)
        res.statusCode = 406;
        res.send("nodeRedGlobalContext is required.")
    }
    else {
        instanceController.insertOne(req, res);
    }

})

app.put('/instance/:instanceRefID', (req, res) => {
    instanceController.updateOne(req, res);
})

app.delete('/instance/:instanceRefID', (req, res) => {
    instanceController.deleteOne(req, res);
})



server.listen(1024);