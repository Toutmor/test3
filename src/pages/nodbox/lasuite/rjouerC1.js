import React, {Component} from 'react'
import { View, StyleSheet, ScrollView,Dimensions,Text, Alert, TouchableOpacity, Image} from 'react-native'
// import {BarChart, LineChart} from "react-native-chart-kit";
// import { Header } from 'react-native-elements';

// import Select2 from 'react-native-select-two';
import * as Progress from 'react-native-progress';
import { Actions } from 'react-native-router-flux';
import Video from 'react-native-video';
import SSHClient from 'react-native-sshclient';
import VariablesMqtt from '../../../components/nodboxMQTT/sendVariables'
import PostVariablesMqtt from '../../../components/nodboxMQTT/receivePostData'
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProgressBar from "react-native-progress/Bar";
import { TouchableWithoutFeedback } from 'react-native';
import { Icon } from 'react-native-elements';
import { BackHandler } from 'react-native';
import SMBClient from 'react-native-smb';


VariablesMqtt.create(
	'test/curve',//userID pour canal

	{
	 uri: 'mqtt://10.3.141.1:1883',//url 
	},
 );
 PostVariablesMqtt.create(
	'test/post',//userID pour canal

	{
	 uri: 'mqtt://10.3.141.1:1883',//url 
	},
 );


 function secondsToTime(time) {
  return ~~(time / 60) + ":" + (time % 60 < 10 ? "0" : "") + time % 60;
}
export default class RejouerP1 extends React.Component{
    constructor(props){
        super(props)
            this.state={
                video_path:"",
                post_data:[],
                courbe_data:[],
                decompose_courbe_data:[],
                timestamp:"hh:mm:ss",
                rapport:0,
                pedale_frein:0,
                embrayage:0,
                vitesse:0,rate: 1,
                volume: 1,
                muted: false,
                resizeMode: 'contain',
                paused: false,
                progress: 0,
                duration: 0,
                index:1,
                hideControls: false,
                currentTime : 0,

                //progress spinner
                progressL :0,
                indeterminate :true,
                //gestion erreur
                error:false,
                errorSmb:"",
                errorMqtt:"",
                isMessage:false,
                isMessage2:false

            }
        }
    canPost(){
      try {
            
        SSHClient.setup("pi","10.3.141.1",22);
        SSHClient.usePrivateKey(false);
        SSHClient.setPassword("raspberry");
        SSHClient.connect().then(
          (result)=>{
              console.log(result);
        
          SSHClient.execute("python3 can_post.py").then(
                (result)=>{
                  console.log(result);   
                  },
                (error)=>{
                  console.log(error)
                  this.setState({
                    error : true,
                    errorMqtt:"vérifiez votre connexion au WiFi"
                  })
                      // alert("can_post error: "+error);
                  }
                );
                },
          (error)=>{
            this.setState({
              error : true,
              errorMqtt:"vérifiez votre connexion au WiFi"
            })
            console.log(error)
                  // alert("can_post connexion: "+error);
          }
        );
        
        VariablesMqtt.client.on('message', (msg)=> {
          if(msg){
            this.setState({
              isMessage:true
            })
            console.log( msg);
            let dataM = msg.data
            try {
              this.smbClient = new SMBClient(
                '10.3.141.1',//ip
                  '445',//port
                  'pimylifeupshare',//sharedFolder,
                  'pimylifeupshare',//workGroup,
                  'pi',//username,
                  'raspberry',//password,
                  (data) => {//callback - can be null (not setting)
                      console.log('new SMBClient data (callback): ' + JSON.stringify(data));
                  },
              )
              this.smbClient.connect((data)=> {
                console.log('new SMBClient data (on connect): ' + JSON.stringify(data));
                  setTimeout(() => {
                    this.smbClient.connectionStatus(
                      (data) => {//callback
                        console.log('connectionStatus data (callback): ' + JSON.stringify(data));
                        console.log('connectionStatus is: ' +  data.status); //connect or disconnect
                        if (data.status ==="connected") {
                          this.smbClient.isFileExist('curve_videos/'+dataM ,//the path to list files and folders
                            (data) => {//callback
                              console.log('isFileExist data (callback): ' + JSON.stringify(data));
                              if(data.isExist){
                                this.smbClient.download(
                                  'curve_videos',//source path of file to download (in SMB server)
                                  '/storage/emulated/0/Download',//destination path to save downloaded file (in Android device)
                                  dataM,//the name of file to download
                                  (data) => {//callback
                      
                                    console.log('download data (callback): ' + JSON.stringify(data));
                                  },
                                  );
                                this.smbClient.on('downloadProgress',(data) => {
                                  this.setState({ indeterminate: false });
                                  console.log((parseFloat(data.downloadedSize) / parseFloat(data.totalSize))*100);
                                  let progressL = (parseFloat(data.downloadedSize) / parseFloat(data.totalSize))*100
                                  if (progressL > 1) {
                                    progressL = 1;
                                  }
                                  this.setState({ progressL : progressL});
                                  
                                  if (data.completed === true) {
                                    this.setState({
                                      error : false,
                                      errorMqtt:"",
                                      errorSmb:""
                                      })
                                    this.setState({video_path : data.destPath})
                                    this.decomposition()
                                    }
                                      // console.warn('download progress data (on downloadProgress): ' + JSON.stringify(data));
                                      
                                  },
                              );
                              }else{
                            // alert('file not exist in server. ' );
                              this.setState({
                                error:true,
                                errorSmb:"vérifiez votre connexion au WiFi"
                              })
                                console.log('file not exist in server. ' );
                            }
                           },
                          );
                                
                        } else {
                          this.setState({
                            error:true,
                            errorSmb:"vérifiez votre connexion au WiFi"
                          })
                                
                        }
                      },
                    )
                  
                  }, 2000);
              })
  
              this.smbClient.on(
                  'error',
                  (data) => {
                    this.setState({
                      error:true,
                      errorSmb:"vérifiez votre connexion au WiFi"
                    })
                      // console.log('error in SMBClient (on error): ' + JSON.stringify(data));
                      // alert('error in SMBClient (on error): ' + JSON.stringify(data))
                  },
              );
            
            } catch (error) {
              console.log(error);
              this.setState({
                error:true,
                errorSmb:"vérifiez votre connexion au WiFi"
                })
                    
            }
          }else{
            this.setState({
              isMessage:false
            })
            this.setState({
              error : true,
              errorMqtt:"vérifiez votre connexion au WiFi"
            })
          }
          
         
        });
       
      
        PostVariablesMqtt.client.on('message', (message)=> {
          if (message) {
           
            let data = message.data
            let newdata = data.replace(/'/g,'"')
            console.log(newdata);
            this.setState({
              isMessage2:true
            })
            try {
  
              AsyncStorage.getItem('post_data').then((data) => {
                if(data === null){
                data = newdata
                  AsyncStorage.setItem('post_data',data)
                }else{
                  data= newdata
                  AsyncStorage.removeItem('post_data').then(
                  
                  AsyncStorage.setItem('post_data',data)
                  )
                }
                }).done()

                setTimeout(() => {
                  this.getData()
                }, 5000)
                // setTimeout(() => {
                //   this.decomposition()
                // }, 7000);
              
            } catch (error) {
              this.setState({
                error:true,
                errorMqtt:"vérifiez votre connexion au WiFi"
                })
              // alert("POST DATA error: "+ error)
              console.log(error);
            }
            
          } else {
            this.setState({
              isMessage2:false
            })
            this.setState({
              error:true,
              errorMqtt:"vérifiez votre connexion au WiFi"
              })
          }
         
        })
       
      setTimeout(() => {
        if (this.state.error ===false && this.state.isMessage2 === false) {
          this.setState({
            error : true,
            errorMqtt:"vérifiez votre connexion au WiFi"
          })
        //   setTimeout(() => {
         
        //     if (this.state.error ===false && this.state.isMessage === false) {
        //       this.setState({
        //         error : true,
        //         errorMqtt:"perte liaison"
        //       })
        //     }
        // }, 7000);
        }
      }, 7000);

        // setTimeout(() => {
        //   console.log("message2"+this.state.isMessage2);
        //   if (this.state.error ===false) {
        //     if (this.state.isMessage === false) {
        //       VariablesMqtt.client.connect()
        //     }
        //     if (this.state.isMessage2 === false) {
        //       PostVariablesMqtt.client.connect()
        //       setTimeout(() => {
        //         this.getData()
        //       }, 5000)
        //       setTimeout(() => {
        //         this.decomposition()
        //       }, 7000);
        //     }
           
        //   }else{
            
        //     setTimeout(() => {
        //       this.getData()
        //     }, 5000)
        //     setTimeout(() => {
        //       this.decomposition()
        //     }, 7000);
        //   }
        // }, 12000);
       
        VariablesMqtt.client.on('error', (err)=> {
          console.log('mqtt.event.error', err);
          this.setState({
            error : true,
            errorMqtt:"vérifiez votre connexion au WiFi"
          })
         
        });
        VariablesMqtt.client.on('closed', (err)=> {
          console.log('mqtt.event.closed', err);
          this.setState({
            error : true,
            errorMqtt:"vérifiez votre connexion au WiFi"
          })
         
        });
        PostVariablesMqtt.client.on('error', (err)=> {
          console.log('mqtt.event.error', err);
          this.setState({
            error : true,
            errorMqtt:"vérifiez votre connexion au WiFi"
          })
         
        });
        PostVariablesMqtt.client.on('closed', (err)=> {
          console.log('mqtt.event.closed', err);
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
            console.log(error);
      }

    }

  reconnectMqtt(){
    
    try {
      this.setState({
        error : false,
        errorMqtt:"",
        errorSmb:""
      })
      if (this.state.isMessage && this.state.isMessage2) {
        VariablesMqtt.client.connect()
        PostVariablesMqtt.client.connect()
        VariablesMqtt.client.on('message', (msg)=> {
          if(msg){
            this.setState({
              isMessage:true
            })
            console.log( msg);
            let dataM = msg.data
            try {
              this.smbClient = new SMBClient(
                '10.3.141.1',//ip
                  '445',//port
                  'pimylifeupshare',//sharedFolder,
                  'pimylifeupshare',//workGroup,
                  'pi',//username,
                  'raspberry',//password,
                  (data) => {//callback - can be null (not setting)
                      console.log('new SMBClient data (callback): ' + JSON.stringify(data));
                  },
              )
              this.smbClient.connect((data)=> {
                console.log('new SMBClient data (on connect): ' + JSON.stringify(data));
                  setTimeout(() => {
                    this.smbClient.connectionStatus(
                      (data) => {//callback
                        console.log('connectionStatus data (callback): ' + JSON.stringify(data));
                        console.log('connectionStatus is: ' +  data.status); //connect or disconnect
                        if (data.status ==="connected") {
                          this.smbClient.isFileExist('curve_videos/'+dataM ,//the path to list files and folders
                            (data) => {//callback
                              console.log('isFileExist data (callback): ' + JSON.stringify(data));
                              if(data.isExist){
                                this.smbClient.download(
                                  'curve_videos',//source path of file to download (in SMB server)
                                  '/storage/emulated/0/Download',//destination path to save downloaded file (in Android device)
                                  dataM,//the name of file to download
                                  (data) => {//callback
                      
                                    console.log('download data (callback): ' + JSON.stringify(data));
                                  },
                                  );
                                this.smbClient.on('downloadProgress',(data) => {
                                  this.setState({ indeterminate: false });
                                  console.log((parseFloat(data.downloadedSize) / parseFloat(data.totalSize))*100);
                                  let progressL = (parseFloat(data.downloadedSize) / parseFloat(data.totalSize))*100
                                  if (progressL > 1) {
                                    progressL = 1;
                                  }
                                  this.setState({ progressL : progressL});
                                  
                                  if (data.completed === true) {
                                    this.setState({
                                      error : false,
                                      errorMqtt:"",
                                      errorSmb:""
                                      })
                                    this.setState({video_path : data.destPath})
                                  
                                      this.decomposition()
                                  
                                    }
                                      // console.warn('download progress data (on downloadProgress): ' + JSON.stringify(data));
                                      
                                  },
                              );
                              }else{
                            // alert('file not exist in server. ' );
                              this.setState({
                                error:true,
                                errorSmb:"vérifiez votre connexion au WiFi"
                              })
                                console.log('file not exist in server. ' );
                            }
                           },
                          );
                                
                        } else {
                          this.setState({
                            error:true,
                            errorSmb:"vérifiez votre connexion au WiFi"
                          })
                                
                        }
                      },
                    )
                  
                  }, 2000);
              })
  
              this.smbClient.on(
                  'error',
                  (data) => {
                    this.setState({
                      error:true,
                      errorSmb:"vérifiez votre connexion au WiFi"
                    })
                      // console.log('error in SMBClient (on error): ' + JSON.stringify(data));
                      // alert('error in SMBClient (on error): ' + JSON.stringify(data))
                  },
              );
            
            } catch (error) {
              console.log(error);
              this.setState({
                error:true,
                errorSmb:"vérifiez votre connexion au WiFi"
                })
                    
            }
          }else{
            this.setState({
              isMessage:false
            })
            this.setState({
              error : true,
              errorMqtt:"vérifiez votre connexion au WiFi"
            })
          }
          
         
        });
       
      
        PostVariablesMqtt.client.on('message', (message)=> {
          if (message) {
            this.setState({
              isMessage2:true
            })
            let data = message.data
            let newdata = data.replace(/'/g,'"')
            console.log(newdata);
            try {
  
              AsyncStorage.getItem('post_data').then((data) => {
                if(data === null){
                data= newdata
                  AsyncStorage.setItem('post_data',data)
                }else{
                  data= newdata
                  AsyncStorage.removeItem('post_data').then(
                  
                  AsyncStorage.setItem('post_data',data)
                  )
                }
                }).done()
                setTimeout(() => {
                  this.getData()
                }, 5000)
           
              
            } catch (error) {
              this.setState({
                error:true,
                errorMqtt:"vérifiez votre connexion au WiFi"
                })
              // alert("POST DATA error: "+ error)
              console.log(error);
            }
            
          } else {
            this.setState({
              isMessage2:false
            })
            this.setState({
              error:true,
              errorMqtt:"vérifiez votre connexion au WiFi"
              })
          }
         
        })

        setTimeout(() => {
         
            if (this.state.error ===false && this.state.isMessage === false) {
              VariablesMqtt.client.connect()
            }
            if (this.state.error ===false && this.state.isMessage2 === false) {
              PostVariablesMqtt.client.connect()
              
            
          }
        }, 12000);
       
     
        
      } else {
        PostVariablesMqtt.client.connect()
        VariablesMqtt.client.connect()
         
         this.canPost()
      }
      VariablesMqtt.client.on('error', (err)=> {
        console.log('mqtt.event.error', err);
        this.setState({
          error : true,
          errorMqtt:"vérifiez votre connexion au WiFi"
        })
       
      });
      VariablesMqtt.client.on('closed', (err)=> {
        console.log('mqtt.event.closed', err);
        this.setState({
          error : true,
          errorMqtt:"vérifiez votre connexion au WiFi"
        })
       
      });
      PostVariablesMqtt.client.on('error', (err)=> {
        console.log('mqtt.event.error', err);
        this.setState({
          error : true,
          errorMqtt:"vérifiez votre connexion au WiFi"
        })
       
      });
      PostVariablesMqtt.client.on('closed', (err)=> {
        console.log('mqtt.event.closed', err);
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
      console.log(error);
    }
  
  
  }
        

  

  async getData(){
          try {
           
            
            let post_data = await AsyncStorage.getItem('post_data')
            //  alert("post_VALUE_SAVED" + post_data)
            let json_post_data= JSON.parse("["+post_data+"]")
       
            this.setState({post_data: json_post_data})
           // RTS:"timestamp"// "Gear",// "Pedale_frein",// "Position_embrayage", // "Vitesse_vehicule" 

           if (this.props.typeF === "initial") {
            let obj ={
                id :parseInt(this.props.asyncId,10),
                stats : JSON.parse(post_data)
            }
            AsyncStorage.getItem('nb_initial'+this.props.asyncId.toString()).then((data) => {
                if(data === null){
                  data= JSON.stringify(obj)
                
                  AsyncStorage.setItem('nb_initial'+this.props.asyncId.toString(),data)
                }else{
                // data=data+','+JSON.stringify(obj)
           
                data=JSON.stringify(obj)
                    //console.log(data);
                AsyncStorage.removeItem('nb_initial'+this.props.asyncId.toString()).then(
                 
                  AsyncStorage.setItem('nb_initial'+this.props.asyncId.toString(),data)
                )
                }
              }).done()
        }
          } catch (error) {
            // alert("retrieve RTS DATA and POST DATA error:" + error)
            console.log(error);
          }
          
          //[{"timestamp": "2021-01-08 10:22:18.236439", "Regime_moteur": 1053.875, "Couple_reel": 72, "Volonte_cond": 16.5, "Contact_frein2": "Relaché"},]
  }
  async decomposition(){
    // RTS:"timestamp"// "Gear",// "Pedale_frein",// "Position_embrayage", // "Vitesse_vehicule" 
    try {
      let tab = []
      let courbe_data = await AsyncStorage.getItem('courbe_data')
      console.log(courbe_data);
      if (courbe_data !== null) {
        let json_data = JSON.parse("["+courbe_data+"]")
        this.setState({courbe_data : json_data })
        this.state.courbe_data.map((obj)=> {
          tab.push([
            obj.timestamp,
            obj.Gear,
            obj.Pedale_frein,
            obj.Position_embrayage,
            obj.Vitesse_vehicule
          ])
        })
        this.setState({decompose_courbe_data : tab})
      }
     
    
   
      
    } catch (error) {
      console.log(error)
    
    }
    
  }
  convertTime(time){
    try {
      console.log(time);
      let heure =""
      let  m =""
      let s =""
      let mm=""
      time=time.replace(" ","T");
      let tps = new Date(time)
      
      console.log(tps);
      let h = tps.getHours()
      console.log(h);
      let mms = tps.getMilliseconds()
      // console.log(mms);
      let seconds = tps.getSeconds()
      // console.log(seconds);
      let min = tps.getMinutes() 
      if (h < 10 ) {
        heure = "0"+h.toString()
      }else{
        heure = h.toString()
      }
      console.log(heure);
      if (min < 10 ) {
        m = "0"+min.toString()
      }else{
        m = min.toString()
      }
      if (seconds < 10) {
        s= "0"+seconds.toString()
      } else {
        s = seconds.toString()
      }
      if (mms < 10) {
        mm= "0"+mms.toString()
      } else {
        mm = mms.toString()
      }
      let timeToSeconds = heure+":"+m+":"+s+":"+mm
      console.log(timeToSeconds);
      return timeToSeconds;
    } catch (error) {
      console.log(error);
    }
    }
  affichageDonnees(index){
  
    try {
     
      this.interval2 = setInterval(() => {
        console.log("i=" +index);
        this.setState({
          timestamp:this.state.decompose_courbe_data[index][0],
          rapport:this.state.decompose_courbe_data[index][1],
          pedale_frein:this.state.decompose_courbe_data[index][2],
          embrayage:this.state.decompose_courbe_data[index][3],
          vitesse:this.state.decompose_courbe_data[index][4]
        })
        index = index+1;
        this.setState({
          index : index
        })
        if (this.state.index === this.state.decompose_courbe_data.length) {
          clearInterval(this.interval2)
        }
      }, 1000);
      
      
    } catch (error) {
      console.log(error)
      // alert("display post data error "+ error)
    }
   
  }

  componentDidMount(){
    console.log(this.props.asyncId);
    // this.animate()
    
    BackHandler.addEventListener('backPress', () => {return true});
      // this.curveScript()
      this.canPost()
      // setTimeout(() => {
      //   this.getData()
        
      // }, 10000);
      // setTimeout(() => {
      //   this.decomposition()
      // }, 12000);

      // setTimeout(() => {
      //   this.affichageDonnees()
      // }, 190000);
  }
  handleMainButtonTouch = () => {
    if (Math.trunc(this.state.currentTime) === this.state.decompose_courbe_data.length) {
      clearInterval(this.interval2)
      this.setState({
        index : 0,
        currentTime :0
      })
    }
    if (this.state.progress >= 1) {
             
      this.player.seek(0);
           
           
      }
    if (this.state.paused ) {
    
        this.affichageDonnees(this.state.index)
    }else{
     
              clearInterval(this.interval2)
            }
           
            this.setState(state => {
            return {
                paused: !state.paused,
                
            };
            });
  };
    
        handleProgressPress = e => {
          const position = e.nativeEvent.locationX;
          const progress = (position / 250) * this.state.duration;
          const isPlaying = !this.state.paused;
          
          this.player.seek(progress);
          
      };
  
      handleProgress = progress => {
        console.log(progress.currentTime);
       
          this.setState({
          progress: progress.currentTime / this.state.duration,
          index: Math.trunc(progress.currentTime),
          currentTime : progress.currentTime
          });
          console.log(this.state.decompose_courbe_data.length);
        if (Math.trunc(progress.currentTime) === this.state.decompose_courbe_data.length) {
            clearInterval(this.interval2)
            this.setState({
              index : 1
            })
          }
      };
  
      handleEnd = () => {
          this.setState({ paused: true });
          this.player.seek(0)
          clearInterval(this.interval2)
            this.setState({
              index : 0,
              currentTime :0
            })
      };
      // handleSeek = seek =>{
      //   console.log(seek);
      // }
      handleForward(){
        
        clearInterval(this.interval2)
        this.player.seek(0)
        this.setState({
          index: Math.floor(this.state.currentTime +10),
          currentTime : this.state.currentTime +10
        })
      
          
          if (this.state.paused && this.state.currentTime >=0 ) {
            setTimeout(() => {
              console.log("respect1");
            this.player.seek(this.state.currentTime)
            this.affichageDonnees(this.state.index)
          }, 1);
          }
          if (Math.trunc(this.state.currentTime) === this.state.decompose_courbe_data.length) {
            clearInterval(this.interval2)
            this.setState({
              index : 1
            })
          }
          
       
      }
      handleBack(){
        clearInterval(this.interval2)
        this.player.seek(0)
        this.setState({
          index: Math.floor(this.state.currentTime -10),
          currentTime : this.state.currentTime - 10
        })
        if (this.state.paused && this.state.currentTime >=0 ) {
          console.log("respect2");
          setTimeout(() => {
          this.player.seek(this.state.currentTime)
          this.affichageDonnees(this.state.index)
        }, 1);
        }

        if (Math.trunc(this.state.currentTime) === this.state.decompose_courbe_data.length) {
          clearInterval(this.interval2)
          this.setState({
            index : 1
          })
        }
      }
  
      handleLoad = meta => {
          this.setState({
          duration: meta.duration,
          paused: true,
          });
      };
        onPressVideo() {
          //showing controls if they don't show
          console.log(this.state.hideControls);
          if(this.state.hideControls){
            this.setState({hideControls: false});
            this.timeoutHandle = setTimeout(()=>{
            this.setState({hideControls: true});
            }, 8000);
          }
        
          else{
            
              this.setState({hideControls: false});
            
          }
        }
        renderNodePlayerView = () => {
            if (this.state.video_path != "") {
              // console.log("pause"+this.state.paused);
              // if (this.state.paused === false) {
              //   this.affichageDonnees()
              // }
              return (
                  <View style={{marginBottom:30}}>
                    <View style={{
                      height:760* (9 /16),
                      width:760,
                      marginHorizontal:20,
                      backgroundColor:'black',
                      marginTop:20,
                     }}>
                  <TouchableWithoutFeedback 
                  
                   onPress={() =>this.onPressVideo()}
                    >
                    <Video 
                      source={{ uri:this.state.video_path}} 
                      
                        style={{
                          height:760* (9 /16),
                          width:760,
                          // marginLeft:20,
                          // marginRight:20,
                         
                            backgroundColor:'black' 
                           }}
                        // rate={this.state.rate}
                      paused={this.state.paused}
                      // volume={this.state.volume} 
                      // muted={this.state.muted} 
                      resizeMode={this.state.resizeMode} 
                      onLoad={this.handleLoad}
                      onProgress={this.handleProgress}
                      onEnd={this.handleEnd}
                      
                      ref={ref => {
                        this.player = ref;
                      }}
                      //controls={true}
                      
                      //repeat={true}
             />
                  </TouchableWithoutFeedback>
                  
                  
                  </View>
				  
                        <View 
                        style={{ 
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            height: 48,
                            width:760,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginLeft:20,
                            marginRight:20,
                            top:-50
                           
                      // position: 'absolute',
                      // top: 0,
                      // bottom: 0,
                      // left: 0,
                      // right: 0,
                      // backgroundColor: '#000000c4',
                      // justifyContent: 'space-between',
                      }}
                        
                        >
                           <TouchableWithoutFeedback 
                          style={{marginRight:5}}
                          onPress={this.handleMainButtonTouch}
                          >
                            <Icon
                            name={!this.state.paused ? "pause" : "play"}
                            color='#fff'
                            size= {36}
                            
                            type="material-community"
                          />
                          </TouchableWithoutFeedback >
                  
                         
                           <TouchableWithoutFeedback 
                          //style={{marginLeft:15}}
                          // onPress={this.handleProgressPress}
                          >
                          <ProgressBar
                            animated = {false}
                            progress={this.state.progress}
                            color="#FFF"
                            unfilledColor="rgba(255,255,255,.5)"
                            borderColor="#FFF"
                            width={300}
                            height={16}
                          //   styleAttr="Horizontal"
                          //   indeterminate={false}
                          // progress={this.getCurrentTimePercentage()}
                          />
                          </TouchableWithoutFeedback >
                          <Text style={{color:'#fff',fontWeight:'bold',left:-5,top:8}}>
                            {secondsToTime(Math.floor(this.state.progress * this.state.duration))}/{secondsToTime(Math.floor(this.state.duration))}
                          </Text>
                         
                          
                          
                        </View >
                </View>
                  );
                
            } else {
                return(
                  <View 
                    style={{
                      justifyContent:"center",
                      backgroundColor:"black",
                      height:760* (9 /16),
                      width:760,
                      marginHorizontal:20,
                  
                      marginTop:20,marginBottom:70,
                      backgroundColor:'black',alignItems:"center"}}>
                    <Progress.Circle
                      // style={{margin:10}}
                      size = {150}
                      color ={'white'}
                      // fill ={'#00B0F0'}
                      showsText = {true}
                      progress={this.state.progressL}
                      indeterminate={this.state.indeterminate}   
                      />
                    {!this.state.error?
                    ( <Text style={{color:'#fff',fontWeight:'bold',fontSize:16,marginTop :30}}>LA VIDEO SE CHARGE</Text>):
                    ( <Text style={{color:'#fff',fontWeight:'bold',fontSize:16,marginTop :30}}>Une erreur est survenue</Text>)
                    }
                    {(this.state.error && this.state.errorSmb!=="" && this.state.errorMqtt=="")?  ( 
                      
                      <TouchableOpacity style={{ backgroundColor:'red',alignItems:"center",width:200,height:60}} onPress={()=>this.canPost()}>
                        <Text style={{color:'#fff',fontWeight:'bold',fontSize:14}}>Réessayer</Text>
                        <Text style={{color:'#fff',fontWeight:'bold',fontSize:10,marginTop :10}}>{this.state.errorSmb}</Text>
                      </TouchableOpacity>
                      
                      ):(null)}
                    {(this.state.error && this.state.errorMqtt!=="")?  ( 
                      
                      <TouchableOpacity style={{ backgroundColor:'red',alignItems:"center",width:200,height:60}} onPress={()=>this.reconnectMqtt()}>
                        <Text style={{color:'#fff',fontWeight:'bold',fontSize:14}}>Réessayer</Text>
                        <Text style={{color:'#fff',fontWeight:'bold',fontSize:10,marginTop :10}}>{this.state.errorMqtt}</Text>
                      </TouchableOpacity>
                      
                      ):(null)}
                   
                  </View>
                )
                
            }
      
      };
      renderVariables(){

          return(
            <View style={{ backgroundColor:'white',borderColor:"#8ea2c6",borderWidth:2,marginHorizontal:20,}}>
                <View style={{flexDirection:"row",marginTop:30,left:15}}>
                    <View style={{flexDirection:"column",}}>
                      <Text style={{fontWeight:"bold",fontSize:22}}>VALEURS TEMPS REEL</Text>
                      <View style={{flexDirection:"row",marginTop:35}}>
                        <View style={{flexDirection:"column",width:175}}>
                          <View style={{marginBottom:50,left:2}}>
                                    <Text style={{fontWeight:"bold",fontSize:16}}>Temps de parcours :</Text>
                                   
                            </View>
                            <View style={{marginBottom:50,left:95}}>
                                <Text style={{fontWeight:"bold",fontSize:16}}>Rapport :</Text>
                                
                            </View>
                          
                            <View style={{marginBottom:50,left:95}}>
                                <Text style={{fontWeight:"bold",fontSize:16}}>Vitesse :</Text>
                                
                            </View>
                            
                            <View style={{marginBottom:50,left:73}}>
                                <Text style={{fontWeight:"bold",fontSize:16}}>Débrayage :</Text>
                             
                            </View>
                            <View style={{marginBottom:50,left:89}}>
                                <Text style={{fontWeight:"bold",fontSize:16}}>Freinage :</Text>
                              
                            </View>
                            
                        </View>
                        <View style={{flexDirection:"column",marginLeft:25}}>
                          <View style={{marginBottom:50}}>
                              
                              <Text style={{fontSize:16,color:'#00B0F0'}}>{this.state.timestamp}</Text>
                            </View>
                            <View style={{marginBottom:50}}>
                                
                                <Text style={{fontSize:16,color:'#00B0F0'}}>{this.state.rapport}</Text>
                            </View>
                          
                            <View style={{marginBottom:50}}>
                              
                                <Text style={{fontSize:16,color:'#00B0F0'}} >{this.state.vitesse.toFixed(2)} km/h</Text>
                            </View>
                            
                            <View style={{marginBottom:50}}>
                                
                              <Text style={{fontSize:16,color:'#00B0F0'}}>{this.state.embrayage.toFixed(2)} </Text>
                            </View>
                            <View style={{marginBottom:50}}>
                               
                              <Text style={{fontSize:16,color:'#00B0F0'}}>{this.state.pedale_frein.toFixed(2)}</Text>
                            </View>
                            
                        </View>
                      </View>
                    </View>
                        {this.state.post_data.length !== 0 ?(
                    <View style={{flexDirection:"column",marginLeft:80}}>
                       <Text style={{fontWeight:"bold",fontSize:22}}>STATISTIQUES DE PARCOURS</Text>
                       <View style={{flexDirection:"row",marginTop:35}}>
                      <View style={{flexDirection:"column",width:215}}>
          
                      <View style={{marginBottom:20,left:52}}>
                        <Text style={{fontWeight:"bold",fontSize:16}}>Durée du parcours :</Text>
                      </View>
                      <View style={{marginBottom:20,left:44}}>
                        <Text style={{fontWeight:"bold",fontSize:16}}>Distance Parcourue :</Text>
                      </View>
                      <View style={{marginBottom:20,left:59}}>
                        <Text style={{fontWeight:"bold",fontSize:16}}>Vitesse Moyenne :</Text>
                      </View>
                      <View style={{marginBottom:20,left:56}}>
                        <Text style={{fontWeight:"bold",fontSize:16}}>Vitesse Maximale :</Text>
                      </View>
                      <View style={{marginBottom:20,left:78}}>
                        <Text style={{fontWeight:"bold",fontSize:16}}>Régime Moyen :</Text>
                      </View>
                      <View style={{marginBottom:20,left:55}}>
                        <Text style={{fontWeight:"bold",fontSize:16}}>Régime Maximum :</Text>
                      </View>
                      <View style={{marginBottom:20,left:87}}>
                        <Text style={{fontWeight:"bold",fontSize:16}}>Levée de pied :</Text>
                      </View>
                      <View style={{marginBottom:20,left:140}}>
                        <Text style={{fontWeight:"bold",fontSize:16}}>Attente :</Text>
                      </View>
                      <View style={{marginBottom:20,left:120}}>
                        <Text style={{fontWeight:"bold",fontSize:16}}>Rejet CO2 :</Text>
                      </View>
                      <View style={{marginBottom:20}}>
                        <Text style={{fontWeight:"bold",fontSize:16}}>Consommation moyenne :</Text>
                      </View>
                      </View>
                      <View style={{flexDirection:"column",marginLeft:25}}>
          
                      <View style={{marginBottom:20}}>
                        <Text style={{fontSize:16,color:'#00B0F0'}}>{this.state.post_data[0].travel_time}</Text>
                      </View>
                      <View style={{marginBottom:20}}>
                        <Text style={{fontSize:16,color:'#00B0F0'}}>{this.state.post_data[0].distance_travelled.toFixed(2)} km</Text>
                      </View>
                      <View style={{marginBottom:20}}>
                        <Text style={{fontSize:16,color:'#00B0F0'}}>{this.state.post_data[0].avg_vehicle_speed.toFixed(2)} km/h</Text>
                      </View>
                      <View style={{marginBottom:20}}>
                        <Text style={{fontSize:16,color:'#00B0F0'}}>{this.state.post_data[0].max_vehicle_speed.toFixed(2)} km/h</Text>
                      </View>
                      <View style={{marginBottom:20}}>
                        <Text style={{fontSize:16,color:'#00B0F0'}}>{this.state.post_data[0].avg_engine_speed.toFixed(2)} tr/min</Text>
                      </View>
                      <View style={{marginBottom:20}}>
                        <Text style={{fontSize:16,color:'#00B0F0'}}>{this.state.post_data[0].max_engine_speed.toFixed(2)} tr/min</Text>
                      </View>
                      <View style={{marginBottom:20}}>
                        <Text style={{fontSize:16,color:'#00B0F0'}}>{this.state.post_data[0].tip_out_distance} m ( {this.state.post_data[0].tip_out_duration} s)</Text>
                      </View>
                      <View style={{marginBottom:20}}>
                        <Text style={{fontSize:16,color:'#00B0F0'}}>{this.state.post_data[0].waiting_time} s</Text>
                      </View>
                      <View style={{marginBottom:20}}>
                        <Text style={{fontSize:16,color:'#00B0F0'}}>{this.state.post_data[0].total_co2_rejection} g/km</Text>
                      </View>
                      <View style={{marginBottom:20}}>
                        <Text style={{fontSize:16,color:'#00B0F0'}}>{this.state.post_data[0].mean_fuel_consumption.toFixed(2)} L/100km</Text>
                      </View>
                      </View>
                      </View> 
                      {/* <View style={{flexDirection:"column",marginLeft:80,borderWidth:2,borderColor:"blue"}}>
                      
                      </View> */}
                   
                    </View> ) 
                    : (
                <View style={{flexDirection:"column",marginLeft:80}}>
          
                <Text style={{fontWeight:"bold",fontSize:22}}>STATISTIQUES DE PARCOURS</Text>
                </View>  
              )
      
    }
      
      
      </View>
     
                  
            </View>  
          )
        
         
      }
        render(){
            return(
                <View style ={styles.app} >
                   
                   <View style={styles.headerContainer}>
                
                  
                   <View style={{alignItems:"center",flexDirection:"row"}}>
                  <Image
                         resizeMode ="contain"
                         style={{ width:200, height:260,right:-15}}
                         source= {require("../../../images/Sanstitre9.png")}
                    />
                  <Text style={styles.headerTitle}>ECO DATA</Text>
                  </View>
                  <Text style={{color:'#00B0F0',fontSize:16,left:-177, textAlign:'right',fontStyle:"italic",top:45}}>Powered by CleanData</Text>
                
                  
              
                <View style={styles.menuButton}>
                   
                    <Icon
                      name='arrow-right'
                      color='white'
                      size= {40}
                      type='font-awesome'
                      onPress={()=>Actions.pop()}
                    />
                   
                    
                </View>
                </View>
                <View style={styles.label} > 
                    {this.renderNodePlayerView()}
                    {this.renderVariables()}
                </View>
                        {/* <View style={styles.label} > 
                        <Select2
                            isSelectSingle = {true}
                            style={{ borderRadius: 5 , height:35, width:350}}
                            colorTheme={'#885159'}
                            popupTitle='Select groupe'
                            title='Select groupe'
                            data={grpeData}
                            cancelButtonText = "Cancel"
                            selectButtonText = "OK"
                            searchPlaceHolderText = "search"
                            
                            onSelect={data => {
                                
                                console.log(data);
                                
                                this.selectGroupe(data)
                                
                                
                            }}
                            onRemoveItem={data => {
                                this.selectGroupe(data)
                                console.log(data);
                                
                            }} 
                        />
                        {this.afficheCourbe()}
                 
                        </View>  */}
                   
            
                                
                    
                   </View>
               )
           }
       }
       
       const styles = StyleSheet.create({
           app:{
               flex:1,
               backgroundColor:"white"
           },
           haut:{
               flex:0,
               justifyContent: 'flex-start',
               },
           Header:{
              
               alignItems: 'center'
              
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
            flex:1,
            
           },
           histo:{
               alignItems:"center",
               paddingTop : 10
               
       
           }, headerContainer: {
            height: 80, //80
            flexDirection: 'row',
            // flex: 1.0,
            // justifyContect: 'center',
            backgroundColor:'#323232',
        },
        headerTitle: {
          marginLeft: 90 ,
        alignSelf: 'center',
        color: 'white',
        fontSize:22,
        top:-10
      },
      menuButton: {
        // flexDirection: 'row',
        
        top:20,
        left:180
      },
          
         });