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

    function endTests(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        var nodes = RED.nodes.loadFlows();
        node.warn("NODES"+JSON.stringify(nodes))
        
        var flowContext = this.context().flow;
        var currentArray = flowContext.get("endTests"); 
            if(currentArray === undefined){
                // node.warn("EMPTY");
                currentArray = [this.id];
                flowContext.set("endTests", currentArray);
            } else {
                // node.warn("FULL");
                currentArray.push(this.id);
                flowContext.set("endTests", currentArray);
            }

        for (x in node.wires) {
            for (y in node.wires[x]) {
                var wire = node.wires[x][y];
                //node.warn("WIRE: " + wire);
                //node.warn(JSON.stringify(RED.nodes.getNode(wire)));
                if (RED.nodes.getNode(wire).type == 'debug') {
                    node.warn("1 connected");
                }
            }
        }

        node.on('input', function (msg) {
            //node.warn(JSON.stringify(node));
            node.send(msg);
        });
    }
    RED.nodes.registerType("endTests", endTests);
}