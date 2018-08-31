/**
 * Copyright 2016 mcarboni@redant.com
 *
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/



 module.exports = function(RED) {
    'use strict';

    var global_id = 0;

    var outputs = {}, counters = {};

    function injectId(msg,id) {
        if (!msg.__combineId) {
            msg.__combineId = [];
        }
        msg.__combineId.unshift({
            id : id
        });
    }

    function injectOrder(msg,i) {
        msg.__combineId[0].order = i;
    }

    function CombineStartNode(n) {
        var node = this;

        RED.nodes.createNode(this, n);
        this.number = parseInt(n.number,10);
        this.waitArray = n.waitArray;
        this.iterateArray = n.iterateArray;


        this.on('input', function (msg) {
            var id;
            if (node.waitArray) {
                if (Array.isArray(msg.payload)) {
                    id = global_id++;
                    injectId(msg,id);
                    outputs[id] = [];
                    counters[id] = msg.payload.length;
                    if ( node.iterateArray ) {
                        for ( var i=0;i<msg.payload.length;i++ ) {
                            var msgCopy = RED.util.cloneMessage(msg);
                            injectOrder(msgCopy,i);
                            msgCopy.payload = msg.payload[i];
                            node.send(msgCopy);
                        }
                    } else {
                        node.send(msg);
                    }
                }
            } else {
                id = global_id++;
                injectId(msg,id);
                outputs[id] = [];
                counters[id] = node.number;
                node.send(msg);
            }
        });
    }
    function CombineEndNode(n) {
        var node = this;

        RED.nodes.createNode(this, n);
        this.saveOutput = n.saveOutput;

        this.on('input', function (msg) {
            if (Array.isArray(msg.__combineId)) {
                var id = msg.__combineId[0].id;
                var order = msg.__combineId[0].order || false;
                if ( node.saveOutput ) {
                    if ( order ) {
                        outputs[id][order] = msg.payload;
                    } else {
                        outputs[id].push(msg.payload);
                    }
                }
                if (0 >= --counters[id]) {
                    if (node.saveOutput) {
                        msg.payload = outputs[id];
                    }
                    delete outputs[id];
                    delete counters[id];
                    msg.__combineId.shift();
                    if (!msg.__combineId.length) {
                        delete msg.__combineId;
                    }
                    node.send(msg);
                }
            }
        });
    }

    RED.nodes.registerType('Combine Start',CombineStartNode);
    RED.nodes.registerType('Combine End',CombineEndNode);
};
