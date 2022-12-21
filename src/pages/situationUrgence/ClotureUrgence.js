import React from 'react';
import {
View,
StyleSheet,
TouchableOpacity,Text,
Alert,Dimensions,Image ,ScrollView,FlatList,Modal,
RefreshControl,
ActivityIndicator,alert,TextInput, PermissionsAndroid,
Platform,BackHandler
} from 'react-native';
import { SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
//hide view

//import { Dropdown } from 'react-native-material-dropdown';
import {Actions} from 'react-native-router-flux'
import {
	List,
	Divider,
	Card,
	Button
  } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNewStudent, logoutStudent } from '../../actions/auth.actions';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
// import { FlatGrid } from 'react-native-super-grid';
	
export default class ClotureUrgence extends React.Component {
	constructor(props) {
		super(props);
		// this.onEventPress = this.onEventPress.bind(this)
		// this.renderSelected = this.renderSelected.bind(this)
	
		this.state = {
			asyncId : this.props.asyncId,
        	showD5:false,
			trainer_id:"",
			trainer_first_name:"",
			trainer_last_name:"",
			//infos student
			student_id:"",
			student_first_name:"",
			student_last_name:"",
			student_email:"",
		
			//heure
			heureDebut:"",
			heureFin:"",
			
			
			//for the qcm
			showQCM:false,
			warningQCM:false,

			//
			tdr :null,
			reactionN1:0,
			reactionN2:0,

			confirmNextStudent:false,
			confirmNewFormation:false

		};
		this.getInfo = this.getInfo.bind(this)
		// this.saveData = this.saveData.bind(this)
		this.getInfo()
	
		
	}
	goAccueil() {
		Actions.accueilP();
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
	
	componentDidMount(){
		BackHandler.addEventListener('backPress', () => {return true});
		this.setState({warningQCM:true})
		//this.getData()
		//this.getTotal()
		this.currentF()
		// setTimeout(() => {
		// 	this.getData()
		// }, 100);
	}
	
	async getInfo(){
		try {
			let str_stdId = await AsyncStorage.getItem('@su_student_id'+this.state.asyncId.toString())
			let str_trId= await AsyncStorage.getItem('@trainer_id')

			let str_std_fname =await AsyncStorage.getItem('@su_student_first_name'+this.state.asyncId.toString())
			let str_std_lname= await AsyncStorage.getItem('@su_student_last_name'+this.state.asyncId.toString())

			let str_trfname=await AsyncStorage.getItem('@trainer_first_name')
			let str_trlname = await AsyncStorage.getItem('@trainer_last_name')

			// let str_signstd=await AsyncStorage.getItem('@sign1')
			// let str_signtr = await AsyncStorage.getItem('@sign2')

			let str_heure = await AsyncStorage.getItem('@heure')  
            let str_heureF = await AsyncStorage.getItem('@heurefin') 
			//let str_heures = await AsyncStorage.getItem('@heures') 
		

            let str_email = await AsyncStorage.getItem('@su_student_email'+this.state.asyncId.toString())  
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
			   // heureDebut1 : str_heures,
        
                student_email : str_email
			})
			// console.log(typeof this.state.trainer_id);
			// console.log(parseInt(this.state.trainer_id,10) +1);

		} catch (error) {
			console.log(error);
		}
	}
	
	
	buttonPress=()=>{
	this.setState({show:true})
	// this.convertTimeline()
	
	}
	butonPress=()=>{
	this.setState({show:false})
	}
	buttonPressC=()=>{
		
		this.setState({showQCM:true})
	// this.setState({showC1:true})
	}
	// buttonPressC=()=>{
	// this.setState({showC1:true})
	// }
	buttonPressC2=()=>{
	this.setState({showC2:true})
	}
	buttonPressC3=()=>{
	this.setState({showC3:true})
	}
	buttonPressC4=()=>{
	this.setState({showC4:true})
  }
  
	
	async nextStudent(){ 
		this.setState({showD5:false,confirmNextStudent:false});
		Actions.popTo("listeStudentSu")
		await AsyncStorage.multiRemove([
			
			'@heurefin',
			'@heure',
	 
		])  
		 
	  
  }
  
  async newFormation(){
	try {
		
		this.setState({showD5:false,confirmNewFormation:false})
		await AsyncStorage.multiRemove([
			
			'@heurefin',
			'@heure',
	 
		]) 
		setTimeout(() => {
			//AsyncStorage.removeItem('su_totalStudent',(error)  =>{console.log(error)})
			
			AsyncStorage.removeItem('su_student_evalue',(error)  =>{console.log(error)})
			Actions.homP({stage:this.props.stage ,stageName : this.props.stageName,alertProps:"no"})
			
			// Actions.popTo("home",{asyncId : this.props.asyncId})
		}, 1000);
	
    	 
	  } catch (error) {
		  console.log(error);
	  }
  }
  fermerApp(){
    this.setState({showD5:false})
    BackHandler.exitApp()
  }
	
    goHomeParcours() {
		Actions.homeP();
	}

	
//QCM BUTTONS FONCTIONS


onBtnP1Press(){	 
	this.setState({btnP1:13.0,activeBtnP2:true,activeBtnP3:true,activeBtnP4:true})
	this.TextInputP1.focus()

}
onBtnP2Press(){
	this.setState({btnP2:6.5,activeBtnP1:true,activeBtnP3:true,activeBtnP4:true})
	this.TextInputP1.focus()

}
onBtnP3Press(){
	this.setState({btnP3:0.0,activeBtnP2:true,activeBtnP1:true,activeBtnP4:true})
	this.TextInputP1.focus()

}
onBtnP4Press(){
	this.setState({btnP4:0.0,activeBtnP2:true,activeBtnP3:true,activeBtnP1:true})
	this.TextInputP1.focus()

}
//
onBtnP5Press(){
	this.setState({btnP5:13.0,activeBtnP6:true,activeBtnP7:true,activeBtnP8:true})
	this.TextInputP2.focus()

}
onBtnP6Press(){
	this.setState({btnP6:6.5,activeBtnP5:true,activeBtnP7:true,activeBtnP8:true})
	this.TextInputP2.focus()
	
}
onBtnP7Press(){
	this.setState({btnP7:0.0,activeBtnP5:true,activeBtnP6:true,activeBtnP8:true})
	this.TextInputP2.focus()
	
}
onBtnP8Press(){
	this.setState({btnP8:0.0,activeBtnP5:true,activeBtnP6:true,activeBtnP7:true})
	this.TextInputP2.focus()
	
}
//
onBtnP9Press(){
	this.setState({btnP9:9.0,activeBtnP10:true,activeBtnP11:true,activeBtnP12:true})
	this.TextInputP3.focus()
	

}
onBtnP10Press(){
	this.setState({btnP10:4.5,activeBtnP9:true,activeBtnP11:true,activeBtnP12:true})
	this.TextInputP3.focus()

}
onBtnP11Press(){
	this.setState({btnP11:0.0,activeBtnP10:true,activeBtnP9:true,activeBtnP12:true})
	this.TextInputP3.focus()

}
onBtnP12Press(){
	this.setState({btnP12:0.0,activeBtnP10:true,activeBtnP11:true,activeBtnP9:true})
	this.TextInputP3.focus()
}
onBtnP13Press(){
	this.setState({btnP13:9.0,activeBtnP14:true,activeBtnP15:true,activeBtnP16:true})
	this.TextInputP4.focus()
	

}
onBtnP14Press(){
	this.setState({btnP14:4.5,activeBtnP13:true,activeBtnP15:true,activeBtnP16:true})
	this.TextInputP4.focus()

}
onBtnP15Press(){
	this.setState({btnP15:0.0,activeBtnP14:true,activeBtnP13:true,activeBtnP16:true})
	this.TextInputP4.focus()

}
onBtnP16Press(){
	this.setState({btnP16:0.0,activeBtnP14:true,activeBtnP15:true,activeBtnP13:true})
	this.TextInputP4.focus()
}

tempsDistance(){
	const rN1 = this.state.reactionN1
	const rN2 = this.state.reactionN2
		  this.setState({
				 tdr: ((rN2*100)/rN1)-100
		  })     
	console.log(this.state.tdr)

}

	

		render() {
		
			return (
			<View style={styles.container}>
				<View style={styles.headerContainer}>
			<View style={{alignItems:"center",flexDirection:"row"}}>
			<Image
                          resizeMode ="contain"
                          style={{width:200, height:260,left:15}}
                          source= {require("../../images/Sanstitre9.png")}
                    />
					<Text style={styles.headerTitle}>SITUATION D'URGENCE</Text>
					<Text style={{color:'#00B0F0',fontSize:16,left:-175, textAlign:'right',fontStyle:"italic",top:20}}>Powered by CleanData</Text>
					</View>
					
					<View style={{flexDirection:"column",left:-60 }}>
					{/* <Text style={{color:'#fff',fontSize:20,top:5,left:-30}}>Synthèse</Text> */}
			<Text style={{color:'#fff',fontSize:20,top: 15,left:-70}}>{this.state.student_first_name} {this.state.student_last_name}</Text>
			<Text style={{color:'#00B0F0',fontSize:14,top:17,left:-70}}>{this.state.heureDebut}</Text>
					</View>
				</View>
				
			
			<View style={{top:30}}>
           
			<View style={{justifyContent:"center",alignItems:"center",margin:20}}>

			<Text style={{fontSize:24,textDecorationLine:'underline'}}>EXERCICES SUR PISTE</Text>
			</View>
			<KeyboardAwareScrollView extraScrollHeight={40} >
		                 <ScrollView
		                        style={{height: '100%',width: '100%'}}
		                        nestedScrollEnabled={true}
		                        contentContainerStyle={{height: '130%',
		                        width: '100%',
		                        backgroundColor: 'white',
		                        padding: 20}}
		                 >
		                 <View style={{flexDirection:"column",padding:5}}>
		            <Card style={styles.car2}>
		                               {/* <Text style={{fontSize:30,margin:30}}>PRÉVOIR</Text> */}
		                               <View style={{flexDirection:"column"}}>
		                               <View style={{flexDirection:"row",borderWidth:2,borderColor:"lightgrey",backgroundColor:"white",marginBottom:20,height:150}}>
		                                     <View style={{alignContent:"center",alignItems:"center",margin:29,justifyContent:"center"}}>
		                                            <Text style={{fontSize:17}}>Test {'\n'}/ ballons </Text>
		                                     </View>
		                                        
		                                            <TouchableOpacity
		                                                   disabled={this.state.activeBtnP1}
		                                                   onPress={()=>{this.onBtnP1Press()}}
		                                                   style={{width:120,height:80, borderRadius:15,
		                                                         backgroundColor:(this.state.activeBtnP1)?"#b7ebbb":'#7FA57F',
		                                                   marginRight:20,marginLeft:40,alignContent:"center",alignItems:"center",justifyContent:"center",marginTop:35}}
		                                                   // labelStyle={{color:'black',fontSize:10}}
		                                                   >
		                                                   <Text style={{fontSize:15,alignContent:"center"}}>BIEN</Text>
		                                               
		                                            </TouchableOpacity>
		                                            <TouchableOpacity
		                                                   disabled={this.state.activeBtnP2}
		                                                   onPress={()=>{this.onBtnP2Press()}}
		                                                   style={{width:120,height:80, borderRadius:15,
		                                                         backgroundColor:(this.state.activeBtnP2)?"#f4e992":'#FFFF00',
		                                                   marginRight:20,alignContent:"center",alignItems:"center",justifyContent:"center",marginTop:35}}
		                                                   // labelStyle={{color:'black',fontSize:10}}
		                                                   >
		                                                   <Text style={{fontSize:15,alignContent:"center"}}>MOYEN</Text>
		                                               
		                                            </TouchableOpacity>
		                                            <TouchableOpacity
		                                                   disabled={this.state.activeBtnP3}
		                                                   onPress={()=>{this.onBtnP3Press()}}
		                                                   style={{width:120,height:80, borderRadius:15,
		                                                         backgroundColor:(this.state.activeBtnP3)?'#f8cbc8':'red',
		                                                   marginRight:20,alignContent:"center",alignItems:"center",justifyContent:"center",marginTop:35}}
		                                                   // labelStyle={{color:'black',fontSize:10}}
		                                                   >
		                                                   <Text style={{fontSize:15,alignContent:"center"}}>INSUFFISANT</Text>
		                                               
		                                            </TouchableOpacity>
		                                            <TouchableOpacity
		                                                   disabled={this.state.activeBtnP4}
		                                                   onPress={()=>{this.onBtnP4Press()}}
		                                                   style={{width:120,height:80, borderRadius:15,
		                                                         backgroundColor:(this.state.activeBtnP4)?'#edf0ed':'lightgrey',
		                                                   marginRight:20,alignContent:"center",alignItems:"center",justifyContent:"center",marginTop:35}}
		                                                   // labelStyle={{color:'black',fontSize:10}}
		                                                   >
		                                                   <Text style={{fontSize:15,alignContent:"center"}}>NON {'\n'}EVALUE</Text>
		                                               
		                                            </TouchableOpacity>
		                                     </View>
		                                     <TextInput
											               style={{
															color: 'white',
															}}
		                                                   underlineColorAndroid = "transparent"
		                                                   placeholder = "Rédiger un commentaire"
		                                                   placeholderTextColor = "white"
		                                                   multiline={true}
		                                                   autoCapitalize = "none"
		                                                   onChangeText={(commentP1) => this.setState({commentP1})}
		                                                   value={this.state.commentP1}
		                                                   ref={(input) => { this.TextInputP1 = input; }}
		                                                   // style={{  margin: 15,
		                                                   //     height: 300,
		                                                   //     width : 500,
		                                                   //     borderColor: '#000000',
		                                                   //     borderWidth: 1}}
		                                            />
		                                     <View style={{flexDirection:"row",borderWidth:2,borderColor:"lightgrey",backgroundColor:"white",marginBottom:20,height:150}}>
		                                     <View style={{alignContent:"center",alignItems:"center",margin:30,justifyContent:"center"}}>
		                                            <Text style={{fontSize:17}}>Freinage {'\n'}d'urgence</Text>
		                                     </View>
		                                        
		                                            <TouchableOpacity
		                                                   disabled={this.state.activeBtnP5}
		                                                   onPress={()=>{this.onBtnP5Press()}}
		                                                   style={{width:120,height:80, borderRadius:15,
		                                                         backgroundColor:(this.state.activeBtnP5)?"#b7ebbb":'#7FA57F',
		                                                   marginRight:20,marginLeft:35,alignContent:"center",alignItems:"center",justifyContent:"center",marginTop:35}}
		                                                   // labelStyle={{color:'black',fontSize:10}}
		                                                   >
		                                                   <Text style={{fontSize:15,alignContent:"center"}}>BIEN</Text>
		                                               
		                                            </TouchableOpacity>
		                                            <TouchableOpacity
		                                                   disabled={this.state.activeBtnP6}
		                                                   onPress={()=>{this.onBtnP6Press()}}
		                                                   style={{width:120,height:80, borderRadius:15,
		                                                         backgroundColor:(this.state.activeBtnP6)?"#f4e992":'#FFFF00',
		                                                   marginRight:20,alignContent:"center",alignItems:"center",justifyContent:"center",marginTop:35}}
		                                                   // labelStyle={{color:'black',fontSize:10}}
		                                                   >
		                                                   <Text style={{fontSize:15,alignContent:"center"}}>MOYEN</Text>
		                                               
		                                            </TouchableOpacity>
		                                            <TouchableOpacity
		                                                   disabled={this.state.activeBtnP7}
		                                                   onPress={()=>{this.onBtnP7Press()}}
		                                                   style={{width:120,height:80, borderRadius:15,
		                                                         backgroundColor:(this.state.activeBtnP7)?'#f8cbc8':'red',
		                                                   marginRight:20,alignContent:"center",alignItems:"center",justifyContent:"center",marginTop:35}}
		                                                   // labelStyle={{color:'black',fontSize:10}}
		                                                   >
		                                                   <Text style={{fontSize:15,alignContent:"center"}}>INSUFFISANT</Text>
		                                               
		                                            </TouchableOpacity>
		                                            <TouchableOpacity
		                                                   disabled={this.state.activeBtnP8}
		                                                   onPress={()=>{this.onBtnP8Press()}}
		                                                   style={{width:120,height:80, borderRadius:15,
		                                                         backgroundColor:(this.state.activeBtnP8)?'#edf0ed':'lightgrey',
		                                                   marginRight:20,alignContent:"center",alignItems:"center",justifyContent:"center",marginTop:35}}
		                                                   // labelStyle={{color:'black',fontSize:10}}
		                                                   >
		                                                   <Text style={{fontSize:15,alignContent:"center"}}>NON {'\n'}EVALUE</Text>
		                                               
		                                            </TouchableOpacity>
		                                     </View>
		                                     <TextInput
											                style={{
																color: 'white',
																}}
		                                                   underlineColorAndroid = "transparent"
		                                                   placeholder = "Rédiger un commentaire"
		                                                   placeholderTextColor = "white"
		                                                   multiline={true}
		                                                   autoCapitalize = "none"
		                                                   onChangeText={(commentP2) => this.setState({commentP2})}
		                                                   value={this.state.commentP2}
		                                                   ref={(input) => { this.TextInputP2 = input; }}
		                                                   // style={{  margin: 15,
		                                                   //     height: 300,
		                                                   //     width : 500,
		                                                   //     borderColor: '#000000',
		                                                   //     borderWidth: 1}}
		                                            />
		                                     <View style={{flexDirection:"row",borderWidth:2,borderColor:"lightgrey",backgroundColor:"white",marginBottom:20,height:150}}>
		                                     <View style={{alignContent:"center",alignItems:"center",margin:30,justifyContent:"center"}}>
		                                            <Text style={{fontSize:17}}>Trajectoire {'\n'}et{'\n'}manipulation {'\n'}du volant</Text>
		                                     </View>
		                                        
		                                            <TouchableOpacity
		                                               
		                                                   disabled={this.state.activeBtnP9}
		                                                   onPress={()=>{this.onBtnP9Press()}}
		                                                   style={{width:120,height:80, borderRadius:15,
		                                                         backgroundColor:(this.state.activeBtnP9)?"#b7ebbb":'#7FA57F',
		                                                   marginRight:20,alignContent:"center",alignItems:"center",justifyContent:"center",marginTop:35}}
		                                                   // labelStyle={{color:'black',fontSize:10}}
		                                                   >
		                                                   <Text style={{fontSize:15,alignContent:"center"}}>BIEN</Text>
		                                               
		                                            </TouchableOpacity>
		                                            <TouchableOpacity
		                                                   disabled={this.state.activeBtnP10}
		                                                   onPress={()=>{this.onBtnP10Press()}}
		                                                   style={{width:120,height:80, borderRadius:15,
		                                                         backgroundColor:(this.state.activeBtnP10)?"#f4e992":'#FFFF00',
		                                                   marginRight:20,alignContent:"center",alignItems:"center",justifyContent:"center",marginTop:35}}
		                                                   // labelStyle={{color:'black',fontSize:10}}
		                                                   >
		                                                   <Text style={{fontSize:15,alignContent:"center"}}>MOYEN</Text>
		                                               
		                                            </TouchableOpacity>
		                                            <TouchableOpacity
		                                                   disabled={this.state.activeBtnP11}
		                                                   onPress={()=>{this.onBtnP11Press()}}
		                                                   style={{width:120,height:80, borderRadius:15,
		                                                         backgroundColor:(this.state.activeBtnP11)?'#f8cbc8':'red',
		                                                   marginRight:20,alignContent:"center",alignItems:"center",justifyContent:"center",marginTop:35}}
		                                                   // labelStyle={{color:'black',fontSize:10}}
		                                                   >
		                                                   <Text style={{fontSize:15,alignContent:"center"}}>INSUFFISANT</Text>
		                                               
		                                            </TouchableOpacity>
		                                            <TouchableOpacity
		                                                   disabled={this.state.activeBtnP12}
		                                                   onPress={()=>{this.onBtnP12Press()}}
		                                                   style={{width:120,height:80, borderRadius:15,
		                                                         backgroundColor:(this.state.activeBtnP12)?'#edf0ed':'lightgrey',
		                                                   marginRight:20,alignContent:"center",alignItems:"center",justifyContent:"center",marginTop:35}}
		                                                   // labelStyle={{color:'black',fontSize:10}}
		                                                   >
		                                                   <Text style={{fontSize:15,alignContent:"center"}}>NON {'\n'}EVALUE</Text>
		                                               
		                                            </TouchableOpacity>
		                                     </View>
		                                     <TextInput
											               style={{
															color: 'white',
															}}
		                                                   underlineColorAndroid = "transparent"
		                                                   placeholder = "Rédiger un commentaire"
		                                                   placeholderTextColor = "white"
		                                                   multiline={true}
		                                                   autoCapitalize = "none"
		                                                   onChangeText={(commentP3) => this.setState({commentP3})}
		                                                   value={this.state.commentP3}
		                                                   ref={(input) => { this.TextInputP3 = input; }}
		                                                   // style={{  margin: 15,
		                                                   //     height: 300,
		                                                   //     width : 500,
		                                                   //     borderColor: '#000000',
		                                                   //     borderWidth: 1}}
		                                            />
		                 <View style={{flexDirection:"row",borderWidth:2,borderColor:"lightgrey",backgroundColor:"white",marginBottom:20,height:150}}>
		                                     <View style={{alignContent:"center",alignItems:"center",margin:32,justifyContent:"center"}}>
		                                            <Text style={{fontSize:17}}>Perte{'\n'}d'energie</Text>
		                                     </View>
		                                        
		                                            <TouchableOpacity
		                                               
		                                                   disabled={this.state.activeBtnP13}
		                                                   onPress={()=>{this.onBtnP13Press()}}
		                                                   style={{width:120,height:80, borderRadius:15,
		                                                         backgroundColor:(this.state.activeBtnP13)?"#b7ebbb":'#7FA57F',
		                                                   marginRight:20,marginLeft:35,alignContent:"center",alignItems:"center",justifyContent:"center",marginTop:35}}
		                                                   // labelStyle={{color:'black',fontSize:10}}
		                                                   >
		                                                   <Text style={{fontSize:15,alignContent:"center"}}>BIEN</Text>
		                                               
		                                            </TouchableOpacity>
		                                            <TouchableOpacity
		                                                   disabled={this.state.activeBtnP14}
		                                                   onPress={()=>{this.onBtnP14Press()}}
		                                                   style={{width:120,height:80, borderRadius:15,
		                                                         backgroundColor:(this.state.activeBtnP14)?"#f4e992":'#FFFF00',
		                                                   marginRight:20,alignContent:"center",alignItems:"center",justifyContent:"center",marginTop:35}}
		                                                   // labelStyle={{color:'black',fontSize:10}}
		                                                   >
		                                                   <Text style={{fontSize:15,alignContent:"center"}}>MOYEN</Text>
		                                               
		                                            </TouchableOpacity>
		                                            <TouchableOpacity
		                                                   disabled={this.state.activeBtnP15}
		                                                   onPress={()=>{this.onBtnP15Press()}}
		                                                   style={{width:120,height:80, borderRadius:15,
		                                                         backgroundColor:(this.state.activeBtnP15)?'#f8cbc8':'red',
		                                                   marginRight:20,alignContent:"center",alignItems:"center",justifyContent:"center",marginTop:35}}
		                                                   // labelStyle={{color:'black',fontSize:10}}
		                                                   >
		                                                   <Text style={{fontSize:15,alignContent:"center"}}>INSUFFISANT</Text>
		                                               
		                                            </TouchableOpacity>
		                                            <TouchableOpacity
		                                                   disabled={this.state.activeBtnP16}
		                                                   onPress={()=>{this.onBtnP16Press()}}
		                                                   style={{width:120,height:80, borderRadius:15,
		                                                         backgroundColor:(this.state.activeBtnP16)?'#edf0ed':'lightgrey',
		                                                   marginRight:20,alignContent:"center",alignItems:"center",justifyContent:"center",marginTop:35}}
		                                                   // labelStyle={{color:'black',fontSize:10}}
		                                                   >
		                                                   <Text style={{fontSize:15,alignContent:"center"}}>NON {'\n'}EVALUE</Text>
		                                               
		                                            </TouchableOpacity>
		                                     </View>
		                                     <TextInput
											                style={{
																color: 'white',
																}}
		                                                   underlineColorAndroid = "transparent"
		                                                   placeholder = "Rédiger un commentaire"
		                                                   placeholderTextColor = "white"
		                                                   multiline={true}
		                                                   autoCapitalize = "none"
		                                                   onChangeText={(commentP4) => this.setState({commentP4})}
		                                                   value={this.state.commentP4}
		                                                   ref={(input) => { this.TextInputP4 = input; }}
		                                                   // style={{  margin: 15,
		                                                   //     height: 300,
		                                                   //     width : 500,
		                                                   //     borderColor: '#000000',
		                                                   //     borderWidth: 1}}
		                                            />
		
		                               </View>
		                        </Card>
		        <Card style={styles.carR1}>
		                                     <View style={{flexDirection:"column",backgroundColor:"white",height:150}}>
		                                        
		                                     <View style={{flexDirection:"row",alignItems:"center",marginLeft:20,top:20}}>
		                                     <Text style={{fontSize:15,fontWeight:"bold",textAlign:"center"}}>Durée du temps de réaction TEST N°1:</Text>
		                                     <TextInput
		                                             underlineColorAndroid = "transparent"
		                                                   placeholder = "en secondes"
		                                                   placeholderTextColor = "black"
		                                                   autoCapitalize = "none"
		                                                   keyboardType="numeric"
		                                                   returnKeyType = { "next" }
		                                                   onSubmitEditing={() => { this.secondTextInput.focus(); }}
		                                                   blurOnSubmit={false}
		                                                   onChangeText={(reactionN1) => this.setState({reactionN1})}
		                                                   value={this.state.reactionN1}
		                                                   style={{width:120,height:50, left:20,
		                                                         backgroundColor:'white',borderWidth:2,borderColor:"#00B0F0"
		                                                         ,marginRight:20,alignContent:"center",alignItems:"center"
		                                                         ,justifyContent:"center"}}
		                                     />
		                                     </View>
		                                        
		                                        
		                                        
		                                     <View style={{flexDirection:"row",alignItems:"center",marginLeft:20,top:30}}>
		                                     <Text style={{fontSize:15,fontWeight:"bold",textAlign:"center"}}>Durée du temps de réaction TEST N°2:</Text>
		                                     <TextInput
		                                             underlineColorAndroid = "transparent"
		                                                   placeholder = "en secondes"
		                                                   placeholderTextColor = "black"
		                                                   autoCapitalize = "none"
		                                                   keyboardType="numeric"
		                                                   onChangeText={(reactionN2) => this.setState({reactionN2})}
		                                                   ref={(input) => { this.secondTextInput = input; }}
		                                                   value={this.state.reactionN2}
		                                                   style={{width:120,height:50,left:20,
		                                                         backgroundColor:'white',borderWidth:2,borderColor:"#00B0F0"
		                                                         ,marginRight:20,alignContent:"center",alignItems:"center"
		                                                         ,justifyContent:"center"}}
		                                     />
		                                     </View>
		                                     </View>
		                                        
		            						<View style={{alignContent:"center",alignItems:"center",justifyContent:"center",marginLeft:20,marginRight:30,top:15}}>
											<TouchableOpacity
		                                               
													   style={{width:350,height:100, borderRadius:15,
													   backgroundColor:(this.state.tdr !==null)?'#007FFF':"#00B0F0",borderWidth:2,borderColor:"#00B0F0"
													   ,alignContent:"center",alignItems:"center"
													   ,justifyContent:"center"}}
													   onPress={()=>{this.tempsDistance()}}
													   >
														   {(this.state.tdr == null)?
														   (<Text style={{fontSize:17,fontWeight:"bold",textAlign:"center",color:'white'}}>CALCULER</Text>)
														   :
														   (<Text style={{fontSize:17,alignContent:"center",marginTop:10,fontWeight:"bold",color:'white'}}>{(this.state.tdr).toFixed(1)} %</Text>)
														   }
													   
												   
											</TouchableOpacity> 
		                                     </View>
		                                     </Card>
		                                     <View style={{backgroundColor:'white',alignContent:"center",alignItems:"center",justifyContent:"center",
		                                     marginVertical:30}}>
		                                     <TouchableOpacity
		                                                   onPress={()=>{
															Alert.alert(
																"Attention!",
																"Pour conserver les résultats du QCM,"+"\n"+"prenez maintenant une copie d'écran du résultat global avec la tablette."+"\n"+"Aucune donnée ne sera sauvegardée en base de données",
																[
																{
																	text: "OK",
																	onPress: () => {setTimeout(() => {
																		this.setState({showESP:false,showD5:true})
																	}, 10000);}
																}]
															) 
		                                                         
		                                                         }}
																 style={{width:300,height:80, borderRadius:5,
																	backgroundColor:"#00B0F0",borderWidth:2,borderColor:"#00B0F0"
																	,alignContent:"center",alignItems:"center"
																	,justifyContent:"center",marginRight:20}}
		                                                      
		                                                   >
		                                                   <Text style={{fontSize:15,fontWeight:"bold",textAlign:"center",color:"white"}}>VALIDER</Text>
		                                                      
		                                               
		                                            </TouchableOpacity>
		                                            </View>
		                                  
		                 </View>
		                    
		                 </ScrollView>
		    </KeyboardAwareScrollView>
		                    
			

			</View>
		
			<Modal animationType="slide"
			transparent={true} 
			visible={this.state.showD5} 
			onRequestClose={(() => this.setState({showD5:false}))}>
			<View style={styles.center}>
			<View style={styles.modal1}>
			<TouchableOpacity 
				style={{width:250,height:90,backgroundColor:'#191919',borderColor:'#00B0F0',borderWidth:2, marginHorizontal:20,marginVertical:50,alignItems:"center",alignContent:"center",justifyContent:"center"}}
				onPress={() => this.setState({
					confirmNextStudent:true
				})}
			>
				<Text style={{fontSize:16,fontWeight:'500',textAlign:'center',color:'white'}}>STAGIAIRE SUIVANT</Text>
			</TouchableOpacity> 
			<TouchableOpacity 
				style={{width:250,height:90,backgroundColor:'#191919',borderColor:'#00B0F0',borderWidth:2 , marginHorizontal:20,marginVertical:50,alignItems:"center",alignContent:"center",justifyContent:"center"}}
				onPress={() => this.setState({
					confirmNewFormation:true
				})}
			>
				<Text style={{fontSize:16,fontWeight:'500',textAlign:'center',color:'white'}}>CHANGER D'OUTIL</Text>
			</TouchableOpacity>
			
			</View>
			
			</View>
			</Modal>
			<Modal animationType="slide"
                  transparent={true}  visible={this.state.warningQCM} 
                  
                  onRequestClose={(() => this.setState({warningQCM: false}))}>
                  <View style={{
					       width:600,
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
				  }}>
                  
                    <View style={{flexDirection:"column",marginTop:15}}>
                    <Icon
                        name='exclamation-circle'
                        type='font-awesome-5'
                        color='#fff'
                        size= {36}
                        style={{right:270}}
                        />
                      <View style={{marginVertical:100,justifyContent:"center",
            alignItems: "center",}}>
                      <Text style={ { textAlign:"center",fontSize:14,color:'white',fontSize:20} }>
                        ATTENTION {"\n"}{"\n"} 1 SELECTION UNIQUE OBLIGATOIRE PAR LIGNE {"\n"}NON MODIFIABLE
				              </Text>
                      </View>
                      <View style={{flexDirection :"row",alignItems:"center",
                          justifyContent:"center",marginTop:25}}>
                    

                      <TouchableOpacity
                          onPress={ () => {
                             this.setState({warningQCM: false})
                            
                          }}
                          style={ { width:250,height:90,  backgroundColor:'#191919',alignItems:"center",
                          justifyContent:"center",borderColor:'#00B0F0',
                          borderWidth:2,
                          alignContent:"center",borderRadius:5, marginLeft :25 } }
                          
                        >
                          <Text style={ {textAlign:"center",fontSize:14,color:'white',fontSize:20} }>
                              OK
                          </Text>
                          </TouchableOpacity>
                      </View>
                    </View>
                    
                    </View>
            </Modal>

			<Modal animationType="slide"
                  transparent={true}  visible={this.state.confirmNextStudent} 
                  
                  onRequestClose={(() => this.setState({confirmNextStudent:false}))}>
                  <View style={{
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
				  }}>
                  
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
					  CHANGEMENT DE STAGIAIRE {"\n"}{"\n"} 
				              </Text>
                      </View>
                      <View style={{flexDirection :"row",alignItems:"center",
                          justifyContent:"center",marginTop:25}}>
                      <TouchableOpacity
                          onPress={ () => {
                            this.nextStudent()
                           
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
                             this.setState({confirmNextStudent: false})
                            
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

			<Modal animationType="slide"
                  transparent={true}  visible={this.state.confirmNewFormation} 
                  
                  onRequestClose={(() => this.setState({confirmNewFormation: false}))}>
                  <View style={{
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
				  }}>
                  
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
                          CHANGEMENT D'OUTIL{"\n"}{"\n"} 
				              </Text>
                      </View>
                      <View style={{flexDirection :"row",alignItems:"center",
                          justifyContent:"center",marginTop:25}}>
                      <TouchableOpacity
                          onPress={ () => {
                            this.newFormation()
                           
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
                             this.setState({confirmNewFormation: false})
                            
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
			
		</View>
			
				)
			}
	}

	const styles = StyleSheet.create({
		container: {
		flex: 1,
		backgroundColor:'white'
		},
	test: {
		flexDirection: 'row',
		//borderWidth:1,
		height:100,
		top:60,
		width:300,
		left:20
		},
		counters: {
		width:75,
		height:75,
		backgroundColor:'#7FA57F',
		borderRadius: 40,
		justifyContent:'center',
		alignItems:'center',
		left:20,
		top:10,
		},
		counters1: {
		width:75,
		height:75,
		backgroundColor:'#FFFF00',
		borderRadius: 40,
		justifyContent:'center',
		alignItems:'center',
		left:30,
		top:10
		},
		counters2: {
		width:75,
		height:75,
		backgroundColor:'red',
		borderRadius: 40,
		justifyContent:'center',
		alignItems:'center',
		left:40,
		top:10
		},
		countersH: {
		width:80,
		height:120,
		backgroundColor:'#7FA57F',
		//borderRadius: 40,
		justifyContent:'center',
		alignItems:'center',
		left:240,
		//top:25,
		},
		counters1H: {
		width:80,
		height:150,
		backgroundColor:'#FFFF00',
		//borderRadius: 40,
		justifyContent:'center',
		alignItems:'center',
		left:260,
		//top:25
		},
		counters2H: {
		width:80,
		height:150,
		backgroundColor:'red',
		//borderRadius: 40,
		justifyContent:'center',
		alignItems:'center',
		left:280,
		//top:25
		},
		touch4: {
		height:50,
		width:50,
		//top:560,
		left:130,
		backgroundColor:'#fff',
		justifyContent:'center',
		borderWidth:2,
		alignItems:'center'
		},
		touch5: {
		height:50,
		width:50,
		top:10,
		left:130,
		backgroundColor:'#fff',
		justifyContent:'center',
		borderWidth:2,
		alignItems:'center'
		},
		touch6: {
		height:50,
		width:50,
		//top:560,
		left:10,
		backgroundColor:'#fff',
		justifyContent:'center',
		borderWidth:2,
		alignItems:'center'
		},
		touch7: {
		height:50,
		width:50,
		top:10,
		left:10,
		backgroundColor:'#fff',
		justifyContent:'center',
		borderWidth:2,
		alignItems:'center'
		},
		counter: {
		width:40,
		height:40,
		backgroundColor:'#7FA57F',
		borderRadius: 20,
		justifyContent:'center',
		alignItems:'center',
		//left:240,
		top:-15,
		},
		counter1: {
		width:40,
		height:40,
		backgroundColor:'#FFFF00',
		borderRadius: 20,
		justifyContent:'center',
		alignItems:'center',
		left:10,
		top:-15
		},
		counter2: {
		width:40,
		height:40,
		backgroundColor:'red',
		borderRadius: 20,
		justifyContent:'center',
		alignItems:'center',
		left:20,
		top:-15
		},
		touch8: {
		height:35,
		width:35,
		top:30,
		left:20,
		backgroundColor:'#fff',
		justifyContent:'center',
		borderWidth:2,
		alignItems:'center'
		},
		touch9: {
		height:35,
		width:35,
		top:30,
		left:-60,
		backgroundColor:'#fff',
		justifyContent:'center',
		borderWidth:2,
		alignItems:'center'
		},
		touch10: {
		height:35,
		width:35,
		//top:20,
		left:20,
		backgroundColor:'#fff',
		justifyContent:'center',
		borderWidth:2,
		alignItems:'center'
		},
		touch11: {
		height:35,
		width:35,
		//top:20,
		left:-60,
		backgroundColor:'#fff',
		justifyContent:'center',
		borderWidth:2,
		alignItems:'center'
		},
		item: {
		backgroundColor: '#f9c2ff',
		padding: 20,
		marginVertical: 8,
		marginHorizontal: 16,
		},
		button: {
		width:490,
		backgroundColor:'#fff',
		left:-30
		//borderRadius: 25,
		// marginVertical: 10,
		// paddingVertical: 13,
		// top:-7
		
		},
		buttonText: {
		fontSize:24,
		fontWeight:'500',
		color:'black',
		textAlign:'center'
		},
		vue: {
		padding: 80,
		paddingTop:505,
		},
		list: {
		marginTop:50,
		},
		title:{
		fontSize:16,
		fontWeight: 'bold'
		},
		descriptionContainer:{
		flexDirection: 'row',
		paddingRight: 50
		},
		image:{
		width: 50,
		height: 50,
		borderRadius: 25
		},
		textDescription: {
		marginLeft: 10,
		color: 'gray'
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
	marginLeft: 40,
	// marginRight: 8,
	//  right: 300,
	alignSelf: 'center',
	color: 'white',
	fontSize:22,
	top:-10
	},
	modal1:{
		width:620,
		height:500,
		borderRadius: 10,
		justifyContent:"center",
		alignItems: "center",
        alignContent:"center",
		shadowColor: "#000",
		shadowOffset: {
		  width: 0,
		  height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		//top:320,
		backgroundColor:'#191919',
		borderColor:'#00B0F0',
		borderWidth:2,
		
		//left:100
	},
	modals:{
		width:600,
		height:700,
		borderRadius: 10,
		justifyContent:"center",
		alignItems: "center",

		shadowColor: "#000",
		shadowOffset: {
		  width: 0,
		  height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		top:320,
		backgroundColor:"black",
		borderColor:'#00B0F0',
		borderWidth:2,
		
		left:100
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
	borderColor: '#00B0F0',
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
	color: 'white',
	textAlign:'center',
	fontSize: 15,
	marginTop:65,
	},
	buttonSign: {
	flex: 0.5,
	justifyContent: 'center',
	alignItems: 'center',
	height: 50,
	width:50,
	backgroundColor: 'black',
	borderColor:'#00B0F0',borderWidth:2,
	margin: 10,
	},
	car: {
		
		height:980,
		backgroundColor:'#1b4f9c',
		//Wtop:10,
	   // borderColor:'black',
		//borderWidth:1,
	
	   },
	   car1: {
		height:770,
		backgroundColor:'#f7e86a',
		//Wtop:10,
	    //borderColor:'black',
		//borderWidth:1,
	   },
	   car2: {
		height:875,
		backgroundColor:'#48bbdd',
		//Wtop:10,
	    //borderColor:'black',
		//borderWidth:1,
	   },
	   car3: {
		height:980,
		backgroundColor:'#5fb157',
		//Wtop:10,
	    //borderColor:'black',
		//borderWidth:1,
	   },
	   carR1: {
		height:300,
		backgroundColor:'white',
		//Wtop:10,
	    //borderColor:'#00B0F0',
		//borderWidth:1,
		//top:70
	   },
});

// mapStateToProps = (state,props) => ({
// 	createUser: state.authReducer.createNewStudent
//   })
// mapDispatchToProps = (dispatch) => ({
// 	dispatch
// })
// export default connect(mapStateToProps,mapDispatchToProps)(ClotureUrgence)

