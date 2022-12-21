import AsyncStorage from '@react-native-async-storage/async-storage';
import MQTT from 'react-native-mqtt-angelos3lex';
import _ from 'underscore';
import SMBClient from 'react-native-smb';


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
          // alert(`MQTT.createtClient error: `+err)
          console.log(`MQTT.createtClient error: ${err}`);
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
    // alert(error)
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
      console.log(message.data);
  //     let data = message.data
  //     let newdata = data.replace(/'/g,'"')
  //     // alert(newdata)
  //     newdata = JSON.parse(newdata)
  //     try {
  //       this.smbClient = new SMBClient(
  //           '10.3.141.1',//ip
  //           '445',//port
  //           'pimylifeupshare',//sharedFolder
  //           'pimylifeupshare',//workGroup,
  //           'pi',//username,
  //           'raspberry',//password,
  //           (data) => {//callback - can be null (not setting)
  //               console.log('new SMBClient data (callback): ' + JSON.stringify(data));
  //           },
  //       )
  //       this.smbClient.connect((data)=> {
  //                   console.log('new SMBClient data (on connect): ' + JSON.stringify(data));
  //               })
        
      
  //       setTimeout(() => {
  //           this.smbClient.connectionStatus(
  //               (data) => {//callback
  //                   console.log('connectionStatus data (callback): ' + JSON.stringify(data));
  //                   console.log('connectionStatus is: ' +  data.status); //connect or disconnect
  //                   if (data.status === "connected") {
  //                     console.log(newdata.number);
  //                     for (let index = 1; index <= parseInt(newdata.number); index++) {
  //                       // const element = array[index];
                         
  //                       this.smbClient.isFileExist(
  //                         'clips/'+newdata.path+'/'+newdata.path+'_clip'+index.toString()+'.mp4' ,//the path to list files and folders
  //                         (data) => {//callback
  //                             console.log('isFileExist data (callback): ' + JSON.stringify(data));
  //                             if(data.isExist){
  //                                 this.smbClient.download(
  //                                   'clips/'+newdata.path+'/',//source path of file to download (in SMB server)
  //                                     '/storage/emulated/0/Download',//destination path to save downloaded file (in Android device)
  //                                     newdata.path+'_clip'+index.toString()+'.mp4',//the name of file to download
  //                                     (data) => {//callback
          
  //                                         console.log('download data (callback): ' + JSON.stringify(data));
  //                                     },
  //                                 );
  //                                 this.smbClient.on(
  //                                     'downloadProgress',
  //                                     (data) => {
                                        
  //                                       if (data.completed === true) {
                                        
  //                                         try {
  //                                           // let objT=data.destPath
                                            
  //                                           // AsyncStorage.getItem('clips_path').then((datas) => {
  //                                           //     if(datas === null){
  //                                           //       datas= objT
                                                  
  //                                           //       AsyncStorage.setItem('clips_path',datas)
  //                                           //     }else{
  //                                           //        //data=data+','+JSON.stringify(objT)
  //                                           //       datas=datas+','+objT 
  //                                           //       console.log(datas)
  //                                           //       AsyncStorage.removeItem('clips_path').then(
                                                                      
  //                                           //       AsyncStorage.setItem('clips_path',datas)
                                                  
  //                                           //      )
  //                                           //     }
  //                                           // }).done()
  //                                           let obj ={
  //                                             name: data.fileName
  //                                           }
  //                                           console.log(obj);
  //                                           AsyncStorage.getItem('clips_name').then((datas) => {
  //                                             if(datas === null){
  //                                               datas= JSON.stringify(obj)
                                                
  //                                               AsyncStorage.setItem('clips_name',datas)
  //                                             }else{
  //                                                //data=data+','+JSON.stringify(objT)
  //                                               datas=datas+','+JSON.stringify(obj)
  //                                               console.log(datas)
  //                                               AsyncStorage.removeItem('clips_name').then(
                                                                    
  //                                               AsyncStorage.setItem('clips_name',datas)
                                                
  //                                              )
  //                                             }
  //                                         }).done()
                                                                  
  //                                         } catch (error) {
  //                                             // alert(error)
  //                                             console.log(error); 
  //                                            }
  //                                       }
  //                                         console.log('download progress data (on downloadProgress): ' + JSON.stringify(data))
                                          
  //                                     },
  //                                 );
  //                             }else{
  //                                 console.log('file not exist in server. ' );
  //                             }
  //                         },
  //                     );
                        
  //                     }
  //                   } else {
  //                     // alert("not connect to smb")
  //                   }
  //               },
  //           )
           
            
  //       }, 2000);
        
       

  //       this.smbClient.on(
  //           'error',
  //           (data) => {
  //             // alert('error in SMBClient (on error): ' + JSON.stringify(data))
  //               console.log('error in SMBClient (on error): ' + JSON.stringify(data));
  //           },
  //       );
        
  //   } catch (error) {
  //       console.log(error);
  //   }
  }
  },


};

// export default MqttReceiveManage;