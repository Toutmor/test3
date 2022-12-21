
import AsyncStorage from '@react-native-async-storage/async-storage';
import MQTT from 'react-native-mqtt-angelos3lex';
import _ from 'underscore';


module.exports = {  // cached singleton instance
  QOS: 1, // Only 0 and 1 supported by Rabbit
  props: null,
  randIdCreator() {
    // eslint-disable-next-line
    const S4 = () => (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    return `random${S4()}${S4()}${S4()}${S4()}${S4()}${S4()}${S4()}${S4()}${S4()}${S4()}${S4()}${S4()}${S4()}${S4()}${S4()}${S4()}${S4()}`;
  },
  create(userID, connectionProps = {}) {
    if (userID && connectionProps) {
      // http://www.hivemq.com/demos/websocket-client/
      this.onConnectionOpened = this.onConnectionOpened.bind(this);
      this.onConnectionClosed = this.onConnectionClosed.bind(this);
      this.onError = this.onError.bind(this);
      this.onMessageArrived = this.onMessageArrived.bind(this);
      this.disconnect = this.disconnect.bind(this);

      const deviceId = this.randIdCreator()
        .replace(/[^a-zA-Z0-9]+/g, '');

      this.conProps = _.extend({
        clientId: `realtime.${userID}.${deviceId}`,
        channelToUse: userID,
        auth: false,
        clean: true, // clean session YES deletes the queue when all clients disconnect
        
      }, connectionProps);

      /* create mqtt client */
      
      MQTT.createClient(this.conProps)
        .then((client) => {
          this.client = client;
          client.on('closed', this.onConnectionClosed);
          client.on('error', this.onError);
          client.on('message', this.onMessageArrived);
          client.on('connect', this.onConnectionOpened);
          client.connect();
          
        }).catch((err) => {
          // alert(`MQTT.createtClient error: ${err}`)
          console.log(`MQTT.createtClient error: ${err}`);
         // console.error(`MQTT.createtClient error: ${err}`);
        });
    }
  },

  disconnect() {
    if (this.client) {
      console.log('Now killing open realtime connection.');
      this.client.disconnect();
    }
  },

  onError(error) {
    // alert(`MQTT onError: ${error}`)
    console.log(`MQTT onError: ${error}`);
  },

  onConnectionOpened() {
    // subscribe to the client channel
    console.log(this.conProps.channelToUse);
    this.client.subscribe(this.conProps.channelToUse, this.QOS);
    // this.client.publish(this.conProps.channelToUse, "test from app", this.QOS, false);
    
    console.log('MQTT onConnectionOpened');
  },

  onConnectionClosed(err) {
    console.log(`MQTT onConnectionClosed ${err}`);
  },

  onMessageArrived(message) {
    if (message) {
      console.log(message);
      // let data = message.data
      // let newdata = data.replace(/'/g,'"')
      // // console.log(newdata);
      // try {

      //   AsyncStorage.getItem('courbe_data').then((data) => {
      //     if(data === null){
      //     data= newdata
      //       AsyncStorage.setItem('courbe_data',data)
      //     }else{
      //       data=data+','+newdata
      //       AsyncStorage.removeItem('courbe_data').then(
            
      //       AsyncStorage.setItem('courbe_data',data)
      //       )
      //     }
      //     }).done()
        
      // } catch (error) {
      //   console.log(error);
      // }
      
      //console.log(json.timestamp)
      //console.log(JSON.stringify(message.data).split("Decoded Message No"))
    }
  },


};