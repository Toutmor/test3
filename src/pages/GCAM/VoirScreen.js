import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	Image,
	Alert
} from 'react-native';
import {
	List,
	Divider,
	Badge,
	Card,
	Button
 }  from 'react-native-paper'
import {Icon} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Actions } from 'react-native-router-flux';
import {LivePlayer} from "react-native-live-stream";

export default class VoirParcours extends React.Component {
	state = {
		expandedV: false,
		countV: 0,
	
		//total voir
		totalBVoir:0,
		totalMVoir:0,
		totalNVoir:0,
		//controle retroviseurs roulant
		crrB:0,
		crrM:0,
		crrN:0,
		//controle retroviseurs arrêt
		craB:0,
		craM:0,
		craN:0,
		//controle angle mort
		camB:0,
		camM:0,
		camN:0,
		//vision au loin
		valB:0,
		valM:0,
		valN:0,
		//vision en latéral
		velB:0,
		velM:0,
		velN:0,
		//ecoute et sensation
		esB:0,
		esM:0,
		esN:0,
		//focalisation du regard
		frB:0,
		frM:0,
		frN:0,
		modalVisible: false,

		//oeil
		cEyeV:0,
		//oreille
		cEarV:0
	}

	current=()=>{
		let today=new Date();
		let datetime=("0" + today.getUTCHours()).slice(-2) + ":" +("0" + today.getUTCMinutes()).slice(-2) + ":" + ("0" +today.getUTCSeconds()).slice(-2);
		return datetime;
	}
	
	// showModal=() =>{
	//   this.setState({ modalVisible: true })
	// }
	// hideModal=() =>{
	//   this.setState({ modalVisible: false })
	//   // Refocus on the Input field after selecting the country code
	// }

	//increment crr
	iCrrB = () =>{
		this.setState({crrB: this.state.crrB + 1, totalBVoir: 1 + this.state.totalBVoir})
		// La solution est la
		let obj={
		color:'green',
		item: 'retroviseurs_en_roulant',
		item_sub_category:'recherche_indices_utiles',
		item_category:'voir',
		registered_at:this.current()
		}
		// AsyncStorage.getItem( 'data' ).then( data => {
		// 	data=data+','+JSON.stringify(obj)
		// 	AsyncStorage.setItem( 'data', data );
		// }).done();
		AsyncStorage.getItem( 'data' ).then( (data) => {
			if(data === null){
			  data= JSON.stringify(obj)
			  AsyncStorage.setItem('data',data)
			}else{
			data=data+','+JSON.stringify(obj)
			AsyncStorage.removeItem('data').then(
			 
			  AsyncStorage.setItem('data',data)
			)
			}
			console.log( data )
				  // data=data+','+JSON.stringify(obj)
			  
		  }).done();
		  
		  let time={
			time: new Date(),
			icon: 'dash',
			color:'green',
			type:'octicon'
		  }
		  AsyncStorage.getItem('time_data').then((data) => {
			if(data === null){
			  data= JSON.stringify(time)
			  AsyncStorage.setItem('time_data',data)
			}else{
			data=data+','+JSON.stringify(time)
			AsyncStorage.removeItem('time_data').then(
			 
			  AsyncStorage.setItem('time_data',data)
			)
			}
		  }).done()
		  let objT={
			color:'green',
			item: 'Contrôle rétroviseurs en roulant',
			item_sub_category:'RECHERCHER INDICES UTILES',
			item_category:'voir',
			time: new Date(),
			registered_at:this.current(),
			iconF:'ios-eye',
			typeF:'ionicon',
			iconFcolor:'#f7e86a',
			icon:'caretdown',
			type:'antdesign'
			}

		    AsyncStorage.getItem( 'dataFT' ).then( (data) => {
				if(data === null){
				  data= JSON.stringify(objT)
				  AsyncStorage.setItem('dataFT',data)
				}else{
				data=data+','+JSON.stringify(objT)
				AsyncStorage.removeItem('dataFT').then(
				 
				  AsyncStorage.setItem('dataFT',data)
				)
				}
				console.log( data )
				// data=data+','+JSON.stringify(obj)
			  
			  }).done();
		  
	}

	iCrrM = () =>{
		this.setState({crrM: this.state.crrM + 1, totalMVoir: 1+ this.state.totalMVoir})
		let obj={
			color:'red',
			item: 'retroviseurs_en_roulant',
			item_sub_category:'recherche_indices_utiles',
			item_category:'voir',
			registered_at:this.current()
		}
		// AsyncStorage.getItem( 'data' ).then( data => {
		// 	console.log( data );
		// 	data=data+','+JSON.stringify(obj)
		// 	AsyncStorage.setItem( 'data', data );
		// }).done();
		AsyncStorage.getItem( 'data' ).then( (data) => {
			if(data === null){
			  data= JSON.stringify(obj)
			  AsyncStorage.setItem('data',data)
			}else{
			data=data+','+JSON.stringify(obj)
			AsyncStorage.removeItem('data').then(
			 
			  AsyncStorage.setItem('data',data)
			)
			}
			console.log( data )
				  // data=data+','+JSON.stringify(obj)
			  
		  }).done();

		  let time={
			time: new Date(),
			icon: 'dash',
			color:'red',
			type:'octicon'
		  }
		  AsyncStorage.getItem('time_data').then((data) => {
			if(data === null){
			  data= JSON.stringify(time)
			  AsyncStorage.setItem('time_data',data)
			}else{
			data=data+','+JSON.stringify(time)
			AsyncStorage.removeItem('time_data').then(
			 
			  AsyncStorage.setItem('time_data',data)
			)
			}
		  }).done()
		  let objT={
			color:'red',
			item: 'Contrôle rétroviseurs en roulant',
			item_sub_category:'RECHERCHER INDICES UTILES',
			item_category:'voir',
			time: new Date(),
			registered_at:this.current(),
			iconF:'ios-eye',
			typeF:'ionicon',
			iconFcolor:'#f7e86a',
			icon:'caretdown',
			type:'antdesign'
			}

		    AsyncStorage.getItem( 'dataFT' ).then( (data) => {
				if(data === null){
				  data= JSON.stringify(objT)
				  AsyncStorage.setItem('dataFT',data)
				}else{
				data=data+','+JSON.stringify(objT)
				AsyncStorage.removeItem('dataFT').then(
				 
				  AsyncStorage.setItem('dataFT',data)
				)
				}
				console.log( data )
				// data=data+','+JSON.stringify(obj)
			  
			  }).done();
	}

	iCrrN = () =>{
		this.setState({crrN: this.state.crrN + 1 , totalNVoir: 1+ this.state.totalNVoir})
		let obj={
			color:'yellow',
			item: 'retroviseurs_en_roulant',
			item_sub_category:'recherche_indices_utiles',
			item_category:'voir',
			registered_at:this.current()
		}
		// AsyncStorage.getItem( 'data' ).then( data => {
		// 	console.log( data );
		// 	data=data+','+JSON.stringify(obj)
		// 	AsyncStorage.setItem( 'data', data );
		// }).done();
		AsyncStorage.getItem( 'data' ).then( (data) => {
			if(data === null){
			  data= JSON.stringify(obj)
			  AsyncStorage.setItem('data',data)
			}else{
			data=data+','+JSON.stringify(obj)
			AsyncStorage.removeItem('data').then(
			 
			  AsyncStorage.setItem('data',data)
			)
			}
			console.log( data )
				  // data=data+','+JSON.stringify(obj)
			  
		  }).done();

		  let time={
			time: new Date(),
			icon: 'dash',
			color:'yellow',
			type:'octicon'
		  }
		  AsyncStorage.getItem('time_data').then((data) => {
			if(data === null){
			  data= JSON.stringify(time)
			  AsyncStorage.setItem('time_data',data)
			}else{
			data=data+','+JSON.stringify(time)
			AsyncStorage.removeItem('time_data').then(
			 
			  AsyncStorage.setItem('time_data',data)
			)
			}
		  }).done()

		  let objT={
			color:'yellow',
			item: 'Contrôle rétroviseurs en roulant',
			item_sub_category:'RECHERCHER INDICES UTILES',
			item_category:'voir',
			time: new Date(),
			registered_at:this.current(),
			iconF:'ios-eye',
			typeF:'ionicon',
			iconFcolor:'#f7e86a',
			icon:'caretdown',
			type:'antdesign'
			}

		    AsyncStorage.getItem( 'dataFT' ).then( (data) => {
				if(data === null){
				  data= JSON.stringify(objT)
				  AsyncStorage.setItem('dataFT',data)
				}else{
				data=data+','+JSON.stringify(objT)
				AsyncStorage.removeItem('dataFT').then(
				 
				  AsyncStorage.setItem('dataFT',data)
				)
				}
				console.log( data )
				// data=data+','+JSON.stringify(obj)
			  
			  }).done();
	}

	//increment cra
	iCraB = () =>{ 
		this.setState({craB: this.state.craB + 1 ,  totalBVoir: 1 + this.state.totalBVoir})
		let obj={
			color:'green',
			item: 'retroviseurs_a_arret',
			item_sub_category:'recherche_indices_utiles',
			item_category:'voir',
			registered_at:this.current()
		}
		// AsyncStorage.getItem( 'data' ).then( data => {
		// 	console.log( data );
		// 	data=data+','+JSON.stringify(obj)
		// 	AsyncStorage.setItem( 'data', data );
		// }).done();
		AsyncStorage.getItem( 'data' ).then( (data) => {
			if(data === null){
			  data= JSON.stringify(obj)
			  AsyncStorage.setItem('data',data)
			}else{
			data=data+','+JSON.stringify(obj)
			AsyncStorage.removeItem('data').then(
			 
			  AsyncStorage.setItem('data',data)
			)
			}
			console.log( data )
				  // data=data+','+JSON.stringify(obj)
			  
		  }).done();
		  let time={
			time: new Date(),
			icon: 'dash',
			color:'green',
			type:'octicon'
		  }
		  AsyncStorage.getItem('time_data').then((data) => {
			if(data === null){
			  data= JSON.stringify(time)
			  AsyncStorage.setItem('time_data',data)
			}else{
			data=data+','+JSON.stringify(time)
			AsyncStorage.removeItem('time_data').then(
			 
			  AsyncStorage.setItem('time_data',data)
			)
			}
		  }).done()
		  
		  let objT={
			color:'green',
			item: 'Contrôle rétroviseurs à l'+"'"+"arrêt",
			item_sub_category:'RECHERCHER INDICES UTILES',
			item_category:'voir',
			time: new Date(),
			registered_at:this.current(),
			iconF:'ios-eye',
			typeF:'ionicon',
			iconFcolor:'#f7e86a',
			icon:'caretdown',
			type:'antdesign'
			}

		    AsyncStorage.getItem( 'dataFT' ).then( (data) => {
				if(data === null){
				  data= JSON.stringify(objT)
				  AsyncStorage.setItem('dataFT',data)
				}else{
				data=data+','+JSON.stringify(objT)
				AsyncStorage.removeItem('dataFT').then(
				 
				  AsyncStorage.setItem('dataFT',data)
				)
				}
				console.log( data )
				// data=data+','+JSON.stringify(obj)
			  
			  }).done();
		
		 
	}
	iCraM = () =>{
		this.setState({craM: this.state.craM + 1 , totalMVoir: 1 + this.state.totalMVoir})
		let obj={
			color:'red',
			item: 'retroviseurs_a_arret',
			item_sub_category:'recherche_indices_utiles',
			item_category:'voir',
			registered_at:this.current()
		}
		// AsyncStorage.getItem( 'data' ).then( data => {
		// 	console.log( data );
		// 	data=data+','+JSON.stringify(obj)
		// 	AsyncStorage.setItem( 'data', data );
		// }).done();
		AsyncStorage.getItem( 'data' ).then( (data) => {
			if(data === null){
			  data= JSON.stringify(obj)
			  AsyncStorage.setItem('data',data)
			}else{
			data=data+','+JSON.stringify(obj)
			AsyncStorage.removeItem('data').then(
			 
			  AsyncStorage.setItem('data',data)
			)
			}
			console.log( data )
				  // data=data+','+JSON.stringify(obj)
			  
		  }).done();

		  let time={
			time: new Date(),
			icon: 'dash',
			color:'red',
			type:'octicon'
		  }
		  AsyncStorage.getItem('time_data').then((data) => {
			if(data === null){
			  data= JSON.stringify(time)
			  AsyncStorage.setItem('time_data',data)
			}else{
			data=data+','+JSON.stringify(time)
			AsyncStorage.removeItem('time_data').then(
			 
			  AsyncStorage.setItem('time_data',data)
			)
			}
		  }).done()
		  let objT={
			color:'red',
			item: 'Contrôle rétroviseurs à l'+"'"+"arrêt",
			item_sub_category:'RECHERCHER INDICES UTILES',
			item_category:'voir',
			time: new Date(),
			registered_at:this.current(),
			iconF:'ios-eye',
			typeF:'ionicon',
			iconFcolor:'#f7e86a',
			icon:'caretdown',
			type:'antdesign'
			}

		    AsyncStorage.getItem( 'dataFT' ).then( (data) => {
				if(data === null){
				  data= JSON.stringify(objT)
				  AsyncStorage.setItem('dataFT',data)
				}else{
				data=data+','+JSON.stringify(objT)
				AsyncStorage.removeItem('dataFT').then(
				 
				  AsyncStorage.setItem('dataFT',data)
				)
				}
				console.log( data )
				// data=data+','+JSON.stringify(obj)
			  
			  }).done();
	}
	iCraN = () =>{
		this.setState({craN: this.state.craN + 1 , totalNVoir: 1 + this.state.totalNVoir})
		let obj={
			color:'yellow',
			item: 'retroviseurs_a_arret',
			item_sub_category:'recherche_indices_utiles',
			item_category:'voir',
			registered_at:this.current()
		}
		// AsyncStorage.getItem( 'data' ).then( data => {
		// 	console.log( data );
		// 	data=data+','+JSON.stringify(obj)
		// 	AsyncStorage.setItem( 'data', data );
		// }).done();
		AsyncStorage.getItem( 'data' ).then( (data) => {
			if(data === null){
			  data= JSON.stringify(obj)
			  AsyncStorage.setItem('data',data)
			}else{
			data=data+','+JSON.stringify(obj)
			AsyncStorage.removeItem('data').then(
			 
			  AsyncStorage.setItem('data',data)
			)
			}
			console.log( data )
				  // data=data+','+JSON.stringify(obj)
			  
		  }).done();
		  let time={
			time: new Date(),
			icon: 'dash',
			color:'yellow',
			type:'octicon'
		  }
		  AsyncStorage.getItem('time_data').then((data) => {
			if(data === null){
			  data= JSON.stringify(time)
			  AsyncStorage.setItem('time_data',data)
			}else{
			data=data+','+JSON.stringify(time)
			AsyncStorage.removeItem('time_data').then(
			 
			  AsyncStorage.setItem('time_data',data)
			)
			}
		  }).done()

		  let objT={
			color:'yellow',
			item: 'Contrôle rétroviseurs à l'+"'"+"arrêt",
			item_sub_category:'RECHERCHER INDICES UTILES',
			item_category:'voir',
			time: new Date(),
			registered_at:this.current(),
			iconF:'ios-eye',
			typeF:'ionicon',
			iconFcolor:'#f7e86a',
			icon:'caretdown',
			type:'antdesign'
			}

		    AsyncStorage.getItem( 'dataFT' ).then( (data) => {
				if(data === null){
				  data= JSON.stringify(objT)
				  AsyncStorage.setItem('dataFT',data)
				}else{
				data=data+','+JSON.stringify(objT)
				AsyncStorage.removeItem('dataFT').then(
				 
				  AsyncStorage.setItem('dataFT',data)
				)
				}
				console.log( data )
				// data=data+','+JSON.stringify(obj)
			  
			  }).done();
	}
	
	//increment cam
	iCamB = () =>{
		this.setState({camB: this.state.camB + 1,  totalBVoir: 1+ this.state.totalBVoir})
		let obj={
			color:'green',
			item: 'controle_angle_mort',
			item_sub_category:'recherche_indices_utiles',
			item_category:'voir',
			registered_at:this.current()
		}
		// AsyncStorage.getItem( 'data' ).then( data => {
		// 	console.log( data );
		// 	data=data+','+JSON.stringify(obj)
		// 	AsyncStorage.setItem( 'data', data );
		// }).done();
		AsyncStorage.getItem( 'data' ).then( (data) => {
			if(data === null){
			  data= JSON.stringify(obj)
			  AsyncStorage.setItem('data',data)
			}else{
			data=data+','+JSON.stringify(obj)
			AsyncStorage.removeItem('data').then(
			 
			  AsyncStorage.setItem('data',data)
			)
			}
			console.log( data )
				  // data=data+','+JSON.stringify(obj)
			  
		  }).done();

		  let time={
			time: new Date(),
			icon: 'dash',
			color:'green',
			type:'octicon'
		  }
		  AsyncStorage.getItem('time_data').then((data) => {
			if(data === null){
			  data= JSON.stringify(time)
			  AsyncStorage.setItem('time_data',data)
			}else{
			data=data+','+JSON.stringify(time)
			AsyncStorage.removeItem('time_data').then(
			 
			  AsyncStorage.setItem('time_data',data)
			)
			}
		  }).done()

		  let objT={
			color:'green',
			item: 'Contrôle angles morts',
			item_sub_category:'RECHERCHER INDICES UTILES',
			item_category:'voir',
			time: new Date(),
			registered_at:this.current(),
			iconF:'ios-eye',
			typeF:'ionicon',
			iconFcolor:'#f7e86a',
			icon:'caretdown',
			type:'antdesign'
			}

		    AsyncStorage.getItem( 'dataFT' ).then( (data) => {
				if(data === null){
				  data= JSON.stringify(objT)
				  AsyncStorage.setItem('dataFT',data)
				}else{
				data=data+','+JSON.stringify(objT)
				AsyncStorage.removeItem('dataFT').then(
				 
				  AsyncStorage.setItem('dataFT',data)
				)
				}
				console.log( data )
				// data=data+','+JSON.stringify(obj)
			  
			  }).done();
	}

	iCamM = () =>{
		this.setState({camM: this.state.camM + 1,  totalMVoir: 1+ this.state.totalMVoir})
		let obj={
			color:'red',
			item: 'controle_angle_mort',
			item_sub_category:'recherche_indices_utiles',
			item_category:'voir',
			registered_at:this.current()
		}
		// AsyncStorage.getItem( 'data' ).then( data => {
		// 	console.log( data );
		// 	data=data+','+JSON.stringify(obj)
		// 	AsyncStorage.setItem( 'data', data );
		// }).done();
		AsyncStorage.getItem( 'data' ).then( (data) => {
			if(data === null){
			  data= JSON.stringify(obj)
			  AsyncStorage.setItem('data',data)
			}else{
			data=data+','+JSON.stringify(obj)
			AsyncStorage.removeItem('data').then(
			 
			  AsyncStorage.setItem('data',data)
			)
			}
			console.log( data )
				  // data=data+','+JSON.stringify(obj)
			  
		  }).done();
		  let time={
			time: new Date(),
			icon: 'dash',
			color:'red',
			type:'octicon'
		  }
		  AsyncStorage.getItem('time_data').then((data) => {
			if(data === null){
			  data= JSON.stringify(time)
			  AsyncStorage.setItem('time_data',data)
			}else{
			data=data+','+JSON.stringify(time)
			AsyncStorage.removeItem('time_data').then(
			 
			  AsyncStorage.setItem('time_data',data)
			)
			}
		  }).done()

		  let objT={
			color:'red',
			item: 'Contrôle angles morts',
			item_sub_category:'RECHERCHER INDICES UTILES',
			item_category:'voir',
			time: new Date(),
			registered_at:this.current(),
			iconF:'ios-eye',
			typeF:'ionicon',
			iconFcolor:'#f7e86a',
			icon:'caretdown',
			type:'antdesign'
			}

		    AsyncStorage.getItem( 'dataFT' ).then( (data) => {
				if(data === null){
				  data= JSON.stringify(objT)
				  AsyncStorage.setItem('dataFT',data)
				}else{
				data=data+','+JSON.stringify(objT)
				AsyncStorage.removeItem('dataFT').then(
				 
				  AsyncStorage.setItem('dataFT',data)
				)
				}
				console.log( data )
				// data=data+','+JSON.stringify(obj)
			  
			  }).done();
	}

	iCamN = () =>{
		this.setState({camN: this.state.camN + 1 ,  totalNVoir: 1 + this.state.totalNVoir})
		let obj={
			color:'yellow',
			item: 'controle_angle_mort',
			item_sub_category:'recherche_indices_utiles',
			item_category:'voir',
			registered_at:this.current()
		}
		// AsyncStorage.getItem( 'data' ).then( data => {
		// 	console.log( data );
		// 	data=data+','+JSON.stringify(obj)
		// 	AsyncStorage.setItem( 'data', data );
		// }).done();
		AsyncStorage.getItem( 'data' ).then( (data) => {
			if(data === null){
			  data= JSON.stringify(obj)
			  AsyncStorage.setItem('data',data)
			}else{
			data=data+','+JSON.stringify(obj)
			AsyncStorage.removeItem('data').then(
			 
			  AsyncStorage.setItem('data',data)
			)
			}
			console.log( data )
				  // data=data+','+JSON.stringify(obj)
			  
		  }).done();

		  let time={
			time: new Date(),
			icon: 'dash',
			color:'yellow',
			type:'octicon'
		  }
		  AsyncStorage.getItem('time_data').then((data) => {
			if(data === null){
			  data= JSON.stringify(time)
			  AsyncStorage.setItem('time_data',data)
			}else{
			data=data+','+JSON.stringify(time)
			AsyncStorage.removeItem('time_data').then(
			 
			  AsyncStorage.setItem('time_data',data)
			)
			}
		  }).done()

		  let objT={
			color:'yellow',
			item: 'Contrôle angles morts',
			item_sub_category:'RECHERCHER INDICES UTILES',
			item_category:'voir',
			time: new Date(),
			registered_at:this.current(),
			iconF:'ios-eye',
			typeF:'ionicon',
			iconFcolor:'#f7e86a',
			icon:'caretdown',
			type:'antdesign'
			}

		    AsyncStorage.getItem( 'dataFT' ).then( (data) => {
				if(data === null){
				  data= JSON.stringify(objT)
				  AsyncStorage.setItem('dataFT',data)
				}else{
				data=data+','+JSON.stringify(objT)
				AsyncStorage.removeItem('dataFT').then(
				 
				  AsyncStorage.setItem('dataFT',data)
				)
				}
				console.log( data )
				// data=data+','+JSON.stringify(obj)
			  
			  }).done();
	}

	//increment val
	iValB = () =>{
		this.setState({valB: this.state.valB + 1, totalBVoir: 1+ this.state.totalBVoir})
		let obj={
			color:'green',
			item: 'vision_au_loin',
			item_sub_category:'recherche_indices_utiles',
			item_category:'voir',
			registered_at:this.current()
		}
		// AsyncStorage.getItem( 'data' ).then( data => {
		// 	console.log( data );
		// 	data=data+','+JSON.stringify(obj)
		// 	AsyncStorage.setItem( 'data', data );
		// }).done();
		AsyncStorage.getItem( 'data' ).then( (data) => {
			if(data === null){
			  data= JSON.stringify(obj)
			  AsyncStorage.setItem('data',data)
			}else{
			data=data+','+JSON.stringify(obj)
			AsyncStorage.removeItem('data').then(
			 
			  AsyncStorage.setItem('data',data)
			)
			}
			console.log( data )
				  // data=data+','+JSON.stringify(obj)
			  
		  }).done();

		  let time={
			time: new Date(),
			icon: 'dash',
			color:'green',
			type:'octicon'
		  }
		  AsyncStorage.getItem('time_data').then((data) => {
			if(data === null){
			  data= JSON.stringify(time)
			  AsyncStorage.setItem('time_data',data)
			}else{
			data=data+','+JSON.stringify(time)
			AsyncStorage.removeItem('time_data').then(
			 
			  AsyncStorage.setItem('time_data',data)
			)
			}
		  }).done()
		  let objT={
			color:'green',
			item: 'Vision au loin',
			item_sub_category:'RECHERCHER INDICES UTILES',
			item_category:'voir',
			time: new Date(),
			registered_at:this.current(),
			iconF:'ios-eye',
			typeF:'ionicon',
			iconFcolor:'#f7e86a',
			icon:'caretdown',
			type:'antdesign'
			}

		    AsyncStorage.getItem( 'dataFT' ).then( (data) => {
				if(data === null){
				  data= JSON.stringify(objT)
				  AsyncStorage.setItem('dataFT',data)
				}else{
				data=data+','+JSON.stringify(objT)
				AsyncStorage.removeItem('dataFT').then(
				 
				  AsyncStorage.setItem('dataFT',data)
				)
				}
				console.log( data )
				// data=data+','+JSON.stringify(obj)
			  
			  }).done();
	}
	iValM = () =>{
		this.setState({valM: this.state.valM + 1 , totalMVoir: 1+ this.state.totalMVoir})
		let obj={
			color:'red',
			item: 'vision_au_loin',
			item_sub_category:'recherche_indices_utiles',
			item_category:'voir',
			registered_at:this.current()
		}
		// AsyncStorage.getItem( 'data' ).then( data => {
		// 	console.log( data );
		// 	data=data+','+JSON.stringify(obj)
		// 	AsyncStorage.setItem( 'data', data );
		// }).done();
		AsyncStorage.getItem( 'data' ).then( (data) => {
      
			data=data+','+JSON.stringify(obj)
			AsyncStorage.removeItem('data').then(
			 
			  AsyncStorage.setItem('data',data)
			)
			console.log( data )
				  // data=data+','+JSON.stringify(obj)
			  
		  }).done();

		  let time={
			time: new Date(),
			icon: 'dash',
			color:'red',
			type:'octicon'
		  }
		  AsyncStorage.getItem('time_data').then((data) => {
			if(data === null){
			  data= JSON.stringify(time)
			  AsyncStorage.setItem('time_data',data)
			}else{
			data=data+','+JSON.stringify(time)
			AsyncStorage.removeItem('time_data').then(
			 
			  AsyncStorage.setItem('time_data',data)
			)
			}
		  }).done()

		  let objT={
			color:'red',
			item: 'Vision au loin',
			item_sub_category:'RECHERCHER INDICES UTILES',
			item_category:'voir',
			time: new Date(),
			registered_at:this.current(),
			iconF:'ios-eye',
			typeF:'ionicon',
			iconFcolor:'#f7e86a',
			icon:'caretdown',
			type:'antdesign'
			}

		    AsyncStorage.getItem( 'dataFT' ).then( (data) => {
				if(data === null){
				  data= JSON.stringify(objT)
				  AsyncStorage.setItem('dataFT',data)
				}else{
				data=data+','+JSON.stringify(objT)
				AsyncStorage.removeItem('dataFT').then(
				 
				  AsyncStorage.setItem('dataFT',data)
				)
				}
				console.log( data )
				// data=data+','+JSON.stringify(obj)
			  
			  }).done();
	}
	iValN = () =>{
		this.setState({valN: this.state.valN + 1 ,  totalNVoir: 1 + this.state.totalNVoir})
		let obj={
			color:'yellow',
			item: 'vision_au_loin',
			item_sub_category:'recherche_indices_utiles',
			item_category:'voir',
			registered_at:this.current()
		}
		// AsyncStorage.getItem( 'data' ).then( data => {
		// 	console.log( data );
		// 	data=data+','+JSON.stringify(obj)
		// 	AsyncStorage.setItem( 'data', data );
		// }).done();
		AsyncStorage.getItem( 'data' ).then( (data) => {
			if(data === null){
			  data= JSON.stringify(obj)
			  AsyncStorage.setItem('data',data)
			}else{
			data=data+','+JSON.stringify(obj)
			AsyncStorage.removeItem('data').then(
			 
			  AsyncStorage.setItem('data',data)
			)
			}
			console.log( data )
				  // data=data+','+JSON.stringify(obj)
			  
		  }).done();

		  let time={
			time: new Date(),
			icon: 'dash',
			color:'yellow',
			type:'octicon'
		  }
		  AsyncStorage.getItem('time_data').then((data) => {
			if(data === null){
			  data= JSON.stringify(time)
			  AsyncStorage.setItem('time_data',data)
			}else{
			data=data+','+JSON.stringify(time)
			AsyncStorage.removeItem('time_data').then(
			 
			  AsyncStorage.setItem('time_data',data)
			)
			}
		  }).done()

		  let objT={
			color:'yellow',
			item: 'vision au loin',
			item_sub_category:'RECHERCHER INDICES UTILES',
			item_category:'voir',
			time: new Date(),
			registered_at:this.current(),
			iconF:'ios-eye',
			typeF:'ionicon',
			iconFcolor:'#f7e86a',
			icon:'caretdown',
			type:'antdesign'
			}

		    AsyncStorage.getItem( 'dataFT' ).then( (data) => {
				if(data === null){
				  data= JSON.stringify(objT)
				  AsyncStorage.setItem('dataFT',data)
				}else{
				data=data+','+JSON.stringify(objT)
				AsyncStorage.removeItem('dataFT').then(
				 
				  AsyncStorage.setItem('dataFT',data)
				)
				}
				console.log( data )
				// data=data+','+JSON.stringify(obj)
			  
			  }).done();
	}

	//increment vel
	iVelB = () =>{
		this.setState({velB: this.state.velB + 1 ,  totalBVoir: 1 + this.state.totalBVoir})
		let obj={
			color:'green',
			item: 'vision_en_lateral',
			item_sub_category:'recherche_indices_utiles',
			item_category:'voir',
			registered_at:this.current()
		}
		// AsyncStorage.getItem( 'data' ).then( data => {
		// 	console.log( data );
		// 	data=data+','+JSON.stringify(obj)
		// 	AsyncStorage.setItem( 'data', data );
		// }).done();
		AsyncStorage.getItem( 'data' ).then( (data) => {
			if(data === null){
			  data= JSON.stringify(obj)
			  AsyncStorage.setItem('data',data)
			}else{
			data=data+','+JSON.stringify(obj)
			AsyncStorage.removeItem('data').then(
			 
			  AsyncStorage.setItem('data',data)
			)
			}
			console.log( data )
				  // data=data+','+JSON.stringify(obj)
			  
		  }).done();

		  let time={
			time: new Date(),
			icon: 'dash',
			color:'green',
			type:'octicon'
		  }
		  AsyncStorage.getItem('time_data').then((data) => {
			if(data === null){
			  data= JSON.stringify(time)
			  AsyncStorage.setItem('time_data',data)
			}else{
			data=data+','+JSON.stringify(time)
			AsyncStorage.removeItem('time_data').then(
			 
			  AsyncStorage.setItem('time_data',data)
			)
			}
		  }).done()

		  let objT={
			color:'green',
			item: 'Vision en latéral',
			item_sub_category:'RECHERCHER INDICES UTILES',
			item_category:'voir',
			time: new Date(),
			registered_at:this.current(),
			iconF:'ios-eye',
			typeF:'ionicon',
			iconFcolor:'#f7e86a',
			icon:'caretdown',
			type:'antdesign'
			}

		    AsyncStorage.getItem( 'dataFT' ).then( (data) => {
				if(data === null){
				  data= JSON.stringify(objT)
				  AsyncStorage.setItem('dataFT',data)
				}else{
				data=data+','+JSON.stringify(objT)
				AsyncStorage.removeItem('dataFT').then(
				 
				  AsyncStorage.setItem('dataFT',data)
				)
				}
				console.log( data )
				// data=data+','+JSON.stringify(obj)
			  
			  }).done();
	}
	iVelM = () =>{
		this.setState({velM: this.state.velM + 1 ,totalMVoir:1 + this.state.totalMVoir})
		let obj={
			color:'red',
			item: 'vision_en_lateral',
			item_sub_category:'recherche_indices_utiles',
			item_category:'voir',
			registered_at:this.current()
		}
		// AsyncStorage.getItem( 'data' ).then( data => {
		// 	console.log( data );
		// 	data=data+','+JSON.stringify(obj)
		// 	AsyncStorage.setItem( 'data', data );
		// }).done();
		AsyncStorage.getItem( 'data' ).then( (data) => {
			if(data === null){
			  data= JSON.stringify(obj)
			  AsyncStorage.setItem('data',data)
			}else{
			data=data+','+JSON.stringify(obj)
			AsyncStorage.removeItem('data').then(
			 
			  AsyncStorage.setItem('data',data)
			)
			}
			console.log( data )
				  // data=data+','+JSON.stringify(obj)
			  
		  }).done();

		  let time={
			time: new Date(),
			icon: 'dash',
			color:'red',
			type:'octicon'
		  }
		  AsyncStorage.getItem('time_data').then((data) => {
			if(data === null){
			  data= JSON.stringify(time)
			  AsyncStorage.setItem('time_data',data)
			}else{
			data=data+','+JSON.stringify(time)
			AsyncStorage.removeItem('time_data').then(
			 
			  AsyncStorage.setItem('time_data',data)
			)
			}
		  }).done()

		  let objT={
			color:'red',
			item: 'Vision en latéral',
			item_sub_category:'RECHERCHER INDICES UTILES',
			item_category:'voir',
			time: new Date(),
			registered_at:this.current(),
			iconF:'ios-eye',
			typeF:'ionicon',
			iconFcolor:'#f7e86a',
			icon:'caretdown',
			type:'antdesign'
			}

		    AsyncStorage.getItem( 'dataFT' ).then( (data) => {
				if(data === null){
				  data= JSON.stringify(objT)
				  AsyncStorage.setItem('dataFT',data)
				}else{
				data=data+','+JSON.stringify(objT)
				AsyncStorage.removeItem('dataFT').then(
				 
				  AsyncStorage.setItem('dataFT',data)
				)
				}
				console.log( data )
				// data=data+','+JSON.stringify(obj)
			  
			  }).done();
	}
	iVelN = () =>{
		this.setState({velN: this.state.velN + 1 ,  totalNVoir: 1+ this.state.totalNVoir})
		let obj={
			color:'yellow',
			item: 'vision_en_lateral',
			item_sub_category:'recherche_indices_utiles',
			item_category:'voir',
			registered_at:this.current()
		}
		// AsyncStorage.getItem( 'data' ).then( data => {
		// 	console.log( data );
		// 	data=data+','+JSON.stringify(obj)
		// 	AsyncStorage.setItem( 'data', data );
		// }).done();
		AsyncStorage.getItem( 'data' ).then( (data) => {
			if(data === null){
			  data= JSON.stringify(obj)
			  AsyncStorage.setItem('data',data)
			}else{
			data=data+','+JSON.stringify(obj)
			AsyncStorage.removeItem('data').then(
			 
			  AsyncStorage.setItem('data',data)
			)
			}
			console.log( data )
				  // data=data+','+JSON.stringify(obj)
			  
		  }).done();

		  let time={
			time: new Date(),
			icon: 'dash',
			color:'yellow',
			type:'octicon'
		  }
		  AsyncStorage.getItem('time_data').then((data) => {
			if(data === null){
			  data= JSON.stringify(time)
			  AsyncStorage.setItem('time_data',data)
			}else{
			data=data+','+JSON.stringify(time)
			AsyncStorage.removeItem('time_data').then(
			 
			  AsyncStorage.setItem('time_data',data)
			)
			}
		  }).done()

		  let objT={
			color:'yellow',
			item: 'Vision en latéral',
			item_sub_category:'RECHERCHER INDICES UTILES',
			item_category:'voir',
			time: new Date(),
			registered_at:this.current(),
			iconF:'ios-eye',
			typeF:'ionicon',
			iconFcolor:'#f7e86a',
			icon:'caretdown',
			type:'antdesign'
			}

		    AsyncStorage.getItem( 'dataFT' ).then( (data) => {
				if(data === null){
				  data= JSON.stringify(objT)
				  AsyncStorage.setItem('dataFT',data)
				}else{
				data=data+','+JSON.stringify(objT)
				AsyncStorage.removeItem('dataFT').then(
				 
				  AsyncStorage.setItem('dataFT',data)
				)
				}
				console.log( data )
				// data=data+','+JSON.stringify(obj)
			  
			  }).done();
	}

	//increment es
	iEsB = () =>{
		this.setState({esB: this.state.esB + 1 ,totalBVoir: 1 + this.state.totalBVoir})
		let obj={
			color:'green',
			item: 'ecoute_et_sensation',
			item_sub_category:'recherche_indices_utiles',
			item_category:'voir',
			registered_at:this.current()
		}
		// AsyncStorage.getItem( 'data' ).then( data => {
		// 	console.log( data );
		// 	data=data+','+JSON.stringify(obj)
		// 	AsyncStorage.setItem( 'data', data );
		// }).done();
		AsyncStorage.getItem( 'data' ).then( (data) => {
			if(data === null){
			  data= JSON.stringify(obj)
			  AsyncStorage.setItem('data',data)
			}else{
			data=data+','+JSON.stringify(obj)
			AsyncStorage.removeItem('data').then(
			 
			  AsyncStorage.setItem('data',data)
			)
			}
			console.log( data )
				  // data=data+','+JSON.stringify(obj)
			  
		  }).done();

		  let time={
			time: new Date(),
			icon: 'dash',
			color:'green',
			type:'octicon'
		  }
		  AsyncStorage.getItem('time_data').then((data) => {
			if(data === null){
			  data= JSON.stringify(time)
			  AsyncStorage.setItem('time_data',data)
			}else{
			data=data+','+JSON.stringify(time)
			AsyncStorage.removeItem('time_data').then(
			 
			  AsyncStorage.setItem('time_data',data)
			)
			}
		  }).done()

		  let objT={
			color:'green',
			item: 'Écoute & sensations',
			item_sub_category:'RECHERCHER INDICES UTILES',
			item_category:'voir',
			time: new Date(),
			registered_at:this.current(),
			iconF:'ios-eye',
			typeF:'ionicon',
			iconFcolor:'#f7e86a',
			icon:'caretdown',
			type:'antdesign'
			}

		    AsyncStorage.getItem( 'dataFT' ).then( (data) => {
				if(data === null){
				  data= JSON.stringify(objT)
				  AsyncStorage.setItem('dataFT',data)
				}else{
				data=data+','+JSON.stringify(objT)
				AsyncStorage.removeItem('dataFT').then(
				 
				  AsyncStorage.setItem('dataFT',data)
				)
				}
				console.log( data )
				// data=data+','+JSON.stringify(obj)
			  
			  }).done();
	}

	iEsM = () =>{
		this.setState({esM: this.state.esM + 1 ,  totalMVoir: 1 + this.state.totalMVoir})
		let obj={
			color:'red',
			item: 'ecoute_et_sensation',
			item_sub_category:'recherche_indices_utiles',
			item_category:'voir',
			registered_at:this.current()
		}
		// AsyncStorage.getItem( 'data' ).then( data => {
		// 	console.log( data );
		// 	data=data+','+JSON.stringify(obj)
		// 	AsyncStorage.setItem( 'data', data );
		// }).done();
		AsyncStorage.getItem( 'data' ).then( (data) => {
			if(data === null){
			  data= JSON.stringify(obj)
			  AsyncStorage.setItem('data',data)
			}else{
			data=data+','+JSON.stringify(obj)
			AsyncStorage.removeItem('data').then(
			 
			  AsyncStorage.setItem('data',data)
			)
			}
			console.log( data )
				  // data=data+','+JSON.stringify(obj)
			  
		  }).done();

		  let time={
			time: new Date(),
			icon: 'dash',
			color:'red',
			type:'octicon'
		  }
		  AsyncStorage.getItem('time_data').then((data) => {
			if(data === null){
			  data= JSON.stringify(time)
			  AsyncStorage.setItem('time_data',data)
			}else{
			data=data+','+JSON.stringify(time)
			AsyncStorage.removeItem('time_data').then(
			 
			  AsyncStorage.setItem('time_data',data)
			)
			}
		  }).done()

		  let objT={
			color:'red',
			item: 'Écoute & sensations',
			item_sub_category:'RECHERCHER INDICES UTILES',
			item_category:'voir',
			time: new Date(),
			registered_at:this.current(),
			iconF:'ios-eye',
			typeF:'ionicon',
			iconFcolor:'#f7e86a',
			icon:'caretdown',
			type:'antdesign'
			}

		    AsyncStorage.getItem( 'dataFT' ).then( (data) => {
				if(data === null){
				  data= JSON.stringify(objT)
				  AsyncStorage.setItem('dataFT',data)
				}else{
				data=data+','+JSON.stringify(objT)
				AsyncStorage.removeItem('dataFT').then(
				 
				  AsyncStorage.setItem('dataFT',data)
				)
				}
				console.log( data )
				// data=data+','+JSON.stringify(obj)
			  
			  }).done();
	}

	iEsN = () =>{
		this.setState({esN: this.state.esN + 1 ,  totalNVoir: 1+ this.state.totalNVoir})
		let obj={
			color:'yellow',
			item: 'ecoute_et_sensation',
			item_sub_category:'recherche_indices_utiles',
			item_category:'voir',
			registered_at:this.current()
		}
		// AsyncStorage.getItem( 'data' ).then( data => {
		// 	console.log( data );
		// 	data=data+','+JSON.stringify(obj)
		// 	AsyncStorage.setItem( 'data', data );
		// }).done();
		AsyncStorage.getItem( 'data' ).then( (data) => {
			if(data === null){
			  data= JSON.stringify(obj)
			  AsyncStorage.setItem('data',data)
			}else{
			data=data+','+JSON.stringify(obj)
			AsyncStorage.removeItem('data').then(
			 
			  AsyncStorage.setItem('data',data)
			)
			}
			console.log( data )
				  // data=data+','+JSON.stringify(obj)
			  
		  }).done();

		  let time={
			time: new Date(),
			icon: 'dash',
			color:'yellow',
			type:'octicon'
		  }
		  AsyncStorage.getItem('time_data').then((data) => {
			if(data === null){
			  data= JSON.stringify(time)
			  AsyncStorage.setItem('time_data',data)
			}else{
			data=data+','+JSON.stringify(time)
			AsyncStorage.removeItem('time_data').then(
			 
			  AsyncStorage.setItem('time_data',data)
			)
			}
		  }).done()

		  let objT={
			color:'yellow',
			item: 'Écoute & sensations',
			item_sub_category:'RECHERCHER INDICES UTILES',
			item_category:'voir',
			time: new Date(),
			registered_at:this.current(),
			iconF:'ios-eye',
			typeF:'ionicon',
			iconFcolor:'#f7e86a',
			icon:'caretdown',
			type:'antdesign'
			}

		    AsyncStorage.getItem( 'dataFT' ).then( (data) => {
				if(data === null){
				  data= JSON.stringify(objT)
				  AsyncStorage.setItem('dataFT',data)
				}else{
				data=data+','+JSON.stringify(objT)
				AsyncStorage.removeItem('dataFT').then(
				 
				  AsyncStorage.setItem('dataFT',data)
				)
				}
				console.log( data )
				// data=data+','+JSON.stringify(obj)
			  
			  }).done();
	}

	//increment fr
	iFrB = () =>{
		this.setState({frB: this.state.frB + 1 ,  totalBVoir: 1+ this.state.totalBVoir})
		let obj={
			color:'green',
			item: 'focalisation_regard',
			item_sub_category:'recherche_indices_utiles',
			item_category:'voir',
			registered_at:this.current()
		}
		// AsyncStorage.getItem( 'data' ).then( data => {
		// 	console.log( data );
		// 	data=data+','+JSON.stringify(obj)
		// 	AsyncStorage.setItem( 'data', data );
		// }).done();
		AsyncStorage.getItem( 'data' ).then( (data) => {
			if(data === null){
			  data= JSON.stringify(obj)
			  AsyncStorage.setItem('data',data)
			}else{
			data=data+','+JSON.stringify(obj)
			AsyncStorage.removeItem('data').then(
			 
			  AsyncStorage.setItem('data',data)
			)
			}
			console.log( data )
				  // data=data+','+JSON.stringify(obj)
			  
		  }).done();

		  let time={
			time: new Date(),
			icon: 'dash',
			color:'green',
			type:'octicon'
		  }
		  AsyncStorage.getItem('time_data').then((data) => {
			if(data === null){
			  data= JSON.stringify(time)
			  AsyncStorage.setItem('time_data',data)
			}else{
			data=data+','+JSON.stringify(time)
			AsyncStorage.removeItem('time_data').then(
			 
			  AsyncStorage.setItem('time_data',data)
			)
			}
		  }).done()

		  let objT={
			color:'green',
			item: 'Focalisation du regard',
			item_sub_category:'RECHERCHER INDICES UTILES',
			item_category:'voir',
			time: new Date(),
			registered_at:this.current(),
			iconF:'ios-eye',
			typeF:'ionicon',
			iconFcolor:'#f7e86a',
			icon:'caretdown',
			type:'antdesign'
			}

		    AsyncStorage.getItem( 'dataFT' ).then( (data) => {
				if(data === null){
				  data= JSON.stringify(objT)
				  AsyncStorage.setItem('dataFT',data)
				}else{
				data=data+','+JSON.stringify(objT)
				AsyncStorage.removeItem('dataFT').then(
				 
				  AsyncStorage.setItem('dataFT',data)
				)
				}
				console.log( data )
				// data=data+','+JSON.stringify(obj)
			  
			  }).done();
	}

	iFrM = () =>{
		this.setState({frM: this.state.frM + 1 , totalMVoir: 1 + this.state.totalMVoir})
		let obj={
			color:'red',
			item: 'focalisation_regard',
			item_sub_category:'recherche_indices_utiles',
			item_category:'voir',
			registered_at:this.current()
		}
		// AsyncStorage.getItem( 'data' ).then( data => {
		// 	console.log( data );
		// 	data=data+','+JSON.stringify(obj)
		// 	AsyncStorage.setItem( 'data', data );
		// }).done();
		AsyncStorage.getItem( 'data' ).then( (data) => {
			if(data === null){
			  data= JSON.stringify(obj)
			  AsyncStorage.setItem('data',data)
			}else{
			data=data+','+JSON.stringify(obj)
			AsyncStorage.removeItem('data').then(
			 
			  AsyncStorage.setItem('data',data)
			)
			}
			console.log( data )
				  // data=data+','+JSON.stringify(obj)
			  
		  }).done();

		  let time={
			time: new Date(),
			icon: 'dash',
			color:'red',
			type:'octicon'
		  }
		  AsyncStorage.getItem('time_data').then((data) => {
			if(data === null){
			  data= JSON.stringify(time)
			  AsyncStorage.setItem('time_data',data)
			}else{
			data=data+','+JSON.stringify(time)
			AsyncStorage.removeItem('time_data').then(
			 
			  AsyncStorage.setItem('time_data',data)
			)
			}
		  }).done()

		  let objT={
			color:'red',
			item: 'Focalisation du regard',
			item_sub_category:'RECHERCHER INDICES UTILES',
			item_category:'voir',
			time: new Date(),
			registered_at:this.current(),
			iconF:'ios-eye',
			typeF:'ionicon',
			iconFcolor:'#f7e86a',
			icon:'caretdown',
			type:'antdesign'
			}

		    AsyncStorage.getItem( 'dataFT' ).then( (data) => {
				if(data === null){
				  data= JSON.stringify(objT)
				  AsyncStorage.setItem('dataFT',data)
				}else{
				data=data+','+JSON.stringify(objT)
				AsyncStorage.removeItem('dataFT').then(
				 
				  AsyncStorage.setItem('dataFT',data)
				)
				}
				console.log( data )
				// data=data+','+JSON.stringify(obj)
			  
			  }).done();
	}

	iFrN = () =>{
		this.setState({frN: this.state.frN + 1, totalNVoir:1 + this.state.totalNVoir})
		let obj={
			color:'yellow',
			item: 'focalisation_regard',
			item_sub_category:'recherche_indices_utiles',
			item_category:'voir',
			registered_at:this.current()
		}
		// AsyncStorage.getItem( 'data' ).then( data => {
		// 	console.log( data );
		// 	data=data+','+JSON.stringify(obj)
		// 	AsyncStorage.setItem( 'data', data );
		// }).done();
		AsyncStorage.getItem( 'data' ).then( (data) => {
			if(data === null){
			  data= JSON.stringify(obj)
			  AsyncStorage.setItem('data',data)
			}else{
			data=data+','+JSON.stringify(obj)
			AsyncStorage.removeItem('data').then(
			 
			  AsyncStorage.setItem('data',data)
			)
			}
			console.log( data )
				  // data=data+','+JSON.stringify(obj)
			  
		  }).done();

		  let time={
			time: new Date(),
			icon: 'dash',
			color:'yellow',
			type:'octicon'
		  }
		  AsyncStorage.getItem('time_data').then((data) => {
			if(data === null){
			  data= JSON.stringify(time)
			  AsyncStorage.setItem('time_data',data)
			}else{
			data=data+','+JSON.stringify(time)
			AsyncStorage.removeItem('time_data').then(
			 
			  AsyncStorage.setItem('time_data',data)
			)
			}
		  }).done()

		  let objT={
			color:'yellow',
			item: 'Focalisation du regard',
			item_sub_category:'RECHERCHER INDICES UTILES',
			item_category:'voir',
			time: new Date(),
			registered_at:this.current(),
			iconF:'ios-eye',
			typeF:'ionicon',
			iconFcolor:'#f7e86a',
			icon:'caretdown',
			type:'antdesign'
			}

		    AsyncStorage.getItem( 'dataFT' ).then( (data) => {
				if(data === null){
				  data= JSON.stringify(objT)
				  AsyncStorage.setItem('dataFT',data)
				}else{
				data=data+','+JSON.stringify(objT)
				AsyncStorage.removeItem('dataFT').then(
				 
				  AsyncStorage.setItem('dataFT',data)
				)
				}
				console.log( data )
				// data=data+','+JSON.stringify(obj)
			  
			  }).done();
	}

	iEye = () =>{
		this.setState({cEyeV : this.state.cEyeV +1})
		let obj={
			type_sense:'eye',
			category: 'voir',
			registered_at:this.current()
		}
		AsyncStorage.getItem( 'data_sense' ).then( (data) => {
			if(data === null){
			  data= JSON.stringify(obj)
			  AsyncStorage.setItem('data_sense',data)
			}else{
			data=data+','+JSON.stringify(obj)
			AsyncStorage.removeItem('data_sense').then(
			 
			  AsyncStorage.setItem('data_sense',data)
			)
			}
			console.log( data )
				  // data=data+','+JSON.stringify(obj)
			  
		  }).done();
		
		  let time={
			time: new Date(),
			icon:'cryengine',
			color:'#000000',
			type:'material-community',
			
		   }
		  AsyncStorage.getItem('time_data').then((data) => {
			if(data === null){
			  data= JSON.stringify(time)
			  AsyncStorage.setItem('time_data',data)
			}else{
			data=data+','+JSON.stringify(time)
			AsyncStorage.removeItem('time_data').then(
			 
			  AsyncStorage.setItem('time_data',data)
			)
			}
		  }).done()
		  let objT={
			color:'#000000',
			item: '',
			item_sub_category:'',
			item_category:'Voir',
			time: new Date(),
			registered_at:this.current(),
			iconF:'ios-eye',
			typeF:'ionicon',
			iconFcolor:'#f7e86a',
			icon:'cryengine',
			type:'material-community'
			}
		  
			AsyncStorage.getItem( 'dataFT' ).then( (data) => {
			  if(data === null){
				data= JSON.stringify(objT)
				AsyncStorage.setItem('dataFT',data)
			  }else{
			  data=data+','+JSON.stringify(objT)
			  AsyncStorage.removeItem('dataFT').then(
			   
				AsyncStorage.setItem('dataFT',data)
			  )
			  }
			  console.log( data )
			  // data=data+','+JSON.stringify(obj)
			
			}).done();
	}
	iEar = () =>{
		this.setState({cEarV : this.state.cEarV+1})
		let obj={
			type_sense:'ear',
			category: 'voir',
			registered_at:this.current()
		}
		AsyncStorage.getItem( 'data_sense' ).then( (data) => {
			if(data === null){
			  data= JSON.stringify(obj)
			  AsyncStorage.setItem('data_sense',data)
			}else{
			data=data+','+JSON.stringify(obj)
			AsyncStorage.removeItem('data_sense').then(
			 
			  AsyncStorage.setItem('data_sense',data)
			)
			}
			console.log( data )
				  // data=data+','+JSON.stringify(obj)
			  
		  }).done();
		  let time={
			time: new Date(),
			icon: 'ear-hearing',
			color:'#000000',
			type:'material-community'
	
		  }
		  AsyncStorage.getItem('time_data').then((data) => {
			if(data === null){
			  data= JSON.stringify(time)
			  AsyncStorage.setItem('time_data',data)
			}else{
			data=data+','+JSON.stringify(time)
			AsyncStorage.removeItem('time_data').then(
			 
			  AsyncStorage.setItem('time_data',data)
			)
			}
		  }).done()

		  let objT={
			color:'#000000',
			item: '',
			item_sub_category:'',
			item_category:'Voir',
			time: new Date(),
			registered_at:this.current(),
			iconF:'ios-eye',
			typeF:'ionicon',
			iconFcolor:'#f7e86a',
			icon:'ear-hearing',
			type:'material-community'
			}
		  
			AsyncStorage.getItem( 'dataFT' ).then( (data) => {
			  if(data === null){
				data= JSON.stringify(objT)
				AsyncStorage.setItem('dataFT',data)
			  }else{
			  data=data+','+JSON.stringify(objT)
			  AsyncStorage.removeItem('dataFT').then(
			   
				AsyncStorage.setItem('dataFT',data)
			  )
			  }
			  console.log( data )
			  // data=data+','+JSON.stringify(obj)
			
			}).done();
	}
	//Total B
	// TotalB = () =>{
	//   this.setState({totalB: this.state.totalB + this.state.camB + this.state.craB+this.state.crrB+this.state.esB+this.state.frB+this.state.valB+this.state.velB})
	// }
	//   //Total M
	// TotalM = () =>{
	//   this.setState({totalM: this.state.totalM + this.state.camM + this.state.craM+this.state.crrM+this.state.esM+this.state.frB+this.state.valM+this.state.velM})
	// }
	// //Total B
	// TotalN = () =>{
	//   this.setState({totalN: this.state.totalN + this.state.camN + this.state.craN+this.state.crrN+this.state.esN+this.state.frN+this.state.valN+this.state.velN})
	// }

	incrementValue = () =>{
		this.setState({
		expandedV: !this.state.expandedV
		});
		if (this.state.expandedV === true){
		this.setState({countV: this.state.countV + 1})
		}
	}
	// incrementValues = () =>{
	//   this.setState({counts: this.state.counts + 1})
	// }
	// _goBack = () => console.log('Went back');
	// _handlePress = () =>
	//   this.setState({
	//     expanded: !this.state.expanded
	//   });
// async componentDidMount(){
// 	try {
// 		await AsyncStorage.multiRemove(['totalV','data']);
// 	  } catch (error) {
// 		// Error retrieving data
// 		console.log(error.message);
// 	  }
// }
	async componentWillUnmount(){
		// console.log('aaaaaaaaaaaaaaaa');
		try {
			let obj={
				// 
				tBV: this.state.totalBVoir,
				tNV: this.state.totalNVoir,
				tMV: this.state.totalMVoir,
				cEarV : this.state.cEarV,
				cEyeV : this.state.cEyeV
			}
			
			let totalv=JSON.stringify(obj)
			await AsyncStorage.setItem( 'totalV', totalv );
			console.log(totalv);
			
		} catch (error) {
			console.log(error);
			
		}	
		
	}
	
	  renderNodePlayerView = () => {
		return (
		  <LivePlayer 
		 source={{uri:"http://192.168.100.124:8554"}}
		  ref={(ref) => {
			  this.player = ref
		  }}
		  style={{ height:290,width:403,marginHorizontal:390,top:-90 }}
		  paused={false}
		  muted={false}
		  bufferTime={300}
		  maxBufferTime={1000}
		  resizeMode={"contain"}
		  onLoading={()=>{}}
		  onLoad={()=>{}}
		  onEnd={()=>{}}
	   />
		);
	};

    render() {
        return (
          <View style={styles.containerVoir}>
			
                <Card style={styles.carVoir}>
                <View style={{flexDirection:'row',top:90, alignItems:"center"}}>
                  <Text style={{fontSize:30,color:'white',marginHorizontal:140}}>VOIR</Text>
                </View>
				<View style={styles.test1Voir}>
                    <View style={styles.countersVoir}>
                    <TouchableOpacity>
                        <Text>{this.state.totalBVoir}</Text>
                     </TouchableOpacity>
                    </View>
                    <View style={styles.counters1Voir}>
                    <TouchableOpacity>
                        <Text>{this.state.totalNVoir}</Text>
                     </TouchableOpacity>
                    </View>
                    <View style={styles.counters2Voir}>
                    <TouchableOpacity>
                        <Text>{this.state.totalMVoir}</Text>
                     </TouchableOpacity>
                    </View>
                  </View>
				  {/* {this.renderNodePlayerView()} */}
              </Card>
              <View style={{flexDirection:'row'}}>
              <Card style={styles.car7Voir}>
                 <View style={{flexDirection:'row'}}>
                 <Card style={styles.car8Voir}>
                   <ScrollView  style={{height: '100%',width: '100%'}}
					nestedScrollEnabled={true}
					contentContainerStyle={{height: '200%',
					width: '100%',
					}}>
                 <List.Accordion
                  title="RECHERCHER INDICES UTILES"
                  expanded = {this.state.expandedV}
                  onPress ={this.incrementValue}
                  left={props => <List.Icon {...props} icon="eye" /> }
                  titleStyle={{fontWeight:'bold' ,fontSize:18}}
                   >
                  <List.Item title="Contrôle rétroviseurs en roulant" />
                  <View style={styles.testVoir}>
              
                    <Button onPress={this.iCrrB} mode="contained"
                    contentStyle={{width:80,height:80}}
                    style={{width:80,height:80,top: -10, borderRadius:50,left: 40, justifyContent:'center',alignItems:'center',backgroundColor:'#7FA57F'}}
                    labelStyle={{color:'black'}}>{this.state.crrB}</Button>

                    <Button onPress={this.iCrrN} mode="contained"
                    contentStyle={{width:80,height:80}}
                    style={{width:80,height:80,top: -10, borderRadius:50,left: 60, justifyContent:'center',alignItems:'center',backgroundColor:'#FFFF00'}}
                    labelStyle={{color:'black'}}>{this.state.crrN}</Button>
                    
                    <Button onPress={this.iCrrM} mode="contained"
                    contentStyle={{width:80,height:80}}
                    style={{width:80,height:80,top: -10, borderRadius:50,left: 80, justifyContent:'center',alignItems:'center',backgroundColor:'red'}}
                    labelStyle={{color:'black'}}>{this.state.crrM}</Button>
                  </View>
                  <List.Item title="Contrôle rétroviseurs à l’arrêt" />
                  <View style={styles.testVoir}>

                  <Button onPress={this.iCraB} mode="contained"
                    contentStyle={{width:80,height:80}}
                    style={{width:80,height:80,top: -10, borderRadius:50,left: 40, justifyContent:'center',alignItems:'center',backgroundColor:'#7FA57F'}}
                    labelStyle={{color:'black'}}>{this.state.craB}</Button>
                  
                  <Button onPress={this.iCraN} mode="contained"
                    contentStyle={{width:80,height:80}}
                    style={{width:80,height:80,top: -10, borderRadius:50,left: 60, justifyContent:'center',alignItems:'center',backgroundColor:'#FFFF00'}}
                    labelStyle={{color:'black'}}>{this.state.craN}</Button>

                  <Button onPress={this.iCraM} mode="contained"
                    contentStyle={{width:80,height:80}}
                    style={{width:80,height:80,top: -10, borderRadius:50,left: 80, justifyContent:'center',alignItems:'center',backgroundColor:'red'}}
                    labelStyle={{color:'black'}}>{this.state.craM}</Button>  
                  </View>

                  <List.Item title="Contrôle angles morts" />
                  <View style={styles.testVoir}>
                  <Button onPress={this.iCamB} mode="contained"
                    contentStyle={{width:80,height:80}}
                    style={{width:80,height:80,top: -10, borderRadius:50,left: 40, justifyContent:'center',alignItems:'center',backgroundColor:'#7FA57F'}}
                    labelStyle={{color:'black'}}>{this.state.camB}</Button>

                  <Button onPress={this.iCamN} mode="contained"
                    contentStyle={{width:80,height:80}}
                    style={{width:80,height:80,top: -10, borderRadius:50,left: 60, justifyContent:'center',alignItems:'center',backgroundColor:'#FFFF00'}}
                    labelStyle={{color:'black'}}>{this.state.camN}</Button>  

                  <Button onPress={this.iCamM} mode="contained"
                    contentStyle={{width:80,height:80}}
                    style={{width:80,height:80,top: -10, borderRadius:50,left: 80, justifyContent:'center',alignItems:'center',backgroundColor:'red'}}
                    labelStyle={{color:'black'}}>{this.state.camM}</Button>    
                  </View>

                  <List.Item title="Vision au loin" />
                  <View style={styles.testVoir}>
                  <Button onPress={this.iValB} mode="contained"
                    contentStyle={{width:80,height:80}}
                    style={{width:80,height:80,top: -10, borderRadius:50,left: 40, justifyContent:'center',alignItems:'center',backgroundColor:'#7FA57F'}}
                    labelStyle={{color:'black'}}>{this.state.valB}</Button>

                  <Button onPress={this.iValN} mode="contained"
                    contentStyle={{width:80,height:80}}
                    style={{width:80,height:80,top: -10, borderRadius:50,left: 60, justifyContent:'center',alignItems:'center',backgroundColor:'#FFFF00'}}
                    labelStyle={{color:'black'}}>{this.state.valN}</Button>  
  
                  <Button onPress={this.iValM} mode="contained"
                    contentStyle={{width:80,height:80}}
                    style={{width:80,height:80,top: -10, borderRadius:50,left: 80, justifyContent:'center',alignItems:'center',backgroundColor:'red'}}
                    labelStyle={{color:'black'}}>{this.state.valM}</Button>   
                  </View>

                  <List.Item title="Vision en latéral" />
                  <View style={styles.testVoir}>
                  <Button onPress={this.iVelB} mode="contained"
                    contentStyle={{width:80,height:80}}
                    style={{width:80,height:80,top: -10, borderRadius:50,left: 40, justifyContent:'center',alignItems:'center',backgroundColor:'#7FA57F'}}
                    labelStyle={{color:'black'}}>{this.state.velB}</Button>

                  <Button onPress={this.iVelN} mode="contained"
                    contentStyle={{width:80,height:80}}
                    style={{width:80,height:80,top: -10, borderRadius:50,left: 60, justifyContent:'center',alignItems:'center',backgroundColor:'#FFFF00'}}
                    labelStyle={{color:'black'}}>{this.state.velN}</Button>    

                  <Button onPress={this.iVelM} mode="contained"
                    contentStyle={{width:80,height:80}}
                    style={{width:80,height:80,top: -10, borderRadius:50,left: 80, justifyContent:'center',alignItems:'center',backgroundColor:'red'}}
                    labelStyle={{color:'black'}}>{this.state.velM}</Button>     
                  </View>

                  <List.Item title="Écoute & sensations" />
                  <View style={styles.testVoir}>
                  <Button onPress={this.iEsB} mode="contained"
                    contentStyle={{width:80,height:80}}
                    style={{width:80,height:80,top: -10, borderRadius:50,left: 40, justifyContent:'center',alignItems:'center',backgroundColor:'#7FA57F'}}
                    labelStyle={{color:'black'}}>{this.state.esB}</Button>

                  <Button onPress={this.iEsN} mode="contained"
                    contentStyle={{width:80,height:80}}
                    style={{width:80,height:80,top: -10, borderRadius:50,left: 60, justifyContent:'center',alignItems:'center',backgroundColor:'#FFFF00'}}
                    labelStyle={{color:'black'}}>{this.state.esN}</Button>    
  
                  <Button onPress={this.iEsM} mode="contained"
                    contentStyle={{width:80,height:80}}
                    style={{width:80,height:80,top: -10, borderRadius:50,left: 80, justifyContent:'center',alignItems:'center',backgroundColor:'red'}}
                    labelStyle={{color:'black'}}>{this.state.esM}</Button>     
                  </View>

                  <List.Item title="Focalisation du regard" />
                  <View style={styles.testVoir}>
                  <Button onPress={this.iFrB} mode="contained"
                    contentStyle={{width:80,height:80}}
                    style={{width:80,height:80,top: -10, borderRadius:50,left: 40, justifyContent:'center',alignItems:'center',backgroundColor:'#7FA57F'}}
                    labelStyle={{color:'black'}}>{this.state.frB}</Button>  

                  <Button onPress={this.iFrN} mode="contained"
                    contentStyle={{width:80,height:80}}
                    style={{width:80,height:80,top: -10, borderRadius:50,left: 60, justifyContent:'center',alignItems:'center',backgroundColor:'#FFFF00'}}
                    labelStyle={{color:'black'}}>{this.state.frN}</Button>      

                  <Button onPress={this.iFrM} mode="contained"
                    contentStyle={{width:80,height:80}}
                    style={{width:80,height:80,top: -10, borderRadius:50,left: 80, justifyContent:'center',alignItems:'center',backgroundColor:'red'}}
                    labelStyle={{color:'black'}}>{this.state.frM}</Button>     
                  </View>  
                    
                  </List.Accordion>
                  <TouchableOpacity style={styles.car9Voir}><Text style={{fontSize:16,top:10,color:'black',fontWeight:'bold'}}>{this.state.countV}</Text></TouchableOpacity>
                  <Card style={styles.car0Voir}></Card>
                  </ScrollView>
              </Card>
              <Card style={styles.car10Voir}>
                <View style={{flexDirection:'column'}}>
                <TouchableOpacity  style={styles.touch4Voir} onPress={this.iEye}>
                           <Icon
                                name='cryengine'
                                type='material-community'
                                color='#000000'
                                size= {36}
                            />
                </TouchableOpacity>
                <TouchableOpacity  style={styles.touch5Voir} onPress={this.iEar}>
                           <Icon
                                name='ear-hearing'
                                type='material-community'
                                color='#000000'
                                size= {36}
                            />
                </TouchableOpacity>
                </View>
              </Card>
              </View>
			 
              </Card>
              </View>
			 
          </View>
            )
        }
}

const styles = StyleSheet.create({
    containerVoir: {
	  flex: 1,
	  backgroundColor:'#f7e86a'
    },
    countersVoir: {
      width:50,
      height:50,
		  backgroundColor:'#7FA57F',
      borderRadius: 25,
      justifyContent:'center',
      alignItems:'center',
      left:120,
      top:25,
    },
    counters1Voir: {
      width:50,
      height:50,
		  backgroundColor:'#FFFF00',
      borderRadius: 25,
      justifyContent:'center',
      alignItems:'center',
      left:140,
      top:25
    },
    counters2Voir: {
      width:50,
      height:50,
		  backgroundColor:'red',
      borderRadius: 25,
      justifyContent:'center',
      alignItems:'center',
      left:160,
      top:25
    },
    counterVoir: {
      width:60,
      height:60,
		  backgroundColor:'#7FA57F',
      //borderRadius:50,
      justifyContent:'center',
      alignItems:'center',
      left:40,
      top:-10,
    },
    counter1Voir: {
      width:80,
      height:80,
		backgroundColor:'#FFFF00',
      borderRadius:50,
      justifyContent:'center',
      alignItems:'center',
      left:60,
      top:-10
    },
    counter2Voir: {
      width:80,
      height:80,
		  backgroundColor:'red',
      borderRadius:50,
      justifyContent:'center',
      alignItems:'center',
      left:80,
      top:-10
    },
    testVoir: {
	flexDirection: 'row',
	// top:100
	},
	test1Voir: {
		flexDirection: 'row',
		top:80
		},
    car0Voir: {
      height:300,
      width:530,
      backgroundColor:'#E5E5FF',
      borderWidth:2,
      top:500
     },
    carVoir: {
     height:300,
     backgroundColor:'#f7e86a',
     //top:10,
     //borderColor:'black',
     //borderWidth:1,
    },
    car2Voir: {
     height:90,
     width:100,
     top:30,
     left:540,
     backgroundColor:'#F2B97F',
     borderColor:'black',
     //borderWidth:2,
     justifyContent:'center',
     alignItems:'center'
    },
    car3Voir: {
     height:90,
     width:100,
     top:30,
     left:550,
     backgroundColor:'#F2B97F',
     borderColor:'black',
     //borderWidth:2,
     alignItems:'center'
    },
    car4Voir: {
     height:50,
     width:150,
     top:50,
     left:300,
     backgroundColor:'#7FB8F2',
     alignItems:'center'
    },
    car5Voir: {
     height:60,
     width:500,
     top:20,
     left:20,
     //backgroundColor:'blue',
     //borderColor:'black',
     //borderWidth:2
    },
    car6Voir: {
     height:50,
     width:150,
     top:25,
     left:30,
     backgroundColor:'#7FB8F2',
     alignItems:'center'
    },
    car7Voir: {
     height:1000,
     width:800,
     //top:28,
     //left:5,
     backgroundColor:'#f7e86a',
    }
    ,
    car8Voir: {
     height:1000,
     width:530,
     backgroundColor:'#fefadb',
     borderColor:'#f7e86a',
     borderWidth:2
    },
    car9Voir: {
     height:40,
     width:25,
     left:420,
     top:-15,
     //backgroundColor:'#fff',
    alignItems:'center'
    },
    car10Voir: {
     height:1000,
     width:300,
    // top:35,
     //left:10,
     backgroundColor:'#f7e86a',
     //borderColor:'black',
     //borderWidth:2
    },
    touchVoir: {
      height:70,
      width:80,
      top:120,
      left:60,
      backgroundColor:'#7FA57F',
      borderRadius:50,
      //borderWidth:2,
      justifyContent:'center',
      alignItems:'center'
     },
    touch1Voir: {
      height:70,
      width:80,
      top:150,
      left:60,
      backgroundColor:'#FFFF00',
      borderRadius:50,
      //borderWidth:2,
      justifyContent:'center',
      alignItems:'center'
     },
     touch3Voir: {
      height:70,
      width:80,
      top:190,
      left:60,
      backgroundColor:'red',
      borderRadius:50,
      //borderWidth:2,
      justifyContent:'center',
      alignItems:'center'
     },
     touch4Voir: {
      height:50,
      width:50,
      top:560,
      left:120,
      backgroundColor:'#fff',
      justifyContent:'center',
      borderWidth:2,
      alignItems:'center'
     },
     touch5Voir: {
      height:50,
      width:50,
      top:590,
      left:120,
      backgroundColor:'#fff',
      justifyContent:'center',
      borderWidth:2,
      alignItems:'center'
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
	  marginLeft: 1 ,
	  // marginRight: 8,
	//  right: 300,
	  alignSelf: 'center',
	  color: 'white',
	  fontSize:22,
      top:-10
  }
  });