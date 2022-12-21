import React from 'react';
import {
View,
StyleSheet,
TouchableOpacity,Text,
Alert,Dimensions,Image ,ScrollView,FlatList,Modal,
RefreshControl,
ActivityIndicator,TextInput, PermissionsAndroid,
Platform,BackHandler,TouchableWithoutFeedback,
} from 'react-native';
import * as Progress from 'react-native-progress';
import SMBClient from 'react-native-smb';
import {
	List,
	Divider,
	Card, 
	Button  
  } from 'react-native-paper' 
//import { Dropdown } from 'react-native-material-dropdown';
import {Actions} from 'react-native-router-flux'
//hide view
import MyHiddenView from './Hidden'
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {Icon} from 'react-native-elements';
import { BarChart, YAxis, XAxis  } from 'react-native-svg-charts'
import { Defs, LinearGradient, Stop  } from 'react-native-svg'

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNewStudent, loginTrainer, logoutStudent, suppressIndex } from '../../actions/auth.actions';
import axios from 'axios'; 
import Mailer from 'react-native-mail';
import SignatureCapture from 'react-native-signature-capture'
import RNHTMLtoPDF from 'react-native-html-to-pdf';

import Video from 'react-native-video';

import MqttNotificationsManager from '../../components/gcamMQTT/sendMessage';	
import MqttReceiveManager from '../../components/gcamMQTT/receiveClipDirectory';
import MqttSendListItem from '../../components/gcamMQTT/sendListItem';
import  MqttTrainingPath from '../../components/gcamMQTT/receiveTrainingPath'

import SSHClient from 'react-native-sshclient';

import { SafeAreaView } from 'react-native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import Spinner from 'react-native-loading-spinner-overlay';
import * as Sentry from '@sentry/react-native';

import RNFS from 'react-native-fs'
import { connect } from 'react-redux';
// //init realtime
MqttNotificationsManager.create(
	'clips_creation',//userID pour canal

	{
	 uri: 'mqtt://10.3.141.1:1883',//url 
	},
 );
MqttReceiveManager.create(
	'clips_location',//userID pour canal

	{
	 uri: 'mqtt://10.3.141.1:1883',//url  
	},
 );
 MqttSendListItem.create(
	'test_list_items',//userID pour canal

	{
	 uri: 'mqtt://10.3.141.1:1883',//url 
	},
 );
 MqttTrainingPath.create(
	'training_video_directory',//userID pour canal

	{
	 uri: 'mqtt://10.3.141.1:1883',//url 
	},
 );
//  const seevideo = require('../../video/event_info.mp4')
function secondsToTime(time) {
	return ~~(time / 60) + ":" + (time % 60 < 10 ? "0" : "") + time % 60;
  }
export default class ClotureFormation extends React.Component {
	constructor(props) {
		super(props);
		
	
		this.state = {
			//id for retrieve data on asyncstorage
			asyncId: this.props.asyncId,
			//videostart
			rate: 1,
			volume: 1,
			muted: false,
			resizeMode: 'contain',
			paused: false,
			progress: 0,
			duration: 0,
			pickerValueHolder: '1.0',
			pausedText: 'Play',
			hideControls: false,
			isloading: true,
			//videoend
			data_item: [],
			error: null,
			refreshing: false,
			viewSection :false,
			filePath: '',
			signD:false,
			signD1:false,
			commentModal:false,
			show:false,
			showC1:false,
			showC2:false,
			showC3:false,
			showC4:false,
			showD5:false,
			selected: null,
			timeline_data:[],
			timeArray:[],
			pdf_base64:null,
			str_data:'',
			str_data_sense:'',
			//prévoir
			tBP:0,
			tMP:0,
			tNP:0,
			cEyeP:0,
			cEarP:0,
			//anticiper
			tBA : 0,
			tMA:0,
			tNA:0,
			cEyeA:0,
			cEarA:0,
			//voir
			tBV : 0,
			tMV:0,
			tNV:0,
			cEyeV:0,
			cEarV:0,
			//preparer
			tBPr:0,
			tMPr:0,
			tNPr:0,
			cEyePr:0,
			cEarPr:0,

			//total
			totalB:0,
			totalM:0,
			totalN:0,
			totalEye:0,
			totalEar:0,

			//t0
			t0:null,

			//infos trainer
			trainer_id:"",
			trainer_first_name:"",
			trainer_last_name:"",
			//infos student
			student_id:"",
			student_first_name:"",
			student_last_name:"",
			student_email:"",
			//commentaire
			comment:"",
			//signature
			sign1:undefined,
			sign2:undefined,
			imgB64:undefined,
			//heure
			heureDebut:"",
			heureFin:"",
			//
			selectedIndex: null,
			isSelected : false,
			timeLine : [],
			limit:0,
			tfinal :0,
			iconName: 'play',
			startVideoTime:null,
			foundItem:null,
			selectedItem:[],
			selectedItems:[],
			itemsInfo:[],
			showSelection:false,
			//for the qcm
			showQCM:false,
			
			//preparer
			btn1:0.0,
			activeBtn1:false,
			btn2:0.0,
			activeBtn2:false,
			btn3:0.0,
			activeBtn3:false,
			btn4:0.0,
			activeBtn4:false,
			comment1:"",

			btn5:0.0,
			activeBtn5:false,
			btn6:0.0,
			activeBtn6:false,
			btn7:0.0,
			activeBtn7:false,
			btn8:0.0,
			activeBtn8:false,
			comment2:"",

			btn9:0.0,
			activeBtn9:false,
			btn10:0.0,
			activeBtn10:false,
			btn11:0.0,
			activeBtn11:false,
			btn12:0.0,
			activeBtn12:false,
			comment3:"",

			btn13:0.0,
			activeBtn13:false,
			btn14:0.0,
			activeBtn14:false,
			btn15:0.0,
			activeBtn15:false,
			btn16:0.0,
			activeBtn16:false,
			comment4:"",

			//voir
			btnV1:0.0,
			activeBtnV1:false,
			btnV2:0.0,
			activeBtnV2:false,
			btnV3:0.0,
			activeBtnV3:false,
			btnV4:0.0,
			activeBtnV4:false,
			commentV1:"",

			btnV5:0.0,
			activeBtnV5:false,
			btnV6:0.0,
			activeBtnV6:false,
			btnV7:0.0,
			activeBtnV7:false,
			btnV8:0.0,
			activeBtnV8:false,
			commentV2:"",

			btnV9:0.0,
			activeBtnV9:false,
			btnV10:0.0,
			activeBtnV10:false,
			btnV11:0.0,
			activeBtnV11:false,
			btnV12:0.0,
			activeBtnV12:false,
			commentV3:"",

			//PREVOIR
			
			btnP1:0.0,
			activeBtnP1:false,
			btnP2:0.0,
			activeBtnP2:false,
			btnP3:0.0,
			activeBtnP3:false,
			btnP4:0.0,
			activeBtnP4:false,
			commentP1:"",

			btnP5:0.0,
			activeBtnP5:false,
			btnP6:0.0,
			activeBtnP6:false,
			btnP7:0.0,
			activeBtnP7:false,
			btnP8:0.0,
			activeBtnP8:false,
			commentP2:"",

			btnP9:0.0,
			activeBtnP9:false,
			btnP10:0.0,
			activeBtnP10:false,
			btnP11:0.0,
			activeBtnP11:false,
			btnP12:0.0,
			activeBtnP12:false,
			commentP3:"",

			//ANTICIPER
			btnA1:0.0,
			activeBtnA1:false,
			btnA2:0.0,
			activeBtnA2:false,
			btnA3:0.0,
			activeBtnA3:false,
			btnA4:0.0,
			activeBtnA4:false,
			commentA1:"",

			btnA5:0.0,
			activeBtnA5:false,
			btnA6:0.0,
			activeBtnA6:false,
			btnA7:0.0,
			activeBtnA7:false,
			btnA8:0.0,
			activeBtnA8:false,
			commentA2:"",

			btnA9:0.0,
			activeBtnA9:false,
			btnA10:0.0,
			activeBtnA10:false,
			btnA11:0.0,
			activeBtnA11:false,
			btnA12:0.0,
			activeBtnA12:false,
			commentA3:"",

			btnA13:0.0,
			activeBtnA13:false,
			btnA14:0.0,
			activeBtnA14:false,
			btnA15:0.0,
			activeBtnA15:false,
			btnA16:0.0,
			activeBtnA16:false,
			commentA4:"",

			//total QCM
			totalVert:0.0,
			totalJaune:0.0,
			totalRouge:0.0,
			totalGris:0.0,
			

			tauxCJ:0.0,
			tauxEv:0.0,
			spinner:false,
			spinner2:false,
			spinnerClip:false,
			video_path:"",
			videoClip:"",

			//progress spinner
			progressL :0,
			indeterminate :true,
			  //gestion erreur
			error:false,
			errorSmb:"",
			errorMqtt:"",
			
			clip_error:false,
			clip_errorSmb:"",
			clip_errorMqtt:"",
			isMessage:false,
			isMessage2:false,

			confirmNextStudent:false,
			confirmNewFormation:false,

			nbreClips:null,
			nbreClipsDownload:0,
			clips_name:"",
			warningQCM:""


			};
			// this.video = Video
			this.getInfo = this.getInfo.bind(this)
			// this.saveData = this.saveData.bind(this)
			this.getInfo()
	}
	goAccueil() {
		Actions.accueilP()
	}
	async currentF(){
	let today=new Date();
	let datetime=+today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear()+' '+today.getHours() + ":" + today.getMinutes()+ ":" + today.getSeconds();
	try {
		await AsyncStorage.setItem("@heurefin",datetime)
	} catch (error) {
		console.log(error)
		Sentry.captureException(error);
	}
	
	}

	animate() {
		let progressL = 0;
		this.setState({ progressL });
		setTimeout(() => {
		  this.setState({ indeterminate: false });
		  setInterval(() => {
			progressL += Math.random() / 5;
			if (progressL > 1) {
			  progressL = 1;
			}
			this.setState({ progressL });
		  }, 12000)
		}, 1000);
	  }
	async componentDidMount(){
		BackHandler.addEventListener('backPress', () => {return true});
		
		console.log(this.props.stage)
		this.currentF()
		this.getTotal()
		// this.animate()
		
		setTimeout(() => {
			this.getData()	
		}, 100); 
		this.create_video_withSubs();
	
		
		setTimeout(() => {
			this.sendMessage()
		}, 5000);
	
		// let training_path =  await AsyncStorage.getItem('training_path')
		// setTimeout(() => {
		// 	console.log(training_path)
		// 	if (training_path != null) {
		// 		this.downloadTrainingVideo(training_path)
		// 	}
		// }, 120000)
		
		
		
	
	}
	// componentWillUnmount(props){
	// 	 console.log(this.props);
	// 	 console.log(props);
	//   try {
	//     if (props.suppressIndex.indexStudent != props.createUser.indexStudent) {
	// 		console.log("yes");
	// 	} else {
	// 		console.log("nooooo");
	// 	}
	//   } catch (error) {
	//     // Error retrieving data
	//     console.log(error.message);
	//   }
	//  }
	async getVideoPathOnTablet(){
		try {
			let str_path = await AsyncStorage.getItem("video_path")
			console.log(str_path);
			let str_file = await AsyncStorage.getItem("filename")
			console.log(str_file);
			this.setState({video_path : str_path})
			this.setState({videoClip: str_file})
		} catch (error) {
		console.log(error);	
		Sentry.captureException(error);
		}
	}

	async getInfo(){
		try {
			let str_stdId = await AsyncStorage.getItem('@gcam_student_id'+this.state.asyncId.toString())
			let str_trId= await AsyncStorage.getItem('@trainer_id')

			let str_std_fname =await AsyncStorage.getItem('@gcam_student_first_name'+this.state.asyncId.toString())
			let str_std_lname= await AsyncStorage.getItem('@gcam_student_last_name'+this.state.asyncId.toString())

			let str_trfname=await AsyncStorage.getItem('@trainer_first_name')
			let str_trlname = await AsyncStorage.getItem('@trainer_last_name')

			// let str_signstd=await AsyncStorage.getItem('@sign1')
			// let str_signtr = await AsyncStorage.getItem('@sign2')

			let str_heure = await AsyncStorage.getItem('@heure')  
            let str_heureF = await AsyncStorage.getItem('@heurefin') 
		

            let str_email = await AsyncStorage.getItem('@gcam_student_email'+this.state.asyncId.toString())  
			//  console.warn(str_heureF);
			console.log(str_std_fname);
			console.log(str_trfname);
			// console.warn(str_email);
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
			Sentry.captureException(error);
		}
	}
	async getTotal(){
		//  let jsonValue = null
		try {
			await AsyncStorage.multiGet(['totalPr','totalV','totalP','totalA']).then(
			(data)=>{
				let str_totalPr=""
				let str_totalV=""
				let str_totalP=""
				let str_totalA=""
				if( data[0][1]!=null){
					str_totalPr = data[0][1].slice(0)
				}
				if (data[1][1] != null) {
					str_totalV = data[1][1].slice(0)
				
				}
				if (data[2][1] != null) {
					str_totalP= data[2][1].slice(0)
				}
				if (data[3][1] != null) {
					str_totalA = data[3][1].slice(0)
				}
				
				let totalP =JSON.parse("["+str_totalP+"]")
				let totalPr =JSON.parse("["+str_totalPr+"]")
				let totalA =JSON.parse("["+str_totalA+"]")
				let totalV =JSON.parse("["+str_totalV+"]")
			
				// console.log(totalP[0].tBP);
				// console.log(4+data[0][1].slice(0));

				this.setState({
				//prévoir
					tBP:totalP[0].tBP,
					tMP:totalP[0].tMP,
					tNP:totalP[0].tNP,
					cEyeP:totalP[0].cEyeP,
					cEarP: totalP[0].cEarP,
					//anticiper
					tBA :totalA[0].tBA,
					tMA:totalA[0].tMA,
					tNA:totalA[0].tNA,
					cEyeA:totalA[0].cEyeA,
					cEarA: totalA[0].cEarA,
					//voir
					tBV : totalV[0].tBV,
					tMV:totalV[0].tMV,
					tNV:totalV[0].tNV,
					cEyeV:totalV[0].cEyeV,
					cEarV: totalV[0].cEarV,
					//preparer
					tBPr:totalPr[0].tBPr,
					tMPr:totalPr[0].tMPr,
					tNPr:totalPr[0].tNPr,
					cEyePr:totalPr[0].cEyePr,
					cEarPr: totalPr[0].cEarPr,
					//total
					totalB:totalP[0].tBP+totalA[0].tBA+ totalV[0].tBV+totalPr[0].tBPr,
					totalN:totalP[0].tNP+totalA[0].tNA+ totalV[0].tNV+totalPr[0].tNPr,
					totalM:totalP[0].tMP+totalA[0].tMA+ totalV[0].tMV+totalPr[0].tMPr,
					totalEye:totalP[0].cEyeP+totalA[0].cEyeA+totalV[0].cEyeV+totalPr[0].cEyePr,
					totalEar:totalP[0].cEarP+totalA[0].cEarA+totalV[0].cEarV+totalPr[0].cEarPr
				})
					
			})
		} catch (error) {
			console.log(error);	
			Sentry.captureException(error);
		}
	}
	


	async getData(){
		try{
			await AsyncStorage.multiGet(['dataFT','time_data','@startVideoTime']).then((data)=>{
				// let data_item_=JSON.parse("["+str_data+"]")
				let str_data =""
				// let str_data_sense =""
				let str_data_time=""
				let str_data_video =""
				if(data[0][1] != null){
				str_data=data[0][1].slice(0)
				
				}
				// if (data[1][1] != null){
				//   str_data_sense=data[1][1].slice(0)
				
				// }
				if (data[1][1] != null){
				str_data_time=data[1][1].slice(0)
				}  
				if(data[2][1] != null){
					str_data_video = data[2][1].slice(0)
				}
				//console.log(str_data_video);
				// console.log(1+ str_data);
				// console.log(2 +str_data_sense);
				
				
				let data_item_=JSON.parse("["+str_data+"]")
				// let data_sense_=JSON.parse("["+str_data_sense+"]")
				let timeline_data=JSON.parse("["+str_data_time+"]")
				console.log(data_item_);
				let video = JSON.parse("["+str_data_video+"]")
				//console.log(video);
				
				this.setState({
				data_item : data_item_,
				timeline_data : timeline_data,
				str_data: str_data,
				startVideoTime: video[0].startTime
				})
			
				
			})
		} catch(e){
			console.log(e);
			Sentry.captureException(e);
			// return null;
		}
	
	} 
	convertTime(time){
		try {
		  
		  let tps = new Date(time)
		  // console.log(tps);
		  let mms = tps.getMilliseconds()/1000
		  // console.log(mms);
		  let seconds = tps.getSeconds()
		  // console.log(seconds);
		  let mintoSec = tps.getMinutes()*60
		  //console.log(mintoSec);
		  let heure = tps.getHours()*3600
		  //console.log(heure);
		
		  let timeToSeconds = mms+seconds+mintoSec+heure
		 // console.log(timeToSeconds);
		  return timeToSeconds;
		} catch (error) {
			Sentry.captureException(error);
		  console.log(error);
		}
		}
	getIndex(index){	
		this.setState({selectedIndex : index})
	
		let startVideoTime = this.state.startVideoTime
		////console.log(startVideoTime)
		var foundItem = this.state.data_item.find((item,id) => id === index);
		let timeToVideo = this.convertTime(foundItem.time)-this.convertTime(startVideoTime)
		if (timeToVideo <= 10) {
			this.player.seek(0)
		}else{
			this.player.seek(timeToVideo - 10)
		}
		
		const isPlaying = !this.state.paused
		const show = !this.state.hideControls
		

  }
  addToList(index){
	this.setState({selectedIndex : index})
	
	let startVideoTime = this.state.startVideoTime
	////console.log(startVideoTime)
	var foundItem = this.state.data_item.find((item,id) => id === index);
	
	let timeToVideo = this.convertTime(foundItem.time)-this.convertTime(startVideoTime)
	let itemInfo = {
		timeToVideo : timeToVideo,
		registered_at : foundItem.registered_at,
		icon : foundItem.icon,
		color: foundItem.color,
		item : foundItem.item,
		item_sub_category : foundItem.item_sub_category,
		item_category : foundItem.item_category
	}	
	AsyncStorage.getItem('create_clips').then((data) => {
		if(data === null){
		  data= JSON.stringify(itemInfo)
		  AsyncStorage.setItem('create_clips',data)
		}else{
		data=data+','+JSON.stringify(itemInfo)
		AsyncStorage.removeItem('create_clips').then(
		 
		  AsyncStorage.setItem('create_clips',data)
		)	
		}
	  }).done()
	

  }
  reconnectMqtt(){
    
    try {
		this.setState({
			error : false,
			errorMqtt:"",
			errorSmb:""
		  })
		if (this.state.isMessage && this.state.video_path === "") {
			MqttTrainingPath.client.connect()
			MqttTrainingPath.client.on('message', (msg)=> {
				if(msg){
				  console.log( msg);
				  let dataM = msg.data
				  this.setState({
					  isMessage : true
				  })
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
								this.smbClient.isFileExist( 'training_videos/'+dataM ,//the path to list files and folders
								  (data) => {//callback
									console.log('isFileExist data (callback): ' + JSON.stringify(data));
									if(data.isExist){
									  this.smbClient.download(
										'training_videos/',//source path of file to download (in SMB server)
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
										  this.setState({video_path : data.destPath})
										  this.setState({videoClip: data.fileName})
										  this.setState({
											error : false,
											errorMqtt:"",
											errorSmb:""
										  })
										//   AsyncStorage.getItem('filename').then((datas) => {
										// 	if(datas === null){
										// 	  datas= data.fileName
										// 	  AsyncStorage.setItem('filename',datas)
										// 	}else{
										// 	  datas=data.fileName
										// 	  AsyncStorage.removeItem('filename').then(
																  
										// 	  AsyncStorage.setItem('filename',datas)
										// 	 )
										// 	} 
										// }).done()
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
						
						}, 3000);
					})
		
					this.smbClient.on(
						'error',
						(data) => {
							Sentry.captureException(JSON.stringify(data));
						  this.setState({
							error:true,
							errorSmb:"vérifiez votre connexion au WiFi"
						  })
							console.log('error in SMBClient (on error): ' + JSON.stringify(data));
							// alert('error in SMBClient (on error): ' + JSON.stringify(data))
						},
					);
				  
				  } catch (error) {
					console.log(error);
					Sentry.captureException(error);
					this.setState({
					  error:true,
					  errorSmb:"vérifiez votre connexion au WiFi"
					  })
						  
				  }
				}else{
					Sentry.captureException("vérifiez votre connexion au WiFi");
				  this.setState({
					error : true,
					errorMqtt:"vérifiez votre connexion au WiFi"
				  })
				}
			})
	
		}else{
			
			MqttTrainingPath.client.connect()
			this.create_video_withSubs()
		}
		MqttTrainingPath.client.on('error', (err)=> {
			console.log('mqtt.event.error', err);
			Sentry.captureException(err);
			this.setState({
			  error : true, 
			  errorMqtt:"vérifiez votre connexion au WiFi"
			})
		   
		  });
		  MqttTrainingPath.client.on('closed', (err)=> {
			console.log('mqtt.event.closed', err);
			Sentry.captureException(err);
			this.setState({
			  error : true,
			  errorMqtt:"vérifiez votre connexion au WiFi"
			})
		   
		  });

    
     
      
    } catch (error) {
		Sentry.captureException(error);
      this.setState({
        error : true,
        errorMqtt:error,
		
      })
      console.log(error);
    }

  
  }
  async reconnectMqtt2(){
	this.setState({clip_error:false,clip_errorMqtt:"",clip_errorSmb:""})
    try {
		let clips = await AsyncStorage.getItem('clips_name')
		if(this.state.isMessage2 && clips === null){
			MqttNotificationsManager.client.connect()
			MqttReceiveManager.client.connect()
			MqttReceiveManager.client.on('message',(message)=> {
				if(message){
					console.log(message.data);
					let data = message.data
					let newdata = data.replace(/'/g,'"')
					// alert(newdata)
					newdata = JSON.parse(newdata)
					this.setState({
						isMessage2 :true
					})
					try {
						this.smbClient = new SMBClient(
							'10.3.141.1',//ip
							'445',//port
							'pimylifeupshare',//sharedFolder
							'pimylifeupshare',//workGroup,
							'pi',//username,
							'raspberry',//password,
							(data) => {//callback - can be null (not setting)
								console.log('new SMBClient data (callback): ' + JSON.stringify(data));
							},
						)
						this.smbClient.connect((data)=> {
									console.log('new SMBClient data (on connect): ' + JSON.stringify(data));
								})
						
					  
						setTimeout(() => {
							this.smbClient.connectionStatus(
								(data) => {//callback
									console.log('connectionStatus data (callback): ' + JSON.stringify(data));
									console.log('connectionStatus is: ' +  data.status); //connect or disconnect
									if (data.status === "connected") {
									  console.log(newdata.number);
										for (let index = 1; index <= parseInt(newdata.number); index++) {
											// const element = array[index];
											
											this.smbClient.isFileExist(
											'clips/'+newdata.path+'/'+newdata.path+'_clip'+index.toString()+'.mp4' ,//the path to list files and folders
											(data) => {//callback
												console.log('isFileExist data (callback): ' + JSON.stringify(data));
												if(data.isExist){
													this.smbClient.download(
														'clips/'+newdata.path+'/',//source path of file to download (in SMB server)
														'/storage/emulated/0/Download',//destination path to save downloaded file (in Android device)
														newdata.path+'_clip'+index.toString()+'.mp4',//the name of file to download
														(data) => {//callback
							
															console.log('download data (callback): ' + JSON.stringify(data));
														}
													);
													this.smbClient.on('downloadProgress',
													(data) => {
															
															if (data.completed === true) {
																this.setState({
																	clip_error:false,
																	clip_errorSmb:"",
																	clip_errorMqtt:""
																})
																try {
															
																	let obj ={
																	name: data.fileName
																	}
																	alert(data.fileName +"a été téléchargé avec succès")
																	console.log(obj);
																	AsyncStorage.getItem('clips_name').then((datas) => {
																	if(datas === null){
																		datas= JSON.stringify(obj)
																		
																		AsyncStorage.setItem('clips_name',datas)
																	}else{
																		//data=data+','+JSON.stringify(objT)
																		datas=datas+','+JSON.stringify(obj)
																		console.log(datas)
																		AsyncStorage.removeItem('clips_name').then(
																							
																		AsyncStorage.setItem('clips_name',datas)
																		
																	)
																	}
																	}
																	).done()
																					
															} catch (error) {
																Sentry.captureException(error);
																this.setState({
																	clip_error:true,
																	clip_errorSmb:"vérifiez votre connexion au WiFi"
																})
																// alert(error)
																console.log(error); 
																}
															}
															console.log('download progress data (on downloadProgress): ' + JSON.stringify(data))
															
														}
													);
	
												}else{
													Sentry.captureException("");
													this.setState({
														clip_error:true,
														clip_errorSmb:"vérifiez votre connexion au WiFi"
													})
													
												}
											}
										)
											
										}
									  
									} else {
										this.setState({
											clip_error:true,
											clip_errorSmb:"vérifiez votre connexion au WiFi"
										  })
										  Sentry.captureException("not connect to smb training path");
									  // alert("not connect to smb")
									}
								}
							)
						   
							
						}, 2000);
						
					   
				
						this.smbClient.on(
							'error',
							(data) => {
								this.setState({
									clip_error:true,
									clip_errorSmb:"vérifiez votre connexion au WiFi"
								  })
							  // alert('error in SMBClient (on error): ' + JSON.stringify(data))
							  Sentry.captureException(JSON.stringify(data));
								console.log('error in SMBClient (on error): ' + JSON.stringify(data));
							},
						);
						
					} catch (error) {
						Sentry.captureException(error);
						this.setState({
							clip_error:true,
							clip_errorSmb:"vérifiez votre connexion au WiFi"
						  })
						console.log(error);
					}
				}else{
					Sentry.captureException("pas de training path");
					this.setState({
						clip_error: true,
						isMessage2:false,
						clip_errorMqtt:"vérifiez votre connexion au WiFi"
						})
				}
			})
	
	
		}else{
			MqttNotificationsManager.client.connect()
			MqttReceiveManager.client.connect()
			this.createClip()
		}
		MqttReceiveManager.client.on('error', (err)=> {
			console.log('mqtt.event.errorrrrrrrrrrrr', err);
			Sentry.captureException(err);
			this.setState({
				clip_error: true,
				clip_errorMqtt:"vérifiez votre connexion au WiFi"
				})
		  });
		MqttReceiveManager.client.on('closed', (err)=> {
			console.log('mqtt.event.closed', err);
			Sentry.captureException(err);
			this.setState({
				clip_error: true,
				clip_errorMqtt:"vérifiez votre connexion au WiFi"
				})
		   
		  });


    	MqttNotificationsManager.client.on('error', (err)=> {
			console.log('mqtt.event.error', err);
			Sentry.captureException(err);
			this.setState({
			clip_error: true,
			clip_errorMqtt:"vérifiez votre connexion au WiFi"
			})
		   
		  });
	MqttNotificationsManager.client.on('closed', (err)=> {
		Sentry.captureException(err);
			console.log('mqtt.event.closed', err);
			this.setState({
				clip_error: true,
				clip_errorMqtt:"vérifiez votre connexion au WiFi"
				})
			})
      
    } catch (error) {
		Sentry.captureException(error);
		this.setState({clip_error:false,clip_errorMqtt:"",clip_errorSmb:""})
      console.log(error);
    }
   
 
  
  }
  create_video_withSubs(){
	try {
			
		SSHClient.setup("pi","10.3.141.1",22);
		SSHClient.usePrivateKey(false);
		SSHClient.setPassword("raspberry");
		SSHClient.connect().then(
			(result)=>{
			SSHClient.execute("python3 create_video_with_subtitles.py").then(
				(result)=>{

					console.log("scriptResponse "+result);
					// alert("scriptResponse "+result)
					
					// setTimeout(() => {
					
					// 	this.getVideoPathOnTablet()
					// }, 120000)
					
				},
				(error)=>{
					console.log(error);
					Sentry.captureException(error);
					this.setState({
						error : true,
						errorMqtt:"vérifiez votre connexion au WiFi"
					  })
				}
				);
			},
			(error)=>{
				Sentry.captureException(error);
				this.setState({
                    error : true,
                    errorMqtt:"vérifiez votre connexion au WiFi"
                  })
			}
		  );
		MqttTrainingPath.client.on('message', (msg)=> {
			if(msg){
			  console.log( msg);
			  let dataM = msg.data
			  this.setState({
				  isMessage : true
			  })
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
							this.smbClient.isFileExist( 'training_videos/'+dataM ,//the path to list files and folders
							  (data) => {//callback
								console.log('isFileExist data (callback): ' + JSON.stringify(data));
								if(data.isExist){
								  this.smbClient.download(
									'training_videos/',//source path of file to download (in SMB server)
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
									  this.setState({video_path : data.destPath})
									  this.setState({videoClip: data.fileName})
									  this.setState({
										error : false,
										errorMqtt:"",
										errorSmb:""
									  })
									//   AsyncStorage.getItem('filename').then((datas) => {
									// 	if(datas === null){
									// 	  datas= data.fileName
									// 	  AsyncStorage.setItem('filename',datas)
									// 	}else{
									// 	  datas=data.fileName
									// 	  AsyncStorage.removeItem('filename').then(
															  
									// 	  AsyncStorage.setItem('filename',datas)
									// 	 )
									// 	} 
									// }).done()
									  }
										// console.warn('download progress data (on downloadProgress): ' + JSON.stringify(data));
										
									},
								);
								}else{
							  // alert('file not exist in server. ' );
							  Sentry.captureException("file not exist in server. ");
								this.setState({
								  error:true,
								  errorSmb:"vérifiez votre connexion au WiFi"
								})
								  console.log('file not exist in server. ' );
							  }
							 },
							);
								  
						  } else {
							Sentry.captureException(error);
							this.setState({
							  error:true,
							  errorSmb:"vérifiez votre connexion au WiFi"
							})
								  
						  }
						},
					  )
					
					}, 3000);
				})
	
				this.smbClient.on(
					'error',
					(data) => {
					  this.setState({
						error:true,
						errorSmb:"vérifiez votre connexion au WiFi"
					  })
					  Sentry.captureException(JSON.stringify(data));
						console.log('error in SMBClient (on error): ' + JSON.stringify(data));
						// alert('error in SMBClient (on error): ' + JSON.stringify(data))
					},
				);
			  
			  } catch (error) {
				console.log(error);
				Sentry.captureException(error);
				this.setState({
				  error:true,
				  errorSmb:"vérifiez votre connexion au WiFi"
				  })
					  
			  }
			}else{
				this.setState({
					isMessage : false
				})
			  this.setState({
				error : true,
				errorMqtt:"vérifiez votre connexion au WiFi"
			  })
			  Sentry.captureException("vérifiez votre connexion au WiFi");
			}
		})
		setTimeout(() => {
         
			if (this.state.error === false && this.state.isMessage === false) {
			
				this.setState({
					error : true, 
					errorMqtt:"vérifiez votre connexion au WiFi"
				})
				Sentry.captureException("no training path after 60s");
			}
			
			
		}, 60000);
		MqttTrainingPath.client.on('error', (err)=> {
			Sentry.captureException(err);
			console.log('mqtt.event.error', err);
			this.setState({
			  error : true, 
			  errorMqtt:"vérifiez votre connexion au WiFi"
			})
		   
		  });
		  MqttTrainingPath.client.on('closed', (err)=> {
			Sentry.captureException(err);
			console.log('mqtt.event.closed', err);
			this.setState({
			  error : true,
			  errorMqtt:"vérifiez votre connexion au WiFi"
			})
		   
		  });

		
	   

	} catch (error) {
		console.log(error)
		Sentry.captureException(error);
		this.setState({
			error : true,
			errorMqtt:"vérifiez votre connexion au WiFi"
		  })
	}
	}
	
	
  pythonClip(){
    try {
        SSHClient.setup("pi","10.3.141.1",22);
        SSHClient.usePrivateKey(false);
        SSHClient.setPassword("raspberry");
        SSHClient.connect().then(
            (result)=>{
                console.log(result)
				
            SSHClient.execute("python3 create_video_clips.py").then(
                (result)=>{
					//  alert(result)
                    console.log(result);
                },
                (error)=>{
					Sentry.captureException(error);
					this.setState({
						clip_error: true,
						clip_errorMqtt:"vérifiez votre connexion au WiFi"
						})
					// alert(error)
                    console.log(error);
                }
                );
            },
            (error)=>{
				Sentry.captureException(error);
				// alert(error)
				this.setState({
					clip_error: true,
					clip_errorMqtt:"vérifiez votre connexion au WiFi"
					})
            }
          );
		  
		MqttReceiveManager.client.on('message',(message)=> {
			if(message){
				console.log(message.data);
				let data = message.data
				let newdata = data.replace(/'/g,'"')
				// alert(newdata)
				newdata = JSON.parse(newdata)
				this.setState({
					isMessage2 :true
				})
				try {
					this.smbClient = new SMBClient(
						'10.3.141.1',//ip
						'445',//port
						'pimylifeupshare',//sharedFolder
						'pimylifeupshare',//workGroup,
						'pi',//username,
						'raspberry',//password,
						(data) => {//callback - can be null (not setting)
							console.log('new SMBClient data (callback): ' + JSON.stringify(data));
						},
					)
					this.smbClient.connect((data)=> {
								console.log('new SMBClient data (on connect): ' + JSON.stringify(data));
							})
					
				  
					setTimeout(() => {
						this.smbClient.connectionStatus(
							(data) => {//callback
								console.log('connectionStatus data (callback): ' + JSON.stringify(data));
								console.log('connectionStatus is: ' +  data.status); //connect or disconnect
								if (data.status === "connected") {
								  console.log(newdata.number);
								  this.setState({nbreClips:parseInt(newdata.number)})
								  for (let index = 1; index <= parseInt(newdata.number); index++) {
									// const element = array[index];
									 
									this.smbClient.isFileExist(
									  'clips/'+newdata.path+'/'+newdata.path+'_clip'+index.toString()+'.mp4' ,//the path to list files and folders
									  (data) => {//callback
										  console.log('isFileExist data (callback): ' + JSON.stringify(data));
										  if(data.isExist){
											  this.smbClient.download(
												'clips/'+newdata.path+'/',//source path of file to download (in SMB server)
												  '/storage/emulated/0/Download',//destination path to save downloaded file (in Android device)
												  newdata.path+'_clip'+index.toString()+'.mp4',//the name of file to download
												  (data) => {//callback
					  
													  console.log('download data (callback): ' + JSON.stringify(data));
												  },
											  );
											  this.smbClient.on(
												  'downloadProgress',
												  (data) => {
													
													if (data.completed === true) {
													
													  try {
														this.setState({
															clip_error:false,
															clip_errorSmb:"",
															clip_errorMqtt:""
														})
														this.setState({nbreClipsDownload: this.state.nbreClipsDownload + 1 })
			
														let obj ={
														  name: data.fileName
														}
														let clips = this.state.clips_name
														if (clips =="") {
															this.setState({
																clips_name :JSON.stringify(obj)
															})
														} else {
															this.setState({
																clips_name :clips+','+JSON.stringify(obj)
															})
														}
														console.log(this.state.clips_name);
														AsyncStorage.getItem('clips_name').then((data) => {
														  if(data === null){
														  data= this.state.clips_name
															AsyncStorage.setItem('clips_name',data)
														  }else{
															data=this.state.clips_name
					  
															AsyncStorage.removeItem('clips_name').then(
															
															AsyncStorage.setItem('clips_name',data)
															)
														  }
														  }).done()
														//console.log(obj);
														
													// 	AsyncStorage.getItem('clips_name').then((datas) => {
													// 	  if(datas === null){
													// 		datas= JSON.stringify(obj)
													// 		console.log(datas)
													// 		AsyncStorage.setItem('clips_name',datas)
													// 	  }else{
													// 		 //data=data+','+JSON.stringify(objT)
													// 		datas=datas+','+JSON.stringify(obj)
													// 		console.log(datas)
													// 		AsyncStorage.removeItem('clips_name').then(
																				
													// 		AsyncStorage.setItem('clips_name',datas)
															
													// 	   )
													// 	  }
													//   }).done()
																			  
													  } catch (error) {
														Sentry.captureException(error);
														this.setState({
																clip_error:true,
																clip_errorSmb:"vérifiez votre connexion au WiFi"
															})
															// alert(error)
															console.log(error); 
														 }
													}
													  console.log('download progress data (on downloadProgress): ' + JSON.stringify(data))
													  
												  },
											  );

										  }else{
											Sentry.captureException('file not exist in server'+' '+'clips/'+newdata.path+'/'+newdata.path+'_clip'+index.toString()+'.mp4');
											this.setState({
												clip_error:true,
												clip_errorSmb:"vérifiez votre connexion au WiFi"
											})
											  console.log('file not exist in server. ' );
										  }
									  },
								  );
									
								  }
								
								
								} else {
									Sentry.captureException("not connect to smb clips");
									this.setState({
										clip_error:true,
										clip_errorSmb:"vérifiez votre connexion au WiFi"
									})
								  // alert("not connect to smb")
								}
							},
						)
						// this.smbClient.connectionStatus(
						// 	(data) => {//callback
						// 		console.log('connectionStatus data (callback): ' + JSON.stringify(data));
						// 		console.log('connectionStatus is: ' +  data.status); //connect or disconnect
						// 		if (data.status === "connected") {
						// 		  console.log(newdata.number);
						// 		  this.setState({nbreClips:parseInt(newdata.number)})
						// 		  console.log(this.state.nbreClips);
						// 			for (let index = 1; index <= parseInt(newdata.number); index++) {
						// 				// const element = array[index];
										
						// 				this.smbClient.isFileExist(
						// 				'clips/'+newdata.path+'/'+newdata.path+'_clip'+index.toString()+'.mp4' ,//the path to list files and folders
						// 				(data) => {//callback
						// 					console.log('isFileExist data (callback): ' + JSON.stringify(data));
						// 					if(data.isExist){
						// 						this.smbClient.download(
						// 							'clips/'+newdata.path+'/',//source path of file to download (in SMB server)
						// 							'/storage/emulated/0/Download',//destination path to save downloaded file (in Android device)
						// 							newdata.path+'_clip'+index.toString()+'.mp4',//the name of file to download
						// 							(data) => {//callback
						
						// 								//console.log('download data (callback): ' + JSON.stringify(data));
						// 							}
						// 						),
						// 						this.smbClient.on('downloadProgress',
						// 						(data) => {
														
						// 								if (data.completed === true) {
															
						// 									try {
						// 										this.setState({
						// 											clip_error:false,
						// 											clip_errorSmb:"",
						// 											clip_errorMqtt:""
						// 										})
														
						// 										let obj ={
						// 										name: data.fileName
						// 										}
						// 										this.setState({nbreClipsDownload: this.state.nbreClipsDownload + 1 })
						// 										console.log(this.state.nbreClipsDownload);
						// 										//console.log(obj);
						// 										AsyncStorage.getItem('clips_name').then((datas) => {
						// 										if(datas === null){
						// 											datas= JSON.stringify(obj)																	
						// 											AsyncStorage.setItem('clips_name',datas)
						// 											// console.log(datas)
						// 										}else{
						// 											//data=data+','+JSON.stringify(objT)
						// 											datas= datas+','+JSON.stringify(obj)
						// 											console.log(datas)
						// 											AsyncStorage.removeItem('clips_name').then(
																						
						// 											AsyncStorage.setItem('clips_name',datas))

																	
						// 										}
															
						// 										}
						// 										).done()
																				
						// 								} catch (error) {
						// 									this.setState({
						// 										clip_error:true,
						// 										clip_errorSmb:"vérifiez votre connexion au WiFi"
						// 									})
						// 									// alert(error)
						// 									console.log(error); 
						// 									}
						// 								}
						// 								//console.log('download progress data (on downloadProgress): ' + JSON.stringify(data))
														
						// 							}
						// 						)

						// 					}else{
						// 						this.setState({
						// 							clip_error:true,
						// 							clip_errorSmb:"vérifiez votre connexion au WiFi"
						// 						})
												
						// 					}
						// 				}
						// 			)
										
						// 			}
								  
						// 		} else {
						// 			this.setState({
						// 				clip_error:true,
						// 				clip_errorSmb:"vérifiez votre connexion au WiFi"
						// 			  })
						// 		  // alert("not connect to smb")
						// 		}
						// 	}
						// )
					   
						
					}, 2000);
					
				   
			
					this.smbClient.on(
						'error',
						(data) => {
							Sentry.captureException(JSON.stringify(data));
							this.setState({
								clip_error:true,
								clip_errorSmb:"vérifiez votre connexion au WiFi"
							  })
						  // alert('error in SMBClient (on error): ' + JSON.stringify(data))
							console.log('error in SMBClient (on error): ' + JSON.stringify(data));
						},
					);
					
				} catch (error) {
					Sentry.captureException(error);
					this.setState({
						clip_error:true,
						clip_errorSmb:"vérifiez votre connexion au WiFi"
					  })
					console.log(error);
				}
			}else{
				Sentry.captureException("not received");
				this.setState({
					clip_error: true,
					isMessage2:false,
					clip_errorMqtt:"vérifiez votre connexion au WiFi"
					})
			}
		})

		setTimeout(() => {
         
			if (this.state.clip_error ===false && this.state.isMessage2 === false) {
			
				this.setState({
					clip_error: true,
					clip_errorMqtt:"vérifiez votre connexion au WiFi"
					})
					Sentry.captureException("clips pas reçus 180s");
			}

		}, 180000);
		MqttReceiveManager.client.on('error', (err)=> {
			console.log('mqtt.event.errorrrrrrrrrrrr', err);
			Sentry.captureException(err);
			this.setState({
				clip_error: true,
				clip_errorMqtt:"vérifiez votre connexion au WiFi"
				})
		  });
		MqttReceiveManager.client.on('closed', (err)=> {
			Sentry.captureException(err);
			console.log('mqtt.event.closed', err);
			this.setState({
				clip_error: true,
				clip_errorMqtt:"vérifiez votre connexion au WiFi"
				})
		   
		  });

		
       

    } catch (error) {
		Sentry.captureException(error);
		this.setState({
			clip_error: true,
			clip_errorMqtt:"vérifiez votre connexion au WiFi"
			})
        console.log(error);
    }
	}

   createClip(){
	this.setState({showSelection:false})
	this.setState({spinnerClip:true})
	try {
		let str_item = JSON.stringify(this.state.itemsInfo)
		Sentry.captureMessage(str_item)
	setTimeout(() => {
		console.log('5');
			MqttNotificationsManager.client.publish(MqttNotificationsManager.conProps.channelToUse,str_item,1, false)
					
			this.setState({spinnerClip:false})
			this.buttonPressC()
			
		}, 5000)
		MqttNotificationsManager.client.on('error', (err)=> {
			console.log('mqtt.event.error', err);
			Sentry.captureException(err);
			this.setState({
			clip_error: true,
			clip_errorMqtt:"vérifiez votre connexion au WiFi5"
			})
		   
		  });
	MqttNotificationsManager.client.on('closed', (err)=> {
		Sentry.captureException(err);
			console.log('mqtt.event.closed', err);
			this.setState({
				clip_error: true,
				clip_errorMqtt:"vérifiez votre connexion au WiFi5"
				})
		   
	});

	   this.pythonClip()
	} catch (error) {
		Sentry.captureException(error);
		this.setState({
			clip_error: true,
			clip_errorMqtt:"vérifiez votre connexion au WiFi5"
			})
		// alert(error)
		console.log(error);
	}
	
	
	
  }

  async sendDataToBDD(){
	let studentEvalue = await AsyncStorage.getItem('gcam_student_evalue')
	console.log(studentEvalue);
	let jsonStudentE = JSON.parse(studentEvalue)
	let data =[]
	for (let index = 0; index < jsonStudentE.length; index++) {
		const el= jsonStudentE[index];
		console.log(el);
		const formation = await AsyncStorage.getItem('gcam_training'+el.toString())
		//console.log(formation);
		data.push(formation)
		
	}
	let json_data = JSON.parse('['+data+']')
	
	console.log(json_data );
	AsyncStorage.getItem('data_formation' ).then( (datas) => {
		if(datas === null){
		datas = JSON.stringify(json_data)
		//console.log(datas);
		
		AsyncStorage.setItem('data_formation',datas)
		}else{
			let datas_j = JSON.parse(datas)
			datas_j = datas_j.concat(json_data)
	
		datas = JSON.stringify(datas_j)
		console.log(datas)
		AsyncStorage.removeItem('data_formation').then(
		 
		AsyncStorage.setItem('data_formation',datas)
		)
		}
		
		// data=data+','+JSON.stringify(obj)
	  
	  }).done();
  }

	async saveData(){
		// this.setState({spinner :true})	
			console.log(this.state.nbreClips);
			console.log(this.state.nbreClipsDownload);
			if (this.state.clips_name !="") {
				if (this.state.nbreClips === this.state.nbreClipsDownload) {
					setTimeout(() => {
						this.setState({showQCM:false,showD5:true,spinner :false})
					}, 2000);
					
				try{
					AsyncStorage.multiGet(['data','data_sense','qcmData','clips_name']).then((data)=>{
						let str_data =""
						let str_data_sense =""
						let str_qcmData =""
						let str_clips = ""
						if(data[0][1] != null){
							str_data=data[0][1].slice(0)
						}
						if (data[1][1] != null){
							str_data_sense=data[1][1].slice(0)
						}
						if (data[2][1] != null){
							str_qcmData=data[2][1].slice(0) 
						}
						if(data[3][1] != null){ 
							str_clips = data[3][1].slice(0) 
						}
						let str_video_name ={
							name: this.state.videoClip
						}
						console.log(str_clips); 
						if (str_clips === "") {
							str_clips = JSON.stringify(str_video_name)
						} else {
							str_clips = str_clips+','+JSON.stringify(str_video_name)
						}
						
						let data_item_=JSON.parse("["+str_data+"]")
						let data_sense_=JSON.parse("["+str_data_sense+"]")
						let data_qcmData=JSON.parse("["+str_qcmData+"]")
						let video_clips = JSON.parse("["+str_clips+"]")
						console.log(video_clips);
						let obj={
	
								id_student: parseInt(this.state.student_id,10),
								start_time:this.state.heureDebut,
								end_time:this.state.heureFin,
								
								data:[
									 
									{
										type_formation: "parcours_routier_clips",
										type: this.props.typeF,
										data:[
												{
													data_item: data_item_,
													data_sense: data_sense_,
													qcmData : data_qcmData,
												}
											],
										video: video_clips
										}
									
								]
						
								
							
						}
						AsyncStorage.getItem('gcam_training'+this.state.asyncId.toString()).then((data) => {
							if(data === null){
							  data= JSON.stringify(obj)
							  
							  AsyncStorage.setItem('gcam_training'+this.state.asyncId.toString(),data)
							}else{
							// data=data+','+JSON.stringify(obj)
							data=JSON.stringify(obj)
								//console.log(data);
							AsyncStorage.removeItem('gcam_training'+this.state.asyncId.toString()).then(
							 
							  AsyncStorage.setItem('gcam_training'+this.state.asyncId.toString(),data)
							)
							}
						  }).done()
		
						
						// const url='https://api.cleandata.link/api/formation/gcam/';
						// axios.post(url, obj).then(response=>{
						// 	console.log(response);
						// })
						
					})
				} catch(e){
					console.log(e);
					Sentry.captureException(e);
					// return null;
				}
					
				}else{
					setTimeout(() => {
						this.saveData()
					}, 15000);
				}
			} else {
				setTimeout(() => {
					this.setState({showQCM:false,showD5:true,spinner :false})
				}, 2000);
				try{
					AsyncStorage.multiGet(['data','data_sense','qcmData','clips_name']).then((data)=>{
						let str_data =""
						let str_data_sense =""
						let str_qcmData =""
						let str_clips = ""
						if(data[0][1] != null){
							str_data=data[0][1].slice(0)
						}
						if (data[1][1] != null){
							str_data_sense=data[1][1].slice(0)
						}
						if (data[2][1] != null){
							str_qcmData=data[2][1].slice(0) 
						}
						if(data[3][1] != null){ 
							str_clips = data[3][1].slice(0) 
						}
						let str_video_name ={
							name: this.state.videoClip
						}
						console.log(str_clips); 
						if (str_clips === "") {
							str_clips = JSON.stringify(str_video_name)
						} else {
							str_clips = str_clips+','+JSON.stringify(str_video_name)
						}
						
						let data_item_=JSON.parse("["+str_data+"]")
						let data_sense_=JSON.parse("["+str_data_sense+"]")
						let data_qcmData=JSON.parse("["+str_qcmData+"]")
						let video_clips = JSON.parse("["+str_clips+"]")
						console.log(video_clips);
						let obj={
	
								id_student: parseInt(this.state.student_id,10),
								start_time:this.state.heureDebut,
								end_time:this.state.heureFin,
								
								data:[
									 
									{
										type_formation: "parcours_routier_clips",
										type: this.props.typeF,
										data:[
												{
													data_item: data_item_,
													data_sense: data_sense_,
													qcmData : data_qcmData,
												}
											],
										video: video_clips
										}
									
								]
						
								
							
						}
						AsyncStorage.getItem('gcam_training'+this.state.asyncId.toString()).then((data) => {
							if(data === null){
							  data= JSON.stringify(obj)
							  
							  AsyncStorage.setItem('gcam_training'+this.state.asyncId.toString(),data)
							}else{
							// data=data+','+JSON.stringify(obj)
							data=JSON.stringify(obj)
								//console.log(data);
							AsyncStorage.removeItem('gcam_training'+this.state.asyncId.toString()).then(
							 
							  AsyncStorage.setItem('gcam_training'+this.state.asyncId.toString(),data)
							)
							}
						  }).done()
		
						
						// const url='https://api.cleandata.link/api/formation/gcam/';
						// axios.post(url, obj).then(response=>{
						// 	console.log(response);
						// })
						
					})
				} catch(e){
					console.log(e);
					Sentry.captureException(e);
					// return null;
				}
			}
			
		
			// }, 30000);
			
		
		
		
	}
	async getItemSelected(){
		try {
			await AsyncStorage.getItem("create_clips")
			.then((data) =>{
				
				let str_item =""
				if(data != null){
					str_item=data
				}
				let selectedItems = JSON.parse("["+str_item+"]")
				const newArrayList = [];
				selectedItems.forEach(obj => {
					if (!newArrayList.some(o => o.timeToVideo === obj.timeToVideo)) {
						newArrayList.push({...obj});
					}
        			});
       			console.log(newArrayList);
     
        this.setState({liste: newArrayList});  
				console.log(selectedItems);
				this.setState({selectedItem:newArrayList,showSelection:true})
			} )
			
			
		} catch (error) {
			Sentry.captureException(error);
			console.log(error)
		}
	}
	onSelectedItemsChange = (selectedItems) => {
		
		try {
	
		var foundItem = this.state.selectedItem.find((item,id) => item.timeToVideo === selectedItems[selectedItems.length-1]);
		//console.log(foundItem);
		// let itemInfo = {
		// 	timeToVideo : timeToVideo,
		// 	registered_at : foundItem.registered_at,
		// 	icon : foundItem.icon,
		// 	color: foundItem.color,
		// 	item : foundItem.item,
		// 	item_sub_category : foundItem.item_sub_category,
		// 	item_category : foundItem.item_category
		// }
		console.log(selectedItems);
		this.setState({ selectedItems });
		var isExist = this.state.itemsInfo.includes(foundItem)
		console.log(isExist);
		if (isExist === false) {
			this.state.itemsInfo.push(foundItem)	
		}else{
			let ind= this.state.itemsInfo.findIndex((it=>it.timeToVideo === foundItem.timeToVideo))+1
			console.log(ind);
			this.state.itemsInfo.splice(ind,ind);
		}
		console.log(this.state.itemsInfo);
		Sentry.captureMessage(this.state.itemsInfo)
		
		} catch (error) {
			console.log(error);
			Sentry.captureException(error);
		}
		
	  };
	renderSelectedItems(){
	
			return(
				<Modal 	
					visible={this.state.showSelection} 
					animationType="slide"
					
					transparent={true}	
				>
					<View style={{
						width:600,
						height:700,
						borderRadius: 10,
					
				
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
					}}>
						
					
					<View style={{flexDirection:"column",marginTop:15}}>
					<View style={{right:-270}} >
					<Icon
					name='close'
					type='material-community'
					color='red'
					size= {40}
					
				
					onPress={() => {this.setState({showSelection:false})}}
				/>
	</View>
				<View style={{marginVertical:150 }}>
					
						<SectionedMultiSelect
							// styles={{margin:10}}
							styles={{
								container:{
									backgroundColor: 'black'
									
								},
								modalWrapper:{
									backgroundColor: 'black',
									width:600,
									// marginTop:100,
									height:500,
									left:100,
									borderColor:'#00B0F0',
									borderWidth:2,
									marginVertical:160
									
								},
								button:{
									width:150,
									height:50,
									marginLeft:200,
									backgroundColor:"black",
									borderColor:'#00B0F0',
									borderWidth:2,
								},
								confirmText:{
									fontSize:20,
								},
								
								cancelButton:{
									width:150,
									height:50,
									
									backgroundColor:"black",
									borderColor:'#00B0F0',
									borderWidth:2,

								},
								backdrop:{
									backgroundColor:"transparent",
								},
								selectToggle:{
									width:500,
									height:70,
									backgroundColor:"black",
									borderColor:'#00B0F0',
									borderWidth:2,
									marginHorizontal:50,
									justifyContent:"center",
            						alignItems: "center",
									alignContent:"center"
								},
							
							  }}
							IconRenderer={Icon}
							items = {this.state.selectedItem}
							uniqueKey="timeToVideo"
							single={false}
							selectText="CHOISIR LES CLIPS"
						
							cancelIconComponent={
								<Text style={{color:'#fff',fontSize:20}}>ANNULER</Text>
								// <Icon
								// 	name='cancel'
								// 	type='material'
								// 	color='red'
								// 	size= {40}
									
								// />
							}
							
							
							selectToggleIconComponent={
								<Icon
									name='keyboard-arrow-down'
									type='material'
									color='white'
								
									
								/>
							}
							selectedIconComponent ={
								<Icon
									name='check'
									type='material'
									color='white'
									// size= {20}
									// style={{left:55}}
									
								/>
							}
							
							colors={{
								selectToggleTextColor:"white",
								itemBackground:"black",
								text:"white",
								chipColor:"white",	
								
							}} 
							hideSearch={true}
						 //showDropDowns={true}
							//readOnlyHeadings={true}
							//selectText ="Choisir les clips..."
							displayKey="item"
							onSelectedItemsChange={this.onSelectedItemsChange}
							selectedItems={this.state.selectedItems}
							confirmText="CONFIRMER"
							onConfirm={()=> this.createClip()}
							selectedIconOnRight={true}
							showCancelButton={true}
							showChips={true}
							itemFontFamily={"normal"}
							confirmFontFamily={"normal"}
						/> 
						</View>
					
					</View>
					</View>
					
				</Modal>
			)
			
		
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
			  AsyncStorage.getItem('qcmData').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmData',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmData').then(
				 
				  AsyncStorage.setItem('qcmData',data)
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
			  AsyncStorage.getItem('qcmData').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmData',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmData').then(
				 
				  AsyncStorage.setItem('qcmData',data)
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
			  AsyncStorage.getItem('qcmData').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmData',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmData').then(
				 
				  AsyncStorage.setItem('qcmData',data)
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
			  AsyncStorage.getItem('qcmData').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmData',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmData').then(
				 
				  AsyncStorage.setItem('qcmData',data)
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
			  AsyncStorage.getItem('qcmData').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmData',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmData').then(
				 
				  AsyncStorage.setItem('qcmData',data)
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
			  AsyncStorage.getItem('qcmData').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmData',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmData').then(
				 
				  AsyncStorage.setItem('qcmData',data)
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
			  AsyncStorage.getItem('qcmData').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmData',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmData').then(
				 
				  AsyncStorage.setItem('qcmData',data)
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
			  AsyncStorage.getItem('qcmData').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmData',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmData').then(
				 
				  AsyncStorage.setItem('qcmData',data)
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
			  AsyncStorage.getItem('qcmData').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmData',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmData').then(
				 
				  AsyncStorage.setItem('qcmData',data)
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
			  AsyncStorage.getItem('qcmData').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmData',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmData').then(
				 
				  AsyncStorage.setItem('qcmData',data)
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
			  AsyncStorage.getItem('qcmData').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmData',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmData').then(
				 
				  AsyncStorage.setItem('qcmData',data)
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
			  AsyncStorage.getItem('qcmData').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmData',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmData').then(
				 
				  AsyncStorage.setItem('qcmData',data)
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
			  AsyncStorage.getItem('qcmData').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmData',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmData').then(
				 
				  AsyncStorage.setItem('qcmData',data)
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
			  AsyncStorage.getItem('qcmData').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmData',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmData').then(
				 
				  AsyncStorage.setItem('qcmData',data)
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
			  AsyncStorage.getItem('qcmData').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmData',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmData').then(
				 
				  AsyncStorage.setItem('qcmData',data)
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
			  AsyncStorage.getItem('qcmData').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmData',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmData').then(
				 
				  AsyncStorage.setItem('qcmData',data)
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
			  AsyncStorage.getItem('qcmData').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmData',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmData').then(
				 
				  AsyncStorage.setItem('qcmData',data)
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
			  AsyncStorage.getItem('qcmData').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmData',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmData').then(
				 
				  AsyncStorage.setItem('qcmData',data)
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
			  AsyncStorage.getItem('qcmData').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmData',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmData').then(
				 
				  AsyncStorage.setItem('qcmData',data)
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
			  AsyncStorage.getItem('qcmData').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmData',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmData').then(
				 
				  AsyncStorage.setItem('qcmData',data)
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
			  AsyncStorage.getItem('qcmData').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmData',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmData').then(
				 
				  AsyncStorage.setItem('qcmData',data)
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
			  AsyncStorage.getItem('qcmData').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmData',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmData').then(
				 
				  AsyncStorage.setItem('qcmData',data)
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
			  AsyncStorage.getItem('qcmData').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmData',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmData').then(
				 
				  AsyncStorage.setItem('qcmData',data)
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
			  AsyncStorage.getItem('qcmData').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmData',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmData').then(
				 
				  AsyncStorage.setItem('qcmData',data)
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
			  AsyncStorage.getItem('qcmData').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmData',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmData').then(
				 
				  AsyncStorage.setItem('qcmData',data)
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
			  AsyncStorage.getItem('qcmData').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmData',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmData').then(
				 
				  AsyncStorage.setItem('qcmData',data)
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
			  AsyncStorage.getItem('qcmData').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmData',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmData').then(
				 
				  AsyncStorage.setItem('qcmData',data)
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
			  AsyncStorage.getItem('qcmData').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmData',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmData').then(
				 
				  AsyncStorage.setItem('qcmData',data)
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
			  AsyncStorage.getItem('qcmData').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmData',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmData').then(
				 
				  AsyncStorage.setItem('qcmData',data)
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
			  AsyncStorage.getItem('qcmData').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmData',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmData').then(
				 
				  AsyncStorage.setItem('qcmData',data)
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
			  AsyncStorage.getItem('qcmData').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmData',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmData').then(
				 
				  AsyncStorage.setItem('qcmData',data)
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
			  AsyncStorage.getItem('qcmData').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmData',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmData').then(
				 
				  AsyncStorage.setItem('qcmData',data)
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
			  AsyncStorage.getItem('qcmData').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmData',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmData').then(
				 
				  AsyncStorage.setItem('qcmData',data)
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
			  AsyncStorage.getItem('qcmData').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmData',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmData').then(
				 
				  AsyncStorage.setItem('qcmData',data)
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
			  AsyncStorage.getItem('qcmData').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmData',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmData').then(
				 
				  AsyncStorage.setItem('qcmData',data)
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
			  AsyncStorage.getItem('qcmData').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmData',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmData').then(
				 
				  AsyncStorage.setItem('qcmData',data)
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
			  AsyncStorage.getItem('qcmData').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmData',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmData').then(
				 
				  AsyncStorage.setItem('qcmData',data)
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
			  AsyncStorage.getItem('qcmData').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmData',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmData').then(
				 
				  AsyncStorage.setItem('qcmData',data)
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
			  AsyncStorage.getItem('qcmData').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmData',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmData').then(
				 
				  AsyncStorage.setItem('qcmData',data)
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
			  AsyncStorage.getItem('qcmData').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmData',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmData').then(
				 
				  AsyncStorage.setItem('qcmData',data)
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
			  AsyncStorage.getItem('qcmData').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmData',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmData').then(
				 
				  AsyncStorage.setItem('qcmData',data)
				)
				}
			  }).done()
		}, 30000);

	}
	onBtnA2Press(){
		this.setState({btnA2:2.5,activeBtnA1:true,activeBtnA3:true,activeBtnA4:true})
		this.TextInputA1.focus()
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
				item_qcm_category: "anticiper",
				item_qcm_sub_category: "placement_sur_la_chaussee_voir_et_etre_vu_partage_de_espace_echappatoire",
				qcm_item: "application_irreguliere",
				comment: this.state.commentA1
		
				// time: new Date(),
				// icon: 'dash',
				// color:'yellow',
				// type:'octicon'
			  }
			  AsyncStorage.getItem('qcmData').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmData',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmData').then(
				 
				  AsyncStorage.setItem('qcmData',data)
				)
				}
			  }).done()
		}, 30000);

	}
	onBtnA3Press(){
		this.setState({btnA3:0.0,activeBtnA2:true,activeBtnA1:true,activeBtnA4:true})
		this.TextInputA1.focus()
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
				item_qcm_category: "anticiper",
				item_qcm_sub_category: "placement_sur_la_chaussee_voir_et_etre_vu_partage_de_espace_echappatoire",
				qcm_item: "rarement_applique",
				comment: this.state.commentA1
		
				// time: new Date(),
				// icon: 'dash',
				// color:'yellow',
				// type:'octicon'
			  }
			  AsyncStorage.getItem('qcmData').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmData',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmData').then(
				 
				  AsyncStorage.setItem('qcmData',data)
				)
				}
			  }).done()
		}, 10000);

	}
	onBtnA4Press(){
		this.setState({btnA4:0.0,activeBtnA2:true,activeBtnA3:true,activeBtnA1:true})
		this.TextInputA1.focus()
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
				item_qcm_category: "anticiper",
				item_qcm_sub_category: "placement_sur_la_chaussee_voir_et_etre_vu_partage_de_espace_echappatoire",
				qcm_item: "non_evalue",
				comment: this.state.commentA1
		
				// time: new Date(),
				// icon: 'dash',
				// color:'yellow',
				// type:'octicon'
			  }
			  AsyncStorage.getItem('qcmData').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmData',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmData').then(
				 
				  AsyncStorage.setItem('qcmData',data)
				)
				}
			  }).done()
		}, 30000);
		
	}
	//
	onBtnA5Press(){
		this.setState({btnA5:5.0,activeBtnA6:true,activeBtnA7:true,activeBtnA8:true})
		this.TextInputA2.focus()
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
				item_qcm_sub_category: "ajuster_la_vitesse_conditions_de_circulation_distances_de_securite_pied_frein",
				qcm_item: "application_reguliere",
				comment: this.state.commentA2
		
				// time: new Date(),
				// icon: 'dash',
				// color:'yellow',
				// type:'octicon'
			  }
			  AsyncStorage.getItem('qcmData').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmData',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmData').then(
				 
				  AsyncStorage.setItem('qcmData',data)
				)
				}
			  }).done()
		}, 30000);

	}
	onBtnA6Press(){
		this.setState({btnA6:2.5,activeBtnA5:true,activeBtnA7:true,activeBtnA8:true})
		this.TextInputA2.focus()
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
				item_qcm_category: "anticiper",
				item_qcm_sub_category: "ajuster_la_vitesse_conditions_de_circulation_distances_de_securite_pied_frein",
				qcm_item: "application_irreguliere",
				comment: this.state.commentA2
		
				// time: new Date(),
				// icon: 'dash',
				// color:'yellow',
				// type:'octicon'
			  }
			  AsyncStorage.getItem('qcmData').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmData',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmData').then(
				 
				  AsyncStorage.setItem('qcmData',data)
				)
				}
			  }).done()
		}, 30000);
	}
	onBtnA7Press(){
		this.setState({btnA7:0.0,activeBtnA5:true,activeBtnA6:true,activeBtnA8:true})
		this.TextInputA2.focus()
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
				item_qcm_category: "anticiper",
				item_qcm_sub_category: "ajuster_la_vitesse_conditions_de_circulation_distances_de_securite_pied_frein",
				qcm_item: "rarement_applique",
				comment: this.state.commentA2
		
				// time: new Date(),
				// icon: 'dash',
				// color:'yellow',
				// type:'octicon'
			  }
			  AsyncStorage.getItem('qcmData').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmData',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmData').then(
				 
				  AsyncStorage.setItem('qcmData',data)
				)
				}
			  }).done()
		}, 30000);

	}
	onBtnA8Press(){
		this.setState({btnA8:0.0,activeBtnA5:true,activeBtnA6:true,activeBtnA7:true})
		this.TextInputA2.focus()
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
				item_qcm_category: "anticiper",
				item_qcm_sub_category: "ajuster_la_vitesse_conditions_de_circulation_distances_de_securite_pied_frein",
				qcm_item: "non_evalue",
				comment: this.state.commentA2
		
				// time: new Date(),
				// icon: 'dash',
				// color:'yellow',
				// type:'octicon'
			  }
			  AsyncStorage.getItem('qcmData').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmData',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmData').then(
				 
				  AsyncStorage.setItem('qcmData',data)
				)
				}
			  }).done()
		}, 30000);

	}
	//
	onBtnA9Press(){
		this.setState({btnA9:5.0,activeBtnA10:true,activeBtnA11:true,activeBtnA12:true})
		this.TextInputA3.focus()
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
				item_qcm_sub_category: "communiquer_signaler_indiquer_annoncer",
				qcm_item: "application_reguliere",
				comment: this.state.commentA3
		
				// time: new Date(),
				// icon: 'dash',
				// color:'yellow',
				// type:'octicon'
			  }
			  AsyncStorage.getItem('qcmData').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmData',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmData').then(
				 
				  AsyncStorage.setItem('qcmData',data)
				)
				}
			  }).done()
		}, 30000);

	}
	onBtnA10Press(){
		this.setState({btnA10:2.5,activeBtnA9:true,activeBtnA11:true,activeBtnA12:true})
		this.TextInputA3.focus()
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
				item_qcm_category: "anticiper",
				item_qcm_sub_category: "communiquer_signaler_indiquer_annoncer",
				qcm_item: "application_irreguliere",
				comment: this.state.commentA3
		
				// time: new Date(),
				// icon: 'dash',
				// color:'yellow',
				// type:'octicon'
			  }
			  AsyncStorage.getItem('qcmData').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmData',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmData').then(
				 
				  AsyncStorage.setItem('qcmData',data)
				)
				}
			  }).done()
		}, 30000);

	}
	onBtnA11Press(){
		this.setState({btnA11:0.0,activeBtnA10:true,activeBtnA9:true,activeBtnA12:true})
		this.TextInputA3.focus()
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
				item_qcm_category: "anticiper",
				item_qcm_sub_category: "communiquer_signaler_indiquer_annoncer",
				qcm_item: "rarement_applique",
				comment: this.state.commentA3
		
				// time: new Date(),
				// icon: 'dash',
				// color:'yellow',
				// type:'octicon'
			  }
			  AsyncStorage.getItem('qcmData').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmData',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmData').then(
				 
				  AsyncStorage.setItem('qcmData',data)
				)
				}
			  }).done()
		}, 30000);

	}
	onBtnA12Press(){
		this.setState({btnA12:0.0,activeBtnA10:true,activeBtnA11:true,activeBtnA9:true})
		this.TextInputA3.focus()
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
				item_qcm_category: "anticiper",
				item_qcm_sub_category: "communiquer_signaler_indiquer_annoncer",
				qcm_item: "non_evalue",
				comment: this.state.commentA3
		
				// time: new Date(),
				// icon: 'dash',
				// color:'yellow',
				// type:'octicon'
			  }
			  AsyncStorage.getItem('qcmData').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmData',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmData').then(
				 
				  AsyncStorage.setItem('qcmData',data)
				)
				}
			  }).done()
		}, 30000);

	}
	//
	onBtnA13Press(){
		this.setState({btnA13:5.0,activeBtnA14:true,activeBtnA15:true,activeBtnA16:true})
		this.TextInputA4.focus()
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
				item_qcm_sub_category: "reglementation_tolerance_courtoisie",
				qcm_item: "application_reguliere",
				comment: this.state.commentA4
		
				// time: new Date(),
				// icon: 'dash',
				// color:'yellow',
				// type:'octicon'
			  }
			  AsyncStorage.getItem('qcmData').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmData',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmData').then(
				 
				  AsyncStorage.setItem('qcmData',data)
				)
				}
			  }).done()
		}, 30000);

	}
	onBtnA14Press(){
		this.setState({btnA14:2.5,activeBtnA13:true,activeBtnA15:true,activeBtnA16:true})
		this.TextInputA4.focus()
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
				item_qcm_category: "anticiper",
				item_qcm_sub_category: "reglementation_tolerance_courtoisie",
				qcm_item: "application_irreguliere",
				comment: this.state.commentA4
		
				// time: new Date(),
				// icon: 'dash',
				// color:'yellow',
				// type:'octicon'
			  }
			  AsyncStorage.getItem('qcmData').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmData',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmData').then(
				 
				  AsyncStorage.setItem('qcmData',data)
				)
				}
			  }).done()
		}, 30000);
	
	}
	onBtnA15Press(){
		this.setState({btnA15:0.0,activeBtnA14:true,activeBtnA13:true,activeBtnA16:true})
		this.TextInputA4.focus()
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
				item_qcm_category: "anticiper",
				item_qcm_sub_category: "reglementation_tolerance_courtoisie",
				qcm_item: "rarement_applique",
				comment: this.state.commentA4
		
				// time: new Date(),
				// icon: 'dash',
				// color:'yellow',
				// type:'octicon'
			  }
			  AsyncStorage.getItem('qcmData').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmData',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmData').then(
				 
				  AsyncStorage.setItem('qcmData',data)
				)
				}
			  }).done()
		}, 30000);

	}
	onBtnA16Press(){
		this.setState({btnA16:0.0,activeBtnA14:true,activeBtnA15:true,activeBtnA13:true})
		setTimeout(() => {
			this.setState({
				totalGris: this.state.btn4+this.state.btn8+this.state.btn12+this.state.btn16
				+this.state.btnV4+this.state.btnV8+this.state.btnV12+this.state.btnP4+this.state.btnP8+this.state.btnP12+
				this.state.btnA4+this.state.btnA8+this.state.btnA12+this.state.btnA16
			})
			this.TextInputA4.focus()
			this.setState({tauxCJ: this.state.totalVert+this.state.totalJaune+this.state.totalGris+this.state.totalRouge})
			this.setState({tauxEv:this.state.tauxCJ*0.9})
		}, 10);
		setTimeout(() => {
			let qcmData={
				item_qcm_category: "anticiper",
				item_qcm_sub_category: "reglementation_tolerance_courtoisie",
				qcm_item: "non_evalue",
				comment: this.state.commentA4
		
				// time: new Date(),
				// icon: 'dash',
				// color:'yellow',
				// type:'octicon'
			  }
			  AsyncStorage.getItem('qcmData').then((data) => {
				if(data === null){
				  data= JSON.stringify(qcmData)
				  AsyncStorage.setItem('qcmData',data)
				}else{
				data=data+','+JSON.stringify(qcmData)
				AsyncStorage.removeItem('qcmData').then(
				 
				  AsyncStorage.setItem('qcmData',data)
				)
				}
			  }).done()
		}, 30000);

	}

	renderQCMComponent(){
		return(
			<Modal 	
			visible={this.state.showQCM} 
			animationType="slide"
			style={{backgroundColor:'white'}}
			transparent={true}	
			onRequestClose={()=>{this.setState({showQCM:false})}}
			>
			
			<SafeAreaView style={{flex:1,backgroundColor:'white',top:300}}>
			<TouchableOpacity style={{left:740,width:50,height:50}}>
					<Icon
						name='close'
						type='material-community'
						color='red'
						size= {40}
						onPress={() => {this.setState({showQCM:false})}}
					/>
					</TouchableOpacity>
				<View style={{justifyContent:"center",alignItems:"center",margin:20}}>
	
					<Text style={{fontSize:24,textDecorationLine:'underline'}}>REFERENTIEL CONDUIRE JUSTE (risque routier)</Text>
				</View>
				<KeyboardAwareScrollView extraScrollHeight={40} >
				<ScrollView
					style={{height: '100%',width: '100%'}}
					nestedScrollEnabled={true}
					contentContainerStyle={{height: '110%',
					width: '100%',
					backgroundColor: 'white',
					padding: 20}}
				>
					
				<View style={{flexDirection:"column",padding:5}}>
					<Card style={styles.car}>
						<Text style={{fontSize:30,margin:30,color:'#fff'}}>PRÉPARER</Text>
						<View style={{flexDirection:"column"}}>
							<View style={{flexDirection:"row",borderWidth:2,borderColor:"lightgrey",backgroundColor:"white"
							,marginBottom:20,height:150}}>
							<View style={{alignContent:"center",alignItems:"center",margin:17,justifyContent:"center"}}>
								<Text style={{fontSize:17}}>Contrôler {'\n'}/ utiliser {'\n'}le véhicule</Text>
							</View>
							
								<TouchableOpacity
									disabled={this.state.activeBtn1}
									onPress={()=>{this.onBtn1Press()}}
									style={{width:120,height:80, borderRadius:15,
									backgroundColor:(this.state.activeBtn1)?"#b7ebbb":'#7FA57F',
									marginRight:20,marginLeft:60,alignContent:"center",alignItems:"center",justifyContent:"center",marginTop:35}}
									// labelStyle={{color:'black',fontSize:10}}
									>
									<Text style={{fontSize:15,alignContent:"center",alignItems:"center",color:'black',left:2}}>APPLICATION {'\n'}RÉGULIÈRE</Text>
								
								</TouchableOpacity>
								<TouchableOpacity
									disabled={this.state.activeBtn2}
									onPress={()=>{this.onBtn2Press()}}
									style={{width:120,height:80, borderRadius:15,
										backgroundColor:(this.state.activeBtn2)?"#f4e992":'#FFFF00',
									marginRight:20,alignContent:"center",alignItems:"center",justifyContent:"center",marginTop:35}}
									// labelStyle={{color:'black',fontSize:10}}
									>
									<Text style={{fontSize:15,alignContent:"center",alignItems:"center",color:'black',left:2}}>APPLICATION {'\n'}IRRÉGULIÈRE</Text>
								
								</TouchableOpacity>
								<TouchableOpacity
									disabled={this.state.activeBtn3}
									onPress={()=>{this.onBtn3Press()}}
									style={{width:120,height:80, borderRadius:15,
										backgroundColor:(this.state.activeBtn3)?'#f8cbc8':'red',
										marginRight:20,alignContent:"center",alignItems:"center",justifyContent:"center",marginTop:35}}
									// labelStyle={{color:'black',fontSize:10}}
									>
									<Text style={{fontSize:15,alignContent:"center",alignItems:"center",color:'black',left:-6}}>RAREMENT {'\n'}APPLIQUÉ</Text>
								
								</TouchableOpacity>
								<TouchableOpacity
									disabled={this.state.activeBtn4}
									onPress={()=>{this.onBtn4Press()}}
									style={{width:120,height:80, borderRadius:15,
										backgroundColor:(this.state.activeBtn4)?'#edf0ed':'lightgrey',
									marginRight:20,alignContent:"center",alignItems:"center",justifyContent:"center",marginTop:35}}
									// labelStyle={{color:'black',fontSize:10}}
									>
									<Text style={{fontSize:15,alignContent:"center",alignItems:"center",color:'black',left:-22}}>NON {'\n'}EVALUÉ</Text>
								
								</TouchableOpacity>
	
							</View>
							<TextInput
									style={{
										color: 'white',
										}}
									underlineColorAndroid = "transparent"
									placeholder = "Rédiger un commentaire"
									placeholderTextColor = "#fff"
									multiline={true}
									autoCapitalize = "none"
									onChangeText={(comment1) => this.setState({comment1})}
									value={this.state.comment1}
									ref={(input) => { this.TextInput = input; }}
									// style={{  margin: 15,
									// 	height: 300,
									// 	width : 500,
									// 	borderColor: '#000000',
									// 	borderWidth: 1}}
								/>
							<View style={{flexDirection:"row",borderWidth:2,borderColor:"lightgrey",backgroundColor:"white",marginBottom:20,height:150}}>
							<View style={{alignContent:"center",alignItems:"center",margin:17,justifyContent:"center"}}>
								<Text style={{fontSize:17}}>Passagers {'\n'}/ chargement</Text>
							</View>
							
								<TouchableOpacity
									disabled={this.state.activeBtn5}
									onPress={()=>{this.onBtn5Press()}}
									style={{width:120,height:80, borderRadius:15,
									backgroundColor:(this.state.activeBtn5)?"#b7ebbb":'#7FA57F',
									marginRight:20,marginLeft:35,alignContent:"center",alignItems:"center",justifyContent:"center",marginTop:35}}
									// labelStyle={{color:'black',fontSize:10}}
									>
									<Text style={{fontSize:15,alignContent:"center",color:'black',left:2}}>APPLICATION {'\n'}REGULIÈRE</Text>
								
								</TouchableOpacity>
								<TouchableOpacity
									disabled={this.state.activeBtn6}
									onPress={()=>{this.onBtn6Press()}}
									style={{width:120,height:80, borderRadius:15,
									backgroundColor:(this.state.activeBtn6)?"#f4e992":'#FFFF00',
									marginRight:20,alignContent:"center",alignItems:"center",justifyContent:"center",marginTop:35}}
									
									>
									<Text style={{fontSize:15,alignContent:"center",color:'black',left:2}}>APPLICATION {'\n'}IRRÉGULIÈRE</Text>
								
								</TouchableOpacity>
								<TouchableOpacity
									disabled={this.state.activeBtn7}
									onPress={()=>{this.onBtn7Press()}}
									style={{width:120,height:80, borderRadius:15,
									backgroundColor:(this.state.activeBtn7)?'#f8cbc8':'red',
									marginRight:20,alignContent:"center",alignItems:"center",justifyContent:"center",marginTop:35}}
									// labelStyle={{color:'black',fontSize:10}}
									>
									<Text style={{fontSize:15,alignContent:"center",color:'black',left:-6}}>RAREMENT {'\n'}APPLIQUÉ</Text>
								
								</TouchableOpacity>
								<TouchableOpacity
									disabled={this.state.activeBtn8}
									onPress={()=>{this.onBtn8Press()}}
									style={{width:120,height:80, borderRadius:15,
									backgroundColor:(this.state.activeBtn8)?'#edf0ed':'lightgrey',
									marginRight:20,alignContent:"center",alignItems:"center",justifyContent:"center",marginTop:35}}
									// labelStyle={{color:'black',fontSize:10}}
									>
									<Text style={{fontSize:15,alignContent:"center",color:'black',left:-22}}>NON {'\n'}EVALUÉ</Text>
								
								</TouchableOpacity>
							</View>
							<TextInput
									style={{
										color: 'white',
										}}
									underlineColorAndroid = "transparent"
									placeholder = "Rédiger un commentaire"
									placeholderTextColor = "#fff"
									multiline={true}
									autoCapitalize = "none"
									onChangeText={(comment2) => this.setState({comment2})}
									value={this.state.comment2}
									ref={(input) => { this.TextInput1 = input; }}
									// style={{  margin: 15,
									// 	height: 300,
									// 	width : 500,
									// 	borderColor: '#000000',
									// 	borderWidth: 1}}
								/>
							<View style={{flexDirection:"row",borderWidth:2,borderColor:"lightgrey",backgroundColor:"white",marginBottom:20,height:150}}>
							<View style={{alignContent:"center",alignItems:"center",margin:15,justifyContent:"center"}}>
								<Text style={{fontSize:17}}>Itinéraire {'\n'}/état physique </Text>
							</View>
							
								<TouchableOpacity
									disabled={this.state.activeBtn9}
									onPress={()=>{this.onBtn9Press()}}
									style={{width:120,height:80, borderRadius:15,
										backgroundColor:(this.state.activeBtn9)?"#b7ebbb":'#7FA57F',
									marginRight:20,marginLeft:25,alignContent:"center",alignItems:"center",justifyContent:"center",marginTop:35}}
									// labelStyle={{color:'black',fontSize:10}}
									>
									<Text style={{fontSize:15,alignContent:"center",color:'black',left:2}}>APPLICATION {'\n'}RÉGULIÈRE</Text>
								
								</TouchableOpacity>
								<TouchableOpacity
									disabled={this.state.activeBtn10}
									onPress={()=>{this.onBtn10Press()}}
									style={{width:120,height:80, borderRadius:15,
									backgroundColor:(this.state.activeBtn10)?"#f4e992":'#FFFF00',
									marginRight:20,alignContent:"center",alignItems:"center",justifyContent:"center",marginTop:35}}
									// labelStyle={{color:'black',fontSize:10}}
									>
									<Text style={{fontSize:15,alignContent:"center",color:'black',left:2}}>APPLICATION {'\n'}IRRÉGULIÈRE</Text>
								
								</TouchableOpacity>
								<TouchableOpacity
									disabled={this.state.activeBtn11}
									onPress={()=>{this.onBtn11Press()}}
									style={{width:120,height:80, borderRadius:15,
									backgroundColor:(this.state.activeBtn11)?'#f8cbc8':'red',
									marginRight:20,alignContent:"center",alignItems:"center",justifyContent:"center",marginTop:35}}
									// labelStyle={{color:'black',fontSize:10}}
									>
									<Text style={{fontSize:15,alignContent:"center",color:'black',left:-6}}>RAREMENT {'\n'}APPLIQUÉ</Text>
								
								</TouchableOpacity>
								<TouchableOpacity
									disabled={this.state.activeBtn12}
									onPress={()=>{this.onBtn12Press()}}
									style={{width:120,height:80, borderRadius:15,
									backgroundColor:(this.state.activeBtn12)?'#edf0ed':'lightgrey',
									marginRight:20,alignContent:"center",alignItems:"center",justifyContent:"center",marginTop:35}}
									// labelStyle={{color:'black',fontSize:10}}
									>
									<Text style={{fontSize:15,alignContent:"center",color:'black',left:-22}}>NON {'\n'}EVALUÉ</Text>
								
								</TouchableOpacity>
							</View>
							<TextInput
									style={{
										color: 'white',
										}}
									underlineColorAndroid = "transparent"
									placeholder = "Rédiger un commentaire"
									placeholderTextColor = "#fff"
									multiline={true}
									autoCapitalize = "none"
									onChangeText={(comment3) => this.setState({comment3})}
									value={this.state.comment3}
									ref={(input) => { this.TextInput2 = input; }}
									// style={{  margin: 15,
									// 	height: 300,
									// 	width : 500,
									// 	borderColor: '#000000',
									// 	borderWidth: 1}}
								/>
							<View style={{flexDirection:"row",borderWidth:2,borderColor:"lightgrey",backgroundColor:"white",marginBottom:20,height:150}}>
							<View style={{alignContent:"center",alignItems:"center",margin:15,justifyContent:"center"}}>
								<Text style={{fontSize:17}}>Installation {'\n'}au poste de {'\n'}conduite</Text>
							</View>
							
								<TouchableOpacity
									disabled={this.state.activeBtn13}
									onPress={()=>{this.onBtn13Press()}}
									style={{width:120,height:80, borderRadius:15,
									backgroundColor:(this.state.activeBtn13)?"#b7ebbb":'#7FA57F',
									marginRight:20,marginLeft:50,alignContent:"center",alignItems:"center",justifyContent:"center",marginTop:35}}
									// labelStyle={{color:'black',fontSize:10}}
									>
									<Text style={{fontSize:15,alignContent:"center",color:'black',left:2}}>APPLICATION {'\n'}RÉGULIÈRE</Text>
								
								</TouchableOpacity>
								<TouchableOpacity
									disabled={this.state.activeBtn14}
									onPress={()=>{this.onBtn14Press()}}
									style={{width:120,height:80, borderRadius:15,
									backgroundColor:(this.state.activeBtn14)?"#f4e992":'#FFFF00',
									marginRight:20,alignContent:"center",alignItems:"center",justifyContent:"center",marginTop:35}}
									// labelStyle={{color:'black',fontSize:10}}
									>
									<Text style={{fontSize:15,alignContent:"center",color:'black',left:2}}>APPLICATION {'\n'}IRRÉGULIÈRE</Text>
								
								</TouchableOpacity>
								<TouchableOpacity
									disabled={this.state.activeBtn15}
									onPress={()=>{this.onBtn15Press()}}
									style={{width:120,height:80, borderRadius:15,
									backgroundColor:(this.state.activeBtn15)?'#f8cbc8':'red',
									marginRight:20,alignContent:"center",alignItems:"center",justifyContent:"center",marginTop:35}}
									// labelStyle={{color:'black',fontSize:10}}
									>
									<Text style={{fontSize:15,alignContent:"center",color:'black',left:-6}}>RAREMENT {'\n'}APPLIQUÉ</Text>
								
								</TouchableOpacity>
								<TouchableOpacity
									disabled={this.state.activeBtn16}
									onPress={()=>{this.onBtn16Press()}}
									style={{width:120,height:80, borderRadius:15,
										backgroundColor:(this.state.activeBtn16)?'#edf0ed':'lightgrey',
									marginRight:20,alignContent:"center",alignItems:"center",justifyContent:"center",marginTop:35}}
									// labelStyle={{color:'black',fontSize:10}}
									>
									<Text style={{fontSize:15,alignContent:"center",color:'black',left:-22}}>NON {'\n'}EVALUÉ</Text>
								
								</TouchableOpacity>
							</View>
							<TextInput
									style={{
										color: 'white',
										}}
									underlineColorAndroid = "transparent"
									placeholder = "Rédiger un commentaire"
									placeholderTextColor = "#fff"
									multiline={true}
									autoCapitalize = "none"
									onChangeText={(comment4) => this.setState({comment4})}
									value={this.state.comment4}
									ref={(input) => { this.TextInput3 = input; }}
									// style={{  margin: 15,
									// 	height: 300,
									// 	width : 500,
									// 	borderColor: '#000000',
									// 	borderWidth: 1}}
								/>
						
						
	
						</View>
	
					</Card>
					<Card style={styles.car1}>
						<Text style={{fontSize:30,margin:30,color:'#fff'}}>VOIR</Text>
						<View style={{flexDirection:"column"}}>
						<View style={{flexDirection:"row",borderWidth:2,borderColor:"lightgrey",backgroundColor:"white",marginBottom:20,height:150}}>
							<View style={{alignContent:"center",alignItems:"center",margin:15,justifyContent:"center"}}>
								<Text style={{fontSize:17}}>Indices utiles {'\n'}vers l'avant,{'\n'}loin/large</Text>
							</View>
							
								<TouchableOpacity
									disabled={this.state.activeBtnV1}
									onPress={()=>{this.onBtnV1Press()}}
									style={{width:120,height:80, borderRadius:15,
									backgroundColor:(this.state.activeBtnV1)?"#b7ebbb":'#7FA57F',
									marginRight:20,marginLeft:35,alignContent:"center",alignItems:"center",justifyContent:"center",marginTop:35}}
									
									>
									<Text style={{fontSize:15,alignContent:"center",color:'black',left:2}}>APPLICATION {'\n'}RÉGULIÈRE</Text>
								
								</TouchableOpacity>
								<TouchableOpacity
									disabled={this.state.activeBtnV2}
									onPress={()=>{this.onBtnV2Press()}}
									style={{width:120,height:80, borderRadius:15,
									backgroundColor:(this.state.activeBtnV2)?"#f4e992":'#FFFF00',
									marginRight:20,alignContent:"center",alignItems:"center",justifyContent:"center",marginTop:35}}
									// labelStyle={{color:'black',fontSize:10}}
									>
									<Text style={{fontSize:15,alignContent:"center",color:'black',left:2}}>APPLICATION {'\n'}IRRÉGULIÈRE</Text>
								
								</TouchableOpacity>
								<TouchableOpacity
									disabled={this.state.activeBtnV3}
									onPress={()=>{this.onBtnV3Press()}}
									style={{width:120,height:80, borderRadius:15,
									backgroundColor:(this.state.activeBtnV3)?'#f8cbc8':'red',
									marginRight:20,alignContent:"center",alignItems:"center",justifyContent:"center",marginTop:35}}
									// labelStyle={{color:'black',fontSize:10}}
									>
									<Text style={{fontSize:15,alignContent:"center",color:'black',left:-6}}>RAREMENT {'\n'}APPLIQUÉ</Text>
								
								</TouchableOpacity>
								<TouchableOpacity
									disabled={this.state.activeBtnV4}
									onPress={()=>{this.onBtnV4Press()}}
									style={{width:120,height:80, borderRadius:15,
									backgroundColor:(this.state.activeBtn4)?'#edf0ed':'lightgrey',
									marginRight:20,alignContent:"center",alignItems:"center",justifyContent:"center",marginTop:35}}
									// labelStyle={{color:'black',fontSize:10}}
									>
									<Text style={{fontSize:15,alignContent:"center",color:'black',left:-22}}>NON {'\n'}EVALUÉ</Text>
								
								</TouchableOpacity>
							</View>
							<TextInput
									style={{
										color: 'white',
										}}
									underlineColorAndroid = "transparent"
									placeholder = "Rédiger un commentaire"
									placeholderTextColor = "#fff"
									multiline={true}
									autoCapitalize = "none"
									onChangeText={(commentV1) => this.setState({commentV1})}
									value={this.state.commentV1}
									ref={(input) => { this.TextInputV1 = input; }}
									
								/>
							<View style={{flexDirection:"row",borderWidth:2,borderColor:"lightgrey",backgroundColor:"white",marginBottom:20,height:150}}>
							<View style={{alignContent:"center",alignItems:"center",margin:15,justifyContent:"center"}}>
								<Text style={{fontSize:17}}>Indices utiles {'\n'}vers l'arriére, {'\n'}rétroviseurs {'\n'}/angles morts</Text>
							</View>
							
								<TouchableOpacity
									disabled={this.state.activeBtnV5}
									onPress={()=>{this.onBtnV5Press()}}
									style={{width:120,height:80, borderRadius:15,
									backgroundColor:(this.state.activeBtnV5)?"#b7ebbb":'#7FA57F',
									marginRight:20,marginLeft:30,alignContent:"center",alignItems:"center",justifyContent:"center",marginTop:35}}
									// labelStyle={{color:'black',fontSize:10}}
									>
									<Text style={{fontSize:15,alignContent:"center",color:'black',left:2}}>APPLICATION {'\n'}RÉGULIÈRE</Text>
								
								</TouchableOpacity>
								<TouchableOpacity
									disabled={this.state.activeBtnV6}
									onPress={()=>{this.onBtnV6Press()}}
									style={{width:120,height:80, borderRadius:15,
									backgroundColor:(this.state.activeBtnV6)?"#f4e992":'#FFFF00',
									marginRight:20,alignContent:"center",alignItems:"center",justifyContent:"center",marginTop:35}}
									// labelStyle={{color:'black',fontSize:10}}
									>
									<Text style={{fontSize:15,alignContent:"center",color:'black',left:2}}>APPLICATION {'\n'}IRRÉGULIÈRE</Text>
								
								</TouchableOpacity>
								<TouchableOpacity
									disabled={this.state.activeBtnV7}
									onPress={()=>{this.onBtnV7Press()}}
									style={{width:120,height:80, borderRadius:15,
										backgroundColor:(this.state.activeBtnV7)?'#f8cbc8':'red',
										marginRight:20,alignContent:"center",alignItems:"center",justifyContent:"center",marginTop:35}}
									// labelStyle={{color:'black',fontSize:10}}
									>
									<Text style={{fontSize:15,alignContent:"center",color:'black',left:-6}}>RAREMENT {'\n'}APPLIQUÉ</Text>
								
								</TouchableOpacity>
								<TouchableOpacity
									disabled={this.state.activeBtnV8}
									onPress={()=>{this.onBtnV8Press()}}
									style={{width:120,height:80, borderRadius:15,
										backgroundColor:(this.state.activeBtnV8)?'#edf0ed':'lightgrey',
										marginRight:20,alignContent:"center",alignItems:"center",justifyContent:"center",marginTop:35}}
									// labelStyle={{color:'black',fontSize:10}}
									>
									<Text style={{fontSize:15,alignContent:"center",color:'black',left:-22}}>NON {'\n'}EVALUÉ</Text>
								
								</TouchableOpacity>
							</View>
							<TextInput
									style={{
										color: 'white',
										}}
									underlineColorAndroid = "transparent"
									placeholder = "Rédiger un commentaire"
									placeholderTextColor = "#fff"
									multiline={true}
									autoCapitalize = "none"
									onChangeText={(commentV2) => this.setState({commentV2})}
									value={this.state.commentV2}
									ref={(input) => { this.TextInputV2 = input; }}
									// style={{  margin: 15,
									// 	height: 300,
									// 	width : 500,
									// 	borderColor: '#000000',
									// 	borderWidth: 1}}
								/>
							<View style={{flexDirection:"row",borderWidth:2,borderColor:"lightgrey",backgroundColor:"white",marginBottom:20,height:150}}>
							<View style={{alignContent:"center",alignItems:"center",margin:15,justifyContent:"center"}}>
								<Text style={{fontSize:17}}>Indices utiles, {'\n'}écouter /{'\n'}ressentir </Text>
							</View>
							
								<TouchableOpacity
									disabled={this.state.activeBtnV9}
									onPress={()=>{this.onBtnV9Press()}}
									style={{width:120,height:80, borderRadius:15,
										backgroundColor:(this.state.activeBtnV9)?"#b7ebbb":'#7FA57F',
										marginRight:20,marginLeft:32,alignContent:"center",alignItems:"center",justifyContent:"center",marginTop:35}}
									// labelStyle={{color:'black',fontSize:10}}
									>
									<Text style={{fontSize:15,alignContent:"center",color:'black',left:2}}>APPLICATION {'\n'}RÉGULIÈRE</Text>
								
								</TouchableOpacity>
								<TouchableOpacity
									disabled={this.state.activeBtnV10}
									onPress={()=>{this.onBtnV10Press()}}
									style={{width:120,height:80, borderRadius:15,
										backgroundColor:(this.state.activeBtnV10)?"#f4e992":'#FFFF00',
										marginRight:20,alignContent:"center",alignItems:"center",justifyContent:"center",marginTop:35}}
									// labelStyle={{color:'black',fontSize:10}}
									>
									<Text style={{fontSize:15,alignContent:"center",color:'black',left:2}}>APPLICATION {'\n'}IRRÉGULIÈRE</Text>
								
								</TouchableOpacity>
								<TouchableOpacity
									disabled={this.state.activeBtnV11}
									onPress={()=>{this.onBtnV11Press()}}
									style={{width:120,height:80, borderRadius:15,
										backgroundColor:(this.state.activeBtnV11)?'#f8cbc8':'red',
										marginRight:20,alignContent:"center",alignItems:"center",justifyContent:"center",marginTop:35}}
									// labelStyle={{color:'black',fontSize:10}}
									>
									<Text style={{fontSize:15,alignContent:"center",color:'black',left:-6}}>RAREMENT {'\n'}APPLIQUÉ</Text>
								
								</TouchableOpacity>
								<TouchableOpacity
									disabled={this.state.activeBtnV12}
									onPress={()=>{this.onBtnV12Press()}}
									style={{width:120,height:80, borderRadius:15,
										backgroundColor:(this.state.activeBtnV12)?'#edf0ed':'lightgrey',
									marginRight:20,alignContent:"center",alignItems:"center",justifyContent:"center",marginTop:35}}
									// labelStyle={{color:'black',fontSize:10}}
									>
									<Text style={{fontSize:15,alignContent:"center",color:'black',left:-22}}>NON {'\n'}EVALUÉ</Text>
								
								</TouchableOpacity>
							</View>
							<TextInput
									style={{
										color: 'white',
										}}
									underlineColorAndroid = "transparent"
									placeholder = "Rédiger un commentaire"
									placeholderTextColor = "#fff"
									multiline={true}
									autoCapitalize = "none"
									onChangeText={(commentV3) => this.setState({commentV3})}
									value={this.state.commentV3}
									ref={(input) => { this.TextInputV3 = input; }}
									// style={{  margin: 15,
									// 	height: 300,
									// 	width : 500,
									// 	borderColor: '#000000',
									// 	borderWidth: 1}}
								/>
						</View>
					</Card>
					<Card style={styles.car2}>
						<Text style={{fontSize:30,margin:30,color:'#fff'}}>PRÉVOIR</Text>
						<View style={{flexDirection:"column"}}>
						<View style={{flexDirection:"row",borderWidth:2,borderColor:"lightgrey",backgroundColor:"white",marginBottom:20,height:150}}>
							<View style={{alignContent:"center",alignItems:"center",margin:15,justifyContent:"center"}}>
								<Text style={{fontSize:17}}>Selon la visibilité {'\n'}/ l'éspace libre </Text>
							</View>
							
								<TouchableOpacity
									disabled={this.state.activeBtnP1}
									onPress={()=>{this.onBtnP1Press()}}
									style={{width:120,height:80, borderRadius:15,
										backgroundColor:(this.state.activeBtnP1)?"#b7ebbb":'#7FA57F',
									marginRight:20,marginLeft:5,alignContent:"center",alignItems:"center",justifyContent:"center",marginTop:35}}
									// labelStyle={{color:'black',fontSize:10}}
									>
									<Text style={{fontSize:15,alignContent:"center",color:'black',left:2}}>APPLICATION {'\n'}RÉGULIÈRE</Text>
								
								</TouchableOpacity>
								<TouchableOpacity
									disabled={this.state.activeBtnP2}
									onPress={()=>{this.onBtnP2Press()}}
									style={{width:120,height:80, borderRadius:15,
										backgroundColor:(this.state.activeBtnP2)?"#f4e992":'#FFFF00',
									marginRight:20,alignContent:"center",alignItems:"center",justifyContent:"center",marginTop:35}}
									// labelStyle={{color:'black',fontSize:10}}
									>
									<Text style={{fontSize:15,alignContent:"center",color:'black',left:2}}>APPLICATION {'\n'}IRRÉGULIÈRE</Text>
								
								</TouchableOpacity>
								<TouchableOpacity
									disabled={this.state.activeBtnP3}
									onPress={()=>{this.onBtnP3Press()}}
									style={{width:120,height:80, borderRadius:15,
										backgroundColor:(this.state.activeBtnP3)?'#f8cbc8':'red',
									marginRight:20,alignContent:"center",alignItems:"center",justifyContent:"center",marginTop:35}}
									// labelStyle={{color:'black',fontSize:10}}
									>
									<Text style={{fontSize:15,alignContent:"center",color:'black',left:-6}}>RAREMENT {'\n'}APPLIQUÉ</Text>
								
								</TouchableOpacity>
								<TouchableOpacity
									disabled={this.state.activeBtnP4}
									onPress={()=>{this.onBtnP4Press()}}
									style={{width:120,height:80, borderRadius:15,
										backgroundColor:(this.state.activeBtnP4)?'#edf0ed':'lightgrey',
									marginRight:20,alignContent:"center",alignItems:"center",justifyContent:"center",marginTop:35}}
									// labelStyle={{color:'black',fontSize:10}}
									>
									<Text style={{fontSize:15,alignContent:"center",color:'black',left:-22}}>NON {'\n'}EVALUÉ</Text>
								
								</TouchableOpacity>
							</View>
							<TextInput
									style={{
										color: 'white',
										}}
									underlineColorAndroid = "transparent"
									placeholder = "Rédiger un commentaire"
									placeholderTextColor = "#fff"
									multiline={true}
									autoCapitalize = "none"
									onChangeText={(commentP1) => this.setState({commentP1})}
									value={this.state.commentP1}
									ref={(input) => { this.TextInputP1 = input; }}
									// style={{  margin: 15,
									// 	height: 300,
									// 	width : 500,
									// 	borderColor: '#000000',
									// 	borderWidth: 1}}
								/>
							<View style={{flexDirection:"row",borderWidth:2,borderColor:"lightgrey",backgroundColor:"white",marginBottom:20,height:150}}>
							<View style={{alignContent:"center",alignItems:"center",margin:15,justifyContent:"center"}}>
								<Text style={{fontSize:17}}>Les actions des {'\n'}autres usagers</Text>
							</View>
							
								<TouchableOpacity
									disabled={this.state.activeBtnP5}
									onPress={()=>{this.onBtnP5Press()}}
									style={{width:120,height:80, borderRadius:15,
										backgroundColor:(this.state.activeBtnP5)?"#b7ebbb":'#7FA57F',
									marginRight:20,marginLeft:13,alignContent:"center",alignItems:"center",justifyContent:"center",marginTop:35}}
									// labelStyle={{color:'black',fontSize:10}}
									>
									<Text style={{fontSize:15,alignContent:"center",color:'black',left:2}}>APPLICATION {'\n'}RÉGULIÈRE</Text>
								
								</TouchableOpacity>
								<TouchableOpacity
									disabled={this.state.activeBtnP6}
									onPress={()=>{this.onBtnP6Press()}}
									style={{width:120,height:80, borderRadius:15,
										backgroundColor:(this.state.activeBtnP6)?"#f4e992":'#FFFF00',
									marginRight:20,alignContent:"center",alignItems:"center",justifyContent:"center",marginTop:35}}
									// labelStyle={{color:'black',fontSize:10}}
									>
									<Text style={{fontSize:15,alignContent:"center",color:'black',left:2}}>APPLICATION {'\n'}IRRÉGULIÈRE</Text>
								
								</TouchableOpacity>
								<TouchableOpacity
									disabled={this.state.activeBtnP7}
									onPress={()=>{this.onBtnP7Press()}}
									style={{width:120,height:80, borderRadius:15,
										backgroundColor:(this.state.activeBtnP7)?'#f8cbc8':'red',
									marginRight:20,alignContent:"center",alignItems:"center",justifyContent:"center",marginTop:35}}
									// labelStyle={{color:'black',fontSize:10}}
									>
									<Text style={{fontSize:15,alignContent:"center",color:'black',left:-6}}>RAREMENT {'\n'}APPLIQUÉ</Text>
								
								</TouchableOpacity>
								<TouchableOpacity
									disabled={this.state.activeBtnP8}
									onPress={()=>{this.onBtnP8Press()}}
									style={{width:120,height:80, borderRadius:15,
										backgroundColor:(this.state.activeBtnP8)?'#edf0ed':'lightgrey',
									marginRight:20,alignContent:"center",alignItems:"center",justifyContent:"center",marginTop:35}}
									// labelStyle={{color:'black',fontSize:10}}
									>
									<Text style={{fontSize:15,alignContent:"center",color:'black',left:-22}}>NON {'\n'}EVALUÉ</Text>
								
								</TouchableOpacity>
							</View>
							<TextInput
									style={{
										color: 'white',
										}}
									underlineColorAndroid = "transparent"
									placeholder = "Rédiger un commentaire"
									placeholderTextColor = "#fff"
									multiline={true}
									autoCapitalize = "none"
									onChangeText={(commentP2) => this.setState({commentP2})}
									value={this.state.commentP2}
									ref={(input) => { this.TextInputP2 = input; }}
									// style={{  margin: 15,
									// 	height: 300,
									// 	width : 500,
									// 	borderColor: '#000000',
									// 	borderWidth: 1}}
								/>
							<View style={{flexDirection:"row",borderWidth:2,borderColor:"lightgrey",backgroundColor:"white",marginBottom:20,height:150}}>
							<View style={{alignContent:"center",alignItems:"center",margin:15,justifyContent:"center"}}>
								<Text style={{fontSize:17}}>Les conditions {'\n'} d'adhérence</Text>
							</View>
							
								<TouchableOpacity
								
									disabled={this.state.activeBtnP9}
									onPress={()=>{this.onBtnP9Press()}}
									style={{width:120,height:80, borderRadius:15,
										backgroundColor:(this.state.activeBtnP9)?"#b7ebbb":'#7FA57F',
									marginRight:20,marginLeft:20,alignContent:"center",alignItems:"center",justifyContent:"center",marginTop:35}}
									// labelStyle={{color:'black',fontSize:10}}
									>
									<Text style={{fontSize:15,alignContent:"center",color:'black',left:2}}>APPLICATION {'\n'}RÉGULIÈRE</Text>
								
								</TouchableOpacity>
								<TouchableOpacity
									disabled={this.state.activeBtnP10}
									onPress={()=>{this.onBtnP10Press()}}
									style={{width:120,height:80, borderRadius:15,
										backgroundColor:(this.state.activeBtnP10)?"#f4e992":'#FFFF00',
									marginRight:20,alignContent:"center",alignItems:"center",justifyContent:"center",marginTop:35}}
									// labelStyle={{color:'black',fontSize:10}}
									>
									<Text style={{fontSize:15,alignContent:"center",color:'black',left:2}}>APPLICATION {'\n'}IRRÉGULIÈRE</Text>
								
								</TouchableOpacity>
								<TouchableOpacity
									disabled={this.state.activeBtnP11}
									onPress={()=>{this.onBtnP11Press()}}
									style={{width:120,height:80, borderRadius:15,
										backgroundColor:(this.state.activeBtnP11)?'#f8cbc8':'red',
									marginRight:20,alignContent:"center",alignItems:"center",justifyContent:"center",marginTop:35}}
									// labelStyle={{color:'black',fontSize:10}}
									>
									<Text style={{fontSize:15,alignContent:"center",color:'black',left:-6}}>RAREMENT {'\n'}APPLIQUÉ</Text>
								
								</TouchableOpacity>
								<TouchableOpacity
									disabled={this.state.activeBtnP12}
									onPress={()=>{this.onBtnP12Press()}}
									style={{width:120,height:80, borderRadius:15,
										backgroundColor:(this.state.activeBtnP12)?'#edf0ed':'lightgrey',
									marginRight:20,alignContent:"center",alignItems:"center",justifyContent:"center",marginTop:35}}
									// labelStyle={{color:'black',fontSize:10}}
									>
									<Text style={{fontSize:15,alignContent:"center",color:'black',left:-22}}>NON {'\n'}EVALUÉ</Text>
								
								</TouchableOpacity>
							</View>
							<TextInput
									style={{
										color: 'white',
										}}
									underlineColorAndroid = "transparent"
									placeholder = "Rédiger un commentaire"
									placeholderTextColor = "#fff"
									multiline={true}
									autoCapitalize = "none"
									onChangeText={(commentP3) => this.setState({commentP3})}
									value={this.state.commentP3}
									ref={(input) => { this.TextInputP3 = input; }}
									// style={{  margin: 15,
									// 	height: 300,
									// 	width : 500,
									// 	borderColor: '#000000',
									// 	borderWidth: 1}}
								/>
	
						</View>
					</Card>
					<Card style={styles.car3}>
						<Text style={{fontSize:30,margin:30,color:'#fff'}}>ANTICIPER</Text>
						<View style={{flexDirection:"column"}}>
						<View style={{flexDirection:"row",borderWidth:2,borderColor:"lightgrey",backgroundColor:"white",marginBottom:20,height:150}}>
							<View style={{alignContent:"center",alignItems:"center",margin:15,justifyContent:"center"}}>
								<Text style={{fontSize:17}}>Placement sur {'\n'}la chaussée, {'\n'}voir et être vu/ {'\n'}partage de {'\n'}l'éspace / {'\n'}échappatoire </Text>
							</View>
							
								<TouchableOpacity
									disabled={this.state.activeBtnA1}
									onPress={()=>{this.onBtnA1Press()}}
									style={{width:120,height:80, borderRadius:15,
										backgroundColor:(this.state.activeBtnA1)?"#b7ebbb":'#7FA57F',
									marginRight:20,marginLeft:22,alignContent:"center",alignItems:"center",justifyContent:"center",marginTop:35}}
									// labelStyle={{color:'black',fontSize:10}}
									>
									<Text style={{fontSize:15,alignContent:"center",color:'black',left:2}}>APPLICATION {'\n'}RÉGULIÈRE</Text>
								
								</TouchableOpacity>
								<TouchableOpacity
									disabled={this.state.activeBtnA2}
									onPress={()=>{this.onBtnA2Press()}}
									style={{width:120,height:80, borderRadius:15,
										backgroundColor:(this.state.activeBtnA2)?"#f4e992":'#FFFF00',
									marginRight:20,alignContent:"center",alignItems:"center",justifyContent:"center",marginTop:35}}
									// labelStyle={{color:'black',fontSize:10}}
									>
									<Text style={{fontSize:15,alignContent:"center",color:'black',left:2}}>APPLICATION {'\n'}IRRÉGULIÈRE</Text>
								
								</TouchableOpacity>
								<TouchableOpacity
									disabled={this.state.activeBtnA3}
									onPress={()=>{this.onBtnA3Press()}}
									style={{width:120,height:80, borderRadius:15,
										backgroundColor:(this.state.activeBtnA3)?'#f8cbc8':'red',
									marginRight:20,alignContent:"center",alignItems:"center",justifyContent:"center",marginTop:35}}
									// labelStyle={{color:'black',fontSize:10}}
									>
									<Text style={{fontSize:15,alignContent:"center",color:'black',left:-6}}>RAREMENT {'\n'}APPLIQUÉ</Text>
								
								</TouchableOpacity>
								<TouchableOpacity
									disabled={this.state.activeBtnA4}
									onPress={()=>{this.onBtnA4Press()}}
									style={{width:120,height:80, borderRadius:15,
										backgroundColor:(this.state.activeBtnA4)?'#edf0ed':'lightgrey',
									marginRight:20,alignContent:"center",alignItems:"center",justifyContent:"center",marginTop:35}}
									// labelStyle={{color:'black',fontSize:10}}
									>
									<Text style={{fontSize:15,alignContent:"center",color:'black',left:-22}}>NON {'\n'}EVALUÉ</Text>
								
								</TouchableOpacity>
							</View>
							<TextInput
									style={{
										color: 'white',
										}}
									underlineColorAndroid = "transparent"
									placeholder = "Rédiger un commentaire"
									placeholderTextColor = "#fff"
									multiline={true}
									autoCapitalize = "none"
									onChangeText={(commentA1) => this.setState({commentA1})}
									value={this.state.commentA1}
									ref={(input) => { this.TextInputA1 = input; }}
									// style={{  margin: 15,
									// 	height: 300,
									// 	width : 500,
									// 	borderColor: '#000000',
									// 	borderWidth: 1}}
								/>
							<View style={{flexDirection:"row",borderWidth:2,borderColor:"lightgrey",backgroundColor:"white",marginBottom:20,height:150}}>
							<View style={{alignContent:"center",alignItems:"center",margin:15,justifyContent:"center"}}>
								<Text style={{fontSize:17}}>Ajuster la vitesse {'\n'}/conditions de {'\n'}circulation / {'\n'}distances de {'\n'}sécurité / {'\n'} pied-frein </Text>
							</View>
							
								<TouchableOpacity
									disabled={this.state.activeBtnA5}
									onPress={()=>{this.onBtnA5Press()}}
									style={{width:120,height:80, borderRadius:15,
										backgroundColor:(this.state.activeBtnA5)?"#b7ebbb":'#7FA57F',
									marginRight:20,marginLeft:2,alignContent:"center",alignItems:"center",justifyContent:"center",marginTop:35}}
									// labelStyle={{color:'black',fontSize:10}}
									>
									<Text style={{fontSize:15,alignContent:"center",color:'black',left:2}}>APPLICATION {'\n'}RÉGULIÈRE</Text>
								
								</TouchableOpacity>
								<TouchableOpacity
									disabled={this.state.activeBtnA6}
									onPress={()=>{this.onBtnA6Press()}}
									style={{width:120,height:80, borderRadius:15,
										backgroundColor:(this.state.activeBtnA6)?"#f4e992":'#FFFF00',
									marginRight:20,alignContent:"center",alignItems:"center",justifyContent:"center",marginTop:35}}
									// labelStyle={{color:'black',fontSize:10}}
									>
									<Text style={{fontSize:15,alignContent:"center",color:'black',left:2}}>APPLICATION {'\n'}IRRÉGULIÈRE</Text>
								
								</TouchableOpacity>
								<TouchableOpacity
									disabled={this.state.activeBtnA7}
									onPress={()=>{this.onBtnA7Press()}}
									style={{width:120,height:80, borderRadius:15,
										backgroundColor:(this.state.activeBtnA7)?'#f8cbc8':'red',
									marginRight:20,alignContent:"center",alignItems:"center",justifyContent:"center",marginTop:35}}
									// labelStyle={{color:'black',fontSize:10}}
									>
									<Text style={{fontSize:15,alignContent:"center",color:'black',left:-6}}>RAREMENT {'\n'}APPLIQUÉ</Text>
								
								</TouchableOpacity>
								<TouchableOpacity
									disabled={this.state.activeBtnA8}
									onPress={()=>{this.onBtnA8Press()}}
									style={{width:120,height:80, borderRadius:15,
										backgroundColor:(this.state.activeBtnA8)?'#edf0ed':'lightgrey',
									marginRight:20,alignContent:"center",alignItems:"center",justifyContent:"center",marginTop:35}}
									// labelStyle={{color:'black',fontSize:10}}
									>
									<Text style={{fontSize:15,alignContent:"center",color:'black',left:-22}}>NON {'\n'}EVALUÉ</Text>
								
								</TouchableOpacity>
							</View>
							<TextInput
									style={{
										color: 'white',
										}}
									underlineColorAndroid = "transparent"
									placeholder = "Rédiger un commentaire"
									placeholderTextColor = "#fff"
									multiline={true}
									autoCapitalize = "none"
									onChangeText={(commentA2) => this.setState({commentA2})}
									value={this.state.commentA2}
									ref={(input) => { this.TextInputA2 = input; }}
									// style={{  margin: 15,
									// 	height: 300,
									// 	width : 500,
									// 	borderColor: '#000000',
									// 	borderWidth: 1}}
								/>
							<View style={{flexDirection:"row",borderWidth:2,borderColor:"lightgrey",backgroundColor:"white",marginBottom:20,height:150}}>
							<View style={{alignContent:"center",alignItems:"center",margin:15,justifyContent:"center"}}>
								<Text style={{fontSize:17}}>Communiquer, {'\n'}signaler {'\n'}/indiquer {'\n'}/annoncer</Text>
							</View>
							
								<TouchableOpacity
									disabled={this.state.activeBtnA9}
									onPress={()=>{this.onBtnA9Press()}}
									style={{width:120,height:80, borderRadius:15,
										backgroundColor:(this.state.activeBtnA9)?"#b7ebbb":'#7FA57F',
									marginRight:20,marginLeft:22,alignContent:"center",alignItems:"center",justifyContent:"center",marginTop:35}}
									// labelStyle={{color:'black',fontSize:10}}
									>
									<Text style={{fontSize:15,alignContent:"center",color:'black',left:2}}>APPLICATION {'\n'}RÉGULIÈRE</Text>
								
								</TouchableOpacity>
								<TouchableOpacity
									disabled={this.state.activeBtnA10}
									onPress={()=>{this.onBtnA10Press()}}
									style={{width:120,height:80, borderRadius:15,
										backgroundColor:(this.state.activeBtnA10)?"#f4e992":'#FFFF00',
									marginRight:20,alignContent:"center",alignItems:"center",justifyContent:"center",marginTop:35}}
									// labelStyle={{color:'black',fontSize:10}}
									>
									<Text style={{fontSize:15,alignContent:"center",color:'black',left:2}}>APPLICATION {'\n'}IRRÉGULIÈRE</Text>
								
								</TouchableOpacity>
								<TouchableOpacity
									disabled={this.state.activeBtnA11}
									onPress={()=>{this.onBtnA11Press()}}
									style={{width:120,height:80, borderRadius:15,
										backgroundColor:(this.state.activeBtnA11)?'#f8cbc8':'red',
									marginRight:20,alignContent:"center",alignItems:"center",justifyContent:"center",marginTop:35}}
									// labelStyle={{color:'black',fontSize:10}}
									>
									<Text style={{fontSize:15,alignContent:"center",color:'black',left:-6}}>RAREMENT {'\n'}APPLIQUÉ</Text>
								
								</TouchableOpacity>
								<TouchableOpacity
									disabled={this.state.activeBtnA12}
									onPress={()=>{this.onBtnA12Press()}}
									style={{width:120,height:80, borderRadius:15,
										backgroundColor:(this.state.activeBtnA12)?'#edf0ed':'lightgrey',
									marginRight:20,alignContent:"center",alignItems:"center",justifyContent:"center",marginTop:35}}
									// labelStyle={{color:'black',fontSize:10}}
									>
									<Text style={{fontSize:15,alignContent:"center",color:'black',left:-22}}>NON {'\n'}EVALUÉ</Text>
								
								</TouchableOpacity>
							</View>
							<TextInput
									style={{
										color: 'white',
										}}
									underlineColorAndroid = "transparent"
									placeholder = "Rédiger un commentaire"
									placeholderTextColor = "#fff"
									multiline={true}
									autoCapitalize = "none"
									onChangeText={(commentA3) => this.setState({commentA3})}
									value={this.state.commentA3}
									ref={(input) => { this.TextInputA3 = input; }}
									// style={{  margin: 15,
									// 	height: 300,
									// 	width : 500,
									// 	borderColor: '#000000',
									// 	borderWidth: 1}}
								/>
							<View style={{flexDirection:"row",borderWidth:2,borderColor:"lightgrey",backgroundColor:"white",marginBottom:20,height:150}}>
							<View style={{alignContent:"center",alignItems:"center",margin:15,justifyContent:"center"}}>
								<Text style={{fontSize:17}}>Réglementation {'\n'}/ tolérance {'\n'}/ courtoisie</Text>
							</View>
							
								<TouchableOpacity
									disabled={this.state.activeBtnA13}
									onPress={()=>{this.onBtnA13Press()}}
									style={{width:120,height:80, borderRadius:15,
										backgroundColor:(this.state.activeBtnA13)?"#b7ebbb":'#7FA57F',
									marginRight:20,marginLeft:12,alignContent:"center",alignItems:"center",justifyContent:"center",marginTop:35}}
									// labelStyle={{color:'black',fontSize:10}}
									>
									<Text style={{fontSize:15,alignContent:"center",color:'black',left:2}}>APPLICATION {'\n'}RÉGULIÈRE</Text>
								
								</TouchableOpacity>
								<TouchableOpacity
									disabled={this.state.activeBtnA14}
									onPress={()=>{this.onBtnA14Press()}}
									style={{width:120,height:80, borderRadius:15,
										backgroundColor:(this.state.activeBtnA14)?"#f4e992":'#FFFF00',
									marginRight:20,alignContent:"center",alignItems:"center",justifyContent:"center",marginTop:35}}
									// labelStyle={{color:'black',fontSize:10}}
									>
									<Text style={{fontSize:15,alignContent:"center",color:'black',left:2}}>APPLICATION {'\n'}IRRÉGULIÈRE</Text>
								
								</TouchableOpacity>
								<TouchableOpacity
									disabled={this.state.activeBtnA15}
									onPress={()=>{this.onBtnA15Press()}}
									style={{width:120,height:80, borderRadius:15,
										backgroundColor:(this.state.activeBtnA15)?'#f8cbc8':'red',
									marginRight:20,alignContent:"center",alignItems:"center",justifyContent:"center",marginTop:35}}
									// labelStyle={{color:'black',fontSize:10}}
									>
									<Text style={{fontSize:15,alignContent:"center",color:'black',left:-6}}>RAREMENT {'\n'}APPLIQUÉ</Text>
								
								</TouchableOpacity>
								<TouchableOpacity
									disabled={this.state.activeBtnA16}
									onPress={()=>{this.onBtnA16Press()}}
									style={{width:120,height:80, borderRadius:15,
										backgroundColor:(this.state.activeBtnA16)?'#edf0ed':'lightgrey',
									marginRight:20,alignContent:"center",alignItems:"center",justifyContent:"center",marginTop:35}}
									// labelStyle={{color:'black',fontSize:10}}
									>
									<Text style={{fontSize:15,alignContent:"center",color:'black',left:-22}}>NON {'\n'}EVALUÉ</Text>
								
								</TouchableOpacity>
							</View>
							<TextInput
									style={{
										color: 'white',
										}}
									underlineColorAndroid = "transparent"
									placeholder = "Rédiger un commentaire"
									placeholderTextColor = "#fff"
									multiline={true}
									autoCapitalize = "none"
									onChangeText={(commentA4) => this.setState({commentA4})}
									value={this.state.commentA4}
									ref={(input) => { this.TextInputA4 = input; }}
									// style={{  margin: 15,
									// 	height: 300,
									// 	width : 500,
									// 	borderColor: '#000000',
									// 	borderWidth: 1}}
								/>
						
							
	
						</View>
					</Card>
					
					<Card style={styles.carR}>
					<View style={{flexDirection:"column"}}>
						<View style={{flexDirection:"row",backgroundColor:"white",height:150}}>
							<View style={{alignContent:"center",alignItems:"center",justifyContent:"center",margin:10}}>
							<TouchableOpacity
									disabled={true}
									style={{width:150,height:100, borderRadius:15,
									backgroundColor:'white',borderWidth:2,borderColor:"#00B0F0"
									,marginRight:20,alignContent:"center",alignItems:"center"
									,justifyContent:"center"}}
									
									>
									<Text style={{fontSize:15,alignContent:"center"}}> TOTAL</Text>
								
								</TouchableOpacity>
							</View>
							
								<TouchableOpacity
									disabled={true}
									style={{width:120,height:80, borderRadius:15,
									backgroundColor:'#7FA57F',marginRight:20,alignContent:"center",alignItems:"center",justifyContent:"center",marginTop:35}}
									// labelStyle={{color:'black',fontSize:10}}
									>
									<Text style={{fontSize:15,alignContent:"center",color:'black'}}>{this.state.totalVert} %</Text>
								
								</TouchableOpacity>
								<TouchableOpacity
									disabled={true}
									style={{width:120,height:80, borderRadius:15,
									backgroundColor:'#FFFF00',marginRight:20,alignContent:"center",alignItems:"center",justifyContent:"center",marginTop:35}}
									// labelStyle={{color:'black',fontSize:10}}
									>
									<Text style={{fontSize:15,alignContent:"center",color:'black'}}>{this.state.totalJaune} %</Text>
								
								</TouchableOpacity>
								<TouchableOpacity
									disabled={true}
									style={{width:120,height:80, borderRadius:15,
									backgroundColor:'red',marginRight:20,alignContent:"center",alignItems:"center",justifyContent:"center",marginTop:35}}
									// labelStyle={{color:'black',fontSize:10}}
									>
									<Text style={{fontSize:15,alignContent:"center",color:'black'}}>{this.state.totalRouge} %</Text>
								
								</TouchableOpacity>
								<TouchableOpacity
									disabled={true}
									style={{width:120,height:80, borderRadius:15,
									backgroundColor:'lightgrey',marginRight:20,alignContent:"center",alignItems:"center",justifyContent:"center",marginTop:35}}
									// labelStyle={{color:'black',fontSize:10}}
									>
									<Text style={{fontSize:15,alignContent:"center",color:'black'}}>{this.state.totalGris} %</Text>
								
								</TouchableOpacity>
							</View>
							</View>
							<View style={{flexDirection:"row",backgroundColor:"white",height:150}}>
							<View style={{alignContent:"center",alignItems:"center",justifyContent:"center",marginLeft:20,marginRight:30}}>
							<TouchableOpacity
								disabled={true}
									style={{width:320,height:100, borderRadius:15,
									backgroundColor:'white',borderWidth:2,borderColor:"#00B0F0"
									,marginRight:20,alignContent:"center",alignItems:"center"
									,justifyContent:"center"}}
									
									>
									<Text style={{fontSize:15,fontWeight:"bold",textAlign:"center"}}>Taux d'application de la méthode CONDUIRE JUSTE</Text>
									<Text style={{fontSize:15,alignContent:"center",marginTop:10,fontWeight:"bold"}}>{this.state.tauxCJ} %</Text>
								
								</TouchableOpacity>
							</View>
							<View style={{alignContent:"center",alignItems:"center",justifyContent:"center",margin:10}}>
							<TouchableOpacity
								disabled={true}
									style={{width:320,height:100, borderRadius:15,
									backgroundColor:'white',borderWidth:2,borderColor:"#00B0F0"
									,alignContent:"center",alignItems:"center"
									,justifyContent:"center",marginRight:20}}
									
									>
									<Text style={{fontSize:15,fontWeight:"bold",textAlign:"center"}}>Rapport de cette application {'\n'}à la notion d'évitabilité d'accident</Text>
									<Text style={{fontSize:15,alignContent:"center",marginTop:10,fontWeight:"bold"}}>{(this.state.tauxEv).toFixed(2)}%</Text>
								
								</TouchableOpacity>
							</View>
							</View>
							</Card>
							<View style={{backgroundColor:'white',alignContent:"center",alignItems:"center",justifyContent:"center",
							marginVertical:100}}>
							<TouchableOpacity
									onPress={()=>{
										this.setState({spinner : true})
										// this.saveData()
										setTimeout(() => {
											this.saveData()
											// this.setState({showQCM:false,showD5:true,spinner :false})
									
										}, 60000);
										
										}}
									style={{width:300,height:80, borderRadius:5,
									backgroundColor:"#00B0F0",borderWidth:2,borderColor:"#00B0F0"
									,alignContent:"center",alignItems:"center"
									,justifyContent:"center",marginRight:20}}
									
									>
									<Text style={{fontSize:20,fontWeight:"bold",textAlign:"center",color:"white"}}>VALIDER</Text>
									
								
								</TouchableOpacity>
								</View>
						
				</View>
				
				</ScrollView>
				</KeyboardAwareScrollView>
				
				
	
			</SafeAreaView>
			
					
			</Modal>
		)
	}
	renderBottomComponent(){
		// if(this.state.show) {
		
		// this.convertTimeline()
		let deviceWidth = Dimensions.get('window').width
			return (
				<MyHiddenView
				hide={!this.state.show}
				// style={{top:300,backgroundColor:'white'}}
					// transparent={true}
					// visible={this.state.show}
					// hardwareAccelerated={true}
					// presentationStyle="pageSheet"
						// style={{flex:1}}
					>
				<View >
				<TouchableOpacity style={{left:740,width:50,height:50}}>
				<Icon
					name='close'
					type='material-community'
					color='red'
					size= {40}
					onPress={() => this.butonPress()}
				/>
				</TouchableOpacity>
				
				<View style={{flexDirection:"row",backgroundColor:"white",height:350,borderColor:"#CED0CE",left:20}}>
				<View style={{backgroundColor:"white",height:350,}}>
				<View style={{backgroundColor:"white",justifyContent:"center",alignItems:"center",alignContent:"center"}}>
				<View style={{flexDirection:"column",justifyContent:"center",alignItems:"center",alignContent:"center"}}>
				<SafeAreaView>
				<FlatList        
				data={this.state.data_item}
				keyExtractor={(itm,indx) => indx.toString()}
				// keyExtractor={(item,index.toString())}
				renderItem={({item})=>(
				
				
					<View style={{
						flexDirection:"row",
						justifyContent:"center",
						alignItems:"center",  
						alignContent:"center",
						backgroundColor:((this.state.data_item.findIndex(it=>it.time === item.time)) === this.state.selectedIndex) ? "#929292":"white"
						}}>
					<TouchableOpacity style={{height:50, width:80,alignContent:"center",justifyContent:"center"}}>
					<Text style={{}}>{item.registered_at}</Text>
				
					
					</TouchableOpacity>
                    {this.renderColSepa()}
				
					
					<TouchableOpacity
					style={{height:40, width:50,alignContent:"center",justifyContent:"center"}}
					//contentStyle={{height:40, width:30}}
					onLongPress={()=>this.addToList(this.state.data_item.findIndex(it=>it.time === item.time))}
					
					
					onPress={ ()=> this.getIndex(this.state.data_item.findIndex(it=>it.time === item.time))}
					
					>
				
					<Text>
					{(this.state.data_item.findIndex(it=>it.time === item.time))+1}
					</Text>
					
					</TouchableOpacity>
					
				
					{this.renderColSepa()}
					<TouchableOpacity style={{height:40, width:40,left:-8,alignItems:"center",alignContent:"center"}}>
							<Icon
						name={item.icon}
						type={item.type}
						color={item.color}
						size= {30}
						/> 
					</TouchableOpacity>
					{this.renderColSepa()}
					<TouchableOpacity style={{height:50, width:235,}}
					
					>
					<Text style={{}}>{item.item}</Text>
					</TouchableOpacity>
					{this.renderColSepa()}
					<TouchableOpacity style={{height:50, width:190 ,}}>
					<Text >{item.item_sub_category}</Text>
					
					</TouchableOpacity>
					{this.renderColSepa()}
					<TouchableOpacity style={{height:50, width:100, left:-10,
						backgroundColor:item.iconFcolor, alignContent:"center",justifyContent:"center"}}>
					
					<View style={{flexDirection:"column",}}>
					<Text style={{color:"#fff", alignSelf:"center", }}>{item.item_category.toUpperCase()}</Text>
					</View>
					</TouchableOpacity>
						{this.renderColSepa()} 
					</View>
				
				)}
				ItemSeparatorComponent={this.renderSeparator}
				/>
				<View style={{backgroundColor:"white",height:50,top:15}}></View>
			    </SafeAreaView> 
				</View>
				{/*  */}
				</View>
				</View>

				</View>
				
				</View>
				
				
				
				</MyHiddenView>
			)
		//}
	}
	buttonPress=()=>{
		
	this.setState({show:true})
	//this.convertTimeline()
	//console.log(this.state.timeLine);
	
	}
	validateC = () => {
		const {comment} = this.state;
		if(comment === ""){
		  Alert.alert(
			"WARNING",
			"Veuillez rédiger un commentaire",
			[
			  {
				text: "OK", 
				onPress: () => console.log("OK Pressed") 
			  }
			]
		  )
		}else{
			this.setState({showC3:true })
		}
		}
	sendFile = () => {
		const {sign1,sign2} = this.state;
		if( sign1 == undefined || sign2 == undefined){
		  Alert.alert(
			"WARNING",
			"Signature obligatoire",
			[
			  {
				text: "OK", 
				onPress: () => console.log("OK Pressed") 
			  }
			]
		  )
		}else{
			
			this.handleEmail()
		} 
  }
	butonPress=()=>{
	this.setState({show:false})
	}
	buttonPressC=()=>{
		setTimeout(() => {
			// Alert.alert(
			// 	"Attention!",
			// 	"Choix unique!",
			// 	[
			// 	{
			// 		text: "OK",
			// 		onPress: () => console.log("OK Pressed") 
			// 	}]
			// ) 
			this.setState({warningQCM : true})
		}, 100);
		
		this.setState({showQCM:true})
	// this.setState({showC1:true})
	}
	buttonPressC2=()=>{
	this.setState({showC2:true})
	}
	buttonPressC3=()=>{
	this.setState({showC3:true})
	}
	buttonPressC4=()=>{
	this.setState({showC4:true})
  }
 
    
	//pour les signatures
	saveSign = () => {
	this.refs['sign'].saveImage();
	};

	resetSign = () => {
	this.refs['sign'].resetImage();
	};
	_onSaveEvent = result => {
	const base64String = `data:image/png;base64,${result.encoded}`;
	this.setState({sign1 : base64String , signD:false})
	//console.log(result.encoded);
	};

	_onDragEvent = () => {
	// This callback will be called when the user enters signature
	console.log('dragged');
	};
	saveSign1 = () => {
	this.refs['sign1'].saveImage();
	};

	resetSign1 = () => {
	this.refs['sign1'].resetImage();
	};
	onSaveEvent = result => {
	const base64String = `data:image/png;base64,${result.encoded}`;
	this.setState({sign2 : base64String , signD1:false})
	//console.log(result.encoded);
	};

	onDragEvent = () => {
	// This callback will be called when the user enters signature
	console.log('dragged');
	};
  async nextStudent(){ 
	  try {
		this.setState({showD5:false,confirmNextStudent:false});
		Actions.popTo("listeStudentGCAM",{stage:this.props.stage,stageName : this.props.stageName,})
		await AsyncStorage.multiRemove([
			'data',
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
			'@heurefin',
			"video_path", 
			'@heure',
			'clips_name',
			'filename' 
		])   
	  } catch (error) {
		Sentry.captureException(error);
	  }

     
  }
  async newFormation(){
	
	try {
		console.log(this.props.stage+"rrr");
		this.setState({showD5:false,confirmNewFormation:false}) 
		this.sendDataToBDD()
		//await this.props.dispatch(createNewStudent(undefined))
		
		let studentEvalue = await AsyncStorage.getItem('gcam_student_evalue')
		
		let jsonStudentE = JSON.parse(studentEvalue)
	
		for (let index = 0; index < jsonStudentE.length; index++) {
			const el= jsonStudentE[index];
			console.log(el);
		 	await AsyncStorage.removeItem('gcam_training'+el.toString())
			//console.log(formation);
			
			
		}
		setTimeout(() => {
			// AsyncStorage.removeItem('pr_totalStudent',(error)  =>{console.log(error)})
			AsyncStorage.removeItem('gcam_student_evalue',(error)  =>{console.log(error)})
			// Actions.homeP() 
			console.log(this.props.stage+"rrr");
			Actions.homP({stage:this.props.stage ,stageName : this.props.stageName,alertProps:"no"})
		}, 1000);
		
		
		// await this.props.dispatch(suppressIndex())
		//await this.props.dispatch(loginTrainer({"password": "nt38fih2", "platform": "tablet", "username": "tt-nprjhd"}))
		// setTimeout(() => {
		// 	AsyncStorage.removeItem('pr_totalStudent',(error)  =>{console.log(error)})
		// 	Actions.home() 
			
		// 	// Actions.popTo("home",{asyncId : this.props.asyncId})
		// }, 1000);
		// console.log(this.props);
    	 
	  } catch (error) {
		Sentry.captureException(error);
		  console.log(error);
	  }
	
  }
  fermerApp(){
    this.setState({showD5:false})
    BackHandler.exitApp()
  }
	//pdf
	// askPermission() {
    //     var that = this;
    //     async function requestExternalWritePermission() {
    //       try {
    //         const granted = await PermissionsAndroid.request(
    //           PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    //           {
    //             title: 'CreatePDFApp External Storage Write Permission',
    //             message:
    //               'CreatePDFApp needs access to Storage data in your SD Card ',
    //           }
    //         );
    //         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //           //If WRITE_EXTERNAL_STORAGE Permission is granted
    //           //changing the state to show Create PDF option
    //           that.createPDF();
    //         } else {
    //           alert('WRITE_EXTERNAL_STORAGE permission denied');
    //         }
    //       } catch (err) {
    //         alert('Write permission err', err);
    //         console.warn(err);
    //       }
    //     }
    //     //Calling the External Write permission function
    //     if (Platform.OS === 'android') {
    //       requestExternalWritePermission();
    //     } else {
    //       this.createPDF();
    //     }
    //   }
	
    //générer html
    //générer html

 


	renderSeparator = () => {
		return (
		<View
			style={{
			height: 1,
			width: "100%",
			backgroundColor: "#CED0CE",
			// marginLeft: "9%"
			}}
		/>
		);
	}; 
	renderColSepa = () => {
		return (
		<View
			style={{
			height: "100%",
			width: 2,
			backgroundColor: "#CED0CE",
			marginRight: "2%"
			}}
		/>
		);
	};
	renderColS = () => {
		return (
		<View
			style={{
			height: "100%",
			width: 2,
			backgroundColor: "red",
			// marginRight: 5
			}}
		/>
		);
	};   
    goHomeParcours() {
		Actions.homeP();
	}

	logoutStudent = () => { 
		try {
		  
		  Alert.alert(
			'Déconnexion',
			'Voulez vous déconnecter?',
			[
				{text: 'Non', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
				{text: 'Oui', onPress: () => this.props.dispatch(logoutStudent())},
			],
			{ cancelable: false }
		);
		  
		} catch (error) {
		  console.log(error);
		}
	   
	  }
	  //videoFunctions
	//   handleMainButtonTouch = () => {
    //     if (this.state.progress >= 1) {
    //     this.player.seek(0);
    //     }

    //     this.setState(state => {
    //     return {
    //         paused: !state.paused,
    //     };
    //     });
	// 	this.timeoutHandle = setTimeout(()=>{
	// 		this.setState({hideControls: true});
	// 	}, 5000);
    // };

    // handleProgressPress = e => {
    //     const position = e.nativeEvent.locationX;
    //     const progress = (position / 250) * this.state.duration;
    //     const isPlaying = !this.state.paused;
        
    //     this.player.seek(progress);
    // };

    // handleProgress = progress => {
    //     this.setState({
    //     progress: progress.currentTime / this.state.duration
    //     });
    // };

    // handleEnd = () => {
    //     this.setState({ paused: true });
    //     this.player.seek(0)
    // };

    // handleLoad = meta => {
    //     this.setState({
    //     duration: meta.duration,paused: true
    //     });
	
    // };
	handleMainButtonTouch = () => {
        if (this.state.progress >= 1) {
        this.player.seek(0);
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
        this.setState({
        progress: progress.currentTime / this.state.duration,
        });
    };

    handleEnd = () => {
        this.setState({ paused: true });
        this.player.seek(0)
    };

    handleLoad = meta => {
        this.setState({
        duration: meta.duration,
        paused: true,
        });
    };

	  renderNodePlayerView = () => {
		  if (this.state.video_path != "") {
			return (
				<View style={{marginHorizontal:20, top:30,flex :1}}>
				<View
				style={{justifyContent:"center",
				backgroundColor:"black",height:390,
				width:760,
				
				 
				  backgroundColor:'red',alignItems:"center",
				 
				}}
				 
				//   onPress={() =>this.onPressVideo()}
				  >
				  <Video 
					source={{ uri:this.state.video_path}} 
					
					  style={{
						height:"100%",
						width:"100%",
						
						// marginLeft:20,
						// marginRight:20,
						// top:30,
						  backgroundColor:'black', 
						//   height:390,
						// width:760,
						
						
						//   backgroundColor:'black' 
						 }}
					  // rate={this.state.rate}
					paused={this.state.paused}
					// volume={this.state.volume}
					// muted={this.state.muted}
					resizeMode={"contain"}
					onLoad={this.handleLoad}
					onProgress={this.handleProgress}
					onEnd={this.handleEnd}
					ref={ref => {
					  this.player = ref;
					}}
					controls={true}
					
					//repeat={true}
		   />
				</View>
				{/* {
				  !this.state.hideControls ?
				  ( */}
					{/* <View 
					style={{flexDirection:"row",backgroundColor: "grey",height: 52,top:25}}
					
					>
		
						<TouchableWithoutFeedback 
						style={{marginRight:15}}
						 onPress={this.handleMainButtonTouch}
						 >
							<Icon
							name={!this.state.paused ? "pause" : "play"}
							color='#fff'
							size= {36}
							style={{marginHorizontal:35}}
							type="material-community"
						
							
								
								/>
						</TouchableWithoutFeedback >
					  <TouchableWithoutFeedback 
					  //style={{marginLeft:15}}
					  onPress={this.handleProgressPress}>
						<ProgressBar
						
						  progress={this.state.progress}
						  color="#FFF"
						  unfilledColor="rgba(255,255,255,.5)"
						  borderColor="#FFF"
						  width={400}
						  height={36}
						//   styleAttr="Horizontal"
						//   indeterminate={false}
						 // progress={this.getCurrentTimePercentage()}
						/>
						</TouchableWithoutFeedback >
						
						
						{/* <Text style={{left:10,color:'#00000',fontWeight:'bold',top:8}} onPress={() => this.onPressBtnPlay()}>{this.state.pausedText}</Text> 
						<Text style={{color:'#fff',fontWeight:'bold',left:25,top:8}}>
							{secondsToTime(Math.floor(this.state.progress * this.state.duration))}/{secondsToTime(Math.floor(this.state.duration))}
						</Text>
						<Icon
						  name= 'download-outline'
						  color='#fff'
						  size= {36}
						containerStyle={{left:45}}
						//   style={{left:5}}
						style={{marginHorizontal:55}}
						  type="material-community"
						  //onPress={}
							  />
						<Icon
						  name= 'delete-outline'
						  color='#fff'
						  size= {36}
						//   containerStyle={{left:490}}
						//   style={{marginRight:30}}
		
						  type="material-community"
							 // onPress={() => this.onPressBtnPlay()}
							  />
						
					  
					</View > */}
				 
				
			  </View>
				);
			  
		  } else {
			  return(
			<View style={{justifyContent:"center",
			backgroundColor:"black",height:390,
			width:760,
			marginHorizontal:20,
			  top:30,
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
                      
                      <TouchableOpacity style={{ backgroundColor:'red',alignItems:"center",width:200,height:60}} onPress={()=>this.create_video_withSubs()}>
                        <Text style={{color:'#fff',fontWeight:'bold',fontSize:14}}>Appuyez ici pour réessayer</Text>
                        <Text style={{color:'#fff',fontWeight:'bold',fontSize:10,marginTop :10}}>{this.state.errorSmb}</Text>
                      </TouchableOpacity>
                      
                      ):(null)}
                    {(this.state.error && this.state.errorMqtt!=="")?  ( 
                      
                      <TouchableOpacity style={{ backgroundColor:'red',alignItems:"center",width:200,height:60}} onPress={()=>this.reconnectMqtt()}>
                        <Text style={{color:'#fff',fontWeight:'bold',fontSize:14}}>Appuyez ici pour réessayer</Text>
                        <Text style={{color:'#fff',fontWeight:'bold',fontSize:10,marginTop :10}}>{this.state.errorMqtt}</Text>
                      </TouchableOpacity>
                      
                      ):(null)}
			</View>
			  )
			  
		  }
	
	};
	// handleMainButtonTouch = () => {
    //     if (this.state.progress >= 1) {
    //     this.video.seek(0);
    //     }

    //     this.setState(state => {
    //     return {
    //         paused: !state.paused,
    //     };
    //     });
    // };
	// // load video event
	// onLoad = (data) => {
	// 	this.setState({ duration: data.duration });
	//   };
	
	//   // video is playing
	//   onProgress = (data) => {
		  
	// 	this.setState({
	// 		progress: data.currentTime / this.state.duration,
	// 		});
	//   };
	
	//   // video ends
	//   onEnd = () => {
	// 	this.setState({ paused: true });
    //     this.video.seek(0)
	//   };
	//   onHandleProgressPress = (e) => {
	// 	const position = e.nativeEvent.locationX;
    //     const progress = (position / 250) * this.state.duration;
    //     const isPlaying = !this.state.paused;
        
    //     this.video.seek(progress);
	//   };
	//   getCurrentTimePercentage() {
	// 	if (this.state.currentTime > 0) {
	// 	  return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
	// 	}
	// 	return 0;
	//   };
	
	//   onChangeRate(itemValue, itemIndex) {
	// 	var rate = parseFloat(itemValue);
	// 	this.setState({pickerValueHolder: itemValue, rate: rate});
	//   }
	 

	//   // pressing on 'play' button
	//   onPressBtnPlay() {
	// 	var pausedText = '';
	// 	let name= 'play'
	// 	if(!this.state.paused){
	// 	  pausedText = 'Play';
	// 	  name = 'play'
	
	// 	  // always show controls
	// 	  if(this.timeoutHandle)
	// 		clearTimeout(this.timeoutHandle);
	// 	}
	// 	else {
	// 	  pausedText = 'Pause';
	// 		name = 'pause'
	// 	  // hide controls after 5s
	// 	  this.timeoutHandle = setTimeout(()=>{
	// 		this.setState({hideControls: true});
	// 	  }, 5000);
	// 	}
	// 	if (this.state.progress >= 1) {
	// 		this.video.seek(0);
	// 		}
	
	// 		this.setState(state => {
	// 		return {
	// 			paused: !state.paused,
	// 		};
	// 		});
	// 	//this.setState({ paused: !this.state.paused, pausedText: pausedText,iconName:name });
	//   }
	
	  // on press video event
	  onPressVideo() {
		//showing controls if they don't show
		if(this.state.hideControls){
		  this.setState({hideControls: false});
		  this.timeoutHandle = setTimeout(()=>{
			this.setState({hideControls: true});
		  }, 8000);
		}
		console.log(this.state.hideControls);
	  }
	
	  // parse seconds to time (hour:minute:second)
	  parseSecToTime(sec) {
		var sec_num = parseInt(sec, 10); // don't forget the second param
		var hours   = Math.floor(sec_num / 3600);
		var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
		var seconds = sec_num - (hours * 3600) - (minutes * 60);
	
		//if (hours   < 10) {hours   = "0" + hours;}
		if (minutes < 10) {minutes = "0" + minutes;}
		if (seconds < 10) {seconds = "0" + seconds;}
	
		return minutes + ':' + seconds;
}
	 // fonction pour envoyer des messages au pi4
  sendMessage(){
	  try {
		MqttSendListItem.client.publish( MqttSendListItem.conProps.channelToUse,this.state.str_data,1, false); 

		MqttSendListItem.client.publish( MqttSendListItem.conProps.channelToUse,this.state.heureDebut,1, false); 
		  
	  } catch (error) {
		  console.log(error);
	  }
	
  }
		
		render() {
		
		//const flexCompleted = this.getCurrentTimePercentage() * 100;
		const Gradient = () => (
			<Defs key={'gradient'}>
				<LinearGradient id={'gradient'} x1={'0'} y={'0%'} x2={'100%'} y2={'0%'}>
					<Stop offset={'0%'} stopColor={'rgb(134, 65, 244)'}/>
					<Stop offset={'100%'} stopColor={'rgb(66, 194, 244)'}/>
				</LinearGradient>
			</Defs>
		) 
		//calcul pourcentage
		const pB = ((this.state.totalB / (this.state.totalB+this.state.totalM+this.state.totalN))*100)
		const pM = ((this.state.totalM/ (this.state.totalB+this.state.totalM+this.state.totalN))*100)
		const pN = ((this.state.totalN / (this.state.totalB+this.state.totalM+this.state.totalN))*100)
		//preparer
		const pBpr = ((this.state.tBPr / (this.state.tBPr+this.state.tMPr+this.state.tNPr))*100)
		const pMpr = ((this.state.tMPr/ (this.state.tBPr+this.state.tMPr+this.state.tNPr))*100)
		const pNpr = ((this.state.tNPr / (this.state.tBPr+this.state.tMPr+this.state.tNPr))*100)
		//voir
		const pBv = ((this.state.tBV / (this.state.tBV+this.state.tMV+this.state.tNV))*100)
		const pMv = ((this.state.tMV/ (this.state.tBV+this.state.tMV+this.state.tNV))*100)
		const pNv = ((this.state.tNV / (this.state.tBV+this.state.tMV+this.state.tNV))*100)
		//prevoir
		const pBp = ((this.state.tBP / (this.state.tBP+this.state.tMP+this.state.tNP))*100)
		const pMp = ((this.state.tMP/ (this.state.tBP+this.state.tMP+this.state.tNP))*100)
		const pNp = ((this.state.tNP / (this.state.tBP+this.state.tMP+this.state.tNP))*100)
		//anticiper
		const pBa = ((this.state.tBA / (this.state.tBA+this.state.tMA+this.state.tNA))*100)
		const pMa = ((this.state.tMA/ (this.state.tBA+this.state.tMA+this.state.tNA))*100)
		const pNa = ((this.state.tNA / (this.state.tBA+this.state.tMA+this.state.tNA))*100)
		
		//HISTO
		const dataT = [
		{
			value: pB,
			svg: {
				fill: '#7FA57F',
			},
		},
		{
			value: pN,
			svg: {
				fill: '#FFFF00',
			},
		},
		{
			value: pM,
			svg: {
				fill: 'red',
			},
		},
	]
	const dataPr= [
		{
			value: pBpr,
			svg: {
			fill: '#7FA57F',
		},
		// label:"j"
		},
		{
			value: pNpr,
			svg: {
				fill: '#FFFF00',
			},
			// label:"j"
		},
		{
			value: pMpr,
			svg: {
				fill: 'red',
			},
			// label:"j"
		},
	]
	const dataV= [
	{
		value: pBv,
		svg: {
			fill: '#7FA57F',
		},
	},
	{
		value: pNv,
		svg: {
			fill: '#FFFF00',
		},
	},
	{
		value: pMv,
		svg: {
			fill: 'red',
		},
	},
	]
	const dataP = [
	{
		value: pBp,
		svg: {
		fill: '#7FA57F',
	},
	},
	{
		value: pNp,
		svg: {
			fill: '#FFFF00',
		},
	},
	{
		value: pMp,
		svg: {
			fill: 'red',
		},
	},
	]
	const dataA = [
	{
		value: pBa,
		svg: {
		fill: '#7FA57F',
	},
	},
	{
		value: pNa,
		svg: {
			fill: '#FFFF00',
		},
	},
	{
		value: pMa,
		svg: {
			fill: 'red',
		},
	},
	]
			return (
			<View style={styles.container}>
				<View style={styles.headerContainer}>
			<View style={{alignItems:"center",flexDirection:"row"}}>
			<Image
                          resizeMode ="contain"
                          style={{width:200, height:260,left:15}}
                          source= {require("../../images/Sanstitre9.png")}
                    />
					<Text style={styles.headerTitle}>CAM DATA</Text>
					<Text style={{color:'#00B0F0',fontSize:16,left:-175, textAlign:'right',fontStyle:"italic",top:20}}>Powered by CleanData</Text>
					</View>
					
					<View style={{flexDirection:"column",left:-60 }}>
					{/* <Text style={{color:'#fff',fontSize:20,top:5,left:-30}}>Synthèse</Text> */}
			<Text style={{color:'#fff',fontSize:20,top: 15,left:-70}}>{this.state.student_first_name} {this.state.student_last_name}</Text>
			<Text style={{color:'#00B0F0',fontSize:14,top:17,left:-70}}>{this.state.heureDebut}</Text>
					</View>
					
				</View>
				
			<View style={{flexDirection:'row',top:10,borderColor:"#808080"}}>
			<View style={styles.test}>
				<View style={styles.counters}>
						<TouchableOpacity>
						<Text>{this.state.totalB}</Text>
						</TouchableOpacity>
				</View>
				<View style={styles.counters1}>
						<TouchableOpacity> 
						<Text>{this.state.totalN}</Text>
						</TouchableOpacity>
				</View>
				<View style={styles.counters2}>
						<TouchableOpacity>
						<Text>{this.state.totalM}</Text>   
						</TouchableOpacity>
				</View>
				</View>

			<BarChart
			style={{ height: 214, width:230,left:20}}
			data={dataT}
			gridMin={0}
			svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
			yAccessor={({ item }) => item.value}
			contentInset={{}}
			>
			<Gradient/>
			<View style={{flexDirection:'column'}}>
			<View style={{flexDirection:'row',top:160,left:20}}>
				<Text style={{left:-2,fontSize:18}}>{pB.toFixed(1)}</Text>
				<Text style={{left:35,fontSize:18}}>{pN.toFixed(1)}</Text>
				<Text style={{left:73,fontSize:18}}>{pM.toFixed(1)}</Text>
				</View> 
				<View style={{flexDirection:'row',top:160,left:20}}>
				<Text style={{left:14,fontSize:18}}>%</Text>
				<Text style={{left:75,fontSize:18}}>%</Text>
				<Text style={{left:135,fontSize:18}}>%</Text>
				</View> 
				</View>                 
			</BarChart>
			<View style={{flexDirection:'row',top:50,left:5}}>
			<TouchableOpacity  style={styles.touch4}>
						<Icon
							name='cryengine'
							type='material-community'
							color='#000000'
							size= {36}
						/>
			</TouchableOpacity>
			<TouchableOpacity  style={styles.touch6}>
			<Text>{this.state.totalEye}</Text>   
			</TouchableOpacity>
			</View>
			<View style={{flexDirection:'row',top:100,left:-95}}>
			<TouchableOpacity  style={styles.touch5}>
						<Icon
							name='ear-hearing'
							type='material-community'
							color='#000000'
							size= {36}
						/>
			</TouchableOpacity>
			<TouchableOpacity  style={styles.touch7}>
			<Text>{this.state.totalEar}</Text>     
			</TouchableOpacity>
			</View>
			<View style={{top:170,left:-10}}>
			<Icon
					name='play'
					type='material-community'
					color='#003789'
					size= {50}
					onPress={() => this.buttonPress()}
				/>
			</View>
			
			</View>
			{this.renderSelectedItems()}
			{this.renderBottomComponent()}
			{this.renderQCMComponent()}
			<Modal animationType="slide"
                  transparent={true}  visible={this.state.clip_error} 
                  
                  onRequestClose={(() => this.setState({clip_error:false}))}>
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
					   backgroundColor:"black",
					   borderColor:'#00B0F0',
					   borderWidth:2,
					   
					   left:100
				  }}>
                  
                    <View style={{flexDirection:"column",marginTop:15}}>
                    <Icon
                        name='exclamation-circle'
                        type='font-awesome-5'
                        color='#fff'
                        size= {36}
                        style={{right:270}}
                        />
                      <View style={{marginVertical:50,justifyContent:"center",alignItems: "center",}}>
                      	<Text style={ { textAlign:"center",fontSize:14,color:'white',fontSize:20} }>
                         	Une erreur est survenue lors de la création des clips
				        </Text>
						{this.state.clip_errorMqtt !== "" ?
						<Text style={ { textAlign:"center",fontSize:14,color:'red',fontSize:12,marginTop:15} }>
                         	{this.state.clip_errorMqtt}
				        </Text>:(null)}
						{(this.state.clip_errorSmb !== ""  && this.state.clip_errorMqtt =="")?
						<Text style={ { textAlign:"center",fontSize:14,color:'red',fontSize:12,marginTop:15} }>
                         	{this.state.clip_errorSmb}
				        </Text>:(null)}
                      </View>
                      <View style={{alignItems:"center",
                          justifyContent:"center",marginTop:25}}>
						{this.state.clip_errorMqtt !== "" ?
						<TouchableOpacity
							onPress={ () => {
								this.setState({clip_error:false,clip_errorMqtt:"",clip_errorSmb:""})
								this.reconnectMqtt2()
							
							}}
							style={ { width:250,height:90,  backgroundColor:"black",alignItems:"center",
							justifyContent:"center",borderColor:'#00B0F0',
							borderWidth:2,
							alignContent:"center",borderRadius:5 } }
							
							>
							<Text style={ {textAlign:"center",fontSize:14,color:'white',fontSize:20} }>
								APPUYER ICI POUR REESSAYER
							</Text>
                      </TouchableOpacity>:
					  (null)}
                      {
						  (this.state.clip_errorSmb !== ""  && this.state.clip_errorMqtt =="")?
						  <TouchableOpacity
                          onPress={ () => {
							this.setState({clip_error:false,clip_errorMqtt:"",clip_errorSmb:""})
							 this.createClip()
                            
                          }}
                          style={ { width:250,height:90,  backgroundColor:"black",alignItems:"center",
                          justifyContent:"center",borderColor:'#00B0F0',
                          borderWidth:2,
                          alignContent:"center",borderRadius:5, marginLeft :25 } }
                          
                        >
                          <Text style={ {textAlign:"center",fontSize:14,color:'white',fontSize:20} }>
						  APPUYER ICI POUR REESSAYER
                          </Text>
                          </TouchableOpacity>:(null)
					  }

                     
                      </View>
                    </View>
                    
                    </View>
                </Modal>
			<MyHiddenView 
			style={{flexDirection:'column',height:380,top:10}}  
			hide={this.state.show}>
			
				<View style={{flexDirection:'row'}} >
				<View style={{flexDirection:'row',borderWidth:1,width:400,height:190,borderColor:"#808080"}}>
						
				<Text style={{left:20,fontSize:16,fontWeight:'bold',top:10}}>PRÉPARER</Text>
				
				<View style={{flexDirection:'row'}}>
				<View style={{width:170,flexDirection: 'row',height:50,top:110,left:-60}}>
				<View style={styles.counter}>
						<TouchableOpacity>
						<Text>{this.state.tBPr}</Text>
						</TouchableOpacity>
				</View>
				<View style={styles.counter1}>
						<TouchableOpacity>
						<Text>{this.state.tNPr}</Text>  
						</TouchableOpacity>
				</View>
				<View style={styles.counter2}>
						<TouchableOpacity>
						<Text>{this.state.tMPr}</Text> 
						</TouchableOpacity>
				</View>
				</View>
				</View> 
				<View> 
				<BarChart
					style={{ height: 114, width:100,left:-80,top:50}}
					data={dataPr}
					gridMin={0}
					// svg={{ fill: 'blue' }}
					yAccessor={({ item }) => item.value}
					// xAccessor={({ item }) => item.label}
					// yAccessor={5}
					contentInset={{}}
					// spacing={0.2}
					>
					<Gradient/>
				</BarChart>
				<View style={{flexDirection:'column'}}>
				<View style={{flexDirection:'row',top:17,left:30}}>
						<Text style={{left:-105,fontSize:10}}>{pBpr.toFixed(1)}</Text>
						<Text style={{left:-93,fontSize:10}}>{pNpr.toFixed(1)}</Text>
						<Text style={{left:-84,fontSize:10}}>{pMpr.toFixed(1)}</Text>
				</View> 
				<View style={{flexDirection:'row',top:17,left:30}}>
						<Text style={{left:-97,fontSize:10}}>%</Text>
						<Text style={{left:-73,fontSize:10}}>%</Text>
						<Text style={{left:-48,fontSize:10}}>%</Text>
				</View> 
				</View> 
				</View>
				<View style={{flexDirection:'column'}}>
				<View style={{flexDirection:'row',top:45,left:-40}}>
					<TouchableOpacity  style={styles.touch8}>
							<Icon
									name='cryengine'
									type='material-community'
									color='#000000'
									size= {24}
								/>
					</TouchableOpacity>
					<TouchableOpacity  style={styles.touch9}>
					<Text>{this.state.cEyePr}</Text>     
					</TouchableOpacity>
					</View>
					<View style={{flexDirection:'row',top:95,left:-40}}>
					<TouchableOpacity  style={styles.touch10}>
							<Icon
									name='ear-hearing'
									type='material-community'
									color='#000000'
									size= {24}
								/>
					</TouchableOpacity>
					<TouchableOpacity  style={styles.touch11}>
					<Text>{this.state.cEarPr}</Text>     
					</TouchableOpacity>
					</View>
				</View>
				</View>  
				<View style={{flexDirection:'row',borderWidth:1,width:400,height:190,borderColor:"#808080"}}>
				
				<Text style={{left:20,fontSize:16,fontWeight:'bold',top:10}}>VOIR</Text>
				<View style={{flexDirection:'row'}}>
				<View style={{width:170,flexDirection: 'row',height:50,top:110,left:-20}}>
				<View style={styles.counter}>
						<TouchableOpacity>
						<Text>{this.state.tBV}</Text>
						</TouchableOpacity>
				</View>
				<View style={styles.counter1}>
						<TouchableOpacity>
						<Text>{this.state.tNV}</Text>
						</TouchableOpacity>
				</View>
				<View style={styles.counter2}>
						<TouchableOpacity>
						<Text>{this.state.tMV}</Text>
						</TouchableOpacity>
				</View>
				</View>
				</View> 
				<View>
				<BarChart
					style={{ height: 114, width:100,left:-40,top:50}}
					data={dataV}
					gridMin={0}
					svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
					yAccessor={({ item }) => item.value}
					contentInset={{}}
					>
					<Gradient/>
				</BarChart>
				<View style={{flexDirection:'column'}}>
				<View style={{flexDirection:'row',top:17,left:70}}>
						<Text style={{left:-104,fontSize:10}}>{pBv.toFixed(1)}</Text>
						<Text style={{left:-94 ,fontSize:10}}>{pNv.toFixed(1)}</Text>
						<Text style={{left:-84,fontSize:10}}>{pMv.toFixed(1)}</Text>
				</View> 
				<View style={{flexDirection:'row',top:17,left:70}}>
						<Text style={{left:-98,fontSize:10}}>%</Text>
						<Text style={{left:-73,fontSize:10}}>%</Text>
						<Text style={{left:-48,fontSize:10}}>%</Text>
				</View> 
				</View> 
				</View>
				<View style={{flexDirection:'column'}}>
				<View style={{flexDirection:'row',top:45,left:1}}>
					<TouchableOpacity  style={styles.touch8}>
							<Icon
									name='cryengine'
									type='material-community'
									color='#000000'
									size= {24}
								/>
					</TouchableOpacity>
					<TouchableOpacity  style={styles.touch9}>
					<Text>{this.state.cEyeV}</Text>   
					</TouchableOpacity>
					</View>
					<View style={{flexDirection:'row',top:95,left:1}}>
					<TouchableOpacity  style={styles.touch10}>
							<Icon
									name='ear-hearing'
									type='material-community'
									color='#000000'
									size= {24}
								/>
					</TouchableOpacity>
					<TouchableOpacity  style={styles.touch11}>
					<Text>{this.state.cEarV}</Text>   
					</TouchableOpacity>
					</View>
				</View>
				</View>  
				</View>
				<View style={{flexDirection:'row'}}>
				<View style={{flexDirection:'row',borderWidth:1,width:400,height:190,borderColor:"#808080"}}>
				<Text style={{left:20,fontSize:16,fontWeight:'bold',top:10}}>PRÉVOIR</Text>
				<View style={{flexDirection:'row'}}>
				<View style={{width:170,flexDirection: 'row',height:50,top:110,left:-50}}>
				<View style={styles.counter}>
						<TouchableOpacity>
						<Text>{this.state.tBP}</Text>
						</TouchableOpacity>
				</View>
				<View style={styles.counter1}>
						<TouchableOpacity>
						<Text>{this.state.tNP}</Text> 
						</TouchableOpacity>
				</View>
				<View style={styles.counter2}>
						<TouchableOpacity>
						<Text>{this.state.tMP}</Text>  
						</TouchableOpacity>
				</View>
				</View>
				</View>  
				<View> 
				<BarChart
						style={{ height: 114, width:100,left:-70,top:50}}
						data={dataP}
						gridMin={0}
						svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
						yAccessor={({ item }) => item.value}
						contentInset={{}}
						>
						<Gradient/>
				</BarChart>
				<View style={{flexDirection:'column'}}>
				<View style={{flexDirection:'row',top:17,left:25}}>
						<Text style={{left:-90,fontSize:10}}>{pBp.toFixed(1)}</Text>
						<Text style={{left:-80,fontSize:10}}>{pNp.toFixed(1)}</Text>
						<Text style={{left:-70,fontSize:10}}>{pMp.toFixed(1)}</Text>
				</View> 
				<View style={{flexDirection:'row',top:17,left:25}}>
						<Text style={{left:-83,fontSize:10}}>%</Text>
						<Text style={{left:-58,fontSize:10}}>%</Text>
						<Text style={{left:-34,fontSize:10}}>%</Text>
				</View> 
				</View> 
				</View>
				<View style={{flexDirection:'column'}}>
				<View style={{flexDirection:'row',top:45,left:-30}}>
					<TouchableOpacity  style={styles.touch8}>
							<Icon
									name='cryengine'
									type='material-community'
									color='#000000'
									size= {24}
								/>
					</TouchableOpacity>
					<TouchableOpacity  style={styles.touch9}>
					<Text>{this.state.cEyeP}</Text>   
					</TouchableOpacity>
					</View>
					<View style={{flexDirection:'row',top:95,left:-30}}>
					<TouchableOpacity  style={styles.touch10}>
							<Icon
									name='ear-hearing'
									type='material-community'
									color='#000000'
									size= {24}
								/>
					</TouchableOpacity>
					<TouchableOpacity  style={styles.touch11}>
					<Text>{this.state.cEarP}</Text>      
					</TouchableOpacity>
					</View>
				</View>
				</View>  
				<View style={{flexDirection:'row',borderWidth:1,width:400,height:190,borderColor:"#808080"}}>
				<Text style={{left:20,fontSize:16,fontWeight:'bold',top:10}}>ANTICIPER</Text>
				<View style={{flexDirection:'row'}}>
				<View style={{width:170,flexDirection: 'row',height:50,top:110,left:-70}}>
				<View style={styles.counter}>
						<TouchableOpacity>
						<Text>{this.state.tBA}</Text>
						</TouchableOpacity>
				</View>
				<View style={styles.counter1}>
						<TouchableOpacity>
						<Text>{this.state.tNA}</Text> 
						</TouchableOpacity>
				</View>
				<View style={styles.counter2}>
						<TouchableOpacity>
						<Text>{this.state.tMA}</Text>   
						</TouchableOpacity>
				</View>
				</View>
				</View> 
				<View> 
				<BarChart
					style={{ height: 114, width:100,left:-90,top:50}}
					data={dataA}
					gridMin={0}
					// svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
					yAccessor={({ item }) => item.value}
					contentInset={{}}
					>
				<Gradient/>
				</BarChart>
				<View style={{flexDirection:'column'}}>
				<View style={{flexDirection:'row',top:18,left:30}}>
						<Text style={{left:-115,fontSize:10}}>{pBa.toFixed(1)}</Text>
						<Text style={{left:-105,fontSize:10}}>{pNa.toFixed(1)}</Text>
						<Text style={{left:-93,fontSize:10}}>{pMa.toFixed(1)}</Text>
				</View> 
				<View style={{flexDirection:'row',top:17,left:30}}>
						<Text style={{left:-107,fontSize:10}}>%</Text>
						<Text style={{left:-83,fontSize:10}}>%</Text>
						<Text style={{left:-58,fontSize:10}}>%</Text>
				</View> 
				</View> 
				</View>
				<View style={{flexDirection:'column'}}>
				<View style={{flexDirection:'row',top:45,left:-50}}>
					<TouchableOpacity  style={styles.touch8}>
							<Icon
									name='cryengine'
									type='material-community'
									color='#000000'
									size= {24}
								/>
					</TouchableOpacity>
					<TouchableOpacity  style={styles.touch9}>
					<Text>{this.state.cEyeA}</Text>     
					</TouchableOpacity>
					</View>
					<View style={{flexDirection:'row',top:95,left:-50}}>
					<TouchableOpacity  style={styles.touch10}>
							<Icon
									name='ear-hearing'
									type='material-community'
									color='#000000'
									size= {24}
								/>
					</TouchableOpacity>
					<TouchableOpacity  style={styles.touch11}>
					<Text>{this.state.cEarA}</Text>     
					</TouchableOpacity>
					</View>
				</View>
				</View>  
				</View>
			</MyHiddenView>
			{this.renderNodePlayerView()}
			<Spinner
                visible={this.state.spinner}
				animation={"fade"}
				overlayColor={"#40606060"}
				indicatorStyle ={{size: "large"}}
                textContent={'Sauvegarde des données en cours...'}
                textStyle={styles.spinnerTextStyle}
				
              />
			<Spinner
                visible={this.state.spinnerClip}
				animation={"slide"}
				overlayColor={"#40606060"}
				indicatorStyle ={{size: "large"}}
                textContent={'Création des clips en cours...'}
                textStyle={styles.spinnerTextStyle}
              />
			{/* 
			  <Spinner
                visible={this.state.spinner2}
                textContent={'Téléchargement en cours...'}
                textStyle={styles.spinnerTextStyle}
              /> */}
			<View style={{flex:1,justifyContent:"flex-end",marginBottom:25}}>
				
			
			{/* style={{top:70,}} */}
			<View style={{flexDirection:"row"}}>
				<Button onPress={() => this.getItemSelected()} mode="contained"
					contentStyle={{width:250,height:60}}
					style={{width:250,height:60, borderRadius:40 ,left:20, justifyContent:'center',alignItems:'center',backgroundColor:'#003789'}}
					labelStyle={{color:'white'}}>
						Créer Clip
				</Button> 
				<Button onPress={() => this.buttonPressC()} mode="contained"
					contentStyle={{width:250,height:60}}
					style={{width:250,height:60, borderRadius:40 ,left: 280, justifyContent:'center',alignItems:'center',backgroundColor:'#003789'}}
					labelStyle={{color:'white',fontSize:18}}>
						QCM -&gt;
				</Button> 
				
			</View>
			</View>

			

		
			<Modal animationType="slide"
			transparent={true} 
			visible={this.state.showD5} 
			onRequestClose={(() => this.setState({showD5:false}))}>
			<View style={styles.modal1}>
			<View style={{justifyContent:"center",
            alignItems: "center",
              flexDirection:'column',
              alignContent:"center",}}>
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
                         STAGIAIRE SUIVANT?
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
		marginLeft: 90,
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

		shadowColor: "#000",
		shadowOffset: {
		width: 0,
		height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		top:320,
		backgroundColor:'#191919',
		borderColor:'#00B0F0',
		borderWidth:2,
		
		left:90
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
	playButton: {
		position: 'absolute',
		bottom: 20,
		left: 20,
		right: 20,
	  },
	  controls: {
		//backgroundColor: 'white',
		opacity: 0.7,
		borderRadius: 5,
		position: 'absolute',
		bottom: -10,
		left: 55,
		right: 55,
		flexDirection: "row",
		//alignItems: "center",
		justifyContent: "space-around",
		//paddingHorizontal: 10,
	  },
	  progress: {
		flex: 1,
		flexDirection: 'row',
		borderRadius: 3,
		overflow: 'hidden',
		//backgroundColor:'blue'
	  },
	  rateControl: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		//backgroundColor:'blue'
	  },
	  playControl: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
	  },
	  resizeModeControl: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	  },
	  fullScreen:{
		//flex:1,
		//   marginHorizontal:20,
		//   top:40,
		//   backgroundColor:'black' 
	  }, 
	  car: {
		height:980,
		backgroundColor:'#1b4f9c',
		//Wtop:10,
	//    borderColor:'black',
	// 	borderWidth:1,
	
	   },
	   car1: {
		height:770,
		backgroundColor:'#f7e86a',
		//Wtop:10,
	//    borderColor:'black',
	// 	borderWidth:1,
	   },
	   car2: {
		height:770,
		backgroundColor:'#48bbdd',
		//Wtop:10,
	//    borderColor:'black',
	// 	borderWidth:1,
	   },
	   car3: {
		height:980,
		backgroundColor:'#5fb157',
		//Wtop:10,
	//    borderColor:'black',
	// 	borderWidth:1,
	   },
	   carR: {
		height:300,
		backgroundColor:'white',
		//Wtop:10,
	//    borderColor:'#00B0F0',
	// 	borderWidth:1,
	   },
	   spinnerTextStyle: {
		color: '#FFF'
	  },
});
// mapStateToProps = (state,props) => ({
// 	createUser: state.authReducer.createNewStudent
//   })
// mapDispatchToProps = (dispatch) => ({
// 	dispatch
// })
// export default connect(mapStateToProps,mapDispatchToProps)(ClotureFormation)


