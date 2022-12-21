import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity ,
  Button,Image,ImageBackground,Alert
} from 'react-native';
import { Card } from 'react-native-paper';
import { Header, Icon} from 'react-native-elements';

import {Actions} from 'react-native-router-flux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SSHClient from 'react-native-sshclient';
import { PermissionsAndroid } from 'react-native';
import { BackHandler } from 'react-native';
import { Modal } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import * as Sentry from '@sentry/react-native';

const permissions =[PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION]


export default class AccueilGCAM extends React.Component {
  constructor (props){
    super(props)
    
    this.state={
      showC2 :false,
      error:false,
      spinner:false

    }
    // this.state={
    //    asyncId:this.props.asyncId
    // }
//    this.getAll = this.getAll.bind(this)
//    this.getAll()
}


	goHomeParcours() {
    try {
      setTimeout(() => {
        this.setState({spinner:false})
        if (this.state.error === false) {
          this.current()
          Actions.accueil()
          setTimeout(() => {
           
            this.executeToPi4()
          }, 4000)
        } else {
          Alert.alert(
            "Une erreur est survenue",
            "Vérifiez que vous êtes bien connecté au pi4 et réessayez",
            [
            {
                text: "OK",
                onPress: () => console.log("OK Pressed") 
            }]
        ) 
        }
      }, 2000);
    } catch (error) {
      Sentry.captureException(error);
    }
    

	}




  async current(){
		let today=new Date();
    let datetime=("0" + today.getDate()).slice(-2)+ "/" +("0" + (today.getMonth()+1)).slice(-2)+ "/" +today.getFullYear()+ " " +("0" + today.getHours()).slice(-2) + ":" +("0" + today.getMinutes()).slice(-2) + ":" + ("0" +today.getSeconds()).slice(-2);
    try {
      await AsyncStorage.setItem("@heure",datetime)
    } catch (error) {
      console.log(error);
    }
   
	}

  async componentDidMount(){
    BackHandler.addEventListener('backPress', () => {return true});
    try {
      AsyncStorage.multiRemove(
        ['data',
        'totalPr',
        'totalV',
        'totalP',
        'totalA',
        'data_sense',
        'time_data',
        'dataFT',
        '@startVideoTime',
        'create_clips',
        'qcmData',
        'video_path',
        "@heurefin",
        "streaming_link",
        'clips_path',
        'clips_name',
        'filename'
        
      ])
      // this.setState({asyncId : this.props.indexStudent})
      //this.askReadPermission()
      this.checkMultiplePermissions(permissions)
      console.log('yes');
      // console.log(this.state.asyncId);
      
      } catch (error) {
        Sentry.captureException(error);
      // Error retrieving data
      console.log(error);
      }
  }
  async startVideoTime(){
		let datetime = new Date()
    let video = {startTime: datetime}
    let str_video = JSON.stringify(video)
    console.log(str_video);
    try {
      //console.log(datetime.toLocaleTimeString());
      await AsyncStorage.setItem("@startVideoTime",str_video)
    } catch (error) {
      console.log(error);
      Sentry.captureException(error);
    }
  }
  async checkMultiplePermissions(permissions) {
    let isPermissionGranted = false;
    const statuses = await PermissionsAndroid.requestMultiple(permissions);
    for (var index in permissions) {
      console.log(statuses[permissions[index]]);
      if (statuses[permissions[index]] === PermissionsAndroid.RESULTS.GRANTED) {
        isPermissionGranted = true;
      } else {
        isPermissionGranted = false;
        break;
      }
    }
    return isPermissionGranted;
  }

  connectPi4(){
    try {
        SSHClient.setup("pi","10.3.141.1",22);
        SSHClient.usePrivateKey(false);
        SSHClient.setPassword("raspberry");
        SSHClient.connect().then(
            (result)=>{
                console.log(result);
        //for us : stream_simulator.py
        //for tushar capture_video.py capture_video.py
            SSHClient.execute("python3 capture_video.py").then(
                (result)=>{
                    console.log(result);
                    // alert(result);
                },
                (error)=>{
                  console.log(error);
                  Sentry.captureException(error);
                  this.setState({
                    error:true
                  })
                }
                );
            },
            (error)=>{
              Sentry.captureException(error);
              this.setState({
                error:true
              })
            }
          );
       

    } catch (error) {
      Sentry.captureException(error);
      this.setState({
        error:true
      })
    }
  

}

async cloture(){
  try {
    let heure = await AsyncStorage.getItem("@heure")
    if (heure != null) {
    
    Actions.clotureGCAM(({stage:this.props.stage, typeF : this.props.typeF,asyncId:this.props.asyncId}))
    } else {
      this.setState({showC2 : true})
    // Alert.alert(
    // 	'Accès Refusé',
    // 	'Vous ne pouvez pas accéder à cette fonctionnalité pour le moment. Lancer le test d'+"'"+'abord.',
    // 	[
    // 		{text: 'OK', onPress: () => console.log('OK Pressed'), style :"cancel" },
    // 	],
    // 	{ cancelable: false }
    // );
    }
  } catch (error) {
    Sentry.captureException(error);
  }
 
}

executeToPi4(){
  try {
      SSHClient.setup("pi","10.3.141.1",22);
      SSHClient.usePrivateKey(false);
      SSHClient.setPassword("raspberry");
      SSHClient.connect().then(
          (result)=>{
              console.log(result);
      //for us : stream_simulator.py
      //for tushar capture_video.py
          SSHClient.execute("python3 store_video.py").then(
              (result)=>{
                  console.log(result);
                  // alert(result);
              },
              (error)=>{
                Sentry.captureException(error);
                  // alert(error);
              }
              );
          },
          (error)=>{
            Sentry.captureException(error);
            // alert(error);
          }
        );
  } catch (error) {
    Sentry.captureException(error);
    //  alert(error)
      console.log(error);
  }


  }
  
  render() {
    return (
          <View style={styles.container}>
             <View style={styles.headerContainer}>
             <View style={{alignItems:"center",flexDirection:"row"}}>
             <Image
                         resizeMode ="contain"
                         style={{ width:200, height:260,left:15}}
                         source= {require("../../images/Sanstitre9.png")}
                    />
                  <Text style={styles.headerTitle}>CAM DATA</Text>
                  </View>
                  <Text style={{color:'#00B0F0',fontSize:16,left:-177, textAlign:'right',fontStyle:"italic",top:45}}>Powered by CleanData</Text>
          </View>
          <View style={styles.Card1}> 
             
            <Card style={styles.Card2}>
              <Card style={styles.Card7}>
              <TouchableOpacity style={styles.button2} 
                      onPress={() => {
                       
                        this.connectPi4()
                        this.setState({spinner:true})
                        this.goHomeParcours()
                       

                        // setTimeout(() => {
                        //   this.sendIpAdress()
                        // },2000);
                         }
                      }
                    >
                      <Icon
                        type='material-community'
                         name='camera'
                         color='white'
                         size= {50}
                         
                      />
                <Text style={styles.buttonText}>Lancer Test</Text>
                 </TouchableOpacity>   
              </Card>
            </Card>
            <Card style={styles.Card8}>
              <Card style={styles.Card9}>
                  
              </Card>
            </Card>
            <Card style={styles.Card10}>
              <Card style={styles.Card11}>
              <TouchableOpacity style={styles.button}
				 	onPress={() =>{ 
             this.cloture()
             //{stage:this.props.stage ,stageName : this.props.stageName}
            // Actions.clotureGCAM({asyncId : this.props.asyncId,stage:this.props.stage,typeF: this.props.typeF,stageName : this.props.stageName})
            
            // setTimeout(() => {
            //   Actions.clotureGCAM()
            // }, 3000);
          }
          }
      
				>
                  <Icon
                  type='material-community'
                  name='stop-circle-outline'
                  color='white'
                  size= {50}
                
                      />
                	<Text style={styles.buttonText}>Clôturer Test</Text>
                 </TouchableOpacity>  
              
              </Card>
            </Card>
            <Card style={styles.Card12}>
              
            </Card>
                {/* SPINNER */}
                <Spinner
                            visible={this.state.spinner}
                            animation={"fade"}
                            overlayColor={"#40606060"}
                            indicatorStyle ={{size: "large"}}
                            textContent={"Connexion aux données véhicule..."}
                            textStyle={styles.spinnerTextStyle}
                            
                        />
            
              </View>
              <Modal animationType="slide"
                  transparent={true}  visible={this.state.showC2} 
                  
                  onRequestClose={(() => this.setState({showC2:false}))}>
                  <View style={styles.modals}>
                  
                    <View style={{flexDirection:"column",marginTop:15}}>
                    <Icon
                        name='exclamation-circle'
                        type='font-awesome-5'
                        color='#fff'
                        size= {36}
                        style={{right:270}}
                        />
                      <View style={{marginVertical:50,justifyContent:"center",
alignItems: "center",}}>
                      <Text style={ { textAlign:"center",fontSize:14,color:'white',fontSize:20} }>
                      Accès Refusé {"\n"}{"\n"} Vous ne pouvez pas accéder à cette fonctionnalité pour le moment.
                      {"\n"} Lancer le test d'abord.
				              </Text>
                      </View>
                      <View style={{flexDirection :"row",alignItems:"center",
                          justifyContent:"center",marginTop:25}}>
                      <TouchableOpacity
                         
                          style={ { width:250,height:90,  backgroundColor:'#191919',alignItems:"center",
                          justifyContent:"center",borderColor:'#00B0F0',
                          borderWidth:2,
                          alignContent:"center",borderRadius:5 } }
                          onPress={ () => {
                            this.setState({showC2:false})
                           
                         }}
                        >
                          <Text style={ {textAlign:"center",fontSize:14,color:'white',fontSize:20} }>
                             OK
                          </Text>
                      </TouchableOpacity>

                      {/* <TouchableOpacity
                          onPress={ () => {
                             this.setState({showC2:false})
                            
                          }}
                          style={ { width:250,height:90,  backgroundColor:"#404040",alignItems:"center",
                          justifyContent:"center",borderColor:'#00B0F0',
                          borderWidth:2,
                          alignContent:"center",borderRadius:5, marginLeft :25 } }
                          
                        >
                          <Text style={ {textAlign:"center",fontSize:14,color:'white',fontSize:20} }>
                              Non, j'annule ce choix
                          </Text>
                          </TouchableOpacity> */}
                      </View>
                    </View>
                    
                    </View>
                </Modal>
              
          </View>
          )
      }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#191919',
    //justifyContent:'center'
  },
 
  Card1: {
      width:800,
      height:1200,
      //top:100,
      //borderTopLeftRadius:400,
      //borderBottomLeftRadius:200,
      //borderBottomRightRadius:500,
      //marginLeft:170,
     // alignItems:'center',
      backgroundColor:'#191919'
    },
    Card2: {
      width:500,
      height:500,
      top:90,
      borderRadius:250,
      alignItems:'center',
      backgroundColor:'#e43137'
    },
    Card7: {
      width:400,
      height:400,
      top:50,
      borderRadius:200,
      alignItems:'center',
      backgroundColor:'#000000'
    },
    
    Card8: {
      width:250,
      height:250,
      top:-170,
      left:500,
      borderRadius:125,
      justifyContent:"center",
      alignContent:"center",
      alignItems:'center',
      backgroundColor:'#00B0F0'
    },
    Card9: {
      width:160,
      height:160,
      top:45,
      //left:-8,
      borderRadius:80,
      alignItems:'center',
      backgroundColor:'#000000'
    },
    Card10: {
      width:500,
      height:400,
      top:-130,
      left:90,
      borderRadius:20,
      alignItems:'center',
      backgroundColor:'#00B0F0'
    },
    Card11: {
      width:400,
      height:300,
      top:50,
      //left:90,
      justifyContent:"center",
      alignContent:"center",
      borderRadius:20,
      alignItems:'center',
      backgroundColor:'#000000'
    },
    Card12: {
      width:100,
      height:300,
      top:-470,
      left:650,
     borderRadius:20,
      alignItems:'center',
      backgroundColor:'#e43137'
    },
    Card13: {
      width:400,
      height:300,
      top:-300,
      left:-130,
      borderRadius:20,
      alignItems:'center',
     // backgroundColor:'#f2e2cd',
      justifyContent:"center",
      alignContent:"center",
      alignItems:'center',
      position: 'absolute',
    },
    Card3: {
      width:700,
      height:700,
      top:20,
      borderRadius:400,
      borderBottomEndRadius:0,
      //borderTopRightRadius:300,
      //borderBottomLeftRadius:300,
      //marginLeft:170,
      alignItems:'center',
      backgroundColor:'#f2e2cd'
    },
    button: {
      width:400,
      height:300,
      backgroundColor:'black',
      borderRadius: 20,
      justifyContent:"center",
      alignContent:"center",
      alignItems:'center',
      marginVertical: 10,
      paddingVertical: 13,
      top:-10,
      //borderWidth:2,
      //borderColor:'#00B0F0',

    },
    button2: {
      width:400,
      height:400,
      backgroundColor:'black',
      borderRadius: 200,
      justifyContent:"center",
      alignContent:"center",
      alignItems:'center',
      marginVertical: 10,
      paddingVertical: 13,
      top:-10,
      //borderWidth:2,
      //borderColor:'#00B0F0',

    },
    button1: {
      width:40,
      height:400,
      backgroundColor:'#ccccbbb7',
      borderRadius: 200,
      marginVertical: 10,
      alignItems: 'center',
      justifyContent:'center',
      // paddingVertical: 130,
      
    },
    buttonText: {
      fontSize:24,
      fontWeight:'500',
      color:'#ffffff',
      textAlign:'center'
    },
    headerContainer: {
      //top:24,
      height: 80, //80
      flexDirection: 'row',
      // flex: 1.0,
      // justifyContect: 'center',
      backgroundColor:'#323232',
  },
  headerTitle: {
    // flex: 1.0,
    marginLeft: 90,
    // marginRight: 8,
  //  right: 300,
    alignSelf: 'center',
    color: 'white',
    fontSize:22,
    top:-10
},

modals:{
  width:620,
  height:500,
  borderRadius: 10,
  

  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
  top:400,
  backgroundColor:'#191919',
  borderColor:'#00B0F0',
  borderWidth:2,
  
  left:90
// top:350,
// flexDirection:'column',
// margin: 20,
// backgroundColor: "white",
// borderRadius: 20,
// padding: 35,
// alignItems: "center",
// shadowColor: "#000",
// shadowOffset: {
// 	width: 0,
// 	height: 2
// },
// shadowOpacity: 0.25,
// shadowRadius: 3.84,
// elevation: 5
},
spinnerTextStyle: {
  color: '#FFF'
},
});

