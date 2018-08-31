# node-red-contrib-join
Node-Red Node to join 2 or more messages

<img src="https://github.com/Chris1234567899/node-red-contrib-join/blob/master/screenshots/screenshot2.PNG" />

<p> Messages from all input nodes are joined and put into the new payload. Since the messages might not arrive on the same time, there can be defined one input node as trigger. 
The input node that triggers must be defined by its topic. 
If messages arrive very asynchronously it could happen that one node sends multiple inputs in the time interval where the triggering node sends just once. 
In such a case you can choose if you want to overwrite the multiple input messages (for every node) or just add them.
	
</p></br>
The new msg would look for example like this for 3 input nodes:

    {
        "payload":{
                "joinedMsgs":[
                        {
                            "topic":"abc",
                            "payload":"abc string",
                            "_msgid":"e677e6b5.2a7738"
                        },
                        {
                            "topic":"def",
                            "payload":"def string",
                            "_msgid":"94a9460.f28acb8"
                        },
                        {
                            "topic":"trigger",
                            "payload":"trigger string",
                            "_msgid":"b063ac1.29ddb5"
                        }
                ]
        },
        "topic":"joined topic",
        "_msgid":"4e340eed.18b2b"
    }
    

	
	
<h2>License: </h2>
<b>MIT:</b>
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
