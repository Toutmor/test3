import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,Image,Alert
} from 'react-native';
import { List, Card, Button} from 'react-native-paper'
import {Icon} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Actions } from 'react-native-router-flux';


export default class PrevoirParcours extends React.Component {
	state = {
		expanded: false,
		count: 0,
		counts: 0,
		//compteurs totaux
		totalB :0,
		totalM :0,
		totalN :0,
		//prise en compte du manque de visibilité
		pcmvB :0,
		pcmvM :0,
		pcmvN :0,
		//prise en compte des éventuelles actions des autres
		pcmeaaB :0,
		pcmeaaM :0,
		pcmeaaN :0,
		//Prise en compte de l’adhérence et de l’état de la chaussée
		pcaecB :0,
		pcaecM :0,
		pcaecN :0,
		modalVisible: false,

		//oeil
		cEye:0,
		//oreille
		cEar:0
	}

	current=()=>{
		let today=new Date();
		let datetime=("0" + today.getUTCHours()).slice(-2) + ":" +("0" + today.getUTCMinutes()).slice(-2) + ":" + ("0" +today.getUTCSeconds()).slice(-2);
		return datetime;
	}

	iPcmvB= () =>{
		this.current();
		this.setState({pcmvB: this.state.pcmvB + 1 , totalB:1+this.state.totalB })
		let obj={
		color:'green',
		item: 'prise_en_compte_manque_visibilite',
		item_sub_category:'evaluation_situations_dangereuses',
		item_category:'prevoir',
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
			item: 'Manque de visibilité',
			item_sub_category:'ÉVALUER SITUATIONS DANGEREUSES',
			item_category:'Prévoir',
			time: new Date(),
			registered_at:this.current(),
			iconF:'ios-person',
			typeF:'ionicon',
			iconFcolor:'#48bbdd',
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
	iPcmvM= () =>{
		this.setState({pcmvM: this.state.pcmvM + 1 , totalM: 1+this.state.totalM})
		let obj={
		color:'red',
		item: 'prise_en_compte_manque_visibilite',
		item_sub_category:'evaluation_situations_dangereuses',
		item_category:'prevoir',
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
			item: 'Manque de visibilité',
			item_sub_category:'ÉVALUER SITUATIONS DANGEREUSES',
			item_category:'Prévoir',
			time: new Date(),
			registered_at:this.current(),
			iconF:'ios-person',
			typeF:'ionicon',
			iconFcolor:'#48bbdd',
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
	iPcmvN= () =>{
		this.setState({pcmvN: this.state.pcmvN + 1 , totalN : 1+this.state.totalN})
		let obj={
		color:'yellow',
		item: 'prise_en_compte_manque_visibilite',
		item_sub_category:'evaluation_situations_dangereuses',
		item_category:'prevoir',
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
			item: 'Manque de visibilité',
			item_sub_category:'ÉVALUER SITUATIONS DANGEREUSES',
			item_category:'Prévoir',
			time: new Date(),
			registered_at:this.current(),
			iconF:'ios-person',
			typeF:'ionicon',
			iconFcolor:'#48bbdd',
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

	iPcmeaaB= () =>{
		this.setState({pcmeaaB: this.state.pcmeaaB + 1 , totalB:1+this.state.totalB })
		let obj={
		color:'green',
		item: 'prise_en_compte_eventuelles_actions_des_autres',
		item_sub_category:'evaluation_situations_dangereuses',
		item_category:'prevoir',
		registered_at:this.current()
		}
		// AsyncStorage.getItem( 'data' ).then( data => {
		// 		console.log( data );
		// 		data=data+','+JSON.stringify(obj)
		// 		AsyncStorage.setItem( 'data', data );
		// 	}).done();
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
			item: 'Éventuelles actions des autres',
			item_sub_category:'ÉVALUER SITUATIONS DANGEREUSES',
			item_category:'Prévoir',
			time: new Date(),
			registered_at:this.current(),
			iconF:'ios-person',
			typeF:'ionicon',
			iconFcolor:'#48bbdd',
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

	iPcmeaaM= () =>{
		this.setState({pcmeaaM: this.state.pcmeaaM + 1 , totalM:1+this.state.totalM })
		let obj={
		color:'red',
		item: 'prise_en_compte_eventuelles_actions_des_autres',
		item_sub_category:'evaluation_situations_dangereuses',
		item_category:'prevoir',
		registered_at:this.current()
		}
		// AsyncStorage.getItem( 'data' ).then( data => {
		// 		console.log( data );
		// 		data=data+','+JSON.stringify(obj)
		// 		AsyncStorage.setItem( 'data', data );
		// 	}).done();
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
			item: 'Éventuelles actions des autres',
			item_sub_category:'ÉVALUER SITUATIONS DANGEREUSES',
			item_category:'Prévoir',
			time: new Date(),
			registered_at:this.current(),
			iconF:'ios-person',
			typeF:'ionicon',
			iconFcolor:'#48bbdd',
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

	iPcmeaaN= () =>{
		this.setState({pcmeaaN: this.state.pcmeaaN + 1 , totalN:1+this.state.totalN })
		let obj={
		color:'yellow',
		item: 'prise_en_compte_eventuelles_actions_des_autres',
		item_sub_category:'evaluation_situations_dangereuses',
		item_category:'prevoir',
		registered_at:this.current()
		}
		// AsyncStorage.getItem( 'data' ).then( data => {
		// 		console.log( data );
		// 		data=data+','+JSON.stringify(obj)
		// 		AsyncStorage.setItem( 'data', data );
		// 	}).done();
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
			item: 'Éventuelles actions des autres',
			item_sub_category:'ÉVALUER SITUATIONS DANGEREUSES',
			item_category:'Prévoir',
			time: new Date(),
			registered_at:this.current(),
			iconF:'ios-person',
			typeF:'ionicon',
			iconFcolor:'#48bbdd',
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

  iPcaecB= () =>{
    this.setState({pcaecB: this.state.pcaecB + 1 , totalB:1+this.state.totalB })
    let obj={
      color:'green',
      item: 'prise_en_compte_adherence_et_etat_de_la_chaussee',
      item_sub_category:'evaluation_situations_dangereuses',
	  item_category:'prevoir',
	  registered_at:this.current()
    }
    // AsyncStorage.getItem( 'data' ).then( data => {
	// 		console.log( data );
	// 		data=data+','+JSON.stringify(obj)
	// 		AsyncStorage.setItem( 'data', data );
	// 	}).done();
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
		item: 'Adhérence & état de la chaussée',
		item_sub_category:'ÉVALUER SITUATIONS DANGEREUSES',
		item_category:'Prévoir',
		time: new Date(),
		registered_at:this.current(),
		iconF:'ios-person',
		typeF:'ionicon',
		iconFcolor:'#48bbdd',
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
  iPcaecM= () =>{
    this.setState({pcaecM: this.state.pcaecM + 1 , totalM:1+this.state.totalM })
    let obj={
      color:'red',
      item: 'prise_en_compte_adherence_et_etat_de_la_chaussee',
      item_sub_category:'evaluation_situations_dangereuses',
	  item_category:'prevoir',
	  registered_at:this.current()
    }
    // AsyncStorage.getItem( 'data' ).then( data => {
	// 		console.log( data );
	// 		data=data+','+JSON.stringify(obj)
	// 		AsyncStorage.setItem( 'data', data );
	// 	}).done();
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
		item: 'Adhérence & état de la chaussée',
		item_sub_category:'ÉVALUER SITUATIONS DANGEREUSES',
		item_category:'Prévoir',
		time: new Date(),
		registered_at:this.current(),
		iconF:'ios-person',
		typeF:'ionicon',
		iconFcolor:'#48bbdd',
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
  iPcaecN= () =>{
    this.setState({pcaecN: this.state.pcaecN + 1 , totalN:1+this.state.totalN })
    let obj={
      color:'yellow',
      item: 'prise_en_compte_adherence_et_etat_de_la_chaussee',
      item_sub_category:'evaluation_situations_dangereuses',
	  item_category:'prevoir',
	  registered_at:this.current()
    }
    // AsyncStorage.getItem( 'data' ).then( data => {
	// 		console.log( data );
	// 		data=data+','+JSON.stringify(obj)
	// 		AsyncStorage.setItem( 'data', data );
	// 	}).done();
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
		item: 'Adhérence & état de la chaussée',
		item_sub_category:'ÉVALUER SITUATIONS DANGEREUSES',
		item_category:'Prévoir',
		time: new Date(),
		registered_at:this.current(),
		iconF:'ios-person',
		typeF:'ionicon',
		iconFcolor:'#48bbdd',
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

  iEyeV = () =>{
	this.setState({cEye : this.state.cEye +1})
		let obj={
		type_sense:'eye',
		category: 'prevoir',
		registered_at:this.current()
		}
		// AsyncStorage.getItem( 'data_sense' ).then( data => {
		// 	console.log( data );
		// 	data=data+','+JSON.stringify(obj)
		// 	AsyncStorage.setItem( 'data_sense', data );
		// }).done();
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
			item_category:'Prévoir',
			time: new Date(),
			registered_at:this.current(),
			iconF:'ios-person',
			typeF:'ionicon',
			iconFcolor:'#48bbdd',
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
	iEarV = () =>{
		this.setState({cEar : this.state.cEar+1})
		let obj={
	  type_sense:'ear',
	  category: 'prevoir',
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
			item_category:'Prévoir',
			time: new Date(),
			registered_at:this.current(),
			iconF:'ios-person',
			typeF:'ionicon',
			iconFcolor:'#48bbdd',
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
  
  // showModal=() =>{
  //   this.setState({ modalVisible: true })
  // }
  // hideModal=() =>{
  //   this.setState({ modalVisible: false })
  //   // Refocus on the Input field after selecting the country code
  // }
  incrementValue = () =>{
    this.setState({count: this.state.count + 1})
  }
  incrementValues = () =>{
    this.setState({counts: this.state.counts + 1})
  }
  _goBack = () => console.log('Went back');
  _handlePress = () =>{
    this.setState({
      expanded: !this.state.expanded
    });
    if (this.state.expanded === true){
      this.setState({count: this.state.count + 1})
      }
  }
//   async componentDidMount(){
// 	try {
// 		await AsyncStorage.multiRemove(['totalP','data']);
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
			tBP: this.state.totalB,
			tNP: this.state.totalN,
			tMP: this.state.totalM,
			cEarP : this.state.cEar,
			cEyeP : this.state.cEye
		}
		let totalP = JSON.stringify(obj)
		AsyncStorage.setItem( 'totalP', totalP);
	
	} catch (error) {
		
	}
}

    render() {
        return (
          <View style={styles.container}>
             <View style={styles.headerContainer}>
             <View style={{alignItems:"center",flexDirection:"row"}}>
                  <Image
                    style={{width:200, height:260}}
                    source= {require("../../images/CJ-JPB-new.png")}
               />
                  <Text style={styles.headerTitle}>PARCOURS ROUTIER</Text>
                  </View>
                  <Text style={{color:'#00B0F0',fontSize:16,left:-177, textAlign:'right',fontStyle:"italic",top:45}}>Powered by CleanData</Text>
				  <View style={{top:20,left:140}}>
                    <Icon
                      name='menu-left-outline'
					  color='#fff'
					  type='material-community'
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
                    />
                  </View>
            </View>
                <Card style={styles.car}>
                <View style={{flexDirection:'row',top:90, alignItems:"center"}}>
                  <Text style={{fontSize:30,color:'white',marginHorizontal:140}}>PRÉVOIR</Text>
                </View>
				<View style={styles.test1}>
				<View style={styles.counters}>
                    <TouchableOpacity>
                        <Text>{this.state.totalB}</Text>
                     </TouchableOpacity>
                    </View>
                    <View style={styles.counters1}>
                    <TouchableOpacity >
                        <Text>{this.state.totalN}</Text>
                     </TouchableOpacity>
                    </View>
                    <View style={styles.counters2}>
                    <TouchableOpacity >
                        <Text>{this.state.totalM}</Text>
                     </TouchableOpacity>
                    </View>
                  </View>
              </Card>
              <View style={{flexDirection:'row'}}>
              <Card style={styles.car7}>
                 <View style={{flexDirection:'row'}}>
                 <Card style={styles.car8}>
                 <List.Accordion
                  title="ÉVALUER SITUATIONS DANGEREUSES"
                  left={props => <List.Icon {...props} icon="account-alert" /> }
                  expanded = {this.state.expanded}
                  onPress={this._handlePress}
                  titleStyle={{fontWeight:'bold' ,fontSize:18}}
                   >
                  <List.Item title="Manque de visibilité" />
                  <View style={styles.test}>
                
                    <Button onPress={this.iPcmvB} mode="contained"
                    contentStyle={{width:80,height:80}}
                    style={{width:80,height:80,top: -10, borderRadius:50,left: 40, justifyContent:'center',alignItems:'center',backgroundColor:'#7FA57F'}}
                    labelStyle={{color:'black'}}>
                      {this.state.pcmvB}
                    </Button>
                 
                    
                    <Button onPress={this.iPcmvN} mode="contained"
                    contentStyle={{width:80,height:80}}
                    style={{width:80,height:80,top: -10, borderRadius:50,left: 60, justifyContent:'center',alignItems:'center',backgroundColor:'#FFFF00'}}
                    labelStyle={{color:'black'}}>
                      {this.state.pcmvN}
                     </Button>
                   
                    
                    <Button onPress={this.iPcmvM} mode="contained"
                    contentStyle={{width:80,height:80}}
                    style={{width:80,height:80,top: -10, borderRadius:50,left: 80, justifyContent:'center',alignItems:'center',backgroundColor:'red'}}
                    labelStyle={{color:'black'}}>
                        {this.state.pcmvM}
                     </Button>
                   
                  </View>
                  <List.Item title="Éventuelles actions des autres" />
                  <View style={styles.test}>
                    
                    <Button onPress={this.iPcmeaaB} mode="contained"
                    contentStyle={{width:80,height:80}}
                    style={{width:80,height:80,top: -10, borderRadius:50,left: 40, justifyContent:'center',alignItems:'center',backgroundColor:'#7FA57F'}}
                    labelStyle={{color:'black'}}>
                        {this.state.pcmeaaB}
                     </Button>
                    
                    
                    <Button onPress={this.iPcmeaaN} mode="contained"
                    contentStyle={{width:80,height:80}}
                    style={{width:80,height:80,top: -10, borderRadius:50,left: 60, justifyContent:'center',alignItems:'center',backgroundColor:'#FFFF00'}}
                    labelStyle={{color:'black'}}>
                      {this.state.pcmeaaN}
                    </Button>
                    
                   
                    <Button onPress={this.iPcmeaaM} mode="contained"
                    contentStyle={{width:80,height:80}}
                    style={{width:80,height:80,top: -10, borderRadius:50,left: 80, justifyContent:'center',alignItems:'center',backgroundColor:'red'}}
                    labelStyle={{color:'black'}}>
                      {this.state.pcmeaaM}
                    </Button>
                
                  </View>
                  <List.Item title="Adhérence & état de la chaussée" />
                  <View style={styles.test}>
                    
                    <Button onPress={this.iPcaecB} mode="contained"
                    contentStyle={{width:80,height:80}}
                    style={{width:80,height:80,top: -10, borderRadius:50,left: 40, justifyContent:'center',alignItems:'center',backgroundColor:'#7FA57F'}}
                    labelStyle={{color:'black'}}>
                      {this.state.pcaecB}
                    </Button>
                    
                   
                    <Button onPress={this.iPcaecN} mode="contained"
                    contentStyle={{width:80,height:80}}
                    style={{width:80,height:80,top: -10, borderRadius:50,left: 60, justifyContent:'center',alignItems:'center',backgroundColor:'#FFFF00'}}
                    labelStyle={{color:'black'}}>
                      {this.state.pcaecN}
                    </Button>
                   
                    
                    <Button onPress={this.iPcaecM} mode="contained"
                    contentStyle={{width:80,height:80}}
                    style={{width:80,height:80,top: -10, borderRadius:50,left: 80, justifyContent:'center',alignItems:'center',backgroundColor:'red'}}
                    labelStyle={{color:'black'}}>
                      {this.state.pcaecM}
                    </Button>
                  
                  </View>
                  </List.Accordion>
                  <TouchableOpacity style={styles.car9}><Text style={{fontSize:16,top:10,color:'black',fontWeight:'bold'}}>{this.state.count}</Text></TouchableOpacity>
              </Card>
              <Card style={styles.car10}>
                <View style={{flexDirection:'column'}}>
                <TouchableOpacity  style={styles.touch4} onPress={this.iEyeV}>
                           <Icon
                                name='cryengine'
                                type='material-community'
                                color='#000000'
                                size= {36}
                            />
                </TouchableOpacity>
                <TouchableOpacity  style={styles.touch5} onPress={this.iEarV}>
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
    container: {
		  flex: 1,
		  backgroundColor:'#48bbdd'
    },
    counters: {
      	width:50,
      	height:50,
		backgroundColor:'#7FA57F',
		borderRadius: 25,
		justifyContent:'center',
		alignItems:'center',
		left:120,
		top:25,
    },
    counters1: {
		width:50,
		height:50,
		backgroundColor:'#FFFF00',
		borderRadius: 25,
		justifyContent:'center',
		alignItems:'center',
		left:140,
		top:25
    },
    counters2: {
		width:50,
		height:50,
		backgroundColor:'red',
		borderRadius: 25,
		justifyContent:'center',
		alignItems:'center',
		left:160,
		top:25
    },
    counter: {
		width:80,
		height:80,
		backgroundColor:'#7FA57F',
		borderRadius: 50,
		justifyContent:'center',
		alignItems:'center',
		left:40,
		top:-10,
    },
    counter1: {
		width:80,
		height:80,
		backgroundColor:'#FFFF00',
		borderRadius:50,
		justifyContent:'center',
		alignItems:'center',
		left:60,
		top:-10
    },
    counter2: {
		width:80,
		height:80,
		backgroundColor:'red',
		borderRadius: 50,
		justifyContent:'center',
		alignItems:'center',
		left:80,
		top:-10
    },
    test: {
    	flexDirection: 'row',
	},
	test1: {
		flexDirection: 'row',
		top:80
		},
    car: {
		height:300,
		backgroundColor:'#48bbdd',
		//top:10,
		//borderColor:'black',
		//borderWidth:1,
    },
    car2: {
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
    car3: {
		height:90,
		width:100,
		top:30,
		left:550,
		backgroundColor:'#F2B97F',
		borderColor:'black',
    	// borderWidth:2,
     	alignItems:'center'
    },
    car4: {
		height:50,
		width:150,
		top:50,
		left:300,
		backgroundColor:'#7FB8F2',
		alignItems:'center'
    },
    car5: {
		height:60,
		width:500,
		top:20,
		left:20,
		//backgroundColor:'blue',
		//borderColor:'black',
		//borderWidth:2
    },
    car6: {
		height:50,
		width:150,
		top:25,
		left:30,
		backgroundColor:'#7FB8F2',
		alignItems:'center'
    },
    car7: {
		height:1000,
		width:800,
		//top:28,
		//left:5,
		backgroundColor:'#48bbdd',
    }
    ,
    car8: {
		height:1000,
		width:530,
		backgroundColor:'#d6eff7',
		borderColor:'#48bbdd',
		borderWidth:2
    },
    car9: {
		height:40,
		width:25,
		left:420,
		top:-15,
		//backgroundColor:'#fff',
		alignItems:'center'
    },
    car10: {
		height:1000,
		width:300,
		//top:35,
		//left:10,
		backgroundColor:'#48bbdd',
		//borderColor:'black',
		//borderWidth:2
    },
    touch: {
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
    touch1: {
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
    touch3: {
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
    touch4: {
		height:50,
		width:50,
		top:560,
		left:120,
		backgroundColor:'#fff',
		justifyContent:'center',
		borderWidth:2,
		alignItems:'center'
    },
    touch5: {
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
	  marginLeft: 1,
	  // marginRight: 8,
	//  right: 300,
	  alignSelf: 'center',
	  color: 'white',
	  fontSize:22,
	  top: -10
  }
});
