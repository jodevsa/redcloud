// name: Approve 3
// outputs: 3
msg.payload.lastNode = node.name
if(!msg.payload[node.name])
{
    msg.payload[node.name]={approved:false};
    return [null, msg, null];
} else if (msg.payload[node.name].approved === false) {
    return [null, null, msg];    
} else {
    msg.payload[node.name]={approved:true};
    return [msg, null, null];    
}
