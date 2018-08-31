module.exports = function(RED) {
    function JoinNode(config) {
        RED.nodes.createNode(this,config);
		
		this.trigger = config.trigger;
		this.overwrite = config.overwrite;
		this.topic = config.topic;
    
		var context = this.context();
		
		
		
        var node = this;
  	
		
		this.on("input",function(msg) {
	
			var currentMsg = msg;
			var msgs = context.get('msgs') || {"joinedMsgs":[]};
			
			
			if(msg.topic === node.trigger){
				this.status({fill:"blue",shape:"dot",text:"sent"});
				
				//create entirely new msg to avoid circular error
				var newMsg ={};
				
				msgs.joinedMsgs.push(currentMsg);
				
				newMsg.payload = msgs;
				if(node.topic !=""){
					newMsg.topic = node.topic;
				}else{
					newMsg.topic = "joined topic";
				}
				node.send(newMsg);
				context.set('msgs',{"joinedMsgs":[]});
				msg = null;
			}
			else {
			
				this.status({fill:"yellow",shape:"ring",text:"waiting"});
				//add messages
				if(node.overwrite){
					var contains = false;
					for(var i = 0; i<msgs.joinedMsgs.length; i++){
						if(currentMsg.topic === msgs.joinedMsgs[i].topic){
							msgs.joinedMsgs[i] = currentMsg;
							contains = true;
						}
					}
					if(!contains){
						msgs.joinedMsgs.push(currentMsg);	
					}
					context.set('joinedMsgs',msgs);
				}else{
					msgs.joinedMsgs.push(currentMsg);
					context.set('joinedMsgs',msgs);
				
				}
			}

			     
        });
    }
    RED.nodes.registerType("join",JoinNode);
}