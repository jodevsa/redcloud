// module.exports = function(RED) {
//     function tests(config) {
//         RED.nodes.createNode(this,config);
//         var node = this;
//         node.error("TEST ERROR")
//         node.on('input', function(msg) {
//             //msg.payload = msg.payload.toLowerCase();
//             node.warn(JSON.stringify(node));
//             node.warn(JSON.stringify(RED.nodes.getNode("6e1791fd.fb2a2")));
//             node.send(msg);
//         });
//     }
//     RED.nodes.registerType("tests",tests);
// }


module.exports = function (RED) {
    function tests(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        if(this.context().flow.get("nodeReg") === undefined)
        { 
            this.context().flow.set("nodeReg", {"tests":[this.id]});
        }
        else {
            this.context().flow.set("nodeReg", this.context().flow.get("nodeReg").tests.push(this.id));
        }

        for (x in node.wires) {
            for (y in node.wires[x]) {
                var wire = node.wires[x][y];
                node.warn(wire);
                node.warn(RED.nodes.getNodeConfig(wire))
            }
        }

        node.on('input', function (msg) {
            //node.warn(JSON.stringify(node));
            node.send(msg);
        });
    }
    RED.nodes.registerType("tests", tests);
}