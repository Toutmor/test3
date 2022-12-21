import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity ,Image, Alert,TouchableHighlight,
  PermissionsAndroid,
  Modal,SafeAreaView,FlatList,TextInput, TouchableWithoutFeedback,
} from 'react-native';
import {
    Card
   }  from 'react-native-paper'
import { Header,Icon} from 'react-native-elements'
//import Icon from 'react-native-vector-icons/FontAwesome'
import {Actions} from 'react-native-router-flux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logoutTrainer } from '../actions/auth.actions';
import FileViewer from "react-native-file-viewer";
import RNFS from "react-native-fs";
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box"
import WifiManager from 'react-native-wifi-reborn';
import { connect } from 'react-redux';
import { BackHandler } from 'react-native';
import * as Sentry from '@sentry/react-native';

const permissions =[PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION]


  class HomeStage extends React.Component {
  constructor (props){
    super (props)
    this.state = {
        //infos trainer
        trainer_id:"",
        trainer_first_name:"",
        trainer_last_name:"",
        connected:false,
        wifi_availables: [],
        wifiIsEnabled:false,
        passwordWifi:"",
        isSelected:false,
        selectedItem:[],
        selectWifi:false,
        stageName :"",
        stageProps:"",
        showC2 :false

    }
    this.getInfoTrainer = this.getInfoTrainer.bind(this)
    // this.saveData = this.saveData.bind(this)
    this.getInfoTrainer()
   
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

async requestLocationPermission(){
    LocationServicesDialogBox.checkLocationServicesIsEnabled({
        message: "<h2 style='color: #0af13e'>Use Location ?</h2>This app wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location<br/><br/><a href='#'>Learn more</a>",
        ok: "YES",
        cancel: "NO",
        enableHighAccuracy: true, // true => GPS AND NETWORK PROVIDER, false => GPS OR NETWORK PROVIDER
        showDialog: true, // false => Opens the Location access page directly
        openLocationServices: true, // false => Directly catch method is called if location services are turned off
        preventOutSideTouch: false, // true => To prevent the location services window from closing when it is clicked outside
        preventBackClick: false, // true => To prevent the location services popup from closing when it is clicked back button
        providerListener: false // true ==> Trigger locationProviderStatusChange listener when the location state changes
    }).then((success) =>{
        this.enableWifi()
        console.log(success); // success => {alreadyEnabled: false, enabled: true, status: "enabled"}
    }).catch((error) => {
        console.log(error.message); // error.message => "disabled"
    });
}
async verifyAlwaysConnected(){
    try {
        const alwaysConnected = WifiManager.connectionStatus()
        if (alwaysConnected) {
        console.log(alwaysConnected)
            // WifiManager.disconnect().then((data)=>{console.log(data)})
        }
    } catch (error) {
        console.log(error);
    }
}
async enableWifi(){
  this.setState({selectWifi:true});
    try {
        const enabled = await WifiManager.isEnabled();
        
        if (enabled === false) {
            WifiManager.setEnabled(true)
        }else{
           
            this.scanWifi()
        }
        this.setState({wifiIsEnabled: enabled});
        
    } catch (error) {
       console.log(error); 
    }
    
}


async scanWifi(){
    this.verifyAlwaysConnected()
    try {
        await WifiManager.loadWifiList()
        .then(
            (data)=>{
                console.log(data);
                this.setState({wifi_availables:data})
            }
        ).catch((error)=>{
            // alert(error)
            console.log(error);
        })
        
    } catch (error) {
        console.log(error);
    }
}
async connectWifi(ssid,password,wep){
  await WifiManager.connectToProtectedSSID(ssid,password,wep)
  .then((result)=>{
      console.log(result);
      if (result === "connected") {
         this.setState({isSelected:false,selectWifi:false}) 
         Actions.login()
      }
      // alert("vous êtes maintenant connecté au réseau"+ssid)
  })
  .catch((error)=>
      alert(error)
 )
}
onChangeText = (value) => {
  this.setState({
      passwordWifi : value
  })
}
async componentDidMount(){
  this.checkMultiplePermissions(permissions)
  BackHandler.addEventListener('backPress', () => {return true});
  // this.requestLocationPermission()
}


goToOutils(){
  try {
    Actions.homP()
  } catch (error) {
    Sentry.captureException(error);
    console.log(error);
  }

}
logoutTrainer = () => { 
  try {
    
    Alert.alert(
      'Déconnexion',
      'Voulez-vous vous déconnecter?',
      [
          {text: 'Non', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'Oui', onPress: () => this.props.dispatch(logoutTrainer())},
      ],
      { cancelable: false }
  );
    
  } catch (error) {
    console.log(error);
    Sentry.captureException(error);
  }
 
}
async getInfoTrainer (){
  let str_trId= await AsyncStorage.getItem('@trainer_id')
  let str_trfname=await AsyncStorage.getItem('@trainer_first_name')
  let str_trlname = await AsyncStorage.getItem('@trainer_last_name')
  this.setState({
  trainer_id : str_trId,
  trainer_first_name : str_trfname,
  trainer_last_name : str_trlname,
})
  console.log(parseInt(str_trId,10));
}
capitalize(str){
  return str.charAt(0).toUpperCase();
}

// async componentDidMount(){
  
// }
renderTextInput = (field) =>{
  const {meta: { touched, error }, label, secureTextEntry, maxLength, keyboardType, placeholder, input: {onChange, ...restInput}} = field
  return(
    <View>
     <InputText
        onChangeText = {onChange}
        maxLength = {maxLength}
        placeholder = {placeholder}
        keyboardType = {keyboardType}
        secureTextEntry={secureTextEntry}
        label={label}
        {...restInput}
     />   
     {(touched && error) && <Text style={styles.errorText}>{error}</Text>}
    </View>
  )
}

renderItem(item){

  return (
      <View style={{left:150}}>
      <TouchableOpacity onPress={()=>{
          this.setState({isSelected:true,selectedItem:item})
          console.log(this.state.isSelected)
      }}
      style={{width:250, height: 50,
      backgroundColor: '#323232',
      justifyContent:"center",
      alignContent:"center",
      marginVertical:15}}>
      
          <Text style={{fontSize: 16, textAlign: 'center', color: '#00B0F0',}}>{item.SSID}</Text>

      </TouchableOpacity>
      </View>
       
      
    );
}
async stageHeure(){
  let today=new Date();
  let datetime=("0" + today.getDate()).slice(-2)+ "/" +("0" +(today.getMonth()+1)).slice(-2)+ "/" +today.getFullYear()+ ", à " +("0" + today.getHours()).slice(-2) + ":" +("0" + today.getMinutes()).slice(-2) + ":" + ("0" +today.getSeconds()).slice(-2);
  try {
    await AsyncStorage.setItem("@heureStage",datetime)
  } catch (error) {
    console.log(error);
    Sentry.captureException(error);
  }
 
}
confirmStage(stage){
  try {
    if (stage === "INITIAL ou RAPPEL (VL/VUL/PL)") {
      this.setState({stageName : stage,
            stageProps :  "INITIAL",
            showC2 :true   
      })
  
    }else{
      if(stage==="INITIAL ou RAPPEL CAM DATA (VL/VUL/PL)"){
        this.setState({stageName : stage,
          stageProps :  "RAPPEL CAM DATA (VL/VUL/PL)",
          showC2 :true   
    })
     
      }
      else if (stage === "ECO CONDUITE (VL/VUL)"){
        this.setState({stageName : stage,
          stageProps :  "ECO CONDUITE (VL/VUL)",
          showC2 :true   
        })
      }
      else if (stage === "AUDIT CAM DATA ou POLY ACCIDENTE (VL/VUL/PL)"){
        this.setState({stageName : stage,
          stageProps :  "AUDIT CAM DATA",
          showC2 :true   
        })
      }
      else if (stage === "INTENSIF ou URGENCE MEDICALE (VL/VUL)"){
        this.setState({stageName : stage,
          stageProps :  "INTENSIF",
          showC2 :true   
        })
      }
      else if (stage === "SIMULATEUR + CAM DATA (VL/VUL)"){
        this.setState({stageName : stage,
          stageProps : "SIMULATEUR + CAM DATA (VL/VUL)",
          showC2 :true   
        })
      }
      else if (stage === "JOURNEE CONVENTION"){
        this.setState({stageName : stage,
          stageProps : "JOURNEE CONVENTION",
          showC2 :true   
        })
      }
      else if (stage === "CENTRE DE GRAVITE ELEVE (VUL/PL)"){
        this.setState({stageName : stage,
          stageProps : "CENTRE DE GRAVITE ELEVE (VUL/PL)",
          showC2 :true   
        })
      }
  
    }
  } catch (error) {
    Sentry.captureException(error);
  }
 

  
}
onPress = async () => {
  // metter l'url ici -----
  const url =
  'https://api.cleandata.link/uploads/others_files/User_Guide_Tablet_App_V0.pdf';
  // -----

  // ceci va diviser l'url entière.
  const f2 = url.split("/");
  // nom du fichier avec l'extension.
  const fileName = f2[f2.length - 1];
  // const fileExtention = url.split(".")[3];

  // créer un chemin de fichier local à partir de l'url
  const localFile = `${RNFS.DocumentDirectoryPath}/${fileName}`;
  const options = {
    fromUrl: url,
    toFile: localFile,
  };

  // il sera téléchargé et ouvert avec fileviewer..
  RNFS.downloadFile(options)
    .promise.then(() => FileViewer.open(localFile))
    .then(() => {
      // success
    })
    .catch((error) => {
      // error
    });
};
async gotoTools(){
  try {
    this.setState({showC2:false})
    console.log(this.state.stageProps);
    console.log(this.state.stageName);
    await AsyncStorage.setItem('stage',this.state.stageProps)
    await AsyncStorage.setItem('stageName',this.state.stageName)
    await AsyncStorage.setItem('isStageCompleted',"true")
    Actions.loginStudent({stage: this.state.stageProps , stageName : this.state.stageName})
    this.stageHeure()
  } catch (error) {
    Sentry.captureException(error);
  }

}


    render() {
      const list = this.state.wifi_availables
        return (
            <View style={styles.container}>
              <View style={styles.headerContainer}> 
              <View style={{justifyContent:"center"}}>
           
                  <View style={{justifyContent:"center",alignItems:"center",flexDirection:"row"}}>
                    <Image
                      resizeMode ="contain"
                          style={{ width:200, height:260,left:15}}
                          source= {require("../images/Sanstitre9.png")}
                    />
                    <View style={{left:500,flexDirection:"row",justifyContent:"center"}}>
                      <Text style={{color:'#fff',marginHorizontal:10,fontSize:20,top:4,fontWeight:'bold'}}>{this.capitalize(this.state.trainer_first_name)} {this.capitalize(this.state.trainer_last_name)}</Text> 
                      <Icon
                        name='export'
                        type='material-community'
                        color='#fff'
                        size= {36}
                        //containerStyle={{left:9}}
                        onPress={()=>this.logoutTrainer()}
                       />
                    </View>
                  </View>
              </View>
              </View>
              <View style={{top:10,}}>
            <TouchableOpacity
            disabled={true}
          style={{ width:40,height:40 ,left:750}}>
          <Icon
                        name='alert-circle'
                        type='material-community'
                        color='gray'
                        size= {36}
                        //containerStyle={{left:9}}
                         onPress={()=>this.onPress()}
                       />
        </TouchableOpacity>
              </View>
              <View style={{top:50,justifyContent:"center",alignItems:"center"}}>
                  <Text style={{color:'#00B0F0',fontSize:26,justifyContent:"center",alignItems:"center",fontWeight:"bold"}}>SELECTION STAGE</Text>
              </View>
     
            <View style={{flexDirection:'row',top:130}}>

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
                           {this.state.stageName} {"\n"}{"\n"} 
				              </Text>
                      </View>
                      <View style={{flexDirection :"row",alignItems:"center",
                          justifyContent:"center",marginTop:25}}>
                      <TouchableOpacity
                          onPress={ () => {
                            this.gotoTools()
                           
                           }}
                          style={ { width:250,height:90,  backgroundColor:'#191919',alignItems:"center",
                          justifyContent:"center",borderColor:'#00B0F0',
                          borderWidth:2,
                          alignContent:"center",borderRadius:5 } }
                          
                        >
                          <Text style={ {textAlign:"center",fontSize:14,color:'white',fontSize:20} }>
                              CONFIRMER
                          </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                          onPress={ () => {
                             this.setState({showC2:false})
                            
                          }}
                          style={ { width:250,height:90,  backgroundColor:'#191919',alignItems:"center",
                          justifyContent:"center",borderColor:'#00B0F0',
                          borderWidth:2,
                          alignContent:"center",borderRadius:5, marginLeft :25 } }
                          
                        >
                          <Text style={ {textAlign:"center",fontSize:14,color:'white',fontSize:20} }>
                              ANNULER
                          </Text>
                          </TouchableOpacity>
                      </View>
                    </View>
                    
                    </View>
                </Modal>
                
                  <Card style={styles.Card1}>
                    <TouchableWithoutFeedback style={styles.touch1} 
                    onPress={()=>{this.confirmStage("INITIAL ou RAPPEL (VL/VUL/PL)")}}>
                       <View style={styles.touch1}>
                          <Text style={{fontSize:16,color:'#fff'}}>INITIAL</Text>
                          <Text style={{fontSize:16,color:'#fff'}}>ou</Text>
                          <Text style={{fontSize:16,color:'#fff'}}>RAPPEL</Text>
                          <Text style={{fontSize:16,color:'#fff'}}>(VL/VUL/PL)</Text>
                        </View>
                    </TouchableWithoutFeedback>
                  </Card>
                  <Card style={styles.Card2}>
                    <TouchableWithoutFeedback style={styles.touch1} onPress={()=>this.confirmStage("INITIAL ou RAPPEL CAM DATA (VL/VUL/PL)")}>
                      <View style={styles.touch1}>
                        <Text style={{fontSize:16,color:'#fff'}}>INITIAL ou RAPPEL</Text>
                        <Text style={{fontSize:16,color:'#fff'}}>{"\n"}CAM DATA</Text>
                        <Text style={{fontSize:16,color:'#fff'}}>{"\n"}(VL/VUL/PL)</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    
                  </Card>
            </View>
                <View style={{flexDirection:'row',top:130}}>
                  <Card style={styles.Card3}>
                    <TouchableWithoutFeedback style={styles.touch1} 
                    onPress={()=>this.confirmStage("ECO CONDUITE (VL/VUL)")}
                    >
                      <View style={styles.touch1}>
                        <Text style={{fontSize:16,color:'#fff'}}>ECO CONDUITE</Text>
                        <Text style={{fontSize:16,color:'#fff'}}>{"\n"}(VL/VUL)</Text>
                      </View>
                    </TouchableWithoutFeedback>
                  </Card>
                  <Card style={styles.Card4}>
                    <TouchableWithoutFeedback style={styles.touch1} 
                    onPress={()=>this.confirmStage("AUDIT CAM DATA ou POLY ACCIDENTE (VL/VUL/PL)")}
                    >
                      <View style={styles.touch1}>
                        <Text style={{fontSize:16,color:'#fff'}}>AUDIT CAM DATA</Text>
                        <Text style={{fontSize:16,color:'#fff'}}>ou</Text>
                        <Text style={{fontSize:16,color:'#fff'}}>POLY ACCIDENTE</Text>
                        <Text style={{fontSize:16,color:'#fff'}}>(VL/VUL/PL)</Text>
                      </View>
                    </TouchableWithoutFeedback>
                  </Card>
                </View>
                <View style={{flexDirection:'row',top:130}}>
                  <Card style={styles.Card5}>
                    <TouchableWithoutFeedback style={styles.touch1} 
                    onPress={()=>this.confirmStage("INTENSIF ou URGENCE MEDICALE (VL/VUL)")}>
                      <View style={styles.touch1}>
                        <Text style={{fontSize:16,color:'#fff'}}>INTENSIF</Text>
                        <Text style={{fontSize:16,color:'#fff'}}>ou</Text>
                        <Text style={{fontSize:16,color:'#fff'}}>URGENCE MEDICALE</Text>
                        <Text style={{fontSize:16,color:'#fff'}}>(VL/VUL)</Text>
                      </View>
                    </TouchableWithoutFeedback> 
                  </Card>
                  <Card style={styles.Card6}>
                    <TouchableWithoutFeedback style={styles.touch1} 
                    onPress={()=>this.confirmStage("SIMULATEUR + CAM DATA (VL/VUL)")}>
                      <View style={styles.touch1}>
                        <Text style={{fontSize:16,color:'#fff'}}>SIMULATEUR</Text>
                        <Text style={{fontSize:16,color:'#fff'}}>+</Text>
                        <Text style={{fontSize:16,color:'#fff'}}>CAM DATA</Text>
                        <Text style={{fontSize:16,color:'#fff'}}>(VL/VUL)</Text>
                      </View>
                    </TouchableWithoutFeedback>   
                  </Card>
                </View>
                <View style={{flexDirection:'row',top:130}}>
                <Card style={styles.Card7}>
                    <TouchableWithoutFeedback style={styles.touch1} 
                    onPress={()=>this.confirmStage("JOURNEE CONVENTION")}>
                      <View style={styles.touch1}>
                       <Text style={{fontSize:16,color:'#fff'}}>JOURNEE</Text>
                       <Text style={{fontSize:16,color:'#fff'}}>{"\n"}CONVENTION</Text>
                       </View>
                    </TouchableWithoutFeedback>   
                  </Card>
                  <Card style={styles.Card8}>
                    <TouchableWithoutFeedback style={styles.touch1} 
                    onPress={()=>this.confirmStage("CENTRE DE GRAVITE ELEVE (VUL/PL)")}>
                      <View style={styles.touch1}>
                       <Text style={{fontSize:16,color:'#fff'}}>CENTRE DE GRAVITE</Text>
                       <Text style={{fontSize:16,color:'#fff'}}>ELEVE</Text>
                       <Text style={{fontSize:16,color:'#fff'}}>(VUL/PL)</Text>
                      </View>
                       
                       
                    </TouchableWithoutFeedback>   
                  </Card>
                  </View>
                  <View style={{top:200,left:580}}>
                <Text style={{fontSize:20,color:'#00B0F0',fontStyle:'italic'}}>Powered by CleanData</Text>
                </View>
            </View>
            
            )
        }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#191919'
    },
    touch1:{
      width:200,
      height:200,
      alignContent:'center',
      justifyContent:'center',
      alignItems:'center'
    },
    Card1: {
        width:200,
        height:200,
        //top:200,
        marginLeft:170,
        alignItems:'center',
        //justifyContent:'center',
        borderWidth:2,
        borderColor:'#00B0F0',
       backgroundColor:'#191919'
      },
      Card2: {
        width:200,
        height:200,
        //top:200,
        marginLeft:50,
        borderWidth:2,
        borderColor:'#00B0F0',
        alignItems:'center',
        backgroundColor:'#191919'
      },
      Card3: {
        width:200,
        height:200,
        top:10,
        marginLeft:170,
        borderWidth:2,
        borderColor:'#00B0F0',
        alignItems:'center',
        backgroundColor:'#191919'
      },
      Card4: {
        width:200,
        height:200,
        top:10,
        marginLeft:50,
        borderWidth:2,
        borderColor:'#00B0F0',
        alignItems:'center',
        backgroundColor:'#191919'
      },
      Card5: {
        width:200,
        height:200,
        top:20,
        marginLeft:170,
        borderWidth:2,
        borderColor:'#00B0F0',
        alignItems:'center',
        backgroundColor:'#191919'
      },
      Card6: {
        width:200,
        height:200,
        top:20,
        marginLeft:50,
        borderWidth:2,
        borderColor:'#00B0F0',
        alignItems:'center',
        backgroundColor:'#191919'
      },
      Card7: {
        width:200,
        height:200,
        top:30,
        marginLeft:170,
        borderWidth:2,
        borderColor:'#00B0F0',
        alignItems:'center',
        backgroundColor:'#191919'
      },
      Card8: {
        width:200,
        height:200,
        top:30,
        marginLeft:50,
        borderWidth:2,
        borderColor:'#00B0F0',
        alignItems:'center',
        backgroundColor:'#191919'
      },
      headerContainer: {
        height: 80, //80
        flexDirection: 'row',
        // flex: 1.0,
        // justifyContect: 'center',
        // backgroundColor:'#cdcdcd'
        backgroundColor:'#323232'
        
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
      },
  });
  mapDispatchToProps = (dispatch) => ({
  	dispatch
})
  export default  connect(mapDispatchToProps)(HomeStage)


