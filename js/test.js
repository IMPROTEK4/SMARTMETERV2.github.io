var connection_status= false;

function BtnConnect(){
  
    clientID = document.getElementById("box_clientID").value;
    host = 'blithesome-chiropractor.cloudmqtt.com';
    port = 443;

    // Create a client instance
    // client = new Paho.MQTT.Client('e8f424ec.emqx.cloud', 8083, "test");
    client = new Paho.MQTT.Client(host, Number(port), clientID);

    // set callback handlers
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

    // connect the client
    client.connect({
    onSuccess: onConnect,
    // onFailure: onFailure,
    useSSL: true,

    userName: 'rwufzabs',
    password: 'kVZNw5Tuj6e5',
    mqttVersion:4
});
}


// called when the client connects
function onConnect() {

  // Once a connection has been made, make a subscription and send a message.
  console.log("onConnect");
  connection_status = true ;
  // alert("Connect to server is success.")

  const textBox = document.getElementById('box_clientID');
  const connectButton = document.getElementById('btn_connect');
  connectButton.disabled = true;
  setTimeout(() => {
    // console.log('Connection successful!');

     // Clear the text box after connection
     textBox.value = '';
     textBox.disabled = true;
     textBox.style.backgroundColor ='greenyellow';

    // Disable the button once connected
    connectButton.disabled = true;
    connectButton.textContent = 'CONNECTED';
    connectButton.style.Color = 'red';

  }, 2000);


  const subTopic1 = 'controller1_data' ;
  const subTopic2 = 'controller1_con_status';
  // subTopic5= 'alert' ;
  qos = 0;
  client.subscribe(subTopic1);
  client.subscribe(subTopic2);


}
  
  
// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+ responseObject.errorMessage);
    alert("MQTT Connection Lost");
  }
}

function toggleSwitch() {
    // Get the checkbox element
    var checkbox = document.getElementById("switch");
  
    // Check if the checkbox is checked
    if (checkbox.checked) {
      // If checked, publish "1" (or any desired value) to MQTT
      publishToMQTT("1");
    } else {
      // If not checked, publish "0" (or any desired value) to MQTT
      publishToMQTT("0");
    }
  }
  
  function publishToMQTT(value) {
    // Replace this with your MQTT logic to publish the value
    // For example, you can use the Paho MQTT library:
    // client.send('your_topic', value);
    console.log('Published to MQTT:', value);
  }

  // called when a message arrives
function onMessageArrived(message) {
    console.log("onMessageArrived:"+message.payloadString);
}  
