var mongoose = require('../db/dbConnection').getInstance();

const instancesSchema = mongoose.Schema({
	instanceName: {type: String, minLength: 2, trim: true, maxlength: 300, required: true, unique: true},
    instanceRefID: {type: String, required: true, unique: true, index:true},
    nodeRedGlobalContext: {type: Object, reuired:true},
    port: {type: Number, required:true, unique:true} 
}, {collection: 'instances'})
module.exports =  mongoose.model('Instances', instancesSchema);