var http = require('http');
var express = require("express");
var RED = require("node-red");

// Create an Express app
var app = express();

// Add a simple route for static content served from 'public'
app.use("/",express.static("public"));

// Create a server
var server = http.createServer(app);


var editorTheme = {
    page: {
        title: "Field-Radar : Workflows",
        favicon: "/Users/yousefwadi/Documents/Code/RedCloud/globalSettings/theme/fav.png",
        css: "/Users/yousefwadi/Documents/Code/RedCloud/globalSettings/theme/main.css"
    },
    header: {
        title: "Workflows",
        image: "/Users/yousefwadi/Documents/Code/RedCloud/globalSettings/theme/logo.png", // or null to remove image
        url: "http://fieldradar.io" // optional url to make the header text/image a link to this url
    },
    deployButton: {
        type:"simple",
        label:"Save",
        //icon: "/absolute/path/to/deploy/button/image" // or null to remove image
    },
    menu: { // Hide unwanted menu items by id. see editor/js/main.js:loadEditor for complete list
        // "menu-item-import-library": false,
        // "menu-item-export-library": false,
        // "menu-item-keyboard-shortcuts": false,
          "menu-item-help": {
              label: "Field Radar IO",
             url: "http://fieldradar.io"
         }
    },
    userMenu: false, // Hide the user-menu even if adminAuth is enabled
    // login: {
    //     image: "/absolute/path/to/login/page/big/image" // a 256x256 image
    // }
}


// Create the settings object - see default settings.js file for other options
var settings = {
    httpAdminRoot:"/red",
    httpNodeRoot: "/api",
    userDir:"/Users/yousefwadi/Documents/Code/RedCloud/instances/ywadi",
    editorTheme: editorTheme,
    functionGlobalContext: { 
        enterprise: "ywadi"
    }    // enables global context
};

var settings2 = {
    httpAdminRoot:"/red2",
    httpNodeRoot: "/api2",
    userDir:"/Users/yousefwadi/Documents/Code/RedCloud/instances/nestrom",
    editorTheme: editorTheme,
    functionGlobalContext: { 
        enterprise: "nestrom"
    }    // enables global context
};

// Initialise the runtime with a server and settings
RED.init(server,settings);
RED.init(server,settings2);

// Serve the editor UI from /red
app.use(settings.httpAdminRoot,RED.httpAdmin);
app.use(settings2.httpAdminRoot,RED.httpAdmin);


// Serve the http nodes UI from /api
app.use(settings.httpNodeRoot,RED.httpNode);
app.use(settings2.httpNodeRoot,RED.httpNode);


server.listen(8000);

// Start the runtime
RED.start();