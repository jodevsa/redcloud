var http = require('http');
var express = require("express");
var RED = require("node-red");

const mainSettings = require("../globalSettings/settings/main");
const mainThemeSettings = require("../globalSettings/theme/editorTheme.js");
var instanceData = (JSON.parse(process.argv[2]));

// Create an Express app
var app = express();


// Add a simple route for static content served from 'public'
app.use("/",express.static("public"));

// Create a server
var server = http.createServer(app);

// Create the settings object - see default settings.js file for other options
mainThemeSettings.header.title = "Workflows: "+instanceData.instanceName;
var settings = {
    httpAdminRoot: "/"+instanceData.instanceName+"/red/",
    httpNodeRoot: "/"+instanceData.instanceName+"/api/",
    //TODO: Need to mount the instances on S3 as a local drive 
    userDir:"./instances/"+instanceData.instanceRefID,
    nodesDir:"./redCloudNodes/nodes",
    editorTheme: mainThemeSettings,
    functionGlobalContext: {instance:{ instanceName:instanceData.instanceName, instanceRefID:instanceData.instanceRefID}, data:instanceData.nodeRedGlobalContext},
    // adminAuth: {
    //     type: "credentials",
    //     users: [{
    //         username: "workflowAdmin",
    //         password: "$2a$08$9B6CqCht6IZzxZhfg1XIiuJaFQaNBk5iBVIFNYeFWFE.CBQqj7r/6",
    //         permissions: "*"
    //     }]
    // }
};

// Initialise the runtime with a server and settings
RED.init(server,settings);

// Serve the editor UI from /red
app.use(settings.httpAdminRoot,RED.httpAdmin);

// Serve the http nodes UI from /api
app.use(settings.httpNodeRoot,RED.httpNode);

server.listen(instanceData.port);
console.log("CWD: ",process.cwd())
console.log("Running Instance: "+instanceData.instanceRefID)
console.log("Instance Node Red Editor: /red")
console.log("Instance Node Red API: /api")
console.log("Instance Node Red Port: "+ instanceData.port)
// Start the runtime
RED.start();