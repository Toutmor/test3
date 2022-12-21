import React from 'react';
import {
  Platform, StyleSheet, Text, 
  View, FlatList, TouchableOpacity, 
  Image, SafeAreaView,Dimensions,
  NativeEventEmitter,
  NativeModules,
  TouchableHighlight,
  PermissionsAndroid,
  AppState,
  processColor,
  BackHandler
} from 'react-native';
// import {ChonseSelect} from 'react-native-chonse-select';
import {
	List,
	Divider,
	Card,
	Button
  } from 'react-native-paper'
import VariablesMqtt from '../../components/nodboxMQTT/sendVariables'
import {Actions} from 'react-native-router-flux'
import Select2 from 'react-native-select-two';
import SSHClient from 'react-native-sshclient';

// VariablesMqtt.create(
// 	'test/curve',//userID pour canal

// 	{
// 	 uri: 'mqtt://192.168.100.124:1883',//url 
// 	},
//  );
const mockData = [
    { id : 1, name: 'RPM' },
    { id : 2, name: 'COUPLE' },
    { id : 3, name: 'VITESSE'},
    { id : 4, name: "P.ACCEL"},
    { id : 5, name: "P.EMBR"},
    { id : 6, name: "P.FREIN"},
    { id : 7, name: "RAPPORT"},
    { id : 8, name: "CUMUL CONSO"}
  ];
  
const mockDataS = [
    { id : 1, name: 'Regime_moteur' },
    { id : 2, name: 'Couple_moteur_brut' },
    { id : 3, name: 'Vitesse_vehicule'},
    { id : 4, name: "Pedale_acc"},
    { id : 5, name: "Position_embrayage"},
    { id : 6, name: "Pedale_frein"},
    { id : 7, name: "Gear"},
    { id : 8, name: "Conso_carb_cumulee"}
];
// {'timestamp': '2021-03-31 15:42:15.000964', 
// 'Regime_moteur': 1242.0, 
// 'Vitesse_vehicule': 18.34, 
// 'Couple_moteur_brut': 20.25, 
// 'Pedale_acc': 34.08, 
// 'Position_embrayage': 1, 
// 'Pedale_frein': 0, 
// 'Conso_carb_cumulee': 50020, 
// 'Gear': 2}

export default class SelectVariables extends React.Component {
    constructor(props){
        super(props)
    
        this.state = {
          
            dataS : [],
            data:[],
            messageStr:""
        }
    }
    selectV(data){

        let selected = data
    
       
        let el1 =0
        let el2 =0
        let el3 =0
        let el4=0
      
        let l1= ""
        let l2 = ""
        let l3 = ""
        let l4 =""
        if (selected.length !=0) {
            if(selected.length === 4) {
             
             
                el1 = selected[0]-1   
                el2 = selected[1]-1
                el3 = selected[2]-1
                el4 = selected[3]-1
       
                l1 = mockDataS[el1].name
                l2 = mockDataS[el2].name
                l3 = mockDataS[el3].name
                l4 = mockDataS[el4].name
                let message ={
                    choice1: l1,
                    choice2: l2,
                    choice3: l3,
                    choice4: l4
                }
                try {
                    
                    let str_message = JSON.stringify(message)
                    console.log(str_message);
                    this.setState({messageStr : str_message})
                } catch (error) {
                  console.log((error));  
                }

            }
            else{
                Alert.alert(
                  "WARNING",
                  "Please select four var",
                  [
                    {
                      text: "OK", 
                      onPress: () => console.log("OK Pressed") 
                    }
                  ]
                )
              }
        }else{
            Alert.alert(
              "WARNING",
              "Please select four var",
              [
                {
                  text: "OK", 
                  onPress: () => console.log("OK Pressed") 
                }
              ]
            )
          }
    }
    sendVariables(){
        try {
            VariablesMqtt.client.publish(VariablesMqtt.conProps.channelToUse,this.state.messageStr,1, false);  
            Actions.accueilNodbox()   
          } catch (error) {
              // alert(error)
              console.log(error);
          }
    }
    launchCurve(){
      try {
          SSHClient.setup("pi","192.168.100.124",22);
          SSHClient.usePrivateKey(false);
          SSHClient.setPassword("raspberry");
          SSHClient.connect().then(
              (result)=>{
                  console.log(result);
          //for us : stream_simulator.py
          //for tushar capture_video.py
              SSHClient.execute("python3 can_curve.py ").then(
                  (result)=>{
                      console.log(result);
                      //alert(result);
                  },
                  (error)=>{
                    console.log(error)
                      // alert(error);
                  }
                  );
              },
              (error)=>{
                console.log(error)
                // alert(error);
              }
            );
         
  
      } catch (error) {
          console.log(error);
      }
    
  
  }
  componentDidMount(){
    this.launchCurve()
    BackHandler.addEventListener('backPress', () => {return true});
  }
    render(){
        return(
            <View style={styles.app}>
                  <View style={styles.headerContainer}>
             <View style={{alignItems:"center",flexDirection:"row"}}>
                  <Image
                    style={{width:200, height:260}}
                    source= {require("../../images/CJ-JPB-new.png")}
               />
                  <Text style={styles.headerTitle}>ECO-CONDUITE</Text>
                  </View>
                  <Text style={{color:'#00B0F0',fontSize:16,left:-177, textAlign:'right',fontStyle:"italic",top:45}}>Powered by CleanData</Text>
                  <View style={{top:20,left:70}}>
                    {/* <Icon
                      name='menu-left-outline'
                      type='material-community'
                      color='#fff'
                      size= {55}
                      onPress={() =>Alert.alert(
                        'Clôturer',
                        'Voulez-vous clôturer cette évaluation ?',
                        [
                            {text: 'Non', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                            {text: 'Oui', onPress: () => Actions.pop()},
                        ],
                        { cancelable: false }
                    )}
                    /> */}
                  </View>
            </View>
            <View style={styles.mainContainer}>
            <Text style={styles.textL}>VEUILLEZ SELECTIONNER LES VARIABLES A VISUALISER:</Text>
            <Select2
                isSelectSingle = {false}
                style={{ borderRadius: 5 , height:70, width:500}}
                colorTheme={'#003789'}
                popupTitle='Sélectionnez 4 variables'
                title='Sélectionnez 4 variables'
                data={mockData}
                cancelButtonText = "ANNULER"
                selectButtonText = "VALIDER"
                      // searchPlaceHolderText = "search"
                showSearchBox ={false}
                    onSelect={data => {
                          this.selectV(data)
                    }}
                    onRemoveItem={data => {
                          // this.setState({ dataS :data});
                        this.selectV(data)
                    }} 
                  />
                
                <Button onPress={() => this.sendVariables()} mode="contained"
					contentStyle={{width:250,height:60,}}
					style={{width:250,height:60, 
                        borderRadius:40,justifyContent:'center',alignItems:'center',
                        backgroundColor:'#003789',marginTop:180}}
					labelStyle={{color:'white'}}>
						VALIDER
				</Button> 
                </View>
            </View>
        )
    }
}

const styles = {
    app:{
        flex: 1,
        backgroundColor:'white'
      },
    mainContainer: {
       
        backgroundColor: 'white',
        justifyContent:"center",
        alignItems:"center",
        top:150 
      
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
    headerTitle: {
        // flex: 1.0,
        marginLeft: 1,
        // marginRight: 8,
      //  right: 300,
        alignSelf: 'center',
        color: 'white',
        fontSize:22,
        top:-10
      },
    textL:{
        alignSelf: 'center',
        color: 'black',
        fontSize:22,
        fontWeight:"bold",
        marginVertical:30
    }
}

