import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity, 
  Image,
  Button,
  TouchableHighlight,
  SafeAreaView,
  Modal,
  ScrollView, Alert
} from 'react-native';
import {
	List,
	Divider,
	Card,
	//Button
  } from 'react-native-paper'
import {Actions} from 'react-native-router-flux'
import Svg from 'react-native-svg';
import { Line } from 'react-native-svg';
import {Icon} from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import SignatureCapture from 'react-native-signature-capture';
import { BackHandler } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import SSHClient from 'react-native-sshclient';
import { PermissionsAndroid } from 'react-native';
import { createNewStudent } from '../../actions/auth.actions';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Mailer from 'react-native-mail';
import { connect } from 'react-redux';
const permissions =[PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION]



 export default class HomeNodbox extends React.Component {
  constructor(props){
    super(props)
    this.state ={
	// asyncId:this.props.asyncId,
     
       //infos trainer
       trainer_id:"",
       trainer_first_name:"",
       trainer_last_name:"",
       //infos student
       student_id:"",
       student_first_name:"",
       student_last_name:"",
      
        //heure
      heureDebut:"",
      heureFin:"",
      showC2 : false,
      error:false

     
    }
    // this.getInfo = this.getInfo.bind(this)
    // // // this.saveData = this.saveData.bind(this)
    // this.getInfo()
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

  async currentF(){
	let today=new Date();
  let datetime=("0" + today.getDate()).slice(-2)+ "/" +("0" + (today.getMonth()+1)).slice(-2)+ "/" +today.getFullYear()+ " " +("0" + today.getHours()).slice(-2) + ":" +("0" + today.getMinutes()).slice(-2) + ":" + ("0" +today.getSeconds()).slice(-2);
	try {
		await AsyncStorage.setItem("@heurefin",datetime)
	} catch (error) {
		console.log(error)
	}
	
}
//   openDialog = (show) => {
//     this.setState({ showD1: show});
// }
  async cloture(){
	  let heure = await AsyncStorage.getItem("@heure")
	  if (heure != null) {
		this.currentF()
		Actions.clotureNB(({stage:this.props.stage, typeF : this.props.typeF,asyncId:this.props.asyncId}))
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
  async componentDidMount(){
	BackHandler.addEventListener('backPress', () => {return true});
    try {
      // await AsyncStorage.multiRemove(
      //   ["@heure","@heurefin",'courbe_data','post_data','nodbox_video_path','qcmDataN'],(error)=>console.log(error))
     await AsyncStorage.multiRemove(
        ["@heure","@heurefin",'courbe_data','post_data','nodbox_video_path','qcmDataN'],(error)=>console.log(error))
      this.checkMultiplePermissions(permissions)
      console.log('yes');
      
      } catch (error) {
      // Error retrieving data
      console.log(error.message);
      }
  }
    accueil() {
      this.current()
      Actions.accueilNodbox({stage:this.props.stage, 
            typeF : this.props.typeF,
            stageName : this.props.stageName,
            asyncId:this.props.asyncId
          })
      // setTimeout(() => {
      //   if (this.state.error === false) {
          
      //   } else {
      //     Alert.alert(
      //       "Une erreur est survenue",
      //       "Vérifiez que vous êtes bien connecté au pi4 et réessayez",
      //       [
      //       {
      //           text: "OK",
      //           onPress: () => console.log("OK Pressed") 
      //       }]
      //   )
      //   }
      // }, 2000);
      
        
        //Actions.selectV()
    }
  
  async getInfo(){
	  console.log(this.props.asyncId);
	try {
		let str_stdId = await AsyncStorage.getItem('@nb_student_id'+this.props.asyncId.toString())
		let str_trId= await AsyncStorage.getItem('@trainer_id')

		let str_std_fname =await AsyncStorage.getItem('@nb_student_first_name'+this.props.asyncId.toString())
		let str_std_lname= await AsyncStorage.getItem('@nb_student_last_name'+this.props.asyncId.toString())

		let str_trfname=await AsyncStorage.getItem('@trainer_first_name')
		let str_trlname = await AsyncStorage.getItem('@trainer_last_name')

		// let str_signstd=await AsyncStorage.getItem('@sign1')
		// let str_signtr = await AsyncStorage.getItem('@sign2')

		let str_heure = await AsyncStorage.getItem('@heure')  
		let str_heureF = await AsyncStorage.getItem('@heurefin') 
	

		let str_email = await AsyncStorage.getItem('@nb_student_email'+this.props.asyncId.toString())  
		console.warn(str_heureF);
		console.log(str_std_fname);
		console.log(str_trfname);
		console.warn(str_email);
		this.setState({
			trainer_id : str_trId,
			trainer_first_name : str_trfname,
			trainer_last_name : str_trlname,

			student_id : str_stdId,
			student_first_name : str_std_fname,
			student_last_name : str_std_lname,

			heureDebut : str_heure,
			heureFin : str_heureF,
		
	
			student_email : str_email
		})
		// console.log(typeof this.state.trainer_id);
		// console.log(parseInt(this.state.trainer_id,10) +1);

	} catch (error) {
		console.log(error);
	}
}




// launchCurve(){
//   try {
//       SSHClient.setup("pi","192.168.100.124",22);
//       SSHClient.usePrivateKey(false);
//       SSHClient.setPassword("raspberry");
//       SSHClient.connect().then(
//           (result)=>{
//               console.log(result);
//       //for us : stream_simulator.py
//       //for tushar capture_video.py
//           SSHClient.execute("python3 can_curve.py ").then(
//               (result)=>{
//                   console.log(result);
//                 //   alert("can_curve"+result);
//               },
//               (error)=>{
// 				console.log(error)
//                 // alert("can_curve execution"+error);
//               }
//               );
//           },
//           (error)=>{
// 			console.log(error)
//             // alert("can_curve connexion"+error);
//           }
//         );
     

//   } catch (error) {
//     // alert("can_curve error"+error);
//       console.log(error);
//   }

  

// }

launch1st(){
  try {
      SSHClient.setup("pi","10.3.141.1",22);
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
              this.setState({
                error:true
              })
                //   alert("can_extract_skoda.py execution "+error);
              }
              );
          },
          (err)=>{
          
                  this.setState({
                    error:true
                  })
            // alert("can_extract_skoda.py connexion "+error);
          }
        );
     

  } catch (error) {

    this.setState({
      error:true
    })
    // alert("can_extract_skoda.py error"+error);
  }


}

	render(){
		return(
      <View style={styles.app}>
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
         <View style={styles.container}>
		
        <View style={styles.center}>
		<View style= {{top:260,left:80}}>
            <Icon
              name='car-multiple'
              type= 'material-community'
              color='#b20000'
               size= {50}
               style={{transform: [{rotate: '35deg'}]}}
                          
                  />   
               
            </View>
            <View style= {{top:390,left:290}}>
            <Icon
              name='car-multiple'
              type= 'material-community'
              color='#b20000'
               size= {70}
               style={{marginHorizontal:200,transform: [{rotate: '40deg'}]}}
                          
                  />   
               
            </View>
        
          <View style={styles.behind}>
          <Icon
                  name='road-variant'
                  type= 'material-community'
                  color='#b20000'
                  size= {800}
                  style={{transform: [{rotate: '30deg'}]}}
                      /> 
          </View>
          <View style= {{top:960,left:-180}}>
            
            <Icon
                name='road-variant'
                type= 'material-community'
                color='#b20000'
                size= {100}
                style={{transform: [{rotate: '30deg'}]}}
            />
          </View>
          <View style= {{top:700,left:-120}}>
            
                      <Icon
                    name='road-variant'
                    type= 'material-community'
                    color='#b20000'
                    size= {100}
                    style={{marginHorizontal:180,left:-180,transform: [{rotate: '30deg'}]}}
                        />
           </View>
          <View style={styles.button1}>
          <TouchableOpacity style={styles.button} onPress={ () =>{
           
            this.accueil()
            // this.launch1st()
            
          }
            }>
                <Icon
                  name='play-circle'
                  type= 'material-community'
                  color='#b20000'
                  size= {100}
                    
                      />
          <Text style={styles.buttonText}>Lancer Test</Text>
        </TouchableOpacity> 
        </View>

        <View style={styles.button1}>
        <TouchableOpacity style={styles.button}  onPress={ () => {
          
          this.cloture() 
          }}>
        <Icon
                  name='stop-circle-outline'
                  type= 'material-community'
                  color='#b20000'
                  size= {100}
                    
                      />
          <Text style={styles.buttonText}>Clôturer Test</Text>
        </TouchableOpacity> 
        
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

                     
                      </View>
                    </View>
                    
                    </View>
                </Modal>
        {/* {this.renderQCMComponent()} */}
		{/* {this.renderESPcomponent()} */}
        
          
        
        </View>
        
        {/* modal */}
          
      </View>
     
        
</View>

        )
}
}

const styles = StyleSheet.create({
  app:{
    flex: 1,
    backgroundColor:'#191919'
  },

  container: {
    flex: 1,
    alignItems: 'center',
    // height: 500,
    justifyContent: 'center',
    top: -100
  },
  center: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
   
  },
  behind: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    top:70,
    width: '100%',
    height: '100%'
  },
  button1: {
    top:0,
    width:400,
    height:400,
    backgroundColor:'#ccccbbb7',
    borderRadius: 200,
    marginVertical: 30,
    alignItems: 'center',
    justifyContent:'center',
   
    // paddingVertical: 130,
    
  },
    button: {
        width:300,
        height:300,
        backgroundColor:'#cccc',
        borderRadius: 150,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent:'center',
        // paddingVertical: 130,
        
      },
      buttonText: {
        fontSize:16,
        fontWeight:'500',
        color:'#ffffff',
        textAlign:'center'
      },
    
      headerContainer: {
        height: 80, //80
        flexDirection: 'row',
        // flex: 1.0,
        // justifyContect: 'center',
        backgroundColor:'#323232'
        //top:24
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
    car: {
		
      height:879,
      backgroundColor:'#1b4f9c',
      //Wtop:10,
        borderColor:'black',
      borderWidth:1,
    
       },
       car1: {
      height:800,
      backgroundColor:'#f7e86a',
      //Wtop:10,
        borderColor:'black',
      borderWidth:1,
       },
       car2: {
      height:879,
      backgroundColor:'#48bbdd',
      //Wtop:10,
        borderColor:'black',
      borderWidth:1,
       },
       car3: {
      height:980,
      backgroundColor:'#5fb157',
      //Wtop:10,
        borderColor:'black',
      borderWidth:1,
       },
       carR: {
      height:530,
      backgroundColor:'white',
      //Wtop:10,
        borderColor:'#00B0F0',
      borderWidth:1,
       },
       carR1: {
        height:300,
        backgroundColor:'white',
        //Wtop:10,
          borderColor:'#00B0F0',
        borderWidth:1,
         },
		 modal1:{
		
			margin: 20,
			backgroundColor: "white",
			borderRadius: 20,
			padding: 35,
			alignItems: "center",
			shadowColor: "#000",
			shadowOffset: {
				width: 0,
				height: 2
			},
			shadowOpacity: 0.25,
			shadowRadius: 3.84,
			elevation: 5
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
			center: {
			width: '100%',
			height: '100%',
			alignItems: 'center',
			justifyContent: 'center',
			
			},
			ImageStyle: {
			height: 150,
			width: 150,
			resizeMode: 'stretch',
			},
			signatureContainer: {
			flex:1,
			// height:'50%',
			width:'100%',
			borderColor: 'green',
			borderWidth: 5,
			
			},
			signature: {
			flex:1,
			// height:'50%',
			width:'100%',
			
			},
			modalss:{
			flex:1,
			flexDirection:'column',
			margin: 20,
			backgroundColor: "white",
			borderRadius: 20,
			padding: 35,
			alignItems: "center",
			shadowColor: "#000",
			shadowOffset: {
				width: 0,
				height: 2
			},
			shadowOpacity: 0.25,
			shadowRadius: 3.84,
			elevation: 5
			},
			ImageStyle: {
			height: 100,
			width: 100,
			resizeMode: 'stretch',
			},
			text1: {
			color: 'black',
			textAlign:'center',
			fontSize: 15,
			marginTop:16,
			},
			buttonSign: {
			flex: 0.5,
			justifyContent: 'center',
			alignItems: 'center',
			height: 50,
			width:50,
			backgroundColor: '#eeeeee',
			margin: 10,
			},
  
    
  });

//   mapStateToProps = (state,props) => ({
// 	createUser: state.authReducer.createNewStudent
//   })
// mapDispatchToProps = (dispatch) => ({
// 	dispatch
// })
// export default connect(mapStateToProps,mapDispatchToProps)(HomeNodbox)

