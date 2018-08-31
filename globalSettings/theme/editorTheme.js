module.exports = {
    page: {
        title: "Field-Radar : Workflows",
        //TODO: Fix FAV to configs
        favicon: "/Users/yousefwadi/Documents/Code/RedCloud/globalSettings/theme/fav.png",
        //TODO: Fix CSS TO configs
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
        //"menu-item-edit-palette":false,
        "menu-item-user-settings":false,
        "menu-item-node-red-version": false,
         "menu-item-help": {
             label: "Field Radar",
             url: "http://fieldradar.io"
         }
    },
    //userMenu: false, // Hide the user-menu even if adminAuth is enabled
    login: {
        image: "/Users/yousefwadi/Documents/Code/RedCloud/globalSettings/theme/login.png" // a 256x256 image
    }
}