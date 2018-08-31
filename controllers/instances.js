const instancesModel = require("../models/instances");
const eventBus = require("../libs/eventBus").getInstance();
const pm2 = require('pm2');
const shellescape = require('shell-escape');
const instanceNamePrefix = "redCloud-";

//Connect to PM2
pm2.connect(function (err) {
    if (err) {
        console.error(err);
        process.exit(2);
    } else {
        instanceManager.startAllInstances((err, data) => {
            console.log("All instances Started")
        })
    }

});



var controllerFunctions = {
    getAll: (callback) => {
        instancesModel.find({}, (err, data) => {
            callback(err, data);
        })
    },
    insertOne: (data, callback) => {
        instancesModel.findOne({}).sort({ 'port': -1 }).then(function (dataForPort) {
            data.port = 1050;
            if (dataForPort != undefined) {
                data.port = dataForPort.port + 1;
            }
            var newInstance = new instancesModel(data);
            newInstance.save((err, data) => {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, data);
                    eventBus.emit('newInstanceAdded', data);
                    instanceManager.startRedInstance(data, (err, data) => {
                        if (err) {
                            throw (err)
                        } else {
                            console.log("Instance started: ", instanceNamePrefix + data.instanceRefID);
                        }
                    })
                }
            })

        }).catch((e) => {
            console.log(e);
        });
    },
    getOne: (instanceRefID, callback) => {
        instancesModel.find({ instanceRefID: instanceRefID }).exec((err, data) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        })
    },
    deleteOne: (instanceRefID, callback) => {
        instancesModel.findOneAndDelete({ instanceRefID: instanceRefID }, (err, data) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
                eventBus.emit('instanceDeleted', data);
                instanceManager.stopRedInstance(data, () => {
                    if (err) {
                        throw (err)
                    } else {
                        console.log("Instance Stopped and Deleted: ", instanceNamePrefix + data.instanceRefID);
                    }
                })
            }
        })
    },
    updateOne: (instanceRefID, data, callback) => {
        instancesModel.findOneAndUpdate({ instanceRefID: instanceRefID }, data, { new: true }, (err, data) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
                eventBus.emit('instanceUpdated', data);
                //TODO: Restart Instance 
            }
        })
    }
}

var webControllers = {
    getAll: (req, res) => {
        controllerFunctions.getAll((err, data) => {
            if (err) {
                res.send(400, err);
            }
            else {
                res.send(data);
            }
        })
    },
    insertOne: (req, res) => {
        var data = req.body;
        controllerFunctions.insertOne(data, (err, data) => {
            if (err) {
                res.send(400, err);
            }
            else {
                res.send(data);
            }
        })
    },
    getOne: (req, res) => {
        controllerFunctions.getOne(req.params.instanceRefID, (err, data) => {
            if (err) {
                res.send(400, err);
            } else {
                res.send(data);
            }
        })
    },
    deleteOne: (req, res) => {
        controllerFunctions.deleteOne(req.params.instanceRefID, (err, data) => {
            if (err) {
                res.send(400, err);
            } else {
                res.send(data);
            }
        })
    },
    updateOne: (req, res) => {
        if ("port" in req.body)
            delete req.body.port;
        controllerFunctions.updateOne(req.params.instanceRefID, req.body, (err, data) => {
            if (err) {
                res.send(400, err);
            } else {
                instanceManager.restartRedInstance(data, () => {
                    if (err) {
                        res.send(400, err);
                    } else {
                        res.send("Instance Updated and restarted : " + data.instanceRefID);
                    }
                })
            }
        })
    },
    restartInstance: (req, res) => {
        controllerFunctions.getOne(req.params.instanceRefID, (err, data) => {
            if (data.length > 0) {
                data = data[0];
            }

            if (err) {
                res.send(400, err);
            } else {
                instanceManager.restartRedInstance(data, () => {
                    if (err) {
                        res.send(400, err);
                    } else {
                        res.send("Instance Restarted: " + data.instanceRefID);
                    }
                })
            }
        })
    },
    stopAllInstances: (req, res) => {
        instanceManager.stopAllInstances((err, data) => {
            if (err) {
                res.send(400, err);
            } else {
                res.send("Stopping All Instances ....");
            }
        })
    }
};

var instanceManager = {
    startRedInstance: (metaData, cb) => {
        console.log("Starting ", metaData.instanceRefID, " .....")
        pm2.start({
            name: instanceNamePrefix + metaData.instanceRefID,
            script: './nodeRedManager/nodeRedRunner.js',
            args: shellescape([JSON.stringify(metaData)]),
            max_memory_restart: '100M'
        }, function (err, apps) {
            //console.log(err, apps);
            if (err) {
                cb(err, null);
            } else {
                cb(null, metaData);

            }
        });
    },
    stopRedInstance: (metaData, cb) => {
        pm2.delete(instanceNamePrefix + metaData.instanceRefID, (err) => {
            if (err) {
                cb(err, null);
            } else {
                cb(null, metaData);
            }
        });
    },
    restartRedInstance: (metaData, cb) => {
        instanceManager.stopRedInstance(metaData, (err, data) => {
            if (err) {
                cb(err, null);
            } else {
                instanceManager.startRedInstance(metaData, (err, data) => {
                    if (err) {
                        cb(err, null)
                    } else {
                        cb(null, metaData);
                    }
                })
            }
        })
    },
    listInstances: () => {

    },
    stopAllInstances: (cb) => {
        console.log("Stoping all Instances ", "/" + instanceNamePrefix + ".*")
        pm2.delete("/" + instanceNamePrefix + "(.*)/", (err) => {
            cb(null, true)
        })
    },
    startAllInstances: (cb) => {
        instanceManager.stopAllInstances((err, data) => {

            controllerFunctions.getAll((err, data) => {
                console.log(data)
                for (x in data) {
                    //TODO: ASYNC and make sure all are working properlly 
                     instanceManager.startRedInstance(data[x], (err, data) => {
                        if (err) throw (err);
                    })
                }
            })

        })
    }
}



module.exports.controllerFunctions = controllerFunctions;
module.exports.webControllers = webControllers;