import React, {useState, useEffect} from 'react';
import { Platform } from 'react-native';
import { TouchableHighlight,Image } from 'react-native';
import { Modal } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native';
import { FlatList } from 'react-native';
import { PermissionsAndroid, Button } from 'react-native';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  Text,
} from 'react-native';
import { Icon } from 'react-native-elements';
import WifiManager from 'react-native-wifi-reborn';
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box"
import { Actions } from 'react-native-router-flux';
const permissions =[PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION]

export default class WifiConnect extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            connected:false,
            wifi_availables: [],
            wifiIsEnabled:false,
            password:"",
            isSelected:false,
            selectedItem:[]
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
    componentDidMount(){
        this.checkMultiplePermissions(permissions)
        this.requestLocationPermission()
    }
    async connectWifi(ssid,password,wep){
        await WifiManager.connectToProtectedSSID(ssid,password,wep)
        .then((result)=>{
            console.log(result);
            if (result === "connected") {
               this.setState({isSelected:false}) 
               Actions.login()
            }
            // alert("vous êtes maintenant connecté au réseau"+ssid)
        })
        .catch((error)=>
            // alert(error)
           console.log(error)
       )
    }
    onChangeText = (value) => {
        this.setState({
            password : value
        })
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
        const list = this.state.wifi_availables
        return(
            <View style={styles.container}>
                <View style={styles.headerContainer}> 
                    <View style={{justifyContent:"center"}}>
           
                        <View style={{justifyContent:"center",alignItems:"center",flexDirection:"row"}}>
                            <Image
                                style={{ width:250, height:250, marginLeft:-20,paddingRight:20}}
                                source= {require("../images/CJ-JPB-new.png")}
                            />
                    <View style={{flexDirection:"row",justifyContent:"center"}}>
                      <Text style={{color:'#fff',marginHorizontal:10,fontSize:20,top:4,fontWeight:'bold'}}>
                          CONNEXION WIFI
                          </Text> 
                      {/* <Icon
                        name='export'
                        type='material-community'
                        color='#fff'
                        size= {36}
                        //containerStyle={{left:9}}
                        onPress={this.logoutTrainer}
                       /> */}
                    </View>
                        </View>
                    </View>
                </View>
            <View style={{marginTop:55,padding:30,}}>

                
                <SafeAreaView 
                style={{width:"100%",height:800,borderWidth:1,
                
                shadowOffset: {
                    width: 0,
                    height: 2
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                borderColor:"#00B0F0"
            }}
                >
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
                <Modal visible={this.state.isSelected} animationType="slide" transparent={true} >
                        
                    <View style={styles.modals}>
                    <View style={{left:350,top:-30}}>
                    <Icon
                            name='close'
                            color='red'
                            size= {30}
                            onPress={() => this.setState({isSelected:false})}	
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
                         onPress={()=>{this.connectWifi(this.state.selectedItem.SSID,this.state.password,true)}} >
                        <Text style={{textAlign:"center"}}>SE CONNECTER</Text> 
                        </TouchableHighlight>
                    
                    </View>
                </Modal>
                
            </View>
            </View>
        )
    }

}
const styles = StyleSheet.create({
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
            headerContainer: {
              height: 80, //80
              flexDirection: 'row',
              // flex: 1.0,
              // justifyContect: 'center',
              backgroundColor:'#323232'
              
          },
})

