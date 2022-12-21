import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
  TouchableHighlight,
  PermissionsAndroid,
  Modal,SafeAreaView,FlatList
} from 'react-native';
import {Actions} from 'react-native-router-flux'
import {loginTrainer} from '../actions/auth.actions'
import InputText from '../components/InputText';
import Loader from '../components/loader';
import { Field, reduxForm } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {ErrorUtils} from "../utils/auth.utils"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from 'react-native-elements';

import LocationServicesDialogBox from "react-native-android-location-services-dialog-box"
import WifiManager from 'react-native-wifi-reborn';
import { BackHandler } from 'react-native';
import * as Sentry from '@sentry/react-native';
const permissions =[PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION]

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state={
        connected:false,
        wifi_availables: [],
        wifiIsEnabled:false,
        passwordWifi:"",
        isSelected:false,
        selectedItem:[],
        selectWifi:false,
       
    }
}
  
  loginTrainer = async(values) => {
    try {
      // const {dispatch} = this.props
      // // console.log(this.props.dispatch());
      const response = await this.props.dispatch(loginTrainer(values))
    // console.log("ab   "+response.success);
     // console.log(this.props.dispatch(loginTrainer(values)));
      if (!response.success) {
          throw response
      }
    }
      catch (error) {
        console.log(error);
        const newError = new ErrorUtils(error, "Authentification formateur échoué")
        newError.showAlert()
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
            WifiManager.disconnect().then((data)=>{console.log(data)})
        }
    } catch (error) {
        console.log(error);
    }
}
async enableWifi(){
  
    try {
        const enabled = await WifiManager.isEnabled();
        
        if (enabled === false) {
            WifiManager.setEnabled(true)
        }else{
          this.setState({selectWifi:true});
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
      
    // } catch (err) {
    //   let errorText ="";
    //   if(err.message){
    //     errorText = err.message
    //   }
    //   console.log( 1+ err);
    //   console.log(2+ err.responseBody.status);
    //   errorText = err.responseBody
    //   Alert.alert(
    //     'Login Error!',
    //     errorText,
    //     [
    //       {
    //         text: 'Cancel',
    //         onPress: () => console.log('Cancel Pressed'),
    //         style: 'cancel'
    //       }
    //     ]
    //   )
    // }
  

  onSubmit =async (values)=> {
     console.log(values);
    try {
      values.platform = "tablet"
      console.log(values);
      this.loginTrainer(values)
      const value = await AsyncStorage.getItem('@trainer_id')
      console.log(value);
    } catch (error) {
      console.log(error);
      Sentry.captureException(error);
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
      console.log(error)
        // alert(error)
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
    try {
      await AsyncStorage.multiRemove(
        ["@heure","@heurefin",'@student_id',
        '@student_first_name','@student_last_name','@trainer_first_name','@trainer_last_name',
        'courbe_data','post_data','nodbox_video_path',])
    
      
      console.log('yes');
      
      } catch (error) {
      // Error retrieving data
      console.log(error);
      Sentry.captureException(error);
      }
}

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

  render(){
    const {handleSubmit , loginTrainer , reset} = this.props
    const list = this.state.wifi_availables
    return(
      <View style={styles.app}>
        <View style={{top:90 ,justifyContent:"center",alignItems:"center"}}> 
           <View style={{justifyContent:"center"}}>
           
                  <View style={{justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
                  
               <Text style={styles.headerTitle}>BELTOISE  EVOLUTION</Text>
               <Text style={styles.headerTitles}>STAGES</Text>
              <Image
                 resizeMode ="contain"
                 style={{ width:400, height:300}}
                  source= {require("../images/Sanstitre9.png")}
               />
              </View>  
              </View>
            </View>
          
      <View style={styles.container}>
        
        {(loginTrainer && loginTrainer.isLoading)}
        <Field
          name="username"
          placeholder={"Nom d"+"'utilisateur"}
          component={this.renderTextInput}
        />
        <Field
          name="password"
          placeholder="Mot de passe"
          secureTextEntry={true}
          component={this.renderTextInput}
        />
        <TouchableHighlight
          style={styles.button}
          onPress={handleSubmit(this.onSubmit)}
          >
          <Text style={styles.buttonText}>CONNEXION</Text>

        </TouchableHighlight>
      </View>
      <View style={{justifyContent:"flex-end",top:370}}>
              {/* <Text style={{ alignSelf: 'flex-start',color: 'white',fontSize:36,paddingLeft:50,fontWeight:"bold",}}>LOGIN FORMATEUR</Text> */}
        <Text style={{color:'#00B0F0',fontSize:20,fontStyle:"italic",left:570}}>Powered by CleanData</Text>
      </View>

      <Modal visible={this.state.selectWifi}
      
      animationType="slide" transparent={true}>
      
      <SafeAreaView 
                style={{width:"100%",height:700,borderWidth:1,top:190,
                
                shadowOffset: {
                    width: 0,
                    height: 2

                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                borderColor:"#00B0F0",
                backgroundColor:"#323232"
            }}
                >
                  <View style={{left:550,top:30,flexDirection:"row"}}>
                  <Icon
                            name='reload'
                            type="material-community"
                            color='red'
                            size= {30}
                            
                            onPress={() => 
                              this.scanWifi()}	
                        />
                       
                  <View style={{marginLeft:30}}>
                  <Icon
                            name='close-circle-outline'
                            type="material-community"
                            color='red'
                            size= {30}
                            
                            onPress={() => 
                              this.setState({selectWifi:false})}	
                        />
                        </View>
                        </View>
                {(list.length == 0) &&
                    <View>
                    <Text style={{color:'#fff',textAlign:"center"}}>No Wifi</Text>
                    </View>
                }
                <Text style={{color:'#fff',textAlign: 'left', left:25,marginVertical:50}}>RESEAUX DISPONIBLES:</Text>
                <FlatList
                    data={list}
                    renderItem={({ item }) => this.renderItem(item) }
                    keyExtractor={(item,index) => index.toString()}
                    
                    />
                <View style={{height:30}}></View>
                </SafeAreaView>
      </Modal>

      <Modal visible={this.state.isSelected} animationType="slide" transparent={true}   >
                        
                    <View style={styles.modals}>
                    <View style={{left:350,top:-30}}>
                    <Icon
                            name='close'
                            color='red'
                            size= {30}
                            onPress={() => this.setState({isSelected:false })}	
                        />
                    </View>
                    <Text style={{fontSize:18}}>CONNEXION AU RESEAU : {this.state.selectedItem.SSID}</Text>
                  
                    {/* <View style={{flexDirection:"row",marginVertical:20}}>
                    
                    <TextInput
                            style={{ height: 40,width:100, borderColor: 'gray', borderWidth: 1,left:75}}
                            value={this.state.selectedItem.SSID}
                        
                        />
                    </View> */}
                    <View style={{flexDirection:"row",marginVertical:20}}>
                    <Text style={{fontSize:18,fontWeight:'bold',top:5}}>PASSWORD:</Text>
                    
                        <TextInput
                        style={{ height: 45,width:250, borderColor: 'gray', borderWidth: 1, left:10,fontSize:18}}
                        onChangeText={text => this.onChangeText(text)}
                        value={this.state.password}
                        secureTextEntry={true}
                        />  
                    </View>                  
                        <TouchableHighlight style={{height:45,width:150,backgroundColor:"grey",alignItems:"center",alignContent:"center",justifyContent:"center"}}
                         onPress={()=>{this.connectWifi(this.state.selectedItem.SSID,this.state.passwordWifi,true)}} >
                        <Text style={{textAlign:"center"}}>SE CONNECTER</Text> 
                        </TouchableHighlight>
                    
                    </View>
                </Modal>
      </View>
    )
  }

}
const validate = (values) => {
  const errors = {}
  if(!values.username) {
    errors.username = "Veuillez renseigner ce champ"
}
  if(!values.password) {
  errors.password = "Veuillez renseigner ce champ"
}
  return errors
}
mapStateToProps = (state) => ({
  loginTrainer: state.authReducer.loginTrainer
})

mapDispatchToProps = (dispatch) => ({
  
  dispatch
 
})

export default compose(
  connect(mapStateToProps , mapDispatchToProps),
  reduxForm({
    // a unique name for the form
    form: 'login',
    validate
  })
)(Login)

const styles = StyleSheet.create({
  app : {
    flex: 1,
    //justifyContent:'center',
    // alignItems: 'center',
    backgroundColor: 'black',
    
  },
  modals:{
    top:350,
    flexDirection:'column',
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems:"center",
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
    },
  container : {
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: 'black',
    marginTop:100,
    alignContent:'center'
    
  },
  headerContainer: {
    height: 60, //80
    flexDirection: 'row',
    // flex: 1.0,
    // justifyContect: 'center',
    backgroundColor: 'black',
},
headerTitle: {
  // flex: 1.0,
  // marginLeft: 8,
  //marginRight: 8,
//  right: 300,
  alignSelf: 'center',
  color: 'white',
  fontSize:35,
  // paddingLeft:20,
  fontWeight:"bold"


},
headerTitles: {
  // flex: 1.0,
  // marginLeft: 8,
  //marginRight: 8,
//  right: 300,
  alignSelf: 'center',
  color: 'white',
  fontSize:35,
  // paddingLeft:20,
  fontWeight:"bold",
  top:50


},
    // inputBox: {
    //   width:300,
    //   height: 45,
    //   backgroundColor:'rgba(255, 255,255,0.2)',
    //   //borderRadius: 25,
    //   paddingHorizontal:16,
    //   fontSize:16,
    //   color:'#ffffff',
    //   marginVertical: 10,
    //   top:500
    // },
    button: {
      width:300,
      backgroundColor:'#b20000',
      borderRadius: 25,
      marginVertical: 25,
      paddingVertical: 13,
       
    },
    buttonText: {
      fontSize:16,
      fontWeight:'500',
      color:'#ffffff',
      textAlign:'center'
    },
    errorText: {
      color: "red",
      fontSize:14,
      // paddingHorizontal:16,
      // paddingBottom: 8
  },
    
  });