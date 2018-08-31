// var pm2 = require('pm2');
// const instanceController = require("../controllers/instances").controllerFunctions;
// var shellescape = require('shell-escape');
// const instanceNamePrefix = "redCloud-";
// const eventBus = require("../libs/eventBus").getInstance();
// const getInstanceMeta = instanceController.getOne;
// pm2.connect(function (err) {
//     if (err) {
//         console.error(err);
//         process.exit(2);
//     }

// });


// module.exports.events = () => {

//     eventBus.on("newInstanceAdded", (metaData) => {
//         startRedInstance(metaData);
//         console.log("Create: ", metaData);
//     })

//     eventBus.on("instanceDeleted", (metaData) => {
//         stopRedInstance(metaData);
//         console.log("Delete: ", metaData);
//     })

//     eventBus.on("instanceUpdated", (metaData) => {
//         console.log("Update: ", metaData);
//     })

//     eventBus.on("stopAllInstances", ()=>{
//         stopAllInstances(()=>{
//             if(err) { 
//                 throw (err)
//             } else {
//                 console.log("All Instances Stopped...");
//             }
//         });
//     })

// }
// //TODO: FIX CALL BACKS
// //TODO: UPDATE TO RESTART PROCESS (STOP/START)
// //TODO: LOAD ALL ON START-UP AFTER A KILL ALL ? 

// function startRedInstance(metaData, cb) {
//     console.log("Starting ", metaData.instanceRefID, " .....")
//     pm2.start({
//         name: instanceNamePrefix + metaData.instanceRefID,
//         script: './nodeRedManager/nodeRedRunner.js',
//         args: shellescape([JSON.stringify(metaData)]),
//         max_memory_restart: '100M'
//     }, function (err, apps) {
//         //console.log(err, apps);
//         if (err) {
//             cb(err, null);
//         } else {
//             cb(null, metaData);

//         }
//     });
// }
// function stopRedInstance(metaData, cb) {
//     pm2.delete(instanceNamePrefix + metaData.instanceRefID, (err) => {
//         if (err) {
//             cb(err, null);
//         } else {
//             cb(null, metaData);
//         }
//     });
// }

// //TODO: Create route and test 
// function restartRedInstance(metaData, cb) {
//     stopRedInstance(metaData, (err, data)=>{
//         if(err) {
//             cb(err, null);
//         } else {
//             startRedInstance(metaData, (err, data)=>{
//                 if(err) {
//                     cb(err,null)
//                 } else {
//                     cb(null, metaData);
//                 }
//             })     
//         }
//     })
// }

// function listInstances() {

// }

// function stopAllInstances(cb) {
//     console.log("Stoping all Instances ", "/"+instanceNamePrefix+".*")
//     pm2.stop("/"+instanceNamePrefix+".*", (err)=>{
//         if(err){
//             cb(err, null)
//         } else {
//             cb(null, true)
//         }
//     })
// }

// function startAllInstances() {

// }

// module.exports.instanceControll = {
//     stopAllInstances: stopAllInstances
// }