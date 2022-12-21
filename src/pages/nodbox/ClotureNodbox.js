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
import { Actions } from 'react-native-router-flux'
import Svg from 'react-native-svg';
import { Line } from 'react-native-svg';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
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

import Spinner from 'react-native-loading-spinner-overlay';
import * as Sentry from '@sentry/react-native';

const permissions = [PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE, PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION]



export default class ClotureNodbox extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			// asyncId:this.props.asyncId,
			showD1: false,
			showD2: false,
			showD3: false,
			showD4: false,
			showD5: false,
			showD7: false,
			showC2: false,
			signD: false,
			signD1: false,
			sign1: undefined,
			sign2: undefined,
			//infos trainer
			trainer_id: "",
			trainer_first_name: "",
			trainer_last_name: "",
			//infos student
			student_id: "",
			student_first_name: "",
			student_last_name: "",
			//commentaire
			comment: "",
			//heure
			heureDebut: "",
			heureFin: "",

			//for the qcm
			showQCM: true,
			//for exercice sur piste
			showESP: false,

			//preparer
			btn1: 0.0,
			activeBtn1: false,
			btn2: 0.0,
			activeBtn2: false,
			btn3: 0.0,
			activeBtn3: false,
			btn4: 0.0,
			activeBtn4: false,
			comment1: "",

			btn5: 0.0,
			activeBtn5: false,
			btn6: 0.0,
			activeBtn6: false,
			btn7: 0.0,
			activeBtn7: false,
			btn8: 0.0,
			activeBtn8: false,
			comment2: "",

			btn9: 0.0,
			activeBtn9: false,
			btn10: 0.0,
			activeBtn10: false,
			btn11: 0.0,
			activeBtn11: false,
			btn12: 0.0,
			activeBtn12: false,
			comment3: "",

			btn13: 0.0,
			activeBtn13: false,
			btn14: 0.0,
			activeBtn14: false,
			btn15: 0.0,
			activeBtn15: false,
			btn16: 0.0,
			activeBtn16: false,
			comment4: "",

			//PREVOIR			
			btnP1: 0.0,
			activeBtnP1: false,
			btnP2: 0.0,
			activeBtnP2: false,
			btnP3: 0.0,
			activeBtnP3: false,
			btnP4: 0.0,
			activeBtnP4: false,
			commentP1: "",

			btnP5: 0.0,
			activeBtnP5: false,
			btnP6: 0.0,
			activeBtnP6: false,
			btnP7: 0.0,
			activeBtnP7: false,
			btnP8: 0.0,
			activeBtnP8: false,
			commentP2: "",

			btnP9: 0.0,
			activeBtnP9: false,
			btnP10: 0.0,
			activeBtnP10: false,
			btnP11: 0.0,
			activeBtnP11: false,
			btnP12: 0.0,
			activeBtnP12: false,
			commentP3: "",


			btnP13: 0.0,
			activeBtnP13: false,
			btnP14: 0.0,
			activeBtnP14: false,
			btnP15: 0.0,
			activeBtnP15: false,
			btnP16: 0.0,
			activeBtnP16: false,
			commentP4: "",

			//total QCM
			totalVert: 0.0,
			totalJaune: 0.0,
			totalRouge: 0.0,
			totalGris: 0.0,

			tauxCJ: 0.0,
			tauxEv: 0.0,
			spinner: false,
			spinner2: false,

			//durée temps de réaction
			reactionN1: "",
			reactionN1: "",
			tdr: 0.0,
			conso1: 0,
			conso2: 0,
			message: "",

			confirmNextStudent:false,
			confirmNewFormation:false,
			warningQCM:false
		}
		this.getInfo = this.getInfo.bind(this)
		// // this.saveData = this.saveData.bind(this)
		this.getInfo()
	}
	;
	//   UNSAFE_componentWillReceiveProps(props){

	//       if(this.state.stats1 != props.stats1){
	//        this.setState({stats1 : props.stats1})
	//         console.log("vc"+ props.stats1);
	//       }
	//       if(this.state.stats2 != props.stats2){
	//         this.setState({stats2 : props.stats2})
	//          console.log("v2"+ props.stats2);
	//        }


	//     console.log(props);

	//   }
	async current() {
		let today = new Date();
		let datetime = ("0" + today.getDate()).slice(-2) + "/" + ("0" + (today.getMonth() + 1)).slice(-2) + "/" + today.getFullYear() + " " + ("0" + today.getHours()).slice(-2) + ":" + ("0" + today.getMinutes()).slice(-2) + ":" + ("0" + today.getSeconds()).slice(-2);
		try {
			await AsyncStorage.setItem("@heure", datetime)
		} catch (error) {
			console.log(error);
			Sentry.captureException(error);
		}

	}

	async currentF() {
		let today = new Date();
		let datetime = ("0" + today.getDate()).slice(-2) + "/" + ("0" + (today.getMonth() + 1)).slice(-2) + "/" + today.getFullYear() + " " + ("0" + today.getHours()).slice(-2) + ":" + ("0" + today.getMinutes()).slice(-2) + ":" + ("0" + today.getSeconds()).slice(-2);
		try {
			await AsyncStorage.setItem("@heurefin", datetime)
		} catch (error) {
			console.log(error)
			Sentry.captureException(error);
		}

	}
	//   openDialog = (show) => {
	//     this.setState({ showD1: show});
	// }
	async cloture() {
		let heure = await AsyncStorage.getItem("@heure")
		if (heure != null) {
			this.currentF()
			this.setState({ showD2: true })
		} else {
			Alert.alert(
				'Accès Refusé',
				'Vous ne pouvez pas accéder à cette fonctionnalité pour le moment. Lancer le test d' + "'" + 'abord.',
				[
					{ text: 'OK', onPress: () => console.log('OK Pressed'), style: "cancel" },
				],
				{ cancelable: false }
			);
		}

		// let count1 = Object.keys(this.props.stats1)
		// let count2= Object.keys(this.props.stats2) 
		// console.log(this.props.stats1);
		// console.log(this.props.stats2);
		// let count1 = 0
		// let count2 = 0

		// if (this.props.stats1 == undefined) {
		//   count1=0
		// } else {
		//   count1 = Object.keys(this.props.stats1).length
		// }
		// if (this.props.stats2 == undefined) {
		//   count2=0
		// } else {
		//   count2 = Object.keys(this.props.stats2).length
		// }

		//   if((count1>0) && (count2 > 0) ){
		//     this.getInfo()
		//     this.setState({showD2: true})
		//   }else{
		//     this.setState({showD1: true})
		//   }
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
	async componentDidMount() {
		BackHandler.addEventListener('backPress', () => { return true });
		try {
			//   await AsyncStorage.multiRemove(
			//     ["@heure","@heurefin",'@student_id',
			//     '@student_first_name','@student_last_name','@trainer_first_name','@trainer_last_name',
			//     'courbe_data','post_data','nodbox_video_path'])
			setTimeout(() => {
				this.getPInitiale()
			}, 2000);

			this.checkMultiplePermissions(permissions)
			console.log('yes');
			this.setState({warningQCM:true})
             

		} catch (error) {
			// Error retrieving data
			Sentry.captureException(error);
			console.log(error);
		}

	}
	// accueil() {
	//      Actions.accueilNodbox({stage:this.props.stage, typeF : this.props.typeF,asyncId:this.props.asyncId})
	//     //Actions.selectV()
	//   }

	async nextStudent() {
		try {
			this.setState({ showD5: false,confirmNextStudent:false})
		console.log(this.props.stageName + "rrr");

		await AsyncStorage.multiRemove([

			'qcmDataN',
			'@heurefin',
			'@heure',
			'courbe_data',
			'histo_data',
			'post_data',
			'nodbox_video_path'

		])
		Actions.popTo("listeStudentNB", { stage: this.props.stage, stageName: this.props.stageName, })
		} catch (error) {
			Sentry.captureException(error);
		}
		
	}
	async newFormation() {
		try {
			this.setState({showD5:false,confirmNewFormation:false})
			console.log(this.props.stageName + "rrr");

			this.sendDataToBDD()
			//await this.props.dispatch(createNewStudent(undefined))

			let studentEvalue = await AsyncStorage.getItem('nb_student_evalue')

			let jsonStudentE = JSON.parse(studentEvalue)

			for (let index = 0; index < jsonStudentE.length; index++) {
				const el = jsonStudentE[index];
				console.log(el);
				await AsyncStorage.removeItem('nb_training' + el.toString())
				//console.log(formation);


			}
			setTimeout(() => {
				// AsyncStorage.removeItem('pr_totalStudent',(error)  =>{console.log(error)})
				AsyncStorage.removeItem('nb_student_evalue', (error) => { console.log(error) })
				
				// Actions.homeP() 
				console.log(this.props.stage + "rrr");
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
			console.log(error);
			Sentry.captureException(error);
		}
		// this.setState({showD5:false})
		// await this.props.dispatch(createNewStudent(undefined))
		// let indextotal = await AsyncStorage.getItem('nb_totalStudent')
		// if (this.props.asyncId === parseInt(indextotal,10)) {
		// 	if ( parseInt(indextotal,10) === 1) {
		// 		AsyncStorage.removeItem('nb_training'+this.props.asyncId.toString())
		// 	}
		//  else {
		// 	for (let index = 1; index <= parseInt (indextotal); index++) {

		// 		await AsyncStorage.removeItem('nb_training'+index.toString())

		// 	   }
		// 	}
		// }
		// 	setTimeout(() => {
		// 		AsyncStorage.removeItem('nb_totalStudent',(error)  =>{console.log(error)})
		// 		Actions.home() 
		// 		console.log(this.props);

		// 	}, 1000);
	}
	fermerApp() {
		this.setState({ showD5: false })
		BackHandler.exitApp()
	}
	async getInfo() {
		console.log(this.props.asyncId);
		try {
			let str_stdId = await AsyncStorage.getItem('@nb_student_id' + this.props.asyncId.toString())
			let str_trId = await AsyncStorage.getItem('@trainer_id')

			let str_std_fname = await AsyncStorage.getItem('@nb_student_first_name' + this.props.asyncId.toString())
			let str_std_lname = await AsyncStorage.getItem('@nb_student_last_name' + this.props.asyncId.toString())

			let str_trfname = await AsyncStorage.getItem('@trainer_first_name')
			let str_trlname = await AsyncStorage.getItem('@trainer_last_name')

			// let str_signstd=await AsyncStorage.getItem('@sign1')
			// let str_signtr = await AsyncStorage.getItem('@sign2')

			let str_heure = await AsyncStorage.getItem('@heure')
			let str_heureF = await AsyncStorage.getItem('@heurefin')


			let str_email = await AsyncStorage.getItem('@nb_student_email' + this.props.asyncId.toString())
			console.warn(str_trId);
			console.log(str_std_fname);
			console.log(str_trfname);
			console.warn(str_email);
			this.setState({
				trainer_id: str_trId,
				trainer_first_name: str_trfname,
				trainer_last_name: str_trlname,

				student_id: str_stdId,
				student_first_name: str_std_fname,
				student_last_name: str_std_lname,

				heureDebut: str_heure,
				heureFin: str_heureF,


				student_email: str_email
			})
			// console.log(typeof this.state.trainer_id);
			// console.log(parseInt(this.state.trainer_id,10) +1);

		} catch (error) {
			console.log(error);
			Sentry.captureException(error);
		}
	}
	getResultat() {
		let result = 0
		if (this.state.conso1 !== 0) {
			result = (((parseFloat(this.state.conso2) * 100) / parseFloat(this.state.conso1)) - 100).toFixed(2)
		} else {
			result = 0
		}
		return result;

	}
	async getPInitiale() {
		if (this.props.typeF === "finale") {
			try {
				let post_data = await AsyncStorage.getItem('post_data')
				let json_post_data = JSON.parse("[" + post_data + "]")
				this.setState({ conso2: json_post_data[0].mean_fuel_consumption.toFixed(2) })

				let initialData = await AsyncStorage.getItem('nb_initial' + this.props.asyncId.toString())
				console.log(initialData);
				if (initialData === null) {
					const url = 'https://api.cleandata.link/api/formation/nodbox/initial/'
					console.log(url + this.state.trainer_id + '/' + this.state.student_email);
					axios.get(url + this.state.trainer_id + '/' + this.state.student_email)

						.then((response) => {
							console.log("yess");
							console.log(response.data);
							if (response.data.status === "failed") {
								this.setState({ conso1: 0, message: response.data.message + " pour l'" + "évaluation initiale. La consommation du Test N1 est mise à 0." })
							} else {
								this.setState({ conso1: response.data.mean_fuel_consumption.toFixed(2) })
							}

						})
						.catch((error) => console.log(error))


					//alert("post_VALUE_SAVED" + post_data)

				} else {
					console.log(JSON.parse(initialData).stats.mean_fuel_consumption.toFixed(2));
					this.setState({ conso1: JSON.parse(initialData).stats.mean_fuel_consumption.toFixed(2) })
				}

			} catch (error) {
				Sentry.captureException(error);
				console.log(error);
			}
		} else {
			let post_data = await AsyncStorage.getItem('post_data')
			//alert("post_VALUE_SAVED" + post_data)
			let json_post_data = JSON.parse("[" + post_data + "]")
			// let json_post_data= JSON.parse(post_data)
			this.setState({ conso1: json_post_data[0].mean_fuel_consumption.toFixed(2) })
			this.setState({ conso2: 0 })
		}


	}

	async saveData() {

		try {
			await AsyncStorage.multiGet(['post_data', 'qcmDataN']).then((data) => {
				let str_data = ""

				let str_qcmData = ""

				if (data[0][1] != null) {
					str_data = data[0][1].slice(0)
				}

				if (data[1][1] != null) {
					str_qcmData = data[1][1].slice(0)
				}
				// if (this.props.typeF === "initial") {
				//     let obj ={
				//         id :parseInt(this.state.student_id,10),
				//         stats : JSON.parse(str_data)
				//     }
				//     AsyncStorage.getItem('nb_initial'+this.props.asyncId.toString()).then((data) => {
				//         if(data === null){
				//           data= JSON.stringify(obj)

				//           AsyncStorage.setItem('nb_initial'+this.props.asyncId.toString(),data)
				//         }else{
				//         // data=data+','+JSON.stringify(obj)
				//         data=JSON.stringify(obj)
				//             //console.log(data);
				//         AsyncStorage.removeItem('nb_initial'+this.props.asyncId.toString()).then(

				//           AsyncStorage.setItem('nb_initial'+this.props.asyncId.toString(),data)
				//         )
				//         }
				//       }).done()
				// }
				let data_qcmData = JSON.parse("[" + str_qcmData + "]")
				let data_ = JSON.parse(str_data)
				//console.log(data_qcmData);
				let obj = {

					id_student: parseInt(this.state.student_id, 10),
					start_time: this.state.heureDebut,
					end_time: this.state.heureFin,

					data: [

						{
							type_formation: "nodbox",
							type: this.props.typeF,
							data: [
								{
									data_nodbox: data_,
									qcmData: data_qcmData,
								}
							],
						}

					]



				}
				AsyncStorage.getItem('nb_training' + this.props.asyncId.toString()).then((data) => {
					if (data === null) {
						data = JSON.stringify(obj)

						AsyncStorage.setItem('nb_training' + this.props.asyncId.toString(), data)
					} else {
						// data=data+','+JSON.stringify(obj)
						data = JSON.stringify(obj)
						console.log(data);
						AsyncStorage.removeItem('nb_training' + this.props.asyncId.toString()).then(

							AsyncStorage.setItem('nb_training' + this.props.asyncId.toString(), data)
						)
					}
				}).done()


				// const url='https://api.cleandata.link/api/formation/gcam/';
				// axios.post(url, obj).then(response=>{
				// 	console.log(response);
				// })

			})
		} catch (e) {
			console.log(e);
			Sentry.captureException(e);
			// return null;
		}


	}

	async sendDataToBDD() {
		//let indextotal = await AsyncStorage.getItem('pr_totalStudent')
		let studentEvalue = await AsyncStorage.getItem('nb_student_evalue')
		console.log(studentEvalue);
		let jsonStudentE = JSON.parse(studentEvalue)
		let data = []
		for (let index = 0; index < jsonStudentE.length; index++) {
			const el = jsonStudentE[index];
			console.log(el);
			const formation = await AsyncStorage.getItem('nb_training' + el.toString())
			//console.log(formation);
			data.push(formation)

		}
		let json_data = JSON.parse('[' + data + ']')

		console.log(json_data);
		AsyncStorage.getItem('data_formation').then((datas) => {
			if (datas === null) {
				datas = JSON.stringify(json_data)
				//console.log(datas);

				AsyncStorage.setItem('data_formation', datas)
			} else {
				let datas_j = JSON.parse(datas)
				datas_j = datas_j.concat(json_data)

				datas = JSON.stringify(datas_j)
				console.log(datas)
				AsyncStorage.removeItem('data_formation').then(

					AsyncStorage.setItem('data_formation', datas)
				)
			}

			// data=data+','+JSON.stringify(obj)

		}).done();

	}




	buttonPressC = () => {
		this.setState({ showQCM: true })
		// this.setState({showC1:true})
	}
	//PREPARER
	onBtn1Press() {
		this.setState({ btn1: 25.0, activeBtn2: true, activeBtn3: true, activeBtn4: true })

		this.TextInput.focus()
		setTimeout(() => {
			this.setState({
				totalVert: this.state.btn1 + this.state.btn5 + this.state.btn9 + this.state.btn13
			})
			this.setState({ tauxCJ: this.state.totalVert + this.state.totalJaune + this.state.totalGris + this.state.totalRouge })
			this.setState({ tauxEv: this.state.tauxCJ * 0.9 })
		}, 10);
		setTimeout(() => {
			let qcmData = {
				item_qcm_category: "eco-conduite",
				item_qcm_sub_category: "anticipation",
				qcm_item: "application_reguliere",
				comment: this.state.comment1

			}
			AsyncStorage.getItem('qcmDataN').then((data) => {
				if (data === null) {
					data = JSON.stringify(qcmData)
					AsyncStorage.setItem('qcmDataN', data)
				} else {
					data = data + ',' + JSON.stringify(qcmData)
					AsyncStorage.removeItem('qcmDataN').then(

						AsyncStorage.setItem('qcmDataN', data)
					)
				}
			}).done()
		}, 30000);


	}
	onBtn2Press() {
		this.setState({ btn2: 12.5, activeBtn1: true, activeBtn3: true, activeBtn4: true })
		this.TextInput.focus()
		setTimeout(() => {
			this.setState({
				totalJaune: this.state.btn2 + this.state.btn6 + this.state.btn10 + this.state.btn14
			})

			this.setState({ tauxCJ: this.state.totalVert + this.state.totalJaune + this.state.totalGris + this.state.totalRouge })
			this.setState({ tauxEv: this.state.tauxCJ * 0.9 })
		}, 10);
		setTimeout(() => {
			let qcmData = {
				item_qcm_category: "eco-conduite",
				item_qcm_sub_category: "anticipation",
				qcm_item: "application_irreguliere",
				comment: this.state.comment1

			}
			AsyncStorage.getItem('qcmDataN').then((data) => {
				if (data === null) {
					data = JSON.stringify(qcmData)
					AsyncStorage.setItem('qcmDataN', data)
				} else {
					data = data + ',' + JSON.stringify(qcmData)
					AsyncStorage.removeItem('qcmDataN').then(

						AsyncStorage.setItem('qcmDataNN', data)
					)
				}
			}).done()
		}, 30000);


	}
	onBtn3Press() {
		this.setState({ btn3: 0.0, activeBtn2: true, activeBtn1: true, activeBtn4: true })

		this.TextInput.focus()
		setTimeout(() => {
			this.setState({
				totalRouge: this.state.btn3 + this.state.btn7 + this.state.btn11 + this.state.btn15
			})
			this.setState({ tauxCJ: this.state.totalVert + this.state.totalJaune + this.state.totalGris + this.state.totalRouge })
			this.setState({ tauxEv: this.state.tauxCJ * 0.9 })
		}, 10);

		setTimeout(() => {
			let qcmData = {
				item_qcm_category: "eco-conduite",
				item_qcm_sub_category: "anticipation",
				qcm_item: "rarement_applique",
				comment: this.state.comment1

			}
			AsyncStorage.getItem('qcmDataN').then((data) => {
				if (data === null) {
					data = JSON.stringify(qcmData)
					AsyncStorage.setItem('qcmDataN', data)
				} else {
					data = data + ',' + JSON.stringify(qcmData)
					AsyncStorage.removeItem('qcmDataN').then(

						AsyncStorage.setItem('qcmDataN', data)
					)
				}
			}).done()
		}, 30000);


	}
	onBtn4Press() {
		this.setState({ btn4: 0.0, activeBtn2: true, activeBtn3: true, activeBtn1: true })
		this.TextInput.focus()
		setTimeout(() => {
			this.setState({
				totalGris: this.state.btn4 + this.state.btn8 + this.state.btn12 + this.state.btn16

			})

			this.setState({ tauxCJ: this.state.totalVert + this.state.totalJaune + this.state.totalGris + this.state.totalRouge })
			this.setState({ tauxEv: this.state.tauxCJ * 0.9 })
		}, 10);

		setTimeout(() => {
			let qcmData = {
				item_qcm_category: "eco-conduite",
				item_qcm_sub_category: "anticipation",
				qcm_item: "non_evalue",
				comment: this.state.comment1

			}
			AsyncStorage.getItem('qcmDataN').then((data) => {
				if (data === null) {
					data = JSON.stringify(qcmData)
					AsyncStorage.setItem('qcmDataN', data)
				} else {
					data = data + ',' + JSON.stringify(qcmData)
					AsyncStorage.removeItem('qcmDataN').then(

						AsyncStorage.setItem('qcmDataN', data)
					)
				}
			}).done()
		}, 30000);


	}
	//
	onBtn5Press() {
		this.setState({ btn5: 25.0, activeBtn6: true, activeBtn7: true, activeBtn8: true })

		this.TextInput1.focus()
		setTimeout(() => {
			this.setState({
				totalVert: this.state.btn1 + this.state.btn5 + this.state.btn9 + this.state.btn13

			})
			this.setState({ tauxCJ: this.state.totalVert + this.state.totalJaune + this.state.totalGris + this.state.totalRouge })
			this.setState({ tauxEv: this.state.tauxCJ * 0.9 })
		}, 10);
		setTimeout(() => {
			let qcmData = {
				item_qcm_category: "eco-conduite",
				item_qcm_sub_category: "gestion_des_accelerations",
				qcm_item: "application_reguliere",
				comment: this.state.comment2

			}
			AsyncStorage.getItem('qcmDataN').then((data) => {
				if (data === null) {
					data = JSON.stringify(qcmData)
					AsyncStorage.setItem('qcmDataN', data)
				} else {
					data = data + ',' + JSON.stringify(qcmData)
					AsyncStorage.removeItem('qcmDataN').then(

						AsyncStorage.setItem('qcmDataN', data)
					)
				}
			}).done()
		}, 30000);

	}
	onBtn6Press() {
		this.setState({ btn6: 12.5, activeBtn5: true, activeBtn7: true, activeBtn8: true })
		this.TextInput1.focus()
		setTimeout(() => {
			this.setState({
				totalJaune: this.state.btn2 + this.state.btn6 + this.state.btn10 + this.state.btn14

			})

			this.setState({ tauxCJ: this.state.totalVert + this.state.totalJaune + this.state.totalGris + this.state.totalRouge })
			this.setState({ tauxEv: this.state.tauxCJ * 0.9 })
		}, 10);

		setTimeout(() => {
			let qcmData = {
				item_qcm_category: "eco-conduite",
				item_qcm_sub_category: "gestion_des_accelerations",
				qcm_item: "application_irreguliere",
				comment: this.state.comment2

			}
			AsyncStorage.getItem('qcmDataN').then((data) => {
				if (data === null) {
					data = JSON.stringify(qcmData)
					AsyncStorage.setItem('qcmDataN', data)
				} else {
					data = data + ',' + JSON.stringify(qcmData)
					AsyncStorage.removeItem('qcmDataN').then(

						AsyncStorage.setItem('qcmDataN', data)
					)
				}
			}).done()
		}, 30000);
	}
	onBtn7Press() {
		this.setState({ btn7: 0.0, activeBtn5: true, activeBtn6: true, activeBtn8: true })
		this.TextInput1.focus()
		setTimeout(() => {
			this.setState({
				totalRouge: this.state.btn3 + this.state.btn7 + this.state.btn11 + this.state.btn15

			})
			this.setState({ tauxCJ: this.state.totalVert + this.state.totalJaune + this.state.totalGris + this.state.totalRouge })
			this.setState({ tauxEv: this.state.tauxCJ * 0.9 })
		}, 10);

		setTimeout(() => {
			let qcmData = {
				item_qcm_category: "eco-conduite",
				item_qcm_sub_category: "gestion_des_accelerations",
				qcm_item: "rarement_applique",
				comment: this.state.comment2

			}
			AsyncStorage.getItem('qcmDataN').then((data) => {
				if (data === null) {
					data = JSON.stringify(qcmData)
					AsyncStorage.setItem('qcmDataN', data)
				} else {
					data = data + ',' + JSON.stringify(qcmData)
					AsyncStorage.removeItem('qcmDataN').then(

						AsyncStorage.setItem('qcmDataN', data)
					)
				}
			}).done()
		}, 30000);

	}
	onBtn8Press() {
		this.setState({ btn8: 0.0, activeBtn5: true, activeBtn6: true, activeBtn7: true })
		this.TextInput1.focus()
		setTimeout(() => {


			this.setState({
				totalGris: this.state.btn4 + this.state.btn8 + this.state.btn12 + this.state.btn16

			})

			this.setState({ tauxCJ: this.state.totalVert + this.state.totalJaune + this.state.totalGris + this.state.totalRouge })
			this.setState({ tauxEv: this.state.tauxCJ * 0.9 })
		}, 10);

		setTimeout(() => {
			let qcmData = {
				item_qcm_category: "eco-conduite",
				item_qcm_sub_category: "gestion_des_accelerations",
				qcm_item: "non_evalue",
				comment: this.state.comment2

			}
			AsyncStorage.getItem('qcmDataN').then((data) => {
				if (data === null) {
					data = JSON.stringify(qcmData)
					AsyncStorage.setItem('qcmDataN', data)
				} else {
					data = data + ',' + JSON.stringify(qcmData)
					AsyncStorage.removeItem('qcmDataN').then(

						AsyncStorage.setItem('qcmDataN', data)
					)
				}
			}).done()
		}, 30000);
	}
	//
	onBtn9Press() {
		this.setState({ btn9: 25.0, activeBtn10: true, activeBtn11: true, activeBtn12: true })
		this.TextInput2.focus()

		setTimeout(() => {
			this.setState({
				totalVert: this.state.btn1 + this.state.btn5 + this.state.btn9 + this.state.btn13

			})

			this.setState({ tauxCJ: this.state.totalVert + this.state.totalJaune + this.state.totalGris + this.state.totalRouge })
			this.setState({ tauxEv: this.state.tauxCJ * 0.9 })
		}, 10);

		setTimeout(() => {
			let qcmData = {
				item_qcm_category: "eco-conduite",
				item_qcm_sub_category: "gestion_de_l_elan",
				qcm_item: "application_reguliere",
				comment: this.state.comment3

			}
			AsyncStorage.getItem('qcmDataN').then((data) => {
				if (data === null) {
					data = JSON.stringify(qcmData)
					AsyncStorage.setItem('qcmDataN', data)
				} else {
					data = data + ',' + JSON.stringify(qcmData)
					AsyncStorage.removeItem('qcmDataN').then(

						AsyncStorage.setItem('qcmDataN', data)
					)
				}
			}).done()
		}, 30000);

	}
	onBtn10Press() {
		this.setState({ btn10: 12.5, activeBtn9: true, activeBtn11: true, activeBtn12: true })
		this.TextInput2.focus()
		setTimeout(() => {
			this.setState({
				totalJaune: this.state.btn2 + this.state.btn6 + this.state.btn10 + this.state.btn14

			})

			this.setState({ tauxCJ: this.state.totalVert + this.state.totalJaune + this.state.totalGris + this.state.totalRouge })
			this.setState({ tauxEv: this.state.tauxCJ * 0.9 })
		}, 10);
		setTimeout(() => {
			let qcmData = {
				item_qcm_category: "eco-conduite",
				item_qcm_sub_category: "gestion_de_l_elan",
				qcm_item: "application_irreguliere",
				comment: this.state.comment3

			}
			AsyncStorage.getItem('qcmDataN').then((data) => {
				if (data === null) {
					data = JSON.stringify(qcmData)
					AsyncStorage.setItem('qcmDataN', data)
				} else {
					data = data + ',' + JSON.stringify(qcmData)
					AsyncStorage.removeItem('qcmDataN').then(

						AsyncStorage.setItem('qcmDataN', data)
					)
				}
			}).done()
		}, 30000);

	}
	onBtn11Press() {
		this.setState({ btn11: 0.0, activeBtn10: true, activeBtn9: true, activeBtn12: true })
		this.TextInput2.focus()
		setTimeout(() => {
			this.setState({
				totalRouge: this.state.btn3 + this.state.btn7 + this.state.btn11 + this.state.btn15
			})

			this.setState({ tauxCJ: this.state.totalVert + this.state.totalJaune + this.state.totalGris + this.state.totalRouge })
			this.setState({ tauxEv: this.state.tauxCJ * 0.9 })
		}, 10);

		setTimeout(() => {
			let qcmData = {
				item_qcm_category: "eco-conduite",
				item_qcm_sub_category: "gestion_de_l_elan",
				qcm_item: "rarement_applique",
				comment: this.state.comment3

			}
			AsyncStorage.getItem('qcmDataN').then((data) => {
				if (data === null) {
					data = JSON.stringify(qcmData)
					AsyncStorage.setItem('qcmDataN', data)
				} else {
					data = data + ',' + JSON.stringify(qcmData)
					AsyncStorage.removeItem('qcmDataN').then(

						AsyncStorage.setItem('qcmDataN', data)
					)
				}
			}).done()
		}, 30000);

	}
	onBtn12Press() {
		this.setState({ btn12: 0.0, activeBtn10: true, activeBtn11: true, activeBtn9: true })
		this.TextInput2.focus()
		setTimeout(() => {
			this.setState({
				totalGris: this.state.btn4 + this.state.btn8 + this.state.btn12 + this.state.btn16
			})

			this.setState({ tauxCJ: this.state.totalVert + this.state.totalJaune + this.state.totalGris + this.state.totalRouge })
			this.setState({ tauxEv: this.state.tauxCJ * 0.9 })
		}, 10);

		setTimeout(() => {
			let qcmData = {
				item_qcm_category: "eco-conduite",
				item_qcm_sub_category: "gestion_de_l_elan",
				qcm_item: "non_evalue",
				comment: this.state.comment3

			}
			AsyncStorage.getItem('qcmDataN').then((data) => {
				if (data === null) {
					data = JSON.stringify(qcmData)
					AsyncStorage.setItem('qcmDataN', data)
				} else {
					data = data + ',' + JSON.stringify(qcmData)
					AsyncStorage.removeItem('qcmDataN').then(

						AsyncStorage.setItem('qcmDataN', data)
					)
				}
			}).done()
		}, 30000);

	}
	//
	onBtn13Press() {
		this.setState({ btn13: 25.0, activeBtn14: true, activeBtn15: true, activeBtn16: true })
		this.TextInput3.focus()
		setTimeout(() => {
			this.setState({
				totalVert: this.state.btn1 + this.state.btn5 + this.state.btn9 + this.state.btn13
			})

			this.setState({ tauxCJ: this.state.totalVert + this.state.totalJaune + this.state.totalGris + this.state.totalRouge })
			this.setState({ tauxEv: this.state.tauxCJ * 0.9 })
		}, 10);

		setTimeout(() => {
			let qcmData = {
				item_qcm_category: "eco-conduite",
				item_qcm_sub_category: "recuperation_d_energie",
				qcm_item: "application_reguliere",
				comment: this.state.comment4

			}
			AsyncStorage.getItem('qcmDataN').then((data) => {
				if (data === null) {
					data = JSON.stringify(qcmData)
					AsyncStorage.setItem('qcmDataN', data)
				} else {
					data = data + ',' + JSON.stringify(qcmData)
					AsyncStorage.removeItem('qcmDataN').then(

						AsyncStorage.setItem('qcmDataN', data)
					)
				}
			}).done()
		}, 30000);

	}
	onBtn14Press() {
		this.setState({ btn14: 12.5, activeBtn13: true, activeBtn15: true, activeBtn16: true })
		this.TextInput3.focus()

		setTimeout(() => {
			this.setState({
				totalJaune: this.state.btn2 + this.state.btn6 + this.state.btn10 + this.state.btn14
			})

			this.setState({ tauxCJ: this.state.totalVert + this.state.totalJaune + this.state.totalGris + this.state.totalRouge })
			this.setState({ tauxEv: this.state.tauxCJ * 0.9 })
		}, 10);

		setTimeout(() => {
			let qcmData = {
				item_qcm_category: "eco-conduite",
				item_qcm_sub_category: "recuperation_d_energie",
				qcm_item: "application_irreguliere",
				comment: this.state.comment4

			}
			AsyncStorage.getItem('qcmDataN').then((data) => {
				if (data === null) {
					data = JSON.stringify(qcmData)
					AsyncStorage.setItem('qcmDataN', data)
				} else {
					data = data + ',' + JSON.stringify(qcmData)
					AsyncStorage.removeItem('qcmDataN').then(

						AsyncStorage.setItem('qcmDataN', data)
					)
				}
			}).done()
		}, 30000);


	}
	onBtn15Press() {
		this.setState({ btn15: 0.0, activeBtn14: true, activeBtn13: true, activeBtn16: true })
		this.TextInput3.focus()

		setTimeout(() => {
			this.setState({
				totalRouge: this.state.btn3 + this.state.btn7 + this.state.btn11 + this.state.btn15
			})

			this.setState({ tauxCJ: this.state.totalVert + this.state.totalJaune + this.state.totalGris + this.state.totalRouge })
			this.setState({ tauxEv: this.state.tauxCJ * 0.9 })
		}, 10);

		setTimeout(() => {
			let qcmData = {
				item_qcm_category: "eco-conduite",
				item_qcm_sub_category: "recuperation_d_energie",
				qcm_item: "rarement_applique",
				comment: this.state.comment4

			}
			AsyncStorage.getItem('qcmDataN').then((data) => {
				if (data === null) {
					data = JSON.stringify(qcmData)
					AsyncStorage.setItem('qcmDataN', data)
				} else {
					data = data + ',' + JSON.stringify(qcmData)
					AsyncStorage.removeItem('qcmDataN').then(

						AsyncStorage.setItem('qcmDataN', data)
					)
				}
			}).done()
		}, 30000);

	}
	onBtn16Press() {
		this.setState({ btn16: 0.0, activeBtn14: true, activeBtn15: true, activeBtn13: true })
		this.TextInput3.focus()
		setTimeout(() => {
			this.setState({
				totalGris: this.state.btn4 + this.state.btn8 + this.state.btn12 + this.state.btn16
			})
			this.setState({ tauxCJ: this.state.totalVert + this.state.totalJaune + this.state.totalGris + this.state.totalRouge })
			this.setState({ tauxEv: this.state.tauxCJ * 0.9 })
		}, 10);

		setTimeout(() => {
			let qcmData = {
				item_qcm_category: "eco-conduite",
				item_qcm_sub_category: "recuperation_d_energie",
				qcm_item: "non_evalue",
				comment: this.state.comment4

			}
			AsyncStorage.getItem('qcmDataN').then((data) => {
				if (data === null) {
					data = JSON.stringify(qcmData)
					AsyncStorage.setItem('qcmDataN', data)
				} else {
					data = data + ',' + JSON.stringify(qcmData)
					AsyncStorage.removeItem('qcmDataN').then(

						AsyncStorage.setItem('qcmDataN', data)
					)
				}
			}).done()
		}, 30000);

	}



	tempsDistance() {
		const rN1 = this.state.reactionN1
		const rN2 = this.state.reactionN2
		this.setState({
			tdr: ((rN2 * 100) / rN1) - 100
		})
		console.log(this.state.tdr)

	}



	

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.headerContainer}>
					<View style={styles.headerContainer}>
						<View style={{ alignItems: "center", flexDirection: "row" }}>
							<Image
								resizeMode="contain"
								style={{ width: 200, height: 260, left: 15 }}
								source={require("../../images/Sanstitre9.png")}
							/>
							<Text style={styles.headerTitle}>ECO DATA</Text>
						</View>
						<Text style={{ color: '#00B0F0', fontSize: 16, left: -177, textAlign: 'right', fontStyle: "italic", top: 45 }}>Powered by CleanData</Text>
					</View>

					<View style={{ flexDirection: "column", left: -10 }}>
						{/* <Text style={{color:'#fff',fontSize:20,top:5,left:-30}}>Synthèse</Text> */}
						<Text style={{ color: '#fff', fontSize: 20, top: 15, left: -60 }}>{this.state.student_first_name} {this.state.student_last_name}</Text>
						<Text style={{ color: '#00B0F0', fontSize: 14, top: 17, left: -60 }}>{this.state.heureDebut}</Text>
					</View>
				</View>
				<SafeAreaView style={{ flex: 1, backgroundColor: 'white', top: 10 }}>
					{/* <TouchableOpacity style={{left:740,width:50,height:50}}>
				<Icon
					name='close'
					type='material-community'
					color='red'
					size= {40}
					onPress={() => {this.setState({showQCM:false})}}
				/>
				</TouchableOpacity> */}
					<View style={{ justifyContent: "center", alignItems: "center", margin: 20 }}>
						<Spinner
							visible={this.state.spinner}
							animation={"fade"}
							overlayColor={"#40606060"}
							indicatorStyle={{ size: "large" }}
							textContent={'Sauvegarde des données en cours...'}
							textStyle={styles.spinnerTextStyle}

						/>
						<Text style={{ fontSize: 24, textDecorationLine: 'underline' }}>ECO-CONDUITE</Text>
					</View>
					<KeyboardAwareScrollView extraScrollHeight={40} >
						<ScrollView
							style={{ height: '100%', width: '100%' }}
							nestedScrollEnabled={true}
							contentContainerStyle={{
								height: '100%',
								width: '100%',
								backgroundColor: 'white',
								padding: 20
							}}
						>

							<View style={{ flexDirection: "column", padding: 5 }}>
								<Card style={styles.car}>
									{/* <Text style={{fontSize:30,margin:30}}>PRÉPARER</Text> */}
									<View style={{ flexDirection: "column" }}>
										<View style={{
											flexDirection: "row", borderWidth: 2, borderColor: "lightgrey", backgroundColor: "white"
											, marginBottom: 20, height: 150
										}}>
											<View style={{ alignContent: "center", alignItems: "center", margin: 25, justifyContent: "center" }}>
												<Text style={{ fontSize: 17 }}>Anticipation</Text>
											</View>

											<TouchableOpacity
												disabled={this.state.activeBtn1}
												onPress={() => { this.onBtn1Press() }}
												style={{
													width: 120, height: 80, borderRadius: 15,
													backgroundColor: (this.state.activeBtn1) ? "#b7ebbb" : '#7FA57F',
													marginRight: 20, marginLeft: 28, alignContent: "center", alignItems: "center", justifyContent: "center", marginTop: 35
												}}
											// labelStyle={{color:'black',fontSize:10}}
											>
												<Text style={{ fontSize: 15, alignContent: "center", alignItems: "center", color: 'black', left: 2 }}>APPLICATION {'\n'}REGULIERE</Text>

											</TouchableOpacity>
											<TouchableOpacity
												disabled={this.state.activeBtn2}
												onPress={() => { this.onBtn2Press() }}
												style={{
													width: 120, height: 80, borderRadius: 15,
													backgroundColor: (this.state.activeBtn2) ? "#f4e992" : '#FFFF00',
													marginRight: 20, alignContent: "center", alignItems: "center", justifyContent: "center", marginTop: 35
												}}
											// labelStyle={{color:'black',fontSize:10}}
											>
												<Text style={{ fontSize: 15, alignContent: "center", alignItems: "center", color: 'black', left: 2 }}>APPLICATION {'\n'} IRREGULIERE</Text>

											</TouchableOpacity>
											<TouchableOpacity
												disabled={this.state.activeBtn3}
												onPress={() => { this.onBtn3Press() }}
												style={{
													width: 120, height: 80, borderRadius: 15,
													backgroundColor: (this.state.activeBtn3) ? '#f8cbc8' : 'red',
													marginRight: 20, alignContent: "center", alignItems: "center", justifyContent: "center", marginTop: 35
												}}
											// labelStyle={{color:'black',fontSize:10}}
											>
												<Text style={{ fontSize: 15, alignContent: "center", alignItems: "center", color: 'black', left: -6 }}>RAREMENT {'\n'}APPLIQUE</Text>

											</TouchableOpacity>
											<TouchableOpacity
												disabled={this.state.activeBtn4}
												onPress={() => { this.onBtn4Press() }}
												style={{
													width: 120, height: 80, borderRadius: 15,
													backgroundColor: (this.state.activeBtn4) ? '#edf0ed' : 'lightgrey',
													marginRight: 20, alignContent: "center", alignItems: "center", justifyContent: "center", marginTop: 35
												}}
											// labelStyle={{color:'black',fontSize:10}}
											>
												<Text style={{ fontSize: 15, alignContent: "center", alignItems: "center", color: 'black', left: -22 }}>NON {'\n'}EVALUE</Text>

											</TouchableOpacity>

										</View>
										<TextInput
											style={{
												color: 'white',
											}}
											underlineColorAndroid="transparent"
											placeholder="Rédiger un commentaire"
											placeholderTextColor="#fff"
											multiline={true}
											autoCapitalize="none"
											onChangeText={(comment1) => this.setState({ comment1 })}
											value={this.state.comment1}
											ref={(input) => { this.TextInput = input; }}
										// style={{  margin: 15,
										// 	height: 300,
										// 	width : 500,
										// 	borderColor: '#000000',
										// 	borderWidth: 1}}
										/>
										<View style={{ flexDirection: "row", borderWidth: 2, borderColor: "lightgrey", backgroundColor: "white", marginBottom: 20, height: 150 }}>
											<View style={{ alignContent: "center", alignItems: "center", margin: 24, justifyContent: "center" }}>
												<Text style={{ fontSize: 17 }}>Gestion des {'\n'}/accélérations</Text>
											</View>

											<TouchableOpacity
												disabled={this.state.activeBtn5}
												onPress={() => { this.onBtn5Press() }}
												style={{
													width: 120, height: 80, borderRadius: 15,
													backgroundColor: (this.state.activeBtn5) ? "#b7ebbb" : '#7FA57F',
													marginRight: 20, marginLeft: 10, alignContent: "center", alignItems: "center", justifyContent: "center", marginTop: 35
												}}
											// labelStyle={{color:'black',fontSize:10}}
											>
												<Text style={{ fontSize: 15, alignContent: "center", alignItems: "center", color: 'black', left: 2 }}>APPLICATION {'\n'}REGULIERE</Text>

											</TouchableOpacity>
											<TouchableOpacity
												disabled={this.state.activeBtn6}
												onPress={() => { this.onBtn6Press() }}
												style={{
													width: 120, height: 80, borderRadius: 15,
													backgroundColor: (this.state.activeBtn6) ? "#f4e992" : '#FFFF00',
													marginRight: 20, alignContent: "center", alignItems: "center", justifyContent: "center", marginTop: 35
												}}

											>
												<Text style={{ fontSize: 15, alignContent: "center", alignItems: "center", color: 'black', left: 2 }}>APPLICATION {'\n'} IRREGULIERE</Text>

											</TouchableOpacity>
											<TouchableOpacity
												disabled={this.state.activeBtn7}
												onPress={() => { this.onBtn7Press() }}
												style={{
													width: 120, height: 80, borderRadius: 15,
													backgroundColor: (this.state.activeBtn7) ? '#f8cbc8' : 'red',
													marginRight: 20, alignContent: "center", alignItems: "center", justifyContent: "center", marginTop: 35
												}}
											// labelStyle={{color:'black',fontSize:10}}
											>
												<Text style={{ fontSize: 15, alignContent: "center", alignItems: "center", color: 'black', left: -6 }}>RAREMENT {'\n'}APPLIQUE</Text>

											</TouchableOpacity>
											<TouchableOpacity
												disabled={this.state.activeBtn8}
												onPress={() => { this.onBtn8Press() }}
												style={{
													width: 120, height: 80, borderRadius: 15,
													backgroundColor: (this.state.activeBtn8) ? '#edf0ed' : 'lightgrey',
													marginRight: 20, alignContent: "center", alignItems: "center", justifyContent: "center", marginTop: 35
												}}
											// labelStyle={{color:'black',fontSize:10}}
											>
												<Text style={{ fontSize: 15, alignContent: "center", alignItems: "center", color: 'black', left: -22 }}>NON {'\n'}EVALUE</Text>

											</TouchableOpacity>
										</View>
										<TextInput
											style={{
												color: 'white',
											}}
											underlineColorAndroid="transparent"
											placeholder="Rédiger un commentaire"
											placeholderTextColor="#fff"
											multiline={true}
											autoCapitalize="none"
											onChangeText={(comment2) => this.setState({ comment2 })}
											value={this.state.comment2}
											ref={(input) => { this.TextInput1 = input; }}
										// style={{  margin: 15,
										// 	height: 300,
										// 	width : 500,
										// 	borderColor: '#000000',
										// 	borderWidth: 1}}
										/>
										<View style={{ flexDirection: "row", borderWidth: 2, borderColor: "lightgrey", backgroundColor: "white", marginBottom: 20, height: 150 }}>
											<View style={{ alignContent: "center", alignItems: "center", margin: 25, justifyContent: "center" }}>
												<Text style={{ fontSize: 17 }}>Gestion de {'\n'}/l'élan </Text>
											</View>

											<TouchableOpacity
												disabled={this.state.activeBtn9}
												onPress={() => { this.onBtn9Press() }}
												style={{
													width: 120, height: 80, borderRadius: 15,
													backgroundColor: (this.state.activeBtn9) ? "#b7ebbb" : '#7FA57F',
													marginRight: 20, marginLeft: 34, alignContent: "center", alignItems: "center", justifyContent: "center", marginTop: 35
												}}
											// labelStyle={{color:'black',fontSize:10}}
											>
												<Text style={{ fontSize: 15, alignContent: "center", alignItems: "center", color: 'black', left: 2 }}>APPLICATION {'\n'}REGULIERE</Text>

											</TouchableOpacity>
											<TouchableOpacity
												disabled={this.state.activeBtn10}
												onPress={() => { this.onBtn10Press() }}
												style={{
													width: 120, height: 80, borderRadius: 15,
													backgroundColor: (this.state.activeBtn10) ? "#f4e992" : '#FFFF00',
													marginRight: 20, alignContent: "center", alignItems: "center", justifyContent: "center", marginTop: 35
												}}
											// labelStyle={{color:'black',fontSize:10}}
											>
												<Text style={{ fontSize: 15, alignContent: "center", alignItems: "center", color: 'black', left: 2 }}>APPLICATION {'\n'} IRREGULIERE</Text>

											</TouchableOpacity>
											<TouchableOpacity
												disabled={this.state.activeBtn11}
												onPress={() => { this.onBtn11Press() }}
												style={{
													width: 120, height: 80, borderRadius: 15,
													backgroundColor: (this.state.activeBtn11) ? '#f8cbc8' : 'red',
													marginRight: 20, alignContent: "center", alignItems: "center", justifyContent: "center", marginTop: 35
												}}
											// labelStyle={{color:'black',fontSize:10}}
											>
												<Text style={{ fontSize: 15, alignContent: "center", alignItems: "center", color: 'black', left: -6 }}>RAREMENT {'\n'}APPLIQUE</Text>

											</TouchableOpacity>
											<TouchableOpacity
												disabled={this.state.activeBtn12}
												onPress={() => { this.onBtn12Press() }}
												style={{
													width: 120, height: 80, borderRadius: 15,
													backgroundColor: (this.state.activeBtn12) ? '#edf0ed' : 'lightgrey',
													marginRight: 20, alignContent: "center", alignItems: "center", justifyContent: "center", marginTop: 35
												}}
											// labelStyle={{color:'black',fontSize:10}}
											>
												<Text style={{ fontSize: 15, alignContent: "center", alignItems: "center", color: 'black', left: -22 }}>NON {'\n'}EVALUE</Text>

											</TouchableOpacity>
										</View>
										<TextInput
											style={{
												color: 'white',
											}}
											underlineColorAndroid="transparent"
											placeholder="Rédiger un commentaire"
											placeholderTextColor="#fff"
											multiline={true}
											autoCapitalize="none"
											onChangeText={(comment3) => this.setState({ comment3 })}
											value={this.state.comment3}
											ref={(input) => { this.TextInput2 = input; }}
										// style={{  margin: 15,
										// 	height: 300,
										// 	width : 500,
										// 	borderColor: '#000000',
										// 	borderWidth: 1}}
										/>
										<View style={{ flexDirection: "row", borderWidth: 2, borderColor: "lightgrey", backgroundColor: "white", marginBottom: 20, height: 150 }}>
											<View style={{ alignContent: "center", alignItems: "center", margin: 22, justifyContent: "center" }}>
												<Text style={{ fontSize: 17 }}>Récupération {'\n'}d'énergie</Text>
											</View>

											<TouchableOpacity
												disabled={this.state.activeBtn13}
												onPress={() => { this.onBtn13Press() }}
												style={{
													width: 120, height: 80, borderRadius: 15,
													backgroundColor: (this.state.activeBtn13) ? "#b7ebbb" : '#7FA57F',
													marginRight: 20, marginLeft: 17, alignContent: "center", alignItems: "center", justifyContent: "center", marginTop: 35
												}}
											// labelStyle={{color:'black',fontSize:10}}
											>
												<Text style={{ fontSize: 15, alignContent: "center", alignItems: "center", color: 'black', left: 2 }}>APPLICATION {'\n'}REGULIERE</Text>

											</TouchableOpacity>
											<TouchableOpacity
												disabled={this.state.activeBtn14}
												onPress={() => { this.onBtn14Press() }}
												style={{
													width: 120, height: 80, borderRadius: 15,
													backgroundColor: (this.state.activeBtn14) ? "#f4e992" : '#FFFF00',
													marginRight: 20, alignContent: "center", alignItems: "center", justifyContent: "center", marginTop: 35
												}}
											// labelStyle={{color:'black',fontSize:10}}
											>
												<Text style={{ fontSize: 15, alignContent: "center", alignItems: "center", color: 'black', left: 2 }}>APPLICATION {'\n'} IRREGULIERE</Text>

											</TouchableOpacity>
											<TouchableOpacity
												disabled={this.state.activeBtn15}
												onPress={() => { this.onBtn15Press() }}
												style={{
													width: 120, height: 80, borderRadius: 15,
													backgroundColor: (this.state.activeBtn15) ? '#f8cbc8' : 'red',
													marginRight: 20, alignContent: "center", alignItems: "center", justifyContent: "center", marginTop: 35
												}}
											// labelStyle={{color:'black',fontSize:10}}
											>
												<Text style={{ fontSize: 15, alignContent: "center", alignItems: "center", color: 'black', left: -6 }}>RAREMENT {'\n'}APPLIQUE</Text>

											</TouchableOpacity>
											<TouchableOpacity
												disabled={this.state.activeBtn16}
												onPress={() => { this.onBtn16Press() }}
												style={{
													width: 120, height: 80, borderRadius: 15,
													backgroundColor: (this.state.activeBtn16) ? '#edf0ed' : 'lightgrey',
													marginRight: 20, alignContent: "center", alignItems: "center", justifyContent: "center", marginTop: 35
												}}
											// labelStyle={{color:'black',fontSize:10}}
											>
												<Text style={{ fontSize: 15, alignContent: "center", alignItems: "center", color: 'black', left: -22 }}>NON {'\n'}EVALUE</Text>

											</TouchableOpacity>
										</View>
										<TextInput
											style={{
												color: 'white',
											}}
											underlineColorAndroid="transparent"
											placeholder="Rédiger un commentaire"
											placeholderTextColor="#fff"
											multiline={true}
											autoCapitalize="none"
											onChangeText={(comment4) => this.setState({ comment4 })}
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


								<Card style={styles.carR}>
									<View style={{ flexDirection: "column", backgroundColor: "white", height: 260 }}>
										<View style={{ flexDirection: "row" }}>
											<View style={{ alignContent: "center", alignItems: "center", justifyContent: "center", margin: 10, top: 10 }}>
												<TouchableOpacity
													disabled={true}
													style={{
														width: 150, height: 100, borderRadius: 15,
														backgroundColor: 'white', borderWidth: 2, borderColor: "#00B0F0"
														, marginRight: 20, alignContent: "center", alignItems: "center"
														, justifyContent: "center"
													}}

												>
													<Text style={{ fontSize: 15, alignContent: "center" }}> TOTAL</Text>

												</TouchableOpacity>
											</View>

											<TouchableOpacity
												disabled={true}
												style={{
													width: 120, height: 80, borderRadius: 15,
													backgroundColor: '#7FA57F', marginRight: 20, alignContent: "center", alignItems: "center", justifyContent: "center", marginTop: 35
												}}
											// labelStyle={{color:'black',fontSize:10}}
											>
												<Text style={{ fontSize: 15, alignContent: "center" }}>{this.state.totalVert} %</Text>

											</TouchableOpacity>
											<TouchableOpacity
												disabled={true}
												style={{
													width: 120, height: 80, borderRadius: 15,
													backgroundColor: '#FFFF00', marginRight: 20, alignContent: "center", alignItems: "center", justifyContent: "center", marginTop: 35
												}}
											// labelStyle={{color:'black',fontSize:10}}
											>
												<Text style={{ fontSize: 15, alignContent: "center" }}>{this.state.totalJaune} %</Text>

											</TouchableOpacity>
											<TouchableOpacity
												disabled={true}
												style={{
													width: 120, height: 80, borderRadius: 15,
													backgroundColor: 'red', marginRight: 20, alignContent: "center", alignItems: "center", justifyContent: "center", marginTop: 35
												}}
											// labelStyle={{color:'black',fontSize:10}}
											>
												<Text style={{ fontSize: 15, alignContent: "center" }}>{this.state.totalRouge} %</Text>

											</TouchableOpacity>
											<TouchableOpacity
												disabled={true}
												style={{
													width: 120, height: 80, borderRadius: 15,
													backgroundColor: 'lightgrey', marginRight: 20, alignContent: "center", alignItems: "center", justifyContent: "center", marginTop: 35
												}}
											// labelStyle={{color:'black',fontSize:10}}
											>
												<Text style={{ fontSize: 15, alignContent: "center" }}>{this.state.totalGris} %</Text>

											</TouchableOpacity>
										</View>
										<View style={{ alignContent: "center", alignItems: "center", justifyContent: "center", marginLeft: 20, marginRight: 30 }}>
											<TouchableOpacity
												disabled={true}
												style={{
													width: 320, height: 100, borderRadius: 15,
													backgroundColor: 'white', borderWidth: 2, borderColor: "#00B0F0"
													, marginRight: 20, alignContent: "center", alignItems: "center"
													, justifyContent: "center", top: 20
												}}

											>
												<Text style={{ fontSize: 15, fontWeight: "bold", textAlign: "center" }}>Taux d'application de la méthode d'ECO-CONDUITE</Text>
												<Text style={{ fontSize: 15, alignContent: "center", marginTop: 10, fontWeight: "bold" }}>{this.state.tauxCJ} %</Text>

											</TouchableOpacity>
										</View>
									</View>
									<View style={{ flexDirection: "column" }}>

										<View style={{ flexDirection: "row", backgroundColor: "white", height: 150 }}>
											<View style={{ alignContent: "center", alignItems: "center", justifyContent: "center", marginLeft: 20, marginRight: 30 }}>
												<TouchableOpacity
													disabled={true}
													style={{
														width: 320, height: 100, borderRadius: 15,
														backgroundColor: 'white', borderWidth: 2, borderColor: "#00B0F0"
														, marginRight: 20, alignContent: "center", alignItems: "center"
														, justifyContent: "center"
													}}

												>
													<Text style={{ fontSize: 15, fontWeight: "bold", textAlign: "center" }}>Consommation (litres/100 km) TEST N°1</Text>
													<Text style={{ fontSize: 15, alignContent: "center", marginTop: 10, fontWeight: "bold" }}>{this.state.conso1}</Text>

												</TouchableOpacity>
											</View>
											<View style={{ alignContent: "center", alignItems: "center", justifyContent: "center", margin: 10 }}>
												<TouchableOpacity
													disabled={true}
													style={{
														width: 320, height: 100, borderRadius: 15,
														backgroundColor: 'white', borderWidth: 2, borderColor: "#00B0F0"
														, alignContent: "center", alignItems: "center"
														, justifyContent: "center", marginRight: 20
													}}

												>
													<Text style={{ fontSize: 15, fontWeight: "bold", textAlign: "center" }}>Consommation (litres/100 km) TEST N°2</Text>
													<Text style={{ fontSize: 15, alignContent: "center", marginTop: 10, fontWeight: "bold" }}>{this.state.conso2}</Text>

												</TouchableOpacity>
											</View>
										</View>
										<View style={{ alignContent: "center", alignItems: "center", justifyContent: "center", marginLeft: 20, marginRight: 30 }}>
											<TouchableOpacity
												disabled={true}
												style={{
													width: 400, height: 100, borderRadius: 15,
													backgroundColor: 'white', borderWidth: 2, borderColor: "#00B0F0"
													, marginRight: 20, alignContent: "center", alignItems: "center"
													, justifyContent: "center"
												}}

											>
												<Text style={{ fontSize: 15, fontWeight: "bold", textAlign: "center" }}>Résultat de cette application à la notion</Text>
												<Text style={{ fontSize: 15, fontWeight: "bold", textAlign: "center" }}>d'économie d'énergie (conso test 1 / test 2)</Text>
												<Text style={{ fontSize: 15, alignContent: "center", marginTop: 10, fontWeight: "bold" }}>{this.getResultat()} %</Text>

											</TouchableOpacity>
										</View>
									</View>


								</Card>
								<View style={{
									backgroundColor: 'white', alignContent: "center", alignItems: "center", justifyContent: "center",
									marginVertical: 30
								}}>
									<TouchableOpacity
										onPress={() => {
											this.setState({ spinner: true })
											setTimeout(() => {
												this.setState({ showQCM: false, showD5: true, spinner: false })
												this.saveData()
											}, 30000);
											// this.setState({showQCM:false,showD5 : true})
											// // showESP:true
											// this.saveData()
										}}
										style={{
											width: 300, height: 80, borderRadius: 5,
											backgroundColor: "#00B0F0", borderWidth: 2, borderColor: "#00B0F0"
											, alignContent: "center", alignItems: "center"
											, justifyContent: "center", marginRight: 20
										}}

									>
										<Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center", color: "white" }}>VALIDER</Text>


									</TouchableOpacity>

									<Text style={{ fontSize: 12, textAlign: "center", color: "red", marginTop: 10 }}>{this.state.message}</Text>
								</View>

							</View>

						</ScrollView>
					</KeyboardAwareScrollView>



				</SafeAreaView>

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
		backgroundColor: 'white'
	},
	modal1: {
		width: 620,
		height: 500,
		borderRadius: 10,
		justifyContent: "center",
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		top: 320,
		backgroundColor: '#191919',
		borderColor: '#00B0F0',
		borderWidth: 2,

		left: 90
	},
	headerTitle: {
		// flex: 1.0,
		marginLeft: 90,
		// marginRight: 8,
		//  right: 300,
		alignSelf: 'center',
		color: 'white',
		fontSize: 24,
		top: -10
	},
	headerContainer: {
		height: 80, //80
		flexDirection: 'row',
		// flex: 1.0,
		// justifyContect: 'center',
		backgroundColor: '#323232'
		//top:24
	},
	spinnerTextStyle: {
		color: '#FFF'
	},
	car: {

		height: 879,
		backgroundColor: '#1b4f9c',
		//Wtop:10,
		//   borderColor:'black',
		// borderWidth:1,

	},
	car1: {
		height: 800,
		backgroundColor: '#f7e86a',
		//Wtop:10,
		//   borderColor:'black',
		// borderWidth:1,
	},
	car2: {
		height: 879,
		backgroundColor: '#48bbdd',
		//Wtop:10,
		//   borderColor:'black',
		// borderWidth:1,
	},
	car3: {
		height: 980,
		backgroundColor: '#5fb157',
		//Wtop:10,
		//   borderColor:'black',
		// borderWidth:1,
	},
	carR: {
		height: 530,
		backgroundColor: 'white',
		//Wtop:10,
		//   borderColor:'#00B0F0',
		// borderWidth:1,
	},
	carR1: {
		height: 300,
		backgroundColor: 'white',
		//Wtop:10,
		//     borderColor:'#00B0F0',
		//   borderWidth:1,
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

//   mapStateToProps = (state,props) => ({
// 	createUser: state.authReducer.createNewStudent
//   })
// mapDispatchToProps = (dispatch) => ({
// 	dispatch
// })
// export default connect(mapStateToProps,mapDispatchToProps)(ClotureNodbox)

