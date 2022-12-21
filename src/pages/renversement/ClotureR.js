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
	
export default class ClotureR extends React.Component {
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

			//
			tdr :null,
			reactionN1:0,
			reactionN2:0,

			confirmNextStudent:false,
			confirmNewFormation:false,
			warningQCM:false

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
		// Alert.alert(
        //             "Attention!",
        //             "Choix unique!",
        //             [
        //             {
        //                 text: "OK",
        //                 onPress: () => console.log("OK Pressed") 
        //             }]
        //         ) 
		//this.getData()
		//this.getTotal()
		this.currentF()
		// setTimeout(() => {
		// 	this.getData()
		// }, 100);
	}
	
	async getInfo(){
		try {
			let str_stdId = await AsyncStorage.getItem('@r_student_id'+this.state.asyncId.toString())
			let str_trId= await AsyncStorage.getItem('@trainer_id')

			let str_std_fname =await AsyncStorage.getItem('@r_student_first_name'+this.state.asyncId.toString())
			let str_std_lname= await AsyncStorage.getItem('@r_student_last_name'+this.state.asyncId.toString())

			let str_trfname=await AsyncStorage.getItem('@trainer_first_name')
			let str_trlname = await AsyncStorage.getItem('@trainer_last_name')

			// let str_signstd=await AsyncStorage.getItem('@sign1')
			// let str_signtr = await AsyncStorage.getItem('@sign2')

			let str_heure = await AsyncStorage.getItem('@heure')  
            let str_heureF = await AsyncStorage.getItem('@heurefin') 
			//let str_heures = await AsyncStorage.getItem('@heures') 
		

            let str_email = await AsyncStorage.getItem('@r_student_email'+this.state.asyncId.toString())  
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
	
	



	
	// async sendDataToBDD(){
	// 	//let indextotal = await AsyncStorage.getItem('pr_totalStudent')
	// 	let studentEvalue = await AsyncStorage.getItem('r_student_evalue')
	// 	console.log(studentEvalue);
	// 	let jsonStudentE = JSON.parse(studentEvalue)
	// 	let data =[]
	// 	for (let index = 0; index < jsonStudentE.length; index++) {
	// 		const el= jsonStudentE[index];
	// 		console.log(el);
	// 		const formation = await AsyncStorage.getItem('pr_training'+el.toString())
	// 		//console.log(formation);
	// 		data.push(formation)
			
	// 	}
	// 	let json_data = JSON.parse('['+data+']')
		
	// 	console.log(json_data );
	// 	AsyncStorage.getItem('data_formation' ).then( (datas) => {
	// 		if(datas === null){
	// 		datas = JSON.stringify(json_data)
	// 		//console.log(datas);
			
	// 		AsyncStorage.setItem('data_formation',datas)
	// 		}else{
	// 			let datas_j = JSON.parse(datas)
	// 			datas_j = datas_j.concat(json_data)
	// 			console.log(datas_j);
	// 		datas = JSON.stringify(datas_j)
	// 		//console.log(datas )
	// 		AsyncStorage.removeItem('data_formation').then(
			 
	// 		AsyncStorage.setItem('data_formation',datas)
	// 		)
	// 		}
			
	// 		// data=data+','+JSON.stringify(obj)
		  
	// 	  }).done();

	// }
	// async saveData(){
		 
	// 		try{
	// 			await AsyncStorage.multiGet(['dataP','data_sense','qcmDataP']).then((data)=>{
	// 				let str_data =""
	// 				let str_data_sense =""
	// 				let str_qcmData =""
					
	// 				if(data[0][1] != null){
	// 					str_data=data[0][1].slice(0)
	// 				}
	// 				if (data[1][1] != null){
	// 					str_data_sense=data[1][1].slice(0)
	// 				}
	// 				if (data[2][1] != null){
	// 					str_qcmData=data[2][1].slice(0)
	// 				}
					
					
					
	// 				let data_item_=JSON.parse("["+str_data+"]")
	// 				let data_sense_=JSON.parse("["+str_data_sense+"]")
	// 				let data_qcmData=JSON.parse("["+str_qcmData+"]")
	// 				console.log(this.props.type);
	// 				let obj={

	// 						id_student: parseInt(this.state.student_id,10),
	// 						start_time:this.state.heureDebut,
	// 						end_time:this.state.heureFin,
	// 						rapport : this.state.pdf_base64,
	// 						signature_trainer : this.state.sign1,
	// 						signature_student : this.state.sign2,
	// 						data:[
								 
	// 							{
	// 								type_formation: "parcours_routier",
	// 								type:this.props.typeF,
	// 								data:[
	// 										{
	// 											data_item: data_item_,
	// 											data_sense: data_sense_,
	// 											qcmData : data_qcmData,
	// 										}
	// 									],
								
	// 							}
								
	// 						]
	// 				}
	// 				AsyncStorage.getItem('pr_training'+this.state.asyncId.toString()).then((data) => {
	// 					if(data === null){
	// 					  data= JSON.stringify(obj)
	// 					  console.log(data);
	// 					  AsyncStorage.setItem('pr_training'+this.state.asyncId.toString(),data)
	// 					}else{
	// 					data=data+','+JSON.stringify(obj)
	// 					// data=JSON.stringify(obj)
	// 						console.log(data);
	// 					AsyncStorage.removeItem('pr_training'+this.state.asyncId.toString()).then(
						 
	// 					  AsyncStorage.setItem('pr_training'+this.state.asyncId.toString(),data)
	// 					)
	// 					}
	// 				  }).done()
	
					
	// 				// const url='https://api.cleandata.link/api/formation/gcam/';
	// 				// axios.post(url, obj).then(response=>{
	// 				// 	console.log(response);
	// 				// })
					
	// 			})
	// 		} catch(e){
	// 			console.log(e);
	// 			// return null;
	// 		}
		
		
	// }
	
	
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
		Actions.popTo("listeStudentR",{stage:this.props.stage,stageName : this.props.stageName,})
		await AsyncStorage.multiRemove([	 
			'@heurefin',
			'@heure',
		])  
		 
	  
  }
  
  async newFormation(){
	try {
		this.setState({showD5:false,confirmNewFormation:false}) 
		
			
			
		// }
		await AsyncStorage.multiRemove([
			
			'@heurefin',
			'@heure',
	 
		]) 
		setTimeout(() => {
			// AsyncStorage.removeItem('r_totalStudent',(error)  =>{console.log(error)})
			AsyncStorage.removeItem('r_student_evalue',(error)  =>{console.log(error)})
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

	//PREPARER
	onBtn1Press(){
		this.setState({btn1:2.5,activeBtn2:true,activeBtn3:true,activeBtn4:true})
		
		this.TextInput.focus()
		setTimeout(() => {
			this.setState({
				totalVert: this.state.btn1+this.state.btn5+this.state.btn9+this.state.btn13
				+this.state.btnV1+this.state.btnV5+this.state.btnV9+this.state.btnP1+this.state.btnP5+this.state.btnP9+
				this.state.btnA1+this.state.btnA5+this.state.btnA9+this.state.btnA13
			})
			this.setState({tauxCJ: this.state.totalVert+this.state.totalJaune+this.state.totalGris+this.state.totalRouge})
			this.setState({tauxEv:this.state.tauxCJ*0.9})
		}, 10);
		setTimeout(() => {
			let qcmData={
				item_qcm_category: "preparer",
				item_qcm_sub_category: "controler_utiliser_le_vehicule",
				qcm_item: "application_reguliere",
				comment: this.state.comment1
		
				// time: new Date(),
				// icon: 'dash',
				// color:'yellow',
				// type:'octicon'
			  }
			  AsyncStorage.getItem('qcmDataP').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmDataP',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmDataP').then(
				 
				  AsyncStorage.setItem('qcmDataP',data)
				)
				}
			  }).done()
		}, 30000);
		
		
	}
	onBtn2Press(){
		this.setState({btn2:1.25,activeBtn1:true,activeBtn3:true,activeBtn4:true})
		this.TextInput.focus()
		setTimeout(() => {
			this.setState({
				totalJaune: this.state.btn2+this.state.btn6+this.state.btn10+this.state.btn14
				+this.state.btnV2+this.state.btnV6+this.state.btnV10+this.state.btnP2+this.state.btnP6+this.state.btnP10+
				this.state.btnA2+this.state.btnA6+this.state.btnA10+this.state.btnA14
			})
			
			this.setState({tauxCJ: this.state.totalVert+this.state.totalJaune+this.state.totalGris+this.state.totalRouge})
			this.setState({tauxEv:this.state.tauxCJ*0.9})
		}, 10);
		setTimeout(() => {
			let qcmData={
				item_qcm_category: "preparer",
				item_qcm_sub_category: "controler_utiliser_le_vehicule",
				qcm_item: "application_irreguliere",
				comment: this.state.comment1
		
				// time: new Date(),
				// icon: 'dash',
				// color:'yellow',
				// type:'octicon'
			  }
			  AsyncStorage.getItem('qcmDataP').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmDataP',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmDataP').then(
				 
				  AsyncStorage.setItem('qcmDataP',data)
				)
				}
			  }).done()
		}, 30000);
		
	}
	onBtn3Press(){
		this.setState({btn3:0.0,activeBtn2:true,activeBtn1:true,activeBtn4:true})
		
		this.TextInput.focus()
		setTimeout(() => {
			this.setState({
				totalRouge: this.state.btn3+this.state.btn7+this.state.btn11+this.state.btn15
				+this.state.btnV3+this.state.btnV7+this.state.btnV11+this.state.btnP3+this.state.btnP7+this.state.btnP11+
				this.state.btnA3+this.state.btnA7+this.state.btnA11+this.state.btnA15
			})
			this.setState({tauxCJ: this.state.totalVert+this.state.totalJaune+this.state.totalGris+this.state.totalRouge})
			this.setState({tauxEv:this.state.tauxCJ*0.9})
		}, 10);
		setTimeout(() => {
			let qcmData={
				item_qcm_category: "preparer",
				item_qcm_sub_category: "controler_utiliser_le_vehicule",
				qcm_item: "rarement_applique",
				comment: this.state.comment1
		
				// time: new Date(),
				// icon: 'dash',
				// color:'yellow',
				// type:'octicon'
			  }
			  AsyncStorage.getItem('qcmDataP').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmDataP',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmDataP').then(
				 
				  AsyncStorage.setItem('qcmDataP',data)
				)
				}
			  }).done()
		}, 30000);
		
		
	}
	onBtn4Press(){
		this.setState({btn4:0.0,activeBtn2:true,activeBtn3:true,activeBtn1:true})
		this.TextInput.focus()
		setTimeout(() => {
			this.setState({
				totalGris: this.state.btn4+this.state.btn8+this.state.btn12+this.state.btn16
				+this.state.btnV4+this.state.btnV8+this.state.btnV12+this.state.btnP4+this.state.btnP8+this.state.btnP12+
				this.state.btnA4+this.state.btnA8+this.state.btnA12+this.state.btnA16
			})
			
			this.setState({tauxCJ: this.state.totalVert+this.state.totalJaune+this.state.totalGris+this.state.totalRouge})
			this.setState({tauxEv:this.state.tauxCJ*0.9})
		}, 10);
		setTimeout(() => {
			let qcmData={
				item_qcm_category: "preparer",
				item_qcm_sub_category: "controler_utiliser_le_vehicule",
				qcm_item: "non_evalue",
				comment: this.state.comment1
		
				// time: new Date(),
				// icon: 'dash',
				// color:'yellow',
				// type:'octicon'
			  }
			  AsyncStorage.getItem('qcmDataP').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmDataP',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmDataP').then(
				 
				  AsyncStorage.setItem('qcmDataP',data)
				)
				}
			  }).done()
		}, 30000);

	
	}
	//
	onBtn5Press(){
		this.setState({btn5:2.5,activeBtn6:true,activeBtn7:true,activeBtn8:true})
		
		this.TextInput1.focus()
		setTimeout(() => {
			this.setState({
				totalVert: this.state.btn1+this.state.btn5+this.state.btn9+this.state.btn13
				+this.state.btnV1+this.state.btnV5+this.state.btnV9+this.state.btnP1+this.state.btnP5+this.state.btnP9+
				this.state.btnA1+this.state.btnA5+this.state.btnA9+this.state.btnA13
			})
			this.setState({tauxCJ: this.state.totalVert+this.state.totalJaune+this.state.totalGris+this.state.totalRouge})
			this.setState({tauxEv:this.state.tauxCJ*0.9})
		}, 10);
		setTimeout(() => {
			let qcmData={
				item_qcm_category: "preparer",
				item_qcm_sub_category: "passagers_chargement",
				qcm_item: "application_reguliere",
				comment: this.state.comment2
		
				// time: new Date(),
				// icon: 'dash',
				// color:'yellow',
				// type:'octicon'
			  }
			  AsyncStorage.getItem('qcmDataP').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmDataP',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmDataP').then(
				 
				  AsyncStorage.setItem('qcmDataP',data)
				)
				}
			  }).done()
		}, 30000);
		
	}
	onBtn6Press(){
		this.setState({btn6:1.25,activeBtn5:true,activeBtn7:true,activeBtn8:true})
		this.TextInput1.focus()
		setTimeout(() => {
		this.setState({
			totalJaune: this.state.btn2+this.state.btn6+this.state.btn10+this.state.btn14
			+this.state.btnV2+this.state.btnV6+this.state.btnV10+this.state.btnP2+this.state.btnP6+this.state.btnP10+
			this.state.btnA2+this.state.btnA6+this.state.btnA10+this.state.btnA14
		})

		this.setState({tauxCJ: this.state.totalVert+this.state.totalJaune+this.state.totalGris+this.state.totalRouge})
		this.setState({tauxEv:this.state.tauxCJ*0.9})
		}, 10);
		setTimeout(() => {
			let qcmData={
				item_qcm_category: "preparer",
				item_qcm_sub_category: "passagers_chargement",
				qcm_item: "application_irreguliere",
				comment: this.state.comment2
		
				// time: new Date(),
				// icon: 'dash',
				// color:'yellow',
				// type:'octicon'
			  }
			  AsyncStorage.getItem('qcmDataP').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmDataP',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmDataP').then(
				 
				  AsyncStorage.setItem('qcmDataP',data)
				)
				}
			  }).done()
		}, 30000);

	}
	onBtn7Press(){
		this.setState({btn7:0.0,activeBtn5:true,activeBtn6:true,activeBtn8:true})
		this.TextInput1.focus()
		setTimeout(() => {
			this.setState({
				totalRouge: this.state.btn3+this.state.btn7+this.state.btn11+this.state.btn15
				+this.state.btnV3+this.state.btnV7+this.state.btnV11+this.state.btnP3+this.state.btnP7+this.state.btnP11+
				this.state.btnA3+this.state.btnA7+this.state.btnA11+this.state.btnA15
			})
			this.setState({tauxCJ: this.state.totalVert+this.state.totalJaune+this.state.totalGris+this.state.totalRouge})
			this.setState({tauxEv:this.state.tauxCJ*0.9})
		}, 10);
		setTimeout(() => {
			let qcmData={
				item_qcm_category: "preparer",
				item_qcm_sub_category: "passagers_chargement",
				qcm_item: "rarement_applique",
				comment: this.state.comment2
		
				// time: new Date(),
				// icon: 'dash',
				// color:'yellow',
				// type:'octicon'
			  }
			  AsyncStorage.getItem('qcmDataP').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmDataP',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmDataP').then(
				 
				  AsyncStorage.setItem('qcmDataP',data)
				)
				}
			  }).done()
		}, 30000);

	}
	onBtn8Press(){
		this.setState({btn8:0.0,activeBtn5:true,activeBtn6:true,activeBtn7:true})
		this.TextInput1.focus()
		setTimeout(() => {
			this.setState({
				totalGris: this.state.btn4+this.state.btn8+this.state.btn12+this.state.btn16
				+this.state.btnV4+this.state.btnV8+this.state.btnV12+this.state.btnP4+this.state.btnP8+this.state.btnP12+
				this.state.btnA4+this.state.btnA8+this.state.btnA12+this.state.btnA16
			})
			
			this.setState({tauxCJ: this.state.totalVert+this.state.totalJaune+this.state.totalGris+this.state.totalRouge})
			this.setState({tauxEv:this.state.tauxCJ*0.9})
		}, 10);
		setTimeout(() => {
			let qcmData={
				item_qcm_category: "preparer",
				item_qcm_sub_category: "passagers_chargement",
				qcm_item: "rarement_applique",
				comment: this.state.comment2
		
				// time: new Date(),
				// icon: 'dash',
				// color:'yellow',
				// type:'octicon'
			  }
			  AsyncStorage.getItem('qcmDataP').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmDataP',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmDataP').then(
				 
				  AsyncStorage.setItem('qcmDataP',data)
				)
				}
			  }).done()
		}, 30000);

	}
	//
	onBtn9Press(){
		this.setState({btn9:2.5,activeBtn10:true,activeBtn11:true,activeBtn12:true})
		this.TextInput2.focus()

		setTimeout(() => {
			this.setState({
				totalVert: this.state.btn1+this.state.btn5+this.state.btn9+this.state.btn13
				+this.state.btnV1+this.state.btnV5+this.state.btnV9+this.state.btnP1+this.state.btnP5+this.state.btnP9+
				this.state.btnA1+this.state.btnA5+this.state.btnA9+this.state.btnA13
			})
			
			this.setState({tauxCJ: this.state.totalVert+this.state.totalJaune+this.state.totalGris+this.state.totalRouge})
			this.setState({tauxEv:this.state.tauxCJ*0.9})
		}, 10);
		setTimeout(() => {
			let qcmData={
				item_qcm_category: "preparer",
				item_qcm_sub_category: "itineraire_etat_physique",
				qcm_item: "application_reguliere",
				comment: this.state.comment3
		
				// time: new Date(),
				// icon: 'dash',
				// color:'yellow',
				// type:'octicon'
			  }
			  AsyncStorage.getItem('qcmDataP').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmDataP',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmDataP').then(
				 
				  AsyncStorage.setItem('qcmDataP',data)
				)
				}
			  }).done()
		}, 30000);
		
	}
	onBtn10Press(){
		this.setState({btn10:1.25,activeBtn9:true,activeBtn11:true,activeBtn12:true})
		this.TextInput2.focus()
		setTimeout(() => {
			this.setState({
				totalJaune: this.state.btn2+this.state.btn6+this.state.btn10+this.state.btn14
				+this.state.btnV2+this.state.btnV6+this.state.btnV10+this.state.btnP2+this.state.btnP6+this.state.btnP10+
				this.state.btnA2+this.state.btnA6+this.state.btnA10+this.state.btnA14
			})
			
			this.setState({tauxCJ: this.state.totalVert+this.state.totalJaune+this.state.totalGris+this.state.totalRouge})
			this.setState({tauxEv:this.state.tauxCJ*0.9})
		}, 10);
		setTimeout(() => {
			let qcmData={
				item_qcm_category: "preparer",
				item_qcm_sub_category: "itineraire_etat_physique",
				qcm_item: "application_irreguliere",
				comment: this.state.comment3
		
				// time: new Date(),
				// icon: 'dash',
				// color:'yellow',
				// type:'octicon'
			  }
			  AsyncStorage.getItem('qcmDataP').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmDataP',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmDataP').then(
				 
				  AsyncStorage.setItem('qcmDataP',data)
				)
				}
			  }).done()
		}, 10000);

	}
	onBtn11Press(){
		this.setState({btn11:0.0,activeBtn10:true,activeBtn9:true,activeBtn12:true})
		this.TextInput2.focus()
		setTimeout(() => {
			this.setState({
				totalRouge: this.state.btn3+this.state.btn7+this.state.btn11+this.state.btn15
				+this.state.btnV3+this.state.btnV7+this.state.btnV11+this.state.btnP3+this.state.btnP7+this.state.btnP11+
				this.state.btnA3+this.state.btnA7+this.state.btnA11+this.state.btnA15
			})
			
			this.setState({tauxCJ: this.state.totalVert+this.state.totalJaune+this.state.totalGris+this.state.totalRouge})
			this.setState({tauxEv:this.state.tauxCJ*0.9})
		}, 10);
		setTimeout(() => {
			let qcmData={
				item_qcm_category: "preparer",
				item_qcm_sub_category: "itineraire_etat_physique",
				qcm_item: "rarement_applique",
				comment: this.state.comment3
		
				// time: new Date(),
				// icon: 'dash',
				// color:'yellow',
				// type:'octicon'
			  }
			  AsyncStorage.getItem('qcmDataP').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmDataP',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmDataP').then(
				 
				  AsyncStorage.setItem('qcmDataP',data)
				)
				}
			  }).done()
		}, 30000);
	}
	onBtn12Press(){
		this.setState({btn12:0.0,activeBtn10:true,activeBtn11:true,activeBtn9:true})
		this.TextInput2.focus()
		setTimeout(() => {
			this.setState({
				totalGris: this.state.btn4+this.state.btn8+this.state.btn12+this.state.btn16
				+this.state.btnV4+this.state.btnV8+this.state.btnV12+this.state.btnP4+this.state.btnP8+this.state.btnP12+
				this.state.btnA4+this.state.btnA8+this.state.btnA12+this.state.btnA16
			})
			
			this.setState({tauxCJ: this.state.totalVert+this.state.totalJaune+this.state.totalGris+this.state.totalRouge})
			this.setState({tauxEv:this.state.tauxCJ*0.9})
		}, 10);
		setTimeout(() => {
			let qcmData={
				item_qcm_category: "preparer",
				item_qcm_sub_category: "itineraire_etat_physique",
				qcm_item: "non_evalue",
				comment: this.state.comment3
		
				// time: new Date(),
				// icon: 'dash',
				// color:'yellow',
				// type:'octicon'
			  }
			  AsyncStorage.getItem('qcmDataP').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmDataP',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmDataP').then(
				 
				  AsyncStorage.setItem('qcmDataP',data)
				)
				}
			  }).done()
		}, 30000);
		
	}
	//
	onBtn13Press(){
		this.setState({btn13:2.5,activeBtn14:true,activeBtn15:true,activeBtn16:true})
		this.TextInput3.focus()
		setTimeout(() => {
			this.setState({
				totalVert: this.state.btn1+this.state.btn5+this.state.btn9+this.state.btn13
				+this.state.btnV1+this.state.btnV5+this.state.btnV9+this.state.btnP1+this.state.btnP5+this.state.btnP9+
				this.state.btnA1+this.state.btnA5+this.state.btnA9+this.state.btnA13
			})
		
			this.setState({tauxCJ: this.state.totalVert+this.state.totalJaune+this.state.totalGris+this.state.totalRouge})
			this.setState({tauxEv:this.state.tauxCJ*0.9})
		}, 10);
		setTimeout(() => {
			let qcmData={
				item_qcm_category: "preparer",
				item_qcm_sub_category: "installation_au_poste_de_conduite",
				qcm_item: "application_reguliere",
				comment: this.state.comment4
		
				// time: new Date(),
				// icon: 'dash',
				// color:'yellow',
				// type:'octicon'
			  }
			  AsyncStorage.getItem('qcmDataP').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmDataP',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmDataP').then(
				 
				  AsyncStorage.setItem('qcmDataP',data)
				)
				}
			  }).done()
		}, 30000);
		
	}
	onBtn14Press(){
		this.setState({btn14:1.25,activeBtn13:true,activeBtn15:true,activeBtn16:true})
		this.TextInput3.focus()
		
		setTimeout(() => {
			this.setState({
				totalJaune: this.state.btn2+this.state.btn6+this.state.btn10+this.state.btn14
				+this.state.btnV2+this.state.btnV6+this.state.btnV10+this.state.btnP2+this.state.btnP6+this.state.btnP10+
				this.state.btnA2+this.state.btnA6+this.state.btnA10+this.state.btnA14
			})
			
			this.setState({tauxCJ: this.state.totalVert+this.state.totalJaune+this.state.totalGris+this.state.totalRouge})
			this.setState({tauxEv:this.state.tauxCJ*0.9})
		}, 10);
		setTimeout(() => {
			let qcmData={
				item_qcm_category: "preparer",
				item_qcm_sub_category: "installation_au_poste_de_conduite",
				qcm_item: "application_irreguliere",
				comment: this.state.comment4
		
				// time: new Date(),
				// icon: 'dash',
				// color:'yellow',
				// type:'octicon'
			  }
			  AsyncStorage.getItem('qcmDataP').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmDataP',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmDataP').then(
				 
				  AsyncStorage.setItem('qcmDataP',data)
				)
				}
			  }).done()
		}, 30000);
		
	
	}
	onBtn15Press(){
		this.setState({btn15:0.0,activeBtn14:true,activeBtn13:true,activeBtn16:true})
		this.TextInput3.focus()

		setTimeout(() => {
			this.setState({
				totalRouge: this.state.btn3+this.state.btn7+this.state.btn11+this.state.btn15
				+this.state.btnV3+this.state.btnV7+this.state.btnV11+this.state.btnP3+this.state.btnP7+this.state.btnP11+
				this.state.btnA3+this.state.btnA7+this.state.btnA11+this.state.btnA15
			})
			
			this.setState({tauxCJ: this.state.totalVert+this.state.totalJaune+this.state.totalGris+this.state.totalRouge})
			this.setState({tauxEv:this.state.tauxCJ*0.9})
		}, 10);
		setTimeout(() => {
			let qcmData={
				item_qcm_category: "preparer",
				item_qcm_sub_category: "installation_au_poste_de_conduite",
				qcm_item: "rarement_applique",
				comment: this.state.comment4
		
				// time: new Date(),
				// icon: 'dash',
				// color:'yellow',
				// type:'octicon'
			  }
			  AsyncStorage.getItem('qcmDataP').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmDataP',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmDataP').then(
				 
				  AsyncStorage.setItem('qcmDataP',data)
				)
				}
			  }).done()
		}, 30000);
		
	}
	onBtn16Press(){
		this.setState({btn16:0.0,activeBtn14:true,activeBtn15:true,activeBtn13:true})
		this.TextInput3.focus()
		setTimeout(() => {
			this.setState({
				totalGris: this.state.btn4+this.state.btn8+this.state.btn12+this.state.btn16
				+this.state.btnV4+this.state.btnV8+this.state.btnV12+this.state.btnP4+this.state.btnP8+this.state.btnP12+
				this.state.btnA4+this.state.btnA8+this.state.btnA12+this.state.btnA16
			})
			this.setState({tauxCJ: this.state.totalVert+this.state.totalJaune+this.state.totalGris+this.state.totalRouge})
			this.setState({tauxEv:this.state.tauxCJ*0.9})
		}, 10);
		setTimeout(() => {
			let qcmData={
				item_qcm_category: "preparer",
				item_qcm_sub_category: "installation_au_poste_de_conduite",
				qcm_item: "non_evalue",
				comment: this.state.comment4
		
				// time: new Date(),
				// icon: 'dash',
				// color:'yellow',
				// type:'octicon'
			  }
			  AsyncStorage.getItem('qcmDataP').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmDataP',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmDataP').then(
				 
				  AsyncStorage.setItem('qcmDataP',data)
				)
				}
			  }).done()
		}, 30000);
	
	}

	//VOIR
	onBtnV1Press(){
		this.setState({btnV1:15.0,activeBtnV2:true,activeBtnV3:true,activeBtnV4:true})
		this.TextInputV1.focus()
		setTimeout(() => {
			this.setState({
				totalVert: this.state.btn1+this.state.btn5+this.state.btn9+this.state.btn13
				+this.state.btnV1+this.state.btnV5+this.state.btnV9+this.state.btnP1+this.state.btnP5+this.state.btnP9+
				this.state.btnA1+this.state.btnA5+this.state.btnA9+this.state.btnA13
			})
			this.setState({tauxCJ: this.state.totalVert+this.state.totalJaune+this.state.totalGris+this.state.totalRouge})
			this.setState({tauxEv:this.state.tauxCJ*0.9})
		}, 10);
		setTimeout(() => {
			let qcmData={
				item_qcm_category: "voir",
				item_qcm_sub_category: "indices_utiles_vers_avant_loin_large",
				qcm_item: "application_reguliere",
				comment: this.state.commentV1
		
				// time: new Date(),
				// icon: 'dash',
				// color:'yellow',
				// type:'octicon'
			  }
			  AsyncStorage.getItem('qcmDataP').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmDataP',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmDataP').then(
				 
				  AsyncStorage.setItem('qcmDataP',data)
				)
				}
			  }).done()
		}, 30000);
		
	}
	onBtnV2Press(){
		this.setState({btnV2:7.5,activeBtnV1:true,activeBtnV3:true,activeBtnV4:true})
		this.TextInputV1.focus()
		setTimeout(() => {
			this.setState({
				totalJaune: this.state.btn2+this.state.btn6+this.state.btn10+this.state.btn14
				+this.state.btnV2+this.state.btnV6+this.state.btnV10+this.state.btnP2+this.state.btnP6+this.state.btnP10+
				this.state.btnA2+this.state.btnA6+this.state.btnA10+this.state.btnA14
			})
			
			this.setState({tauxCJ: this.state.totalVert+this.state.totalJaune+this.state.totalGris+this.state.totalRouge})
			this.setState({tauxEv:this.state.tauxCJ*0.9})
		}, 10);
		setTimeout(() => {
			let qcmData={
				item_qcm_category: "voir",
				item_qcm_sub_category: "indices_utiles_vers_avant_loin_large",
				qcm_item: "application_irreguliere",
				comment: this.state.commentV1
		
				// time: new Date(),
				// icon: 'dash',
				// color:'yellow',
				// type:'octicon'
			  }
			  AsyncStorage.getItem('qcmDataP').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmDataP',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmDataP').then(
				 
				  AsyncStorage.setItem('qcmDataP',data)
				)
				}
			  }).done()
		}, 30000);
		
	}
	onBtnV3Press(){
		this.setState({btnV3:0.0,activeBtnV2:true,activeBtnV1:true,activeBtnV4:true})
		this.TextInputV1.focus()
		setTimeout(() => {
		this.setState({
			totalRouge: this.state.btn3+this.state.btn7+this.state.btn11+this.state.btn15
			+this.state.btnV3+this.state.btnV7+this.state.btnV11+this.state.btnP3+this.state.btnP7+this.state.btnP11+
			this.state.btnA3+this.state.btnA7+this.state.btnA11+this.state.btnA15
		})
		
		this.setState({tauxCJ: this.state.totalVert+this.state.totalJaune+this.state.totalGris+this.state.totalRouge})
		this.setState({tauxEv:this.state.tauxCJ*0.9})
		}, 10);
		setTimeout(() => {
			let qcmData={
				item_qcm_category: "voir",
				item_qcm_sub_category: "indices_utiles_vers_avant_loin_large",
				qcm_item: "rarement_applique",
				comment: this.state.commentV1
		
				// time: new Date(),
				// icon: 'dash',
				// color:'yellow',
				// type:'octicon'
			  }
			  AsyncStorage.getItem('qcmDataP').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmDataP',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmDataP').then(
				 
				  AsyncStorage.setItem('qcmDataP',data)
				)
				}
			  }).done()
		}, 30000);
	}
	onBtnV4Press(){
		this.setState({btnV4:0.0,activeBtnV2:true,activeBtnV3:true,activeBtnV1:true})
		this.TextInputV1.focus()
		setTimeout(() => {
			this.setState({
				totalGris: this.state.btn4+this.state.btn8+this.state.btn12+this.state.btn16
				+this.state.btnV4+this.state.btnV8+this.state.btnV12+this.state.btnP4+this.state.btnP8+this.state.btnP12+
				this.state.btnA4+this.state.btnA8+this.state.btnA12+this.state.btnA16
			})
			
			this.setState({tauxCJ: this.state.totalVert+this.state.totalJaune+this.state.totalGris+this.state.totalRouge})
			this.setState({tauxEv:this.state.tauxCJ*0.9})
		}, 10);
		setTimeout(() => {
			let qcmData={
				item_qcm_category: "voir",
				item_qcm_sub_category: "indices_utiles_vers_avant_loin_large",
				qcm_item: "non_evalue",
				comment: this.state.commentV1
		
				// time: new Date(),
				// icon: 'dash',
				// color:'yellow',
				// type:'octicon'
			  }
			  AsyncStorage.getItem('qcmDataP').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmDataP',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmDataP').then(
				 
				  AsyncStorage.setItem('qcmDataP',data)
				)
				}
			  }).done()
		}, 30000);
		
	}
	//
	onBtnV5Press(){
		this.setState({btnV5:15.0,activeBtnV6:true,activeBtnV7:true,activeBtnV8:true})
		this.TextInputV2.focus()
		setTimeout(() => {
			this.setState({
				totalVert: this.state.btn1+this.state.btn5+this.state.btn9+this.state.btn13
				+this.state.btnV1+this.state.btnV5+this.state.btnV9+this.state.btnP1+this.state.btnP5+this.state.btnP9+
				this.state.btnA1+this.state.btnA5+this.state.btnA9+this.state.btnA13
			})
		
			this.setState({tauxCJ: this.state.totalVert+this.state.totalJaune+this.state.totalGris+this.state.totalRouge})
			this.setState({tauxEv:this.state.tauxCJ*0.9})
			
		}, 10);
		setTimeout(() => {
			let qcmData={
				item_qcm_category: "voir",
				item_qcm_sub_category: "indices_utiles_vers_arriere_retroviseurs_angles_morts",
				qcm_item: "application_reguliere",
				comment: this.state.commentV2
		
				// time: new Date(),
				// icon: 'dash',
				// color:'yellow',
				// type:'octicon'
			  }
			  AsyncStorage.getItem('qcmDataP').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmDataP',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmDataP').then(
				 
				  AsyncStorage.setItem('qcmDataP',data)
				)
				}
			  }).done()
		}, 30000);
	}
	onBtnV6Press(){
		this.setState({btnV6:7.5,activeBtnV5:true,activeBtnV7:true,activeBtnV8:true})
		this.TextInputV2.focus()
		setTimeout(() => {
			
			this.setState({
				totalJaune: this.state.btn2+this.state.btn6+this.state.btn10+this.state.btn14
				+this.state.btnV2+this.state.btnV6+this.state.btnV10+this.state.btnP2+this.state.btnP6+this.state.btnP10+
				this.state.btnA2+this.state.btnA6+this.state.btnA10+this.state.btnA14
			})
			
			this.setState({tauxCJ: this.state.totalVert+this.state.totalJaune+this.state.totalGris+this.state.totalRouge})
			this.setState({tauxEv:this.state.tauxCJ*0.9})
				
		}, 10);
		setTimeout(() => {
			let qcmData={
				item_qcm_category: "voir",
				item_qcm_sub_category: "indices_utiles_vers_arriere_retroviseurs_angles_morts",
				qcm_item: "application_irreguliere",
				comment: this.state.commentV2
		
				// time: new Date(),
				// icon: 'dash',
				// color:'yellow',
				// type:'octicon'
			  }
			  AsyncStorage.getItem('qcmDataP').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmDataP',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmDataP').then(
				 
				  AsyncStorage.setItem('qcmDataP',data)
				)
				}
			  }).done()
		}, 30000);
	}
	onBtnV7Press(){
		this.setState({btnV7:0.0,activeBtnV5:true,activeBtnV6:true,activeBtnV8:true})
		this.TextInputV2.focus()
		setTimeout(() => {
			this.setState({
				totalRouge: this.state.btn3+this.state.btn7+this.state.btn11+this.state.btn15
				+this.state.btnV3+this.state.btnV7+this.state.btnV11+this.state.btnP3+this.state.btnP7+this.state.btnP11+
				this.state.btnA3+this.state.btnA7+this.state.btnA11+this.state.btnA15
			})
			
			this.setState({tauxCJ: this.state.totalVert+this.state.totalJaune+this.state.totalGris+this.state.totalRouge})
			this.setState({tauxEv:this.state.tauxCJ*0.9})
		}, 10);
		setTimeout(() => {
			let qcmData={
				item_qcm_category: "voir",
				item_qcm_sub_category: "indices_utiles_vers_arriere_retroviseurs_angles_morts",
				qcm_item: "rarement_applique",
				comment: this.state.commentV2
		
				// time: new Date(),
				// icon: 'dash',
				// color:'yellow',
				// type:'octicon'
			  }
			  AsyncStorage.getItem('qcmDataP').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmDataP',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmDataP').then(
				 
				  AsyncStorage.setItem('qcmDataP',data)
				)
				}
			  }).done()
		}, 30000);
	}
	onBtnV8Press(){
		this.setState({btnV8:0.0,activeBtnV5:true,activeBtnV6:true,activeBtnV7:true})
		this.TextInputV2.focus()
		setTimeout(() => {
			this.setState({
				totalGris: this.state.btn4+this.state.btn8+this.state.btn12+this.state.btn16
				+this.state.btnV4+this.state.btnV8+this.state.btnV12+this.state.btnP4+this.state.btnP8+this.state.btnP12+
				this.state.btnA4+this.state.btnA8+this.state.btnA12+this.state.btnA16
			})
			
			this.setState({tauxCJ: this.state.totalVert+this.state.totalJaune+this.state.totalGris+this.state.totalRouge})
			this.setState({tauxEv:this.state.tauxCJ*0.9})
		}, 10);
		setTimeout(() => {
			let qcmData={
				item_qcm_category: "voir",
				item_qcm_sub_category: "indices_utiles_vers_arriere_retroviseurs_angles_morts",
				qcm_item: "non_evalue",
				comment: this.state.commentV2
		
				// time: new Date(),
				// icon: 'dash',
				// color:'yellow',
				// type:'octicon'
			  }
			  AsyncStorage.getItem('qcmDataP').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmDataP',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmDataP').then(
				 
				  AsyncStorage.setItem('qcmDataP',data)
				)
				}
			  }).done()
		}, 30000);

	}
	//
	onBtnV9Press(){
		this.setState({btnV9:5.0,activeBtnV10:true,activeBtnV11:true,activeBtnV12:true})
		this.TextInputV3.focus()
		setTimeout(() => {
		
		this.setState({
			totalVert: this.state.btn1+this.state.btn5+this.state.btn9+this.state.btn13
			+this.state.btnV1+this.state.btnV5+this.state.btnV9+this.state.btnP1+this.state.btnP5+this.state.btnP9+
			this.state.btnA1+this.state.btnA5+this.state.btnA9+this.state.btnA13
		})
		
		this.setState({tauxCJ: this.state.totalVert+this.state.totalJaune+this.state.totalGris+this.state.totalRouge})
		this.setState({tauxEv:this.state.tauxCJ*0.9})
			
		}, 10);
		setTimeout(() => {
			let qcmData={
				item_qcm_category: "voir",
				item_qcm_sub_category: "indices_utiles_ecouter_ressentir",
				qcm_item: "application_reguliere",
				comment: this.state.commentV3
		
				// time: new Date(),
				// icon: 'dash',
				// color:'yellow',
				// type:'octicon'
			  }
			  AsyncStorage.getItem('qcmDataP').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmDataP',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmDataP').then(
				 
				  AsyncStorage.setItem('qcmDataP',data)
				)
				}
			  }).done()
		}, 30000);
	}
	onBtnV10Press(){
		this.setState({btnV10:2.5,activeBtnV9:true,activeBtnV11:true,activeBtnV12:true})
		this.TextInputV3.focus()
		setTimeout(() => {
			this.setState({
				totalJaune: this.state.btn2+this.state.btn6+this.state.btn10+this.state.btn14
				+this.state.btnV2+this.state.btnV6+this.state.btnV10+this.state.btnP2+this.state.btnP6+this.state.btnP10+
				this.state.btnA2+this.state.btnA6+this.state.btnA10+this.state.btnA14
			})
			
			this.setState({tauxCJ: this.state.totalVert+this.state.totalJaune+this.state.totalGris+this.state.totalRouge})
			this.setState({tauxEv:this.state.tauxCJ*0.9})
		}, 10);
		setTimeout(() => {
			let qcmData={
				item_qcm_category: "voir",
				item_qcm_sub_category: "indices_utiles_ecouter_ressentir",
				qcm_item: "application_irreguliere",
				comment: this.state.commentV3
		
				// time: new Date(),
				// icon: 'dash',
				// color:'yellow',
				// type:'octicon'
			  }
			  AsyncStorage.getItem('qcmDataP').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmDataP',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmDataP').then(
				 
				  AsyncStorage.setItem('qcmDataP',data)
				)
				}
			  }).done()
		}, 30000);

	}
	onBtnV11Press(){
		this.setState({btnV11:0.0,activeBtnV10:true,activeBtnV9:true,activeBtnV12:true})
		this.TextInputV3.focus()
		setTimeout(() => {
			this.setState({
				totalRouge: this.state.btn3+this.state.btn7+this.state.btn11+this.state.btn15
				+this.state.btnV3+this.state.btnV7+this.state.btnV11+this.state.btnP3+this.state.btnP7+this.state.btnP11+
				this.state.btnA3+this.state.btnA7+this.state.btnA11+this.state.btnA15
			})
			
			this.setState({tauxCJ: this.state.totalVert+this.state.totalJaune+this.state.totalGris+this.state.totalRouge})
			this.setState({tauxEv:this.state.tauxCJ*0.9})	
		}, 10);
		setTimeout(() => {
			let qcmData={
				item_qcm_category: "voir",
				item_qcm_sub_category: "indices_utiles_ecouter_ressentir",
				qcm_item: "rarement_applique",
				comment: this.state.commentV3
		
				// time: new Date(),
				// icon: 'dash',
				// color:'yellow',
				// type:'octicon'
			  }
			  AsyncStorage.getItem('qcmDataP').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmDataP',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmDataP').then(
				 
				  AsyncStorage.setItem('qcmDataP',data)
				)
				}
			  }).done();
		}, 30000)

	}
	onBtnV12Press(){
		this.setState({btnV12:0.0,activeBtnV10:true,activeBtnV11:true,activeBtnV9:true})
		this.TextInputV3.focus()
		setTimeout(() => {
			this.setState({
				totalGris: this.state.btn4+this.state.btn8+this.state.btn12+this.state.btn16
				+this.state.btnV4+this.state.btnV8+this.state.btnV12+this.state.btnP4+this.state.btnP8+this.state.btnP12+
				this.state.btnA4+this.state.btnA8+this.state.btnA12+this.state.btnA16
			})
			
			this.setState({tauxCJ: this.state.totalVert+this.state.totalJaune+this.state.totalGris+this.state.totalRouge})
			this.setState({tauxEv:this.state.tauxCJ*0.9})
		}, 10);
		setTimeout(() => {
			let qcmData={
				item_qcm_category: "voir",
				item_qcm_sub_category: "indices_utiles_ecouter_ressentir",
				qcm_item: "non_evalue",
				comment: this.state.commentV3
		
				// time: new Date(),
				// icon: 'dash',
				// color:'yellow',
				// type:'octicon'
			  }
			  AsyncStorage.getItem('qcmDataP').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmDataP',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmDataP').then(
				 
				  AsyncStorage.setItem('qcmDataP',data)
				)
				}
			  }).done()
		}, 30000);

	}

	//prevoir
	onBtnP1Press(){
		this.setState({btnP1:13.0,activeBtnP2:true,activeBtnP3:true,activeBtnP4:true})
		this.TextInputP1.focus()
		setTimeout(() => {
			this.setState({
				totalVert: this.state.btn1+this.state.btn5+this.state.btn9+this.state.btn13
				+this.state.btnV1+this.state.btnV5+this.state.btnV9+this.state.btnP1+this.state.btnP5+this.state.btnP9+
				this.state.btnA1+this.state.btnA5+this.state.btnA9+this.state.btnA13
			})
			this.setState({tauxCJ: this.state.totalVert+this.state.totalJaune+this.state.totalGris+this.state.totalRouge})
			this.setState({tauxEv:this.state.tauxCJ*0.9})
		}, 10);
		setTimeout(() => {
			let qcmData={
				item_qcm_category: "prevoir",
				item_qcm_sub_category: "selon_la_visibilite_espace_libre",
				qcm_item: "application_reguliere",
				comment: this.state.commentP1
		
				// time: new Date(),
				// icon: 'dash',
				// color:'yellow',
				// type:'octicon'
			  }
			  AsyncStorage.getItem('qcmDataP').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmDataP',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmDataP').then(
				 
				  AsyncStorage.setItem('qcmDataP',data)
				)
				}
			  }).done()
		}, 30000);

	}
	onBtnP2Press(){
		this.setState({btnP2:6.5,activeBtnP1:true,activeBtnP3:true,activeBtnP4:true})
		this.TextInputP1.focus()
		setTimeout(() => {
			this.setState({
				totalJaune: this.state.btn2+this.state.btn6+this.state.btn10+this.state.btn14
				+this.state.btnV2+this.state.btnV6+this.state.btnV10+this.state.btnP2+this.state.btnP6+this.state.btnP10+
				this.state.btnA2+this.state.btnA6+this.state.btnA10+this.state.btnA14
			})
			
			this.setState({tauxCJ: this.state.totalVert+this.state.totalJaune+this.state.totalGris+this.state.totalRouge})
			this.setState({tauxEv:this.state.tauxCJ*0.9})
		}, 10);
		setTimeout(() => {
			let qcmData={
				item_qcm_category: "prevoir",
				item_qcm_sub_category: "selon_la_visibilite_espace_libre",
				qcm_item: "application_irreguliere",
				comment: this.state.commentP1
		
				// time: new Date(),
				// icon: 'dash',
				// color:'yellow',
				// type:'octicon'
			  }
			  AsyncStorage.getItem('qcmDataP').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmDataP',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmDataP').then(
				 
				  AsyncStorage.setItem('qcmDataP',data)
				)
				}
			  }).done()
		}, 30000);

	}
	onBtnP3Press(){
		this.setState({btnP3:0.0,activeBtnP2:true,activeBtnP1:true,activeBtnP4:true})
		this.TextInputP1.focus()
		setTimeout(() => {
			this.setState({
				totalRouge: this.state.btn3+this.state.btn7+this.state.btn11+this.state.btn15
				+this.state.btnV3+this.state.btnV7+this.state.btnV11+this.state.btnP3+this.state.btnP7+this.state.btnP11+
				this.state.btnA3+this.state.btnA7+this.state.btnA11+this.state.btnA15
			})
			
			this.setState({tauxCJ: this.state.totalVert+this.state.totalJaune+this.state.totalGris+this.state.totalRouge})
			this.setState({tauxEv:this.state.tauxCJ*0.9})
		}, 10);
		setTimeout(() => {
			let qcmData={
				item_qcm_category: "prevoir",
				item_qcm_sub_category: "selon_la_visibilite_espace_libre",
				qcm_item: "rarement_applique",
				comment: this.state.commentP1
		
				// time: new Date(),
				// icon: 'dash',
				// color:'yellow',
				// type:'octicon'
			  }
			  AsyncStorage.getItem('qcmDataP').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmDataP',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmDataP').then(
				 
				  AsyncStorage.setItem('qcmDataP',data)
				)
				}
			  }).done()
		}, 30000);

	}
	onBtnP4Press(){
		this.setState({btnP4:0.0,activeBtnP2:true,activeBtnP3:true,activeBtnP1:true})
		this.TextInputP1.focus()
		setTimeout(() => {
			this.setState({
				totalGris: this.state.btn4+this.state.btn8+this.state.btn12+this.state.btn16
				+this.state.btnV4+this.state.btnV8+this.state.btnV12+this.state.btnP4+this.state.btnP8+this.state.btnP12+
				this.state.btnA4+this.state.btnA8+this.state.btnA12+this.state.btnA16
			})
			this.setState({tauxCJ: this.state.totalVert+this.state.totalJaune+this.state.totalGris+this.state.totalRouge})
			this.setState({tauxEv:this.state.tauxCJ*0.9})	
		}, 10);
		setTimeout(() => {
			let qcmData={
				item_qcm_category: "prevoir",
				item_qcm_sub_category: "selon_la_visibilite_espace_libre",
				qcm_item: "non_evalue",
				comment: this.state.commentP1
		
				// time: new Date(),
				// icon: 'dash',
				// color:'yellow',
				// type:'octicon'
			  }
			  AsyncStorage.getItem('qcmDataP').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmDataP',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmDataP').then(
				 
				  AsyncStorage.setItem('qcmDataP',data)
				)
				}
			  }).done()
		}, 30000);

	}
	//
	onBtnP5Press(){
		this.setState({btnP5:13.0,activeBtnP6:true,activeBtnP7:true,activeBtnP8:true})
		this.TextInputP2.focus()
		setTimeout(() => {
			this.setState({
				totalVert: this.state.btn1+this.state.btn5+this.state.btn9+this.state.btn13
				+this.state.btnV1+this.state.btnV5+this.state.btnV9+this.state.btnP1+this.state.btnP5+this.state.btnP9+
				this.state.btnA1+this.state.btnA5+this.state.btnA9+this.state.btnA13
			})
			
			this.setState({tauxCJ: this.state.totalVert+this.state.totalJaune+this.state.totalGris+this.state.totalRouge})
			this.setState({tauxEv:this.state.tauxCJ*0.9})
		}, 10);
		setTimeout(() => {
			let qcmData={
				item_qcm_category: "prevoir",
				item_qcm_sub_category: "les_actions_des_autres_usagers",
				qcm_item: "application_reguliere",
				comment: this.state.commentP2
		
				// time: new Date(),
				// icon: 'dash',
				// color:'yellow',
				// type:'octicon'
			  }
			  AsyncStorage.getItem('qcmDataP').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmDataP',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmDataP').then(
				 
				  AsyncStorage.setItem('qcmDataP',data)
				)
				}
			  }).done()
		}, 30000);

	}
	onBtnP6Press(){
		this.setState({btnP6:6.5,activeBtnP5:true,activeBtnP7:true,activeBtnP8:true})
		this.TextInputP2.focus()
		setTimeout(() => {
			this.setState({
				totalJaune: this.state.btn2+this.state.btn6+this.state.btn10+this.state.btn14
				+this.state.btnV2+this.state.btnV6+this.state.btnV10+this.state.btnP2+this.state.btnP6+this.state.btnP10+
				this.state.btnA2+this.state.btnA6+this.state.btnA10+this.state.btnA14
			})
			
			this.setState({tauxCJ: this.state.totalVert+this.state.totalJaune+this.state.totalGris+this.state.totalRouge})
			this.setState({tauxEv:this.state.tauxCJ*0.9})
		}, 10);
		setTimeout(() => {
			let qcmData={
				item_qcm_category: "prevoir",
				item_qcm_sub_category: "les_actions_des_autres_usagers",
				qcm_item: "application_irreguliere",
				comment: this.state.commentP2
		
				// time: new Date(),
				// icon: 'dash',
				// color:'yellow',
				// type:'octicon'
			  }
			  AsyncStorage.getItem('qcmDataP').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmDataP',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmDataP').then(
				 
				  AsyncStorage.setItem('qcmDataP',data)
				)
				}
			  }).done()
		}, 30000);
		
	}
	onBtnP7Press(){
		this.setState({btnP7:0.0,activeBtnP5:true,activeBtnP6:true,activeBtnP8:true})
		this.TextInputP2.focus()
		setTimeout(() => {
			this.setState({
				totalRouge: this.state.btn3+this.state.btn7+this.state.btn11+this.state.btn15
				+this.state.btnV3+this.state.btnV7+this.state.btnV11+this.state.btnP3+this.state.btnP7+this.state.btnP11+
				this.state.btnA3+this.state.btnA7+this.state.btnA11+this.state.btnA15
			})
			
			this.setState({tauxCJ: this.state.totalVert+this.state.totalJaune+this.state.totalGris+this.state.totalRouge})
			this.setState({tauxEv:this.state.tauxCJ*0.9})
		}, 10);
		setTimeout(() => {
			let qcmData={
				item_qcm_category: "prevoir",
				item_qcm_sub_category: "les_actions_des_autres_usagers",
				qcm_item: "rarement_applique",
				comment: this.state.commentP2
		
				// time: new Date(),
				// icon: 'dash',
				// color:'yellow',
				// type:'octicon'
			  }
			  AsyncStorage.getItem('qcmDataP').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmDataP',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmDataP').then(
				 
				  AsyncStorage.setItem('qcmDataP',data)
				)
				}
			  }).done()
		}, 30000);

	}
	onBtnP8Press(){
		this.setState({btnP8:0.0,activeBtnP5:true,activeBtnP6:true,activeBtnP7:true})
		this.TextInputP2.focus()
		setTimeout(() => {
			this.setState({
				totalGris: this.state.btn4+this.state.btn8+this.state.btn12+this.state.btn16
				+this.state.btnV4+this.state.btnV8+this.state.btnV12+this.state.btnP4+this.state.btnP8+this.state.btnP12+
				this.state.btnA4+this.state.btnA8+this.state.btnA12+this.state.btnA16
			})
			
			this.setState({tauxCJ: this.state.totalVert+this.state.totalJaune+this.state.totalGris+this.state.totalRouge})
			this.setState({tauxEv:this.state.tauxCJ*0.9})
		}, 10);
		setTimeout(() => {
			let qcmData={
				item_qcm_category: "prevoir",
				item_qcm_sub_category: "les_actions_des_autres_usagers",
				qcm_item: "non_evalue",
				comment: this.state.commentP2
		
				// time: new Date(),
				// icon: 'dash',
				// color:'yellow',
				// type:'octicon'
			  }
			  AsyncStorage.getItem('qcmDataP').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmDataP',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmDataP').then(
				 
				  AsyncStorage.setItem('qcmDataP',data)
				)
				}
			  }).done()
		}, 30000);
	}
	//
	onBtnP9Press(){
		this.setState({btnP9:9.0,activeBtnP10:true,activeBtnP11:true,activeBtnP12:true})
		this.TextInputP3.focus()
		setTimeout(() => {
			this.setState({
				totalVert: this.state.btn1+this.state.btn5+this.state.btn9+this.state.btn13
				+this.state.btnV1+this.state.btnV5+this.state.btnV9+this.state.btnP1+this.state.btnP5+this.state.btnP9+
				this.state.btnA1+this.state.btnA5+this.state.btnA9+this.state.btnA13
			})
			
			this.setState({tauxCJ: this.state.totalVert+this.state.totalJaune+this.state.totalGris+this.state.totalRouge})
			this.setState({tauxEv:this.state.tauxCJ*0.9})
		}, 10);
		setTimeout(() => {
			let qcmData={
				item_qcm_category: "prevoir",
				item_qcm_sub_category: "les_conditions_adherence",
				qcm_item: "application_reguliere",
				comment: this.state.commentP3
		
				// time: new Date(),
				// icon: 'dash',
				// color:'yellow',
				// type:'octicon'
			  }
			  AsyncStorage.getItem('qcmDataP').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmDataP',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmDataP').then(
				 
				  AsyncStorage.setItem('qcmDataP',data)
				)
				}
			  }).done()
		}, 30000);

	}
	onBtnP10Press(){
		this.setState({btnP10:4.5,activeBtnP9:true,activeBtnP11:true,activeBtnP12:true})
		this.TextInputP3.focus()
		setTimeout(() => {
			this.setState({
				totalJaune: this.state.btn2+this.state.btn6+this.state.btn10+this.state.btn14
				+this.state.btnV2+this.state.btnV6+this.state.btnV10+this.state.btnP2+this.state.btnP6+this.state.btnP10+
				this.state.btnA2+this.state.btnA6+this.state.btnA10+this.state.btnA14
			})
			
			this.setState({tauxCJ: this.state.totalVert+this.state.totalJaune+this.state.totalGris+this.state.totalRouge})
			this.setState({tauxEv:this.state.tauxCJ*0.9})
		}, 10);
		setTimeout(() => {
			let qcmData={
				item_qcm_category: "prevoir",
				item_qcm_sub_category: "les_conditions_adherence",
				qcm_item: "application_irreguliere",
				comment: this.state.commentP3
		
				// time: new Date(),
				// icon: 'dash',
				// color:'yellow',
				// type:'octicon'
			  }
			  AsyncStorage.getItem('qcmDataP').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmDataP',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmDataP').then(
				 
				  AsyncStorage.setItem('qcmDataP',data)
				)
				}
			  }).done()
		}, 30000);

	}
	onBtnP11Press(){
		this.setState({btnP11:0.0,activeBtnP10:true,activeBtnP9:true,activeBtnP12:true})
		this.TextInputP3.focus()
		setTimeout(() => {
			this.setState({
				totalRouge: this.state.btn3+this.state.btn7+this.state.btn11+this.state.btn15
				+this.state.btnV3+this.state.btnV7+this.state.btnV11+this.state.btnP3+this.state.btnP7+this.state.btnP11+
				this.state.btnA3+this.state.btnA7+this.state.btnA11+this.state.btnA15
			})
			
			this.setState({tauxCJ: this.state.totalVert+this.state.totalJaune+this.state.totalGris+this.state.totalRouge})
			this.setState({tauxEv:this.state.tauxCJ*0.9})
		}, 10);
		setTimeout(() => {
			let qcmData={
				item_qcm_category: "prevoir",
				item_qcm_sub_category: "les_conditions_adherence",
				qcm_item: "rarement_applique",
				comment: this.state.commentP3
		
				// time: new Date(),
				// icon: 'dash',
				// color:'yellow',
				// type:'octicon'
			  }
			  AsyncStorage.getItem('qcmDataP').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmDataP',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmDataP').then(
				 
				  AsyncStorage.setItem('qcmDataP',data)
				)
				}
			  }).done()
		}, 30000);

	}
	onBtnP12Press(){
		this.setState({btnP12:0.0,activeBtnP10:true,activeBtnP11:true,activeBtnP9:true})
		this.TextInputP3.focus()
		setTimeout(() => {
			this.setState({
				totalGris: this.state.btn4+this.state.btn8+this.state.btn12+this.state.btn16
				+this.state.btnV4+this.state.btnV8+this.state.btnV12+this.state.btnP4+this.state.btnP8+this.state.btnP12+
				this.state.btnA4+this.state.btnA8+this.state.btnA12+this.state.btnA16
			})
			
			this.setState({tauxCJ: this.state.totalVert+this.state.totalJaune+this.state.totalGris+this.state.totalRouge})
			this.setState({tauxEv:this.state.tauxCJ*0.9})
		}, 10);
		setTimeout(() => {
			let qcmData={
				item_qcm_category: "prevoir",
				item_qcm_sub_category: "les_conditions_adherence",
				qcm_item: "non_evalue",
				comment: this.state.commentP3
		
				// time: new Date(),
				// icon: 'dash',
				// color:'yellow',
				// type:'octicon'
			  }
			  AsyncStorage.getItem('qcmDataP').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmDataP',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmDataP').then(
				 
				  AsyncStorage.setItem('qcmDataP',data)
				)
				}
			  }).done()
		}, 30000);

	}

	//anticiper
	onBtnA1Press(){
		this.setState({btnA1:5.0,activeBtnA2:true,activeBtnA3:true,activeBtnA4:true})
		this.TextInputA1.focus()
		setTimeout(() => {
			this.setState({
				totalVert: this.state.btn1+this.state.btn5+this.state.btn9+this.state.btn13
				+this.state.btnV1+this.state.btnV5+this.state.btnV9+this.state.btnP1+this.state.btnP5+this.state.btnP9+
				this.state.btnA1+this.state.btnA5+this.state.btnA9+this.state.btnA13
			})
			
			this.setState({tauxCJ: this.state.totalVert+this.state.totalJaune+this.state.totalGris+this.state.totalRouge})
			this.setState({tauxEv:this.state.tauxCJ*0.9})	
		}, 10);
		setTimeout(() => {
			let qcmData={
				item_qcm_category: "anticiper",
				item_qcm_sub_category: "placement_sur_la_chaussee_voir_et_etre_vu_partage_de_espace_echappatoire",
				qcm_item: "application_reguliere",
				comment: this.state.commentA1
		
				// time: new Date(),
				// icon: 'dash',
				// color:'yellow',
				// type:'octicon'
			  }
			  AsyncStorage.getItem('qcmDataP').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmDataP',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmDataP').then(
				 
				  AsyncStorage.setItem('qcmDataP',data)
				)
				}
			  }).done()
		}, 30000);

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
					<Text style={styles.headerTitle}>RENVERSEMENT</Text>
					<Text style={{color:'#00B0F0',fontSize:16,left:-177, textAlign:'right',fontStyle:"italic",top:20}}>Powered by CleanData</Text>
					</View>
					
					<View style={{flexDirection:"column",left:-60 }}>
					{/* <Text style={{color:'#fff',fontSize:20,top:5,left:-30}}>Synthèse</Text> */}
			<Text style={{color:'#fff',fontSize:20,top: 15,left:-30}}>{this.state.student_first_name} {this.state.student_last_name}</Text>
			<Text style={{color:'#00B0F0',fontSize:14,top:17,left:-30}}>{this.state.heureDebut}</Text>
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
					  CHANGEMENT DE STAGIAIRE{"\n"}{"\n"} 
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
                          CHANGEMENT D'OUTIL {"\n"}{"\n"} 
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
// export default connect(mapStateToProps,mapDispatchToProps)(ClotureR)

