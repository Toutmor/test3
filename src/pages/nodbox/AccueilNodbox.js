import React from 'react';
import {
 Text, 
  View, 
  Image, SafeAreaView,
  ScrollView,
 
  TouchableHighlight,
  
  BackHandler,
  Alert,
  TouchableOpacity
} from 'react-native';

// import {ChonseSelect} from 'react-native-chonse-select'
import { Icon } from 'react-native-elements';

import SSHClient from 'react-native-sshclient';

import { DataTable } from 'react-native-paper';
import {Actions} from 'react-native-router-flux'
import Drawer from 'react-native-drawer'
import ic_menu from '../../images/menu.png'
import Spinner from 'react-native-loading-spinner-overlay';
import ReceiveVariablesMqtt from '../../components/nodboxMQTT/receiveRealTimeData'
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as Sentry from '@sentry/react-native';
ReceiveVariablesMqtt.create(
	'test/real',//userID pour canal

	{
	 uri: 'mqtt://10.3.141.1:1883',//url 
	},
 );



export default class AccueilNodbox extends React.Component {
    constructor(props){
        super(props)
    
        this.state = {
          // scanning:false,
          // peripherals: new Map(),
          // appState: '',
          //variables reçues de la box
          data:[],
          engineSpeedData : 0,
          engineSpeedDataString : "",
          
          engineTorqueData : 0,
          
          speedData :0,
          speedDataString : "",
          
          throttlePositionData:0,
          throttlePositionDataString:"",
          
          clutchData:0,
          brakeData:0,
          rapport :0,
          total_fuel_cons :0,
          
          

          timeD:"hh:mm:ss",

          //chrono
          isRunning :false,
          mainTimer : null,
          mainTimerStart: null,
          mainTimerStop : null,

          //parcours
          parcours : 0,

         
          //tableaux
          esDataChart: [],
          esTimestampChart : [],

          fuelConsChart :[],
          fuelConsTChart :[],

          fuelRateChart :[],
          fuelRateTimestamps:[],
          
          mfDataChart: [],
          mfTimestampChart :[],

          etorqueDataChart: [],
          etTimestampChart : [],

          sDataChart : [],
          sTimestampChart : [],

          thPDataChart : [],
          thPTimestampChart : [],

          clDataChart : [],
          clTimestampChart : [],

          brDataChart: [],
          brTimestampChart :[],

          rappDataChart:[],
          rappTimeChart:[],

          time:[],
           //gestion erreur
           error:false,
           errorSmb:"",
           errorMqtt:"",
          isMessage:false,
          isCalled:false,
          spinner:false
          //stats cloture
         
         
          
        }
        
    
   
      
        
      }
      convertTime(tim){
        try {
          let time=tim.replace(" ","T");
          // console.log(temp);
          let tps = new Date(time)
          // console.log(tps);
          let mms = tps.getMilliseconds()/1000
          // console.log(mms);
          let seconds = tps.getSeconds()
          // console.log(seconds);
          let mintoSec = tps.getMinutes() * 60
        
          let timeToSeconds = mintoSec + seconds+mms
          //console.log(timeToSeconds);
          return timeToSeconds;
        } catch (error) {
          console.log(error);
        }
        }
    	 // fonction pour envoyer des messages au pi4
  // sendMessage(){

	//   try {
  //     let message = {
  //     timestamp: '2021-05-20 10:13:12.005199', 
  //     Regime_moteur: 1686.25,
  //      Vitesse_vehicule: 129.76, 
  //      Couple_moteur_brut: -17.0, 
  //      Pedale_acc: 43.66499999999999, 
  //      Position_embrayage: 1, 
  //      Pedale_frein: 0, 
  //      Conso_carb_cumulee: 52840, 
  //      Gear: 0
  //     }
  //     let str_mess = JSON.stringify(message)
  //     ReceiveVariablesMqtt.client.publish( ReceiveVariablesMqtt.conProps.channelToUse,str_mess,1, false); 

		
		  
	//   } catch (error) {
	// 	  console.log(error);
	//   }
	
  // }
  async getData(){
    
        try {
         
   
          let courbe_data = await AsyncStorage.getItem('courbe_data')
          let json_data = JSON.parse("["+courbe_data+"]")
          //console.log(json_data);
          this.setState({data : json_data})
          // if (this.state.data.length >=1) {
            // console.log('rrr');
          if (this.state.error === false && this.state.isMessage) {
            if (this.state.data[this.state.data.length-1].Couple_moteur_brut !== undefined) {
              console.log('ffff');
              this.setState({engineTorqueData: this.state.data[this.state.data.length-1].Couple_moteur_brut})
              this.state.etorqueDataChart.push(this.state.data[this.state.data.length-1].Couple_moteur_brut)
            }else{
              console.log("hjjg");
              if (this.state.etorqueDataChart.length !== 0) {
                console.log("hjjg1");
                this.state.etorqueDataChart.push(this.state.etorqueDataChart[this.state.etorqueDataChart.length-1])
                this.setState({engineTorqueData: this.state.etorqueDataChart[this.state.etorqueDataChart.length-1] })
              } else {
                console.log("hjjg2");
                this.state.etorqueDataChart.push(0)
                this.setState({engineTorqueData:0})
              }
            }
          
          //regime
          // console.log("REGIME: "+this.state.data[this.state.data.length-1].Regime_moteur);
        
         
            if(this.state.data[this.state.data.length-1].Regime_moteur !== undefined){
              this.state.esDataChart.push(this.state.data[this.state.data.length-1].Regime_moteur)
              this.setState({engineSpeedData :this.state.data[this.state.data.length-1].Regime_moteur })
            }else{
              if (this.state.esDataChart.length !== 0) {
                this.setState({engineSpeedData :this.state.esDataChart[this.state.esDataChart.length-1]})
                this.state.esDataChart.push(this.state.esDataChart[this.state.esDataChart.length-1])
              } else {
                this.state.esDataChart.push(0)
                this.setState({engineSpeedData : 0})
              }
            }
          
          // //vitesse
          // console.log("Vitesse: "+this.state.data[this.state.data.length-1].Vitesse_vehicule);
    
          if (this.state.data[this.state.data.length-1].Vitesse_vehicule !== undefined) {
            this.state.sDataChart.push(this.state.data[this.state.data.length-1].Vitesse_vehicule)
            this.setState({speedData : this.state.data[this.state.data.length-1].Vitesse_vehicule })
          } else {
              if (this.state.sDataChart.length !== 0) {
                this.state.sDataChart.push(this.state.sDataChart[this.state.sDataChart.length-1])
                this.setState({speedData : this.state.sDataChart[this.state.sDataChart.length-1]})
              } else {
                this.state.sDataChart.push(0)
                this.setState({speedData : 0})
              }
            }
          
          //rapport
          // console.log("rapport: "+this.state.data[this.state.data.length-1].Gear);
    
            if (this.state.data[this.state.data.length-1].Gear  !== undefined) {
              this.state.rappDataChart.push(this.state.data[this.state.data.length-1].Gear)
              this.setState({rapport : this.state.data[this.state.data.length-1].Gear})
            } else {
              if (this.state.rappDataChart.length !== 0) {
                this.setState({rapport : this.state.rappDataChart[this.state.rappDataChart.length-1]})
                this.state.rappDataChart.push(this.state.rappDataChart[this.state.rappDataChart.length-1])
              } else {
                this.setState({rapport : 0})
                this.state.rappDataChart.push(0)
              }
            }
          
          //frein
          // console.log("contact: "+this.state.data[this.state.data.length-1].Pedale_frein);
          
            if (this.state.data[this.state.data.length-1].Pedale_frein !== undefined) {
              this.state.brDataChart.push(this.state.data[this.state.data.length-1].Pedale_frein)
              this.setState({brakeData : this.state.data[this.state.data.length-1].Pedale_frein})
            } else {
              if (this.state.brDataChart.length !== 0) {
                this.setState({brakeData : this.state.brDataChart[this.state.brDataChart.length-1]})
                this.state.brDataChart.push(this.state.brDataChart[this.state.brDataChart.length-1])
              } else {
                this.setState({brakeData : 0})
                this.state.brDataChart.push(0)
              }
              
            
          }
          // //Position_Pedale_Embrayage
         
            if (this.state.data[this.state.data.length-1].Position_embrayage !== undefined) {
              this.state.clDataChart.push(this.state.data[this.state.data.length-1].Position_embrayage)
              this.setState({clutchData : this.state.data[this.state.data.length-1].Position_embrayage})
            } else {
              if (this.state.clDataChart.length !== 0) {
                this.state.clDataChart.push(this.state.clDataChart[this.state.clDataChart.length-1])
                this.setState({clutchData : this.state.clDataChart[this.state.clDataChart.length-1]})
              } else {
                this.state.clDataChart.push(0)
                this.setState({clutchData : 0})
              }
            }
          //Position_Pedale_Acc
          if (this.state.data[this.state.data.length-1].Pedale_acc !== undefined) {
            this.state.thPDataChart.push(this.state.data[this.state.data.length-1].Pedale_acc)
            this.setState({throttlePositionData : this.state.data[this.state.data.length-1].Pedale_acc})
          } else {
            if (this.state.thPDataChart.length !== 0) {
              this.state.thPDataChart.push(this.state.thPDataChart[this.state.thPDataChart.length-1])
              this.setState({throttlePositionData : this.state.thPDataChart[this.state.thPDataChartt.length-1]})
            } else {
              this.state.thPDataChart.push(0)
              this.setState({throttlePositionData : 0})
            }
          }
          // // //conso
          // console.log("conso: "+this.state.data[this.state.data.length-1].Conso_carb_cumulee);
    
       
            if (this.state.data[this.state.data.length-1].Conso_carb_cumulee!== undefined) {
              this.state.fuelConsChart.push(this.state.data[this.state.data.length-1].Conso_carb_cumulee)
              this.setState({total_fuel_cons: this.state.data[this.state.data.length-1].Conso_carb_cumulee})
            } else {
              if (this.state.fuelConsChart.length !== 0) {
                this.setState({total_fuel_cons: this.state.fuelConsChart[this.state.fuelConsChart.length -1]})
                this.state.fuelConsChart.push(this.state.fuelConsChart[this.state.fuelConsChart.length -1])
              } else {
                this.state.fuelConsChart.push(0)
                this.setState({total_fuel_cons: 0})
              }
            
            
          }
    
          //time
          try {
            
            if (this.state.data[this.state.data.length-1].timestamp!== undefined) {
              this.state.time.push(this.state.data[this.state.data.length-1].timestamp)
              this.setState({timeD: this.state.data[this.state.data.length-1].timestamp})
            } else {
              if (this.state.time.length !== 0) {
                this.setState({timeD: this.state.time[this.state.time.length -1]})
                this.state.time.push(this.state.time[this.state.time.length -1])
              } else {
                
                this.setState({timeD: ""})
              }
            }
    
            //console.log(typeof new Date(json_data[0].timestamp));
          } catch (error) {
            Sentry.captureException(error);
           console.log(error); 
          }
         
            
          }else{
            Sentry.captureException("read error");
            this.setState({
              error : true,
              errorMqtt:"vérifiez votre connexion au WiFi"
            })
          } 
          
          // ReceiveVariablesMqtt.client.on('error', (err)=> {
          //   console.log('mqtt.event.error', err);
          //   clearInterval(this.interval1)
          //   this.setState({
          //     error : true,
          //     errorMqtt:err
          //   })
           
          // });
          // ReceiveVariablesMqtt.client.on('closed', (err)=> {
          //   console.log('mqtt.event.closed', err);
          //   clearInterval(this.interval1)
          //   this.setState({
          //     error : true,
          //     errorMqtt:err
          //   })
           
          // });
            

         
        } catch (error) {
          Sentry.captureException(error);
          console.log(error);
          this.setState({
            error : true,
            errorMqtt:error
          })
        
        }
        
        //{"timestamp": "2021-01-08 10:22:18.236439", "Regime_moteur": 1053.875, "Couple_reel": 72, "Volonte_cond": 16.5, "Contact_frein2": "Relaché"}
}
      

      receiveData(){
      console.log("error"+this.state.error);
      console.log("mess"+this.state.isMessage);
        try {
          if (this.state.isMessage === true && this.state.error === false) {
            this.interval1= setInterval(() => {
              this.getData()
              // if (this.state.error) {
              //   console.log("error"+this.state.error);
              //   clearInterval(this.interval1)
              // }
             
            }, 1000);
          } else {
            Sentry.captureException("perte connexion nodbox");
            this.setState({
              error : true,
              errorMqtt:"vérifiez votre connexion au WiFi"
            })
          }
          if (this.state.error) {
            console.log("error"+this.state.error);
            clearInterval(this.interval1)
          }

          
        ReceiveVariablesMqtt.client.on('error', (err)=> {
          console.log('mqtt.event.error', err);
          Sentry.captureException(err);
          this.setState({
            error : true,
            errorMqtt:"vérifiez votre connexion au WiFi"
          })
         
        });
        ReceiveVariablesMqtt.client.on('closed', (err)=> {
          console.log('mqtt.event.closed', err);
          Sentry.captureException(err);
          this.setState({
            error : true,
            errorMqtt:"vérifiez votre connexion au WiFi"
          })
         
        });
   
        
         
        } catch (error) {
          this.setState({
            error : true,
            errorMqtt:"vérifiez votre connexion au WiFi"
          })
        
          Sentry.captureException(error);
          console.log(error);
        }
         
      }


  handleChrono(){
    console.log(this.state.mainTimer)
    console.log(this.state.isRunning);
    // console.log(this.state.mainTimerStop);
    
    
    let {isRunning,mainTimer} = this.state;
    if (isRunning) {
      
        clearInterval(this.interval);
        this.setState({
            isRunning: false,
            mainTimer : null,
        })
        return;
    }

    this.setState({
        mainTimerStart: new Date(),
        isRunning : true
    })

    this.interval = setInterval(()=>{
        this.setState({
            mainTimer:new Date( new Date() - this.state.mainTimerStart + mainTimer)
        })
    },1000)
}

componentDidMount(){

  console.log(this.props.asyncId); 
  BackHandler.addEventListener('backPress', () => {return true})
}

verifyCommandeOne(){
  
  this.setState({spinner:true})
  setTimeout(() => {
    if (this.state.error === false) {
      this.commandeOne()
    }
    
  }, 2000);
}
launch1st(){
  try {
      SSHClient.setup("pi","10.3.141.144",22);
      SSHClient.usePrivateKey(false);
      SSHClient.setPassword("raspberry");
      SSHClient.connect().then(
          (result)=>{
              console.log(result);
      
          SSHClient.execute("python3 can_extract_skoda.py").then(
              (result)=>{
                  console.log(result);
                //   alert("can_extract_skoda.py  "+result);
              },
              (err)=>{
                console.log(err);
                Sentry.captureException(err);
              this.setState({
                error:true
              })
                //   alert("can_extract_skoda.py execution "+error);
              }
              );
          },
          (err)=>{
            Sentry.captureException(err);
                  this.setState({
                    error:true
                  })
            // alert("can_extract_skoda.py connexion "+error);
          }
        );
     

  } catch (error) {
    Sentry.captureException(error);
    this.setState({
      error:true
    })
    // alert("can_extract_skoda.py error"+error);
  }


}
commandeOne(){
    try {
      SSHClient.setup("pi","10.3.141.1",22);
      SSHClient.usePrivateKey(false);
      SSHClient.setPassword("raspberry");
      SSHClient.connect().then(
          (result)=>{
              console.log(result);
      //for us : stream_simulator.py
      //for tushar capture_video.py
          SSHClient.execute("export DISPLAY=:0.0 ; python3 can_curve.py").then(
              (result)=>{
                //alert("export Display+can_curve result"+result);
                  console.log(result);
               
                
              },
              (error)=>{
                Sentry.captureException(error);
                this.setState({
                  error : true,
                  errorMqtt:"vérifiez votre connexion au WiFi"
                })
                 // alert("export Display+can_curve execution "+error);
                 console.log(error);
              }
              );
          },
          (error)=>{
            Sentry.captureException(error);
            this.setState({
              error : true,
              errorMqtt:"vérifiez votre connexion au WiFi"
            })
            console.log(error);
           // alert("export Display+can_curve connexion  "+error);
          }
        );
        try {
          console.log("iscalled "+this.state.isCalled);
         ReceiveVariablesMqtt.client.on('message', (message)=> {
            if (message) {
             
              let data = message.data
              let newdata = data.replace(/'/g,'"')
              console.log("received");
              this.setState({
                isMessage:true
              })
              // this.setState({
              //   isCalled: true,
              // })
              try {
    
                AsyncStorage.getItem('courbe_data').then((data) => {
                  if(data === null){
                  data= newdata
                    AsyncStorage.setItem('courbe_data',data)
                  }else{
                    data=data+','+newdata
                    AsyncStorage.removeItem('courbe_data').then(
                    
                    AsyncStorage.setItem('courbe_data',data)
                    )
                  }
                  }).done()
                
                
                
              } catch (error) {
                Sentry.captureException(error);
                this.setState({
                  error : true,
                  errorMqtt:"vérifiez votre connexion au WiFi",
                 
                })
                console.log(error);
                }
            
             
              // alert("RTS VALUE ERROR "+error)
              
            }else{
              console.log("no receive");
              Sentry.captureException("o receive");
              this.setState({
                isMessage:false
              })
            }
          })
          if (this.state.error) {
            console.log("error"+this.state.error);
            clearInterval(this.interval1)
          }
        } catch (error) {
          // alert("RTS VALUE ERROR "+error)
          Sentry.captureException(error);
              this.setState({
                error : true,
                errorMqtt:"vérifiez votre connexion au WiFi"
              })
          
        }
        setTimeout(() => {
          console.log(this.state.error);
          console.log(this.state.isMessage);

          
        if (this.state.isMessage === false && this.state.error===false) {
          // this.handleChrono()
          console.log('on readddd');
          ReceiveVariablesMqtt.client.connect()
          setTimeout(() => {
            this.receiveData()
            this.setState({spinner : false})
          }, 1000);
        }else{
          console.log("fffghjkl");
          // ReceiveVariablesMqtt.client.connect()
          setTimeout(() => {
            this.receiveData()
            this.setState({spinner : false})
          }, 1000);
        }
          // this.sendMessage()
        }, 10000);
      

        console.log("error:"+this.state.error);
        
        ReceiveVariablesMqtt.client.on('error', (err)=> {
          console.log('mqtt.event.error', err);
          Sentry.captureException(err);
          this.setState({
            error : true,
            errorMqtt:"vérifiez votre connexion au WiFi"
          })
         
        });
        ReceiveVariablesMqtt.client.on('closed', (err)=> {
          console.log('mqtt.event.closed', err);
          Sentry.captureException(err);
          this.setState({
            error : true,
            errorMqtt:"vérifiez votre connexion au WiFi"
          })
         
        });
        if (this.state.error) {
          console.log("error"+this.state.error);
          clearInterval(this.interval1)
        }
       
     

  } catch (error) {
    Sentry.captureException(error);
    this.setState({
      error : true,
      errorMqtt:"vérifiez votre connexion au WiFi"
    })
    //alert("export Display+can_curve "+error);
  }
  }

  reconnectMqtt(){
    
    try {
  
      console.log(this.state.isCalled);
      this.setState({spinner : true})
      if (this.state.data.length === 0 && this.state.isMessage === false ) {
        console.log('ghjjh');
        // ReceiveVariablesMqtt.create(
        //   'test/real',//userID pour canal
        
        //   {
        //    uri: 'mqtt://10.3.141.1:1883',//url 
        //   },
        //  );
         ReceiveVariablesMqtt.client.connect()
        
        this.commandeOne()
      }else{
        console.log('ghjjhisdfghjk');
        console.log(this.state.isCalled);
        ReceiveVariablesMqtt.client.connect()
        try {
           ReceiveVariablesMqtt.client.on('message', (message)=> {
            if (message) {
              this.setState({
                isMessage:true
              })
              let data = message.data
              let newdata = data.replace(/'/g,'"')
              console.log('received 2');
              try {
    
                AsyncStorage.getItem('courbe_data').then((data) => {
                  if(data === null){
                  data= newdata
                    AsyncStorage.setItem('courbe_data',data)
                  }else{
                    data=data+','+newdata
                    AsyncStorage.removeItem('courbe_data').then(
                    
                    AsyncStorage.setItem('courbe_data',data)
                    )
                  }
                  }).done()
                
                
                
              } catch (error) {
                Sentry.captureException(error);
                this.setState({
                  error : true,
                  errorMqtt:"vérifiez votre connexion au WiFi"
                })
                console.log(error);
                }
            
             
              // alert("RTS VALUE ERROR "+error)
              
            }else{
              console.log("no receive");
              this.setState({
                isMessage:false
              })
            }
          })
          if (this.state.error) {
            console.log("error"+this.state.error);
            clearInterval(this.interval1)
          }
         
          
          
        } catch (error) {
          Sentry.captureException(error);
              this.setState({
                error : true,
                errorMqtt:"vérifiez votre connexion au WiFi"
              })
        }
      }
      console.log("error:"+this.state.error);
        
      console.log('on readddd');
      setTimeout(() => {
        console.log(this.state.error);
        console.log(this.state.isMessage);

        
      if (this.state.isMessage === false && this.state.error===false) {
        // this.handleChrono()
        console.log('on readddd');
        ReceiveVariablesMqtt.client.connect()
        setTimeout(() => {
          this.receiveData()
          this.setState({spinner : false})
        }, 1000);
      }else{
        // console.log("fffghjkl");
        // ReceiveVariablesMqtt.client.connect()
        setTimeout(() => {
          this.receiveData()
          this.setState({spinner : false})
        }, 1000);
      }
        // this.sendMessage()
      }, 5000);
      this.setState({
        error : false,
        errorMqtt:""
      })
      ReceiveVariablesMqtt.client.on('error', (err)=> {
        console.log('mqtt.event.error', err);
        Sentry.captureException(err);
        // clearInterval(this.interval1)
        this.setState({
          error : true,
          errorMqtt:"vérifiez votre connexion au WiFi"
        })
       
      });
      ReceiveVariablesMqtt.client.on('closed', (err)=> {
        Sentry.captureException(err);
        console.log('mqtt.event.closed', err);
        // clearInterval(this.interval1)
        this.setState({
          error : true,
          errorMqtt:"vérifiez votre connexion au WiFi"
        })
       
      });
      if (this.state.error) {
        console.log("error"+this.state.error);
        clearInterval(this.interval1)
      }
      
    } catch (error) {
      Sentry.captureException(error);
      this.setState({
        error : true,
        errorMqtt:"vérifiez votre connexion au WiFi"
      })
   
      console.log(error);
    }
  }

stopCan(){
  try {
      SSHClient.setup("pi","10.3.141.144",22);
      SSHClient.usePrivateKey(false);
      SSHClient.setPassword("raspberry");
      SSHClient.connect().then(
          (result)=>{
              console.log(result);
      //for us : stream_simulator.py
      //for tushar capture_video.py
          SSHClient.execute("python3 can_close.py").then(
              (result)=>{
                  console.log(result);
                  // alert("can_close result"+result);
              },
              (error)=>{
                Sentry.captureException(error);
                  // alert("can_close execution: "+error);
              }
              );
          },
          (error)=>{
            Sentry.captureException(error);
            // alert("can_close connexion :"+error);
          }
        );
     

  } catch (error) {
    Sentry.captureException(error);
      console.log(error);
  }


}


deconnexion(){
 
  // this.handleChrono() 
 
   clearInterval(this.interval1)
  // this.postCan()
  this.stopCan()
 
   
  
}

  // renderItem(item) {
  //   const color = item.connected ? '#003789' : '#fff';
    
  //   return (
  //     <TouchableHighlight onPress={() => this.connectToBox(item) }>
  //       <View style={[styles.row, {backgroundColor: color}]} >
  //         <Text style={{fontSize: 12, textAlign: 'center', color: '#010101', padding: 10}}>{item.name}</Text>
  //         <Text style={{fontSize: 10, textAlign: 'center', color: '#010101', padding: 2}}>RSSI: {item.rssi}</Text>
  //         <Text style={{fontSize: 8, textAlign: 'center', color: '#010101', padding: 2, paddingBottom: 20}}>{item.id}</Text>
  //       </View>

  //     </TouchableHighlight>
  //   );
  // }
 
renderDrawer() {
  // const list = Array.from(this.state.peripherals.values());
  // const btnScanTitle = 'Scan Bluetooth (' + (this.state.scanning ? 'on' : 'off') + ')';
  //SlideMenu
  return (
    
      <View style={styles.menuContainer}>
        <View style={styles.menuTitleContainer}>
        <View  style={{marginVertical: 20 , flexDirection:"row",alignItems:"center"}}>
        <Icon
          name='home'
          color='#003789'
          size= {40}
          onPress={this.goHome.bind(this)}
        />
         
      </View>
      <View  style={{marginVertical: 20 , flexDirection:"row",alignItems:"center"}}>
          <Icon
            name='settings'
            color='#003789'
            size= {40}
          />
          </View>
        </View>

      </View>
  )
}
_renderTimers(){
  let timer = ""
    if(this.state.mainTimer === null){
        timer = "00:00:00.0"

    }else{
      timer = this.state.mainTimer.toLocaleTimeString('en-US')
    }
  return(timer)
    
    
}

__renderClutch(){
  let clutchstr = ""
  if(this.state.clutchData === 1){

    clutchstr = "oui"
  }else{
    clutchstr = "non"
  }
  return clutchstr
}
activeBtnPlus(){
  let btnPlus = true
  if (this.state.parcours > 0 ) {
    btnPlus = false
  }
  else{
    btnPlus = true
  }
  return btnPlus;
}
__renderBrake(){
  let brakestr = ""
  // if((this.state.brakeData === 0)  || (this.state.brakeData< 0) ){
    if (this.state.brakeData === 1) {

    brakestr = "oui"
  }else{
    brakestr = "non"
  }
  return brakestr
}

goHome(){
  console.log(this.props.stageName);
  Actions.pop({stage:this.props.stage,
    stageName : this.props.stageName,
    typeF:this.props.typeF,
    asyncId:this.props.asyncId})
}

goDonnees() {
  try {
    console.log(this.props.stageName);
    Actions.affichageDonnees({stage:this.props.stage,
      stageName : this.props.stageName,
      typeF:this.props.typeF,
      asyncId:this.props.asyncId});
  } catch (error) {
    Sentry.captureException(error);
  }
  
}
openDrawer() {
  this.drawer.open()
}

closeDrawer() {
  this.drawer.close()
}





	render(){
   
    
  
        
		return(
      
      <SafeAreaView style={styles.safeAreaStyle}>
      <View style={styles.mainContainer}>
              <View style={styles.headerContainer}>
                  <View style={{alignItems:"center",flexDirection:"row"}}>
                  <Image
                         resizeMode ="contain"
                         style={{ width:200, height:260,left:15}}
                         source= {require("../../images/Sanstitre9.png")}
                    />
                  <Text style={styles.headerTitle}>ECO DATA</Text>
                  </View>
                  <Text style={{color:'#00B0F0',fontSize:16,left:-177, textAlign:'right',fontStyle:"italic",top:45}}>Powered by CleanData</Text>
            </View>
                  {/* <View style={styles.menuButton} /> */}
             
              <ScrollView>
              <View style={{flexDirection:'row',marginLeft:50,marginVertical:10,height:30}}>
             
                
                </View>
              <View style={styles.container}>
            </View>
              
                <View style={{flexDirection:'row',marginLeft:35,marginVertical:10,marginTop:50}}>
                   <View style={{width:200,height:200,alignItems:'center',justifyContent:'center',backgroundColor:'#cccc', borderRadius: 100,}}>
                   <TouchableHighlight
                   style={ {width:180,height:180,alignItems:'center',justifyContent:'center', 
                   backgroundColor: '#5abf07',elevation:5, borderRadius: 90,
                  //  backgroundColor: this.state.disabledStart ? 'rgba(192,192,192,0.7)':'#5abf07'
                  }} 
                    activeOpacity={.2} 
                    // disabled={this.state.disabledStart} 
                     onPress={()=>{
                       
                      this.launch1st()
                      this.verifyCommandeOne()
                      // this.commandeTwo()
                     
                      }
                      }
                    >
                      <Text style={{color:'#fff',fontSize:16}}>START</Text>
                    </TouchableHighlight>   
                   </View>   
 
                   <View style={{width:200,height:200,alignItems:'center',justifyContent:'center',left:30, backgroundColor:'#cccc', borderRadius: 100,marginHorizontal:295}}>
                   <TouchableHighlight
                     style={ {width:180,height:180,alignItems:'center',justifyContent:'center', 
                     backgroundColor:"#bf3105",elevation:5, borderRadius: 90,
                      // backgroundColor: this.state.disabledStop ? 'rgba(192,192,192,0.7)':"#bf3105"
                    }} 
                     activeOpacity={.2} 
                    //  disabled={this.state.disabledStop} 
                    onPress={()=>this.deconnexion()}
                    >
                        <Text style={{color:'#fff',fontSize:16}}>STOP</Text>
                    </TouchableHighlight> 
                    {/* <Text>{this.testTimer()}</Text>   */}
                   </View>   
                </View>

                <View style={styles.label} >
                  <View style={{justifyContent:"center",alignContent:"center",alignItems:"center",marginTop:20}}>
                    <Text style={{fontWeight:"bold",fontSize:22}}>VALEURS TEMPS REEL</Text>
                  </View>
                  <View style={{flexDirection:"row",marginTop:35,left:15}}>
                        <View style={{flexDirection:"column",width:193, borderWidth:2, borderColor:"green"}}>
                          <View style={{marginBottom:20,left:17}}>
                                    <Text style={{fontWeight:"bold",fontSize:16}}>Temps de parcours :</Text>
                                   
                            </View>
                            <View style={{marginBottom:20,left:109,}}>
                                <Text style={{fontWeight:"bold",fontSize:16}}>Rapport :</Text>
                                
                            </View>

                            <View style={{marginBottom:20,left:48}}>
                                <Text style={{fontWeight:"bold",fontSize:16}}>Régime Moteur :</Text>
                                
                            </View>

                            <View style={{marginBottom:20,left:53}}>
                                <Text style={{fontWeight:"bold",fontSize:16}}>Couple Moteur :</Text>
                                
                            </View>
                          
                            <View style={{marginBottom:20,left:112}}>
                                <Text style={{fontWeight:"bold",fontSize:16}}>Vitesse :</Text>
                                
                            </View>
                            
                            <View style={{marginBottom:20,left:-1}}>
                                <Text style={{fontWeight:"bold",fontSize:16}}>Position Accélérateur :</Text>
                             
                            </View>

                            <View style={{marginBottom:20,left:86}}>
                                <Text style={{fontWeight:"bold",fontSize:16}}>Débrayage :</Text>
                              
                            </View>
                            <View style={{marginBottom:20,left:102}}>
                                <Text style={{fontWeight:"bold",fontSize:16}}>Freinage :</Text>
                              
                            </View>

                            <View style={{marginBottom:20,left:51}}>
                                <Text style={{fontWeight:"bold",fontSize:16}}>Consommation :</Text>
                              
                            </View>
                            
                        </View>
                        <View style={{flexDirection:"column",marginLeft:40,}}>
                          <View style={{marginBottom:20}}>
                              
                              <Text style={{fontSize:16,color:'#00B0F0'}}>{this.state.timeD}</Text>
                            </View>
                            <View style={{marginBottom:20}}>
                                
                                <Text style={{fontSize:16,color:'#00B0F0'}}>{this.state.rapport}</Text>
                            </View>
                          
                            <View style={{marginBottom:20}}>
                              
                                <Text style={{fontSize:16,color:'#00B0F0'}} >{this.state.engineSpeedData} tr/min</Text>
                            </View>
                            
                            <View style={{marginBottom:20}}>
                                
                              <Text style={{fontSize:16,color:'#00B0F0'}}>{this.state.engineTorqueData} Nm</Text>
                            </View>
                            <View style={{marginBottom:20}}>
                               
                              <Text style={{fontSize:16,color:'#00B0F0'}}>{this.state.speedData} km/h</Text>
                            </View>

                            <View style={{marginBottom:20}}>
                               
                              <Text style={{fontSize:16,color:'#00B0F0'}}>{this.state.throttlePositionData} %</Text>
                            </View>

                            <View style={{marginBottom:20}}>
                               
                              <Text style={{fontSize:16,color:'#00B0F0'}}>{this.__renderClutch()} ({this.state.clutchData})</Text>
                            </View>

                            <View style={{marginBottom:20}}>
                               
                               <Text style={{fontSize:16,color:'#00B0F0'}}>{this.__renderBrake()} ({this.state.brakeData})</Text>
                             </View>

                             <View style={{marginBottom:20}}>
                               
                               <Text style={{fontSize:16,color:'#00B0F0'}}>{this.state.total_fuel_cons} L/100km</Text>
                             </View>

                            
                        </View>
                      </View>
                     
                </View>
                {/* SPINNER */}
                <Spinner
                            visible={this.state.spinner}
                            animation={"fade"}
                            overlayColor={"#40606060"}
                            indicatorStyle ={{size: "large"}}
                            textContent={"Connexion aux données véhicule..."}
                            textStyle={styles.spinnerTextStyle}
                            
                        />
                {/* GESTION ERREUR */}
                {(this.state.error && this.state.errorMqtt!=="")?  ( 
                      
                      <TouchableOpacity style={{ backgroundColor:'red',alignItems:"center",marginVertical: 20,width:200,height:60, justifyContent:"center" , 
                      alignContent:"center", alignSelf:"center"}} 
                      onPress={()=>this.reconnectMqtt()}>
                        <Text style={{color:'#fff',fontWeight:'bold',fontSize:12}}>Appuyez ici pour réessayer</Text>
                        <Text style={{color:'#fff',fontWeight:'bold',fontSize:10,marginTop :10}}>{this.state.errorMqtt}</Text>
                      </TouchableOpacity>
                      
                ):(null)}
                 {(this.state.error && this.state.errorMqtt ==="")?  ( 
                      
                      <TouchableOpacity style={{ backgroundColor:'red',alignItems:"center",marginVertical: 20,width:200,height:60, justifyContent:"center" , 
                      alignContent:"center", alignSelf:"center"}} 
                      onPress={()=>{
                        this.launch1st()
                        this.verifyCommandeOne()
                        }}>
                        <Text style={{color:'#fff',fontWeight:'bold',fontSize:14}}>Appuyez ici pour réessayer</Text>
                        <Text style={{color:'#fff',fontWeight:'bold',fontSize:10,marginTop :10}}>problème lors de la connexion aux données véhicule</Text>
                      </TouchableOpacity>
                      
                ):(null)}
                <TouchableHighlight 
                style={{marginTop: 50,
                justifyContent:"center" , 
                alignContent:"center",
                alignItems:"center" , 
                backgroundColor: '#d9dfec', 
                width:270,
                height:50,
                borderRadius: 150,
                alignSelf:"center"}} 
                // disabled={this.activeBtnPlus()} 
                onPress={()=>this.goDonnees()}
                >
                          <Text style={{color:'#00B0F0',fontWeight:"bold",fontSize:16}} >PLUS DE FONCTIONNALITES</Text>
                </TouchableHighlight>
                </ScrollView>
          {/* </Drawer>
       */}
         
      </View>
      
  </SafeAreaView>   
  
                    
			)
  }
}
const drawerStyles = {
  drawer: {
      flex: 1,
      backgroundColor: 'white',
  },
  main: {
      flex: 1.0,
      backgroundColor: 'white'
  }
}

const styles = {
  mainContainer: {
      flex: 1,
      backgroundColor:'white',
  },
  safeAreaStyle: {
      flex: 1.0,
      backgroundColor: '#d8ecd4',
  },
  headerContainer: {
    height: 80, //80
    flexDirection: 'row',
    // flex: 1.0,
    // justifyContect: 'center',
    backgroundColor: '#323232',
    //top:24
  },
  bheaderContainer: {
    height: 80,
    
    
    backgroundColor: '#3B5998',
},
headerTitle: {
  marginLeft: 90 ,
      // marginRight: 8,
    //  right: 300,
      alignSelf: 'center',
      color: 'white',
      fontSize:22,
      top:-10
},
  menuButton: {
    // flexDirection: 'row',
    
    left: 750,
    alignSelf: 'center',
     
    tintColor: 'white'
  },
  menuContainer: {
      flex: 1.0,
      backgroundColor: 'white',
  },
  menuBContainer: {
    
    marginVertical:300,
    backgroundColor: 'WHITE',
},
  menuTitleContainer: {
      alignItem:'center',
      height: 60,
      width:'100%',
      top: 50,
      left:40,
      flexDirection:'column',
  },
  menuTitle: {
      width:'100%',
      color: 'black',
      //textAlign: 'center',
      fontSize: 17,
      //alignSelf:'center',
  },
  container: {
    
    alignItems: 'center'
},
bouton:{
    flex:1,
    justifyContent:'space-between',
    alignItems: 'center'

}
,
label:{
    // flex:4,
    borderWidth: 2,
    // padding:8,
    marginHorizontal:50,
    borderColor:"#8ea2c6",
    marginTop:90,
    elevation:2,
   

    
},
row: {
  margin: 10
},
spinnerTextStyle: {
  color: '#FFF'
},


}