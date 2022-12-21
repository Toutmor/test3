import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
  ScrollView,Image,
  BackHandler,Alert
} from 'react-native';
import {
	List,
	Divider,
	Badge,
	Card,
	Button
}  from 'react-native-paper'
import {Icon} from 'react-native-elements';
import {Actions} from 'react-native-router-flux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LivePlayer} from "react-native-live-stream";
import { VLCPlayer, VlCPlayerView } from 'react-native-vlc-media-player';



export default class PreparerParcours extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
		expanded1: false,
		expanded2: false,
		expanded3: false,
		expanded4: false,
		expanded5: false,
		count: 0,
		counts: 0,
		countV2: 0,
		//Preparer la conduite et utiliser le vehicule
		
		//Le vehicule
		c1:0,
		//etat du vehicule verification des elements de sécutité
		v1 :0,
		v2:0,
		v3:0,
		//Prise en main du vehicule
		p1:0,
		p2:0,
		p3:0,

		//l'organistion du déplacement
		c2:0,
		//preparation de l'itinéraire
		prep1:0,
		prep2:0,
		prep3:0,
		//Condition Physique
		cp1:0,
		cp2:0,
		cp3:0,

		//les passagers et le chargement
		c3:0,
		//l'installation despassagers
		ip1:0,
		ip2:0,
		ip3:0,
		//Repartition et l'arrimage du chargement
		r1:0,
		r2:0,
		r3:0,

		//Installation au poste de conduite
		c4:0,
		//reglage du siége
		rs1:0,
		rs2:0,
		rs3:0,
		//reglage de l'appui tête
		ra1:0,
		ra2:0,
		ra3:0,
		//reglage des retroviseurs
		rr1:0,
		rr2:0,
		rr3:0,
		//la mise en place de la ceinture de sécurité
		m1:0,
		m2:0,
		m3:0,

		//Utilisation du vehicule
		c5:0,
		//adaptation au vehicule inhabituel
		av1:0,
		av2:0,
		av3:0,
		//utilisation mécanique
		u1:0,
		u2:0,
		u3:0,
		//position des mains et l'utilisation
		po1:0,
		po2:0,
		po3:0,

		//total
		tB:0,
		tM:0,
    tN:0,
    
    //oeil
    cEye:0,
    //oreille
    cEar:0
  }
}
  
  // showModal=() =>{
  //   this.setState({ modalVisible: true })
  // }
  // hideModal=() =>{
  //   this.setState({ modalVisible: false })
  //   // Refocus on the Input field after selecting the country code
  // }

  current=()=>{
		let today=new Date();
		let datetime=("0" + today.getUTCHours()).slice(-2) + ":" +("0" + today.getUTCMinutes()).slice(-2) + ":" + ("0" +today.getUTCSeconds()).slice(-2);
		return datetime;
	}

	iv1= () =>{
		this.setState({v1: this.state.v1 + 1 , tB:this.state.tB +1})
		let obj={
		color:'green',
		item: 'etat',
		item_sub_category:'vehicule',
		item_category:'preparer',
		registered_at:this.current()
		}
	
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
    // let iconF={
    //   icon:'ios-car',
    //   type:'ionicon',
    //   color:'#1b4f9c'
    // }
    let objT={
      color:'green',
      item: 'État - Vérification éléments de sécurité',
      item_sub_category:'VEHICULE',
      item_category:'Préparer',
      time: new Date(),
      registered_at:this.current(),
      iconF:'ios-car',
      typeF:'ionicon',
      iconFcolor:'#1b4f9c',
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

  iv2= () =>{
    this.setState({v2: this.state.v2 + 1 , tN:this.state.tN +1})
    let obj={
      color:'yellow',
      item: 'etat',
      item_sub_category:'vehicule',
      item_category:'preparer',
      registered_at:this.current()
    }
    // AsyncStorage.getItem( 'data' ).then( (data) => {
      
    //   data=data+','+JSON.stringify(obj)
    //   AsyncStorage.removeItem('data').then(
       
    //     AsyncStorage.setItem('data',data)
    //   )
    //   console.log( data )
		// 	// data=data+','+JSON.stringify(obj)
		
    // }).done();
    // let data = JSON.stringify(obj)
    // AsyncStorage.mergeItem('data',data)
    // console.log( data );
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
      item: 'État - Vérification éléments de sécurité',
      item_sub_category:'VEHICULE',
      item_category:'Préparer',
      time: new Date(),
      registered_at:this.current(),
      iconF:'ios-car',
      typeF:'ionicon',
      iconFcolor:'#1b4f9c',
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
  iv3= () =>{
    this.setState({v3: this.state.v3 + 1 , tM:this.state.tM +1})
    let obj={
      color:'red',
      item: 'etat',
      item_sub_category:'vehicule',
      item_category:'preparer',
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
      item: 'État - Vérification éléments de sécurité',
      item_sub_category:'VEHICULE',
      item_category:'Préparer',
      time: new Date(),
      registered_at:this.current(),
      iconF:'ios-car',
      typeF:'ionicon',
      iconFcolor:'#1b4f9c',
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
  //

  ip1= () =>{
    this.setState({p1: this.state.p1 + 1 , tB:this.state.tB +1})
    let obj={
      color:'green',
      item: 'prise_en_main',
      item_sub_category:'vehicule',
      item_category:'preparer',
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
      item: 'Prise en main',
      item_sub_category:'VEHICULE',
      item_category:'Préparer',
      time: new Date(),
      registered_at:this.current(),
      iconF:'ios-car',
      typeF:'ionicon',
      iconFcolor:'#1b4f9c',
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
  ip2= () =>{
    this.setState({p2: this.state.p2 + 1 , tN:this.state.tN +1})
    let obj={
      color:'yellow',
      item: 'prise_en_main',
      item_sub_category:'vehicule',
      item_category:'preparer',
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
      item: 'Prise en main',
      item_sub_category:'VEHICULE',
      item_category:'Préparer',
      time: new Date(),
      registered_at:this.current(),
      iconF:'ios-car',
      typeF:'ionicon',
      iconFcolor:'#1b4f9c',
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
  ip3= () =>{
    this.setState({p3: this.state.p3 + 1 , tM:this.state.tM +1})
    let obj={
      color:'red',
      item: 'prise_en_main',
      item_sub_category:'vehicule',
      item_category:'preparer',
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
      item: 'Prise en main',
      item_sub_category:'VEHICULE',
      item_category:'Préparer',
      time: new Date(),
      registered_at:this.current(),
      iconF:'ios-car',
      typeF:'ionicon',
      iconFcolor:'#1b4f9c',
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
//
  iprep1= () =>{
    this.setState({prep1: this.state.prep1 + 1 , tB:this.state.tB +1})
    let obj={
      color:'green',
      item: 'itineraire',
      item_sub_category:'deplacement',
      item_category:'preparer',
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
      item: 'Préparation itinéraire',
      item_sub_category:'ORGANISATION DÉPLACEMENT',
      item_category:'Préparer',
      time: new Date(),
      registered_at:this.current(),
      iconF:'ios-car',
      typeF:'ionicon',
      iconFcolor:'#1b4f9c',
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
  iprep2= () =>{
    this.setState({prep2: this.state.prep2 + 1 , tN:this.state.tN +1})
    let obj={
      color:'yellow',
      item: 'itineraire',
      item_sub_category:'deplacement',
      item_category:'preparer',
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
      item: 'Préparation itinéraire',
      item_sub_category:'ORGANISATION DÉPLACEMENT',
      item_category:'Préparer',
      time: new Date(),
      registered_at:this.current(),
      iconF:'ios-car',
      typeF:'ionicon',
      iconFcolor:'#1b4f9c',
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
  iprep3= () =>{
    this.setState({prep3: this.state.prep3 + 1 , tM:this.state.tM +1})
    let obj={
      color:'red',
      item: 'itineraire',
      item_sub_category:'deplacement',
      item_category:'preparer',
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
      time:new Date(),
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
      item: 'Préparation itinéraire',
      item_sub_category:'ORGANISATION DÉPLACEMENT',
      item_category:'Préparer',
      time: new Date(),
      registered_at:this.current(),
      iconF:'ios-car',
      typeF:'ionicon',
      iconFcolor:'#1b4f9c',
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

//
  icp1= () =>{
    this.setState({cp1: this.state.cp1 + 1 , tB:this.state.tB+1})
    let obj={
      color:'green',
      item: 'condition_physique',
      item_sub_category:'deplacement',
      item_category:'preparer',
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
      item: 'Condition physique',
      item_sub_category:'ORGANISATION DÉPLACEMENT',
      item_category:'Préparer',
      time: new Date(),
      registered_at:this.current(),
      iconF:'ios-car',
      typeF:'ionicon',
      iconFcolor:'#1b4f9c',
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
  icp2= () =>{
    this.setState({cp2: this.state.cp2 + 1 , tN:this.state.tN +1})
    let obj={
      color:'yellow',
      item: 'condition_physique',
      item_sub_category:'deplacement',
      item_category:'preparer',
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
      item: 'Condition physique',
      item_sub_category:'ORGANISATION DÉPLACEMENT',
      item_category:'Préparer',
      time: new Date(),
      registered_at:this.current(),
      iconF:'ios-car',
      typeF:'ionicon',
      iconFcolor:'#1b4f9c',
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
  icp3= () =>{
    this.setState({cp3: this.state.cp3 + 1 , tM:this.state.tM +1})
    let obj={
      color:'red',
      item: 'condition_physique',
      item_sub_category:'deplacement',
      item_category:'preparer',
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
      item: 'Condition physique',
      item_sub_category:'ORGANISATION DÉPLACEMENT',
      item_category:'Préparer',
      time: new Date(),
      registered_at:this.current(),
      iconF:'ios-car',
      typeF:'ionicon',
      iconFcolor:'#1b4f9c',
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

  //
  iip1= () =>{
    this.setState({ip1: this.state.ip1 + 1 , tB:this.state.tB +1})
    let obj={
      color:'green',
      item: 'installation',
      item_sub_category:'passagers_chargement',
      item_category:'preparer',
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
      item: 'Installation passagers',
      item_sub_category:'PASSAGERS & CHARGEMENT',
      item_category:'Préparer',
      time: new Date(),
      registered_at:this.current(),
      iconF:'ios-car',
      typeF:'ionicon',
      iconFcolor:'#1b4f9c',
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
  iip2= () =>{
    this.setState({ip2: this.state.ip2 + 1 , tN:this.state.tN+1})
    let obj={
      color:'yellow',
      item: 'installation',
      item_sub_category:'passagers_chargement',
      item_category:'preparer',
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
      item: 'Installation passagers',
      item_sub_category:'PASSAGERS & CHARGEMENT',
      item_category:'Préparer',
      time: new Date(),
      registered_at:this.current(),
      iconF:'ios-car',
      typeF:'ionicon',
      iconFcolor:'#1b4f9c',
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
  iip3= () =>{
    this.setState({ip3: this.state.ip3 + 1 , tM:this.state.tM +1})
    let obj={
      color:'red',
      item: 'installation',
      item_sub_category:'passagers_chargement',
      item_category:'preparer',
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
      item: 'Installation passagers',
      item_sub_category:'PASSAGERS & CHARGEMENT',
      item_category:'Préparer',
      time: new Date(),
      registered_at:this.current(),
      iconF:'ios-car',
      typeF:'ionicon',
      iconFcolor:'#1b4f9c',
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

  //
  ir1= () =>{
    this.setState({r1: this.state.r1 + 1 , tB:this.state.tB +1})
    let obj={
      color:'green',
      item: 'repartition_arrimage',
      item_sub_category:'passagers_chargement',
      item_category:'preparer',
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
      item: 'Répartition & arrimage chargement',
      item_sub_category:'PASSAGERS & CHARGEMENT',
      item_category:'Préparer',
      time: new Date(),
      registered_at:this.current(),
      iconF:'ios-car',
      typeF:'ionicon',
      iconFcolor:'#1b4f9c',
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
  ir2= () =>{
    this.setState({r2: this.state.r2 + 1 , tN:this.state.tN +1})
    let obj={
      color:'yellow',
      item: 'repartition_arrimage',
      item_sub_category:'passagers_chargement',
      item_category:'preparer',
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
      time:new Date(),
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
      item: 'Répartition & arrimage chargement',
      item_sub_category:'PASSAGERS & CHARGEMENT',
      item_category:'Préparer',
      time: new Date(),
      registered_at:this.current(),
      iconF:'ios-car',
      typeF:'ionicon',
      iconFcolor:'#1b4f9c',
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
  ir3= () =>{
    this.setState({r3: this.state.r3 + 1 , tM:this.state.tM +1})
    let obj={
      color:'red',
      item: 'repartition_arrimage',
      item_sub_category:'passagers_chargement',
      item_category:'preparer',
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
      item: 'Répartition & arrimage chargement',
      item_sub_category:'PASSAGERS & CHARGEMENT',
      item_category:'Préparer',
      time: new Date(),
      registered_at:this.current(),
      iconF:'ios-car',
      typeF:'ionicon',
      iconFcolor:'#1b4f9c',
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

  //
  irs1= () =>{
    this.setState({rs1: this.state.rs1 + 1 , tB:this.state.tB +1})
    let obj={
      color:'green',
      item: 'reglage_siege',
      item_sub_category:'installation',
      item_category:'preparer',
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
      item: 'Réglage siège',
      item_sub_category:'INSTALLATION AU POSTE CONDUITE',
      item_category:'Préparer',
      time: new Date(),
      registered_at:this.current(),
      iconF:'ios-car',
      typeF:'ionicon',
      iconFcolor:'#1b4f9c',
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
  irs2= () =>{
    this.setState({rs2: this.state.rs2 + 1 , tN:this.state.tN +1})
    let obj={
      color:'yellow',
      item: 'reglage_siege',
      item_sub_category:'installation',
      item_category:'preparer',
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
      item: 'Réglage siège',
      item_sub_category:'INSTALLATION AU POSTE CONDUITE',
      item_category:'Préparer',
      time: new Date(),
      registered_at:this.current(),
      iconF:'ios-car',
      typeF:'ionicon',
      iconFcolor:'#1b4f9c',
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
  irs3= () =>{
    this.setState({rs3: this.state.rs3 + 1 , tM:this.state.tM +1})
    let obj={
      color:'red',
      item: 'reglage_siege',
      item_sub_category:'installation',
      item_category:'preparer',
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
      item: 'Réglage siège',
      item_sub_category:'INSTALLATION AU POSTE CONDUITE',
      item_category:'Préparer',
      time: new Date(),
      registered_at:this.current(),
      iconF:'ios-car',
      typeF:'ionicon',
      iconFcolor:'#1b4f9c',
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

  //
  ira1= () =>{
    this.setState({ra1: this.state.ra1 + 1 , tB:this.state.tB +1})
    let obj={
      color:'green',
      item: 'appuie_tete',
      item_sub_category:'installation',
      item_category:'preparer',
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
      item: 'Réglage appuie-tête',
      item_sub_category:'INSTALLATION AU POSTE CONDUITE',
      item_category:'Préparer',
      time: new Date(),
      registered_at:this.current(),
      iconF:'ios-car',
      typeF:'ionicon',
      iconFcolor:'#1b4f9c',
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
  ira2= () =>{
    this.setState({ra2: this.state.ra2 + 1 , tN:this.state.tN +1})
    let obj={
      color:'yellow',
      item: 'appuie_tete',
      item_sub_category:'installation',
      item_category:'preparer',
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
      item: 'Réglage appuie-tête',
      item_sub_category:'INSTALLATION AU POSTE CONDUITE',
      item_category:'Préparer',
      time: new Date(),
      registered_at:this.current(),
      iconF:'ios-car',
      typeF:'ionicon',
      iconFcolor:'#1b4f9c',
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
  ira3= () =>{
    this.setState({ra3: this.state.ra3 + 1 , tM:this.state.tM +1})
    let obj={
      color:'red',
      item: 'appuie_tete',
      item_sub_category:'installation',
      item_category:'preparer',
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
      item: 'Réglage appuie-tête',
      item_sub_category:'INSTALLATION AU POSTE CONDUITE',
      item_category:'Préparer',
      time: new Date(),
      registered_at:this.current(),
      iconF:'ios-car',
      typeF:'ionicon',
      iconFcolor:'#1b4f9c',
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

  //
  irr1= () =>{
    this.setState({rr1: this.state.rr1 + 1 , tB:this.state.tB +1})
    let obj={
      color:'green',
      item: 'retroviseurs',
      item_sub_category:'installation',
      item_category:'preparer',
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
      item: 'Réglage rétroviseurs',
      item_sub_category:'INSTALLATION AU POSTE CONDUITE',
      item_category:'Préparer',
      time: new Date(),
      registered_at:this.current(),
      iconF:'ios-car',
      typeF:'ionicon',
      iconFcolor:'#1b4f9c',
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
  irr2= () =>{
    this.setState({rr2: this.state.rr2 + 1 , tN:this.state.tN +1})
    let obj={
      color:'yellow',
      item: 'retroviseurs',
      item_sub_category:'installation',
      item_category:'preparer',
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
      item: 'Réglage rétroviseurs',
      item_sub_category:'INSTALLATION AU POSTE CONDUITE',
      item_category:'Préparer',
      time: new Date(),
      registered_at:this.current(),
      iconF:'ios-car',
      typeF:'ionicon',
      iconFcolor:'#1b4f9c',
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
  irr3= () =>{
    this.setState({rr3: this.state.rr3 + 1 , tM:this.state.tM +1})
    let obj={
      color:'red',
      item: 'retroviseurs',
      item_sub_category:'installation',
      item_category:'preparer',
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
      item: 'Réglage rétroviseurs',
      item_sub_category:'INSTALLATION AU POSTE CONDUITE',
      item_category:'Préparer',
      time: new Date(),
      registered_at:this.current(),
      iconF:'ios-car',
      typeF:'ionicon',
      iconFcolor:'#1b4f9c',
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

  //
  im1= () =>{
    this.setState({m1: this.state.m1 + 1 , tB:this.state.tB +1})
    let obj={
      color:'green',
      item: 'ceinture',
      item_sub_category:'installation',
      item_category:'preparer',
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
      item: 'Mise en place ceinture sécurité',
      item_sub_category:'INSTALLATION AU POSTE CONDUITE',
      item_category:'Préparer',
      time: new Date(),
      registered_at:this.current(),
      iconF:'ios-car',
      typeF:'ionicon',
      iconFcolor:'#1b4f9c',
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
  im2= () =>{
    this.setState({m2: this.state.m2 + 1 , tN:this.state.tN +1})
    let obj={
      color:'yellow',
      item: 'ceinture',
      item_sub_category:'installation',
      item_category:'preparer',
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
      item: 'Mise en place ceinture sécurité',
      item_sub_category:'INSTALLATION AU POSTE CONDUITE',
      item_category:'Préparer',
      time: new Date(),
      registered_at:this.current(),
      iconF:'ios-car',
      typeF:'ionicon',
      iconFcolor:'#1b4f9c',
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
  im3= () =>{
    this.setState({m3: this.state.m3 + 1 , tM:this.state.tM +1})
    let obj={
      color:'red',
      item: 'ceinture',
      item_sub_category:'installation',
      item_category:'preparer',
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
      item: 'Mise en place ceinture sécurité',
      item_sub_category:'INSTALLATION AU POSTE CONDUITE',
      item_category:'Préparer',
      time: new Date(),
      registered_at:this.current(),
      iconF:'ios-car',
      typeF:'ionicon',
      iconFcolor:'#1b4f9c',
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

  //
  iav1= () =>{
    this.setState({av1: this.state.av1 + 1 , tB:this.state.tB +1})
    let obj={
      color:'green',
      item: 'adaptation',
      item_sub_category:'utilisation_vehicule',
      item_category:'preparer',
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
      item: 'Adaptation au véhicule inhabituel',
      item_sub_category:'UTILISATION DU VEHICULE',
      item_category:'Préparer',
      time: new Date(),
      registered_at:this.current(),
      iconF:'ios-car',
      typeF:'ionicon',
      iconFcolor:'#1b4f9c',
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
  iav2= () =>{
    this.setState({av2: this.state.av2 + 1 , tN:this.state.tN +1})
    let obj={
      color:'yellow',
      item: 'adaptation',
      item_sub_category:'utilisation_vehicule',
      item_category:'preparer',
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
      item: 'Adaptation au véhicule inhabituel',
      item_sub_category:'UTILISATION DU VEHICULE',
      item_category:'Préparer',
      time: new Date(),
      registered_at:this.current(),
      iconF:'ios-car',
      typeF:'ionicon',
      iconFcolor:'#1b4f9c',
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
  iav3= () =>{
    this.setState({av3: this.state.av3 + 1 , tM:this.state.tM +1})
    let obj={
      color:'red',
      item: 'adaptation',
      item_sub_category:'utilisation_vehicule',
      item_category:'preparer',
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
			// data=data+','+JSON.stringify(obj)
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
        item: 'Adaptation au véhicule inhabituel',
        item_sub_category:'UTILISATION DU VEHICULE',
        item_category:'Préparer',
        time: new Date(),
        registered_at:this.current(),
        iconF:'ios-car',
        typeF:'ionicon',
        iconFcolor:'#1b4f9c',
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

  //
  iu1= () =>{
    this.setState({u1: this.state.u1 + 1 , tB:this.state.tB +1})
    let obj={
      color:'green',
      item: 'utilisation_mecanique',
      item_sub_category:'utilisation_vehicule',
      item_category:'preparer',
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
      item: 'Utilisation mécanique',
      item_sub_category:'UTILISATION DU VEHICULE',
      item_category:'Préparer',
      time: new Date(),
      registered_at:this.current(),
      iconF:'ios-car',
      typeF:'ionicon',
      iconFcolor:'#1b4f9c',
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
  iu2= () =>{
    this.setState({u2: this.state.u2 + 1 , tN:this.state.tN +1})
    let obj={
      color:'yellow',
      item: 'utilisation_mecanique',
      item_sub_category:'utilisation_vehicule',
      item_category:'preparer',
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
      item: 'Utilisation mécanique',
      item_sub_category:'UTILISATION DU VEHICULE',
      item_category:'Préparer',
      time: new Date(),
      registered_at:this.current(),
      iconF:'ios-car',
      typeF:'ionicon',
      iconFcolor:'#1b4f9c',
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
  iu3= () =>{
    this.setState({u3: this.state.u3 + 1 , tM:this.state.tM +1})
    let obj={
      color:'red',
      item: 'utilisation_mecanique',
      item_sub_category:'utilisation_vehicule',
      item_category:'preparer',
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
      item: 'Utilisation mécanique',
      item_sub_category:'UTILISATION DU VEHICULE',
      item_category:'Préparer',
      time: new Date(),
      registered_at:this.current(),
      iconF:'ios-car',
      typeF:'ionicon',
      iconFcolor:'#1b4f9c',
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
  //
  ipo1= () =>{
    this.setState({po1: this.state.po1 + 1 , tB:this.state.tB +1})
    let obj={
      color:'green',
      item: 'position_des_mains_sur_volant',
      item_sub_category:'utilisation_vehicule',
      item_category:'preparer',
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
      item: 'Position des mains - Utilisation volant',
      item_sub_category:'UTILISATION DU VEHICULE',
      item_category:'Préparer',
      time: new Date(),
      registered_at:this.current(),
      iconF:'ios-car',
      typeF:'ionicon',
      iconFcolor:'#1b4f9c',
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
  ipo2= () =>{
    this.setState({po2: this.state.po2 + 1 , tN:this.state.tN +1})
    let obj={
      color:'yellow',
      item: 'position_des_mains_sur_volant',
      item_sub_category:'utilisation_vehicule',
      item_category:'preparer',
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
      item: 'Position des mains - Utilisation volant',
      item_sub_category:'UTILISATION DU VEHICULE',
      item_category:'Préparer',
      time: new Date(),
      registered_at:this.current(),
      iconF:'ios-car',
      typeF:'ionicon',
      iconFcolor:'#1b4f9c',
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
  ipo3= () =>{
    this.setState({po3: this.state.po3 + 1 , tM:this.state.tM +1})
    let obj={
      color:'red',
      item: 'position_des_mains_sur_volant',
      item_sub_category:'utilisation_vehicule',
      item_category:'preparer',
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
      item: 'Position des mains - Utilisation volant',
      item_sub_category:'UTILISATION DU VEHICULE',
      item_category:'Préparer',
      time: new Date(),
      registered_at:this.current(),
      iconF:'ios-car',
      typeF:'ionicon',
      iconFcolor:'#1b4f9c',
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
  
  iEyeP = () =>{
    this.setState({cEye : this.state.cEye +1})
		let obj={
      type_sense:'eye',
      category: 'preparer',
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
        item_category:'Préparer',
        time: new Date(),
        registered_at:this.current(),
        iconF:'ios-car',
        typeF:'ionicon',
        iconFcolor:'#1b4f9c',
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
	iEarP = () =>{
    this.setState({cEar : this.state.cEar+1})
		let obj={
      type_sense:'ear',
      category: 'preparer',
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
        item_category:'Préparer',
        time: new Date(),
        registered_at:this.current(),
        iconF:'ios-car',
        typeF:'ionicon',
        iconFcolor:'#1b4f9c',
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

  //
  _handlePressC1 = () =>{
    this.setState({
      expanded1: !this.state.expanded1
    });
    if (this.state.expanded1 === true){
      this.setState({c1: this.state.c1 + 1})
      }
  }

  _handlePressC2= () =>{
    this.setState({
      expanded2: !this.state.expanded2
    });
    if (this.state.expanded2 === true){
      this.setState({c2: this.state.c2 + 1})
      }
  }

  _handlePressC3 = () =>{
    this.setState({
      expanded3: !this.state.expanded3
    });
    if (this.state.expanded3 === true){
      this.setState({c3: this.state.c3+ 1})
      }
  }

  _handlePressC4 = () =>{
    this.setState({
      expanded4: !this.state.expanded4
    });
    if (this.state.expanded4 === true){
      this.setState({c4: this.state.c4 + 1})
      }
  }

  _handlePressC5 = () =>{
    this.setState({
      expanded5: !this.state.expanded5
    });
    if (this.state.expanded5 === true){
      this.setState({c5: this.state.c5 + 1})
      }
  }

 
  incrementValues = () =>{
    this.setState({counts: this.state.counts + 1})
  }
  incrementValues3 = () =>{
    this.setState({countV2: this.state.countV2 + 1})
  }
  _goBack = () => console.log('Went back');

  _handlePress = () =>
    this.setState({
      expanded: !this.state.expanded
    });

   async componentWillUnmount(){
      // console.log('aaaaaaaaaaaaaaaa');
      try {
        let obj={
          // 
          tBPr: this.state.tB,
          tNPr: this.state.tN,
          tMPr: this.state.tM,
          cEarPr : this.state.cEar,
          cEyePr : this.state.cEye
        }
        
       let totalPr = JSON.stringify(obj)
       await  AsyncStorage.setItem( 'totalPr', totalPr );
        
      } catch (error) {
        
      }
    }
  
    componentDidMount() {
      BackHandler.addEventListener('backPress', () => {return true});
    }
   
    handleProgress = progress => {
      // this.setState({
      // progress: progress.currentTime / this.state.duration,
      // });
      try {
        console.log("aa");
        console.log(progress.currentTime);
      } catch (error) {
        console.log(error);
      }
     
  };
 
   
    //some more code                         
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
            resizeMode={"stretch"}
            onLoading={()=>{}}
            onLoad={()=>{}}
            onEnd={()=>{}}
          />
      );
    };

    render() {
        return (
          <View style={styles.container}>
            {/* <View style={styles.headerContainer}>
             <View style={{alignItems:"center",flexDirection:"row"}}>
                  <Image
                    style={{width:200, height:260, }}
                    source= {require("../../images/CJ-JPB-new.png")}
                  />
                  <Text style={styles.headerTitle}>PARCOURS ROUTIER CLIPS</Text>
                  </View>
                  <Text style={{color:'#00B0F0',fontSize:16,left:-177, textAlign:'right',fontStyle:"italic",top:45}}>Powered by CleanData</Text>
                  <View style={{top:20,left:70}}>
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
            </View> */}
            
                <Card style={styles.car}>
                <View style={{flexDirection:"row",top:90, alignItems:"center"}}>
               
                  <Text style={{fontSize:30,color:'white',marginHorizontal:140,}}>PRÉPARER</Text>
                  </View>
                  <View style={styles.test1}>
                    
                    <TouchableOpacity style={styles.counters}>
                      <Text>{this.state.tB}</Text>
                     </TouchableOpacity>
                    
                    <View style={styles.counters1}>
                    <TouchableOpacity >
                        <Text>{this.state.tN}</Text>
                     </TouchableOpacity>
                    </View>
                    <View style={styles.counters2}>
                    <TouchableOpacity>
                        <Text>{this.state.tM}</Text>
                     </TouchableOpacity>
                    </View>
                  </View>
                  {/* <LivePlayer source={{uri:"rtsp://10.3.141.1:8554/"}}
                      ref={(ref) => {
                        this.player = ref
                      }}
                      style={{ height:290,width:403,marginHorizontal:390,top:-90 }}
                      paused={false}
                      muted={false}
                      
                      // bufferTime={300}
                      // maxBufferTime={1000}
                      resizeMode={"contain"}
                      onLoading={()=>console.log("loading")}
                      onLoad={()=>{console.log("on load")}}
                      // onLoad={()=>{}}
                      onEnd={()=>{}}
                    /> */}
                  {/* {this.renderNodePlayerView()} */}
              
              </Card>
              <View style={{flexDirection:'row'}}>
              <Card style={styles.car7}>
                 <View style={{flexDirection:'row'}}>
                 <Card style={styles.car8}>
                   <ScrollView style={{height: '100%',width: '100%'}}
					nestedScrollEnabled={true}
					contentContainerStyle={{height: '300%',
					width: '100%',
					}}>
                 <List.Accordion
                  title="VEHICULE"
                  left={props => <List.Icon {...props} icon="car" /> }
                  titleStyle={{fontWeight:'bold' ,fontSize:18}}
                  expanded= {this.state.expanded1}
                  onPress={this._handlePressC1}
                   >
                  <List.Item title="État - Vérification éléments de sécurité" />
                  <View style={styles.test}>
                  <Button onPress={this.iv1} mode="contained"
                    contentStyle={{width:80,height:80}}
                    style={{width:80,height:80,top: -10, borderRadius:50,left: 40, justifyContent:'center',alignItems:'center',backgroundColor:'#7FA57F'}}
                    labelStyle={{color:'black'}}>{this.state.v1}</Button> 

                  <Button onPress={this.iv2} mode="contained"
                    contentStyle={{width:80,height:80}}
                    style={{width:80,height:80,top: -10, borderRadius:50,left: 60, justifyContent:'center',alignItems:'center',backgroundColor:'#FFFF00'}}
                    labelStyle={{color:'black'}}>{this.state.v2}</Button>        

                  <Button onPress={this.iv3} mode="contained"
                    contentStyle={{width:80,height:80}}
                    style={{width:80,height:80,top: -10, borderRadius:50,left: 80, justifyContent:'center',alignItems:'center',backgroundColor:'red'}}
                    labelStyle={{color:'black'}}>{this.state.v3}</Button>       
                  </View>

                  <List.Item title="Prise en main" />
                  <View style={styles.test}>
                  <Button onPress={this.ip1} mode="contained"
                    contentStyle={{width:80,height:80}}
                    style={{width:80,height:80,top: -10, borderRadius:50,left: 40, justifyContent:'center',alignItems:'center',backgroundColor:'#7FA57F'}}
                    labelStyle={{color:'black'}}>{this.state.p1}</Button> 

                   <Button onPress={this.ip2} mode="contained"
                    contentStyle={{width:80,height:80}}
                    style={{width:80,height:80,top: -10, borderRadius:50,left: 60, justifyContent:'center',alignItems:'center',backgroundColor:'#FFFF00'}}
                    labelStyle={{color:'black'}}>{this.state.p2}</Button>   

                   <Button onPress={this.ip3} mode="contained"
                    contentStyle={{width:80,height:80}}
                    style={{width:80,height:80,top: -10, borderRadius:50,left: 80, justifyContent:'center',alignItems:'center',backgroundColor:'red'}}
                    labelStyle={{color:'black'}}>{this.state.p3}</Button>         
                  </View>
                  </List.Accordion>
                  <TouchableOpacity style={styles.car9}><Text style={{fontSize:16,top:10,color:'black',fontWeight:'bold'}}>{this.state.c1}</Text></TouchableOpacity>
                  <Divider />
                  <List.Accordion
                  title="ORGANISATION DÉPLACEMENT"
                  left={props => <List.Icon {...props} icon="arrow-expand-all" /> }
                  titleStyle={{fontWeight:'bold' ,fontSize:18}}
                  expanded = {this.state.expanded2}
                  onPress={this._handlePressC2}
                   >
                  <List.Item title="Préparation itinéraire" />
                  <View style={styles.test}>
                  <Button onPress={this.iprep1} mode="contained"
                    contentStyle={{width:80,height:80}}
                    style={{width:80,height:80,top: -10, borderRadius:50,left: 40, justifyContent:'center',alignItems:'center',backgroundColor:'#7FA57F'}}
                    labelStyle={{color:'black'}}>{this.state.prep1}</Button> 

                  <Button onPress={this.iprep2} mode="contained"
                    contentStyle={{width:80,height:80}}
                    style={{width:80,height:80,top: -10, borderRadius:50,left: 60, justifyContent:'center',alignItems:'center',backgroundColor:'#FFFF00'}}
                    labelStyle={{color:'black'}}>{this.state.prep2}</Button>   

                   <Button onPress={this.iprep3} mode="contained"
                    contentStyle={{width:80,height:80}}
                    style={{width:80,height:80,top: -10, borderRadius:50,left: 80, justifyContent:'center',alignItems:'center',backgroundColor:'red'}}
                    labelStyle={{color:'black'}}>{this.state.prep3}</Button>         
                  </View>
                  <List.Item title="Condition physique" />
                  <View style={styles.test}>
                  <Button onPress={this.icp1} mode="contained"
                    contentStyle={{width:80,height:80}}
                    style={{width:80,height:80,top: -10, borderRadius:50,left: 40, justifyContent:'center',alignItems:'center',backgroundColor:'#7FA57F'}}
                    labelStyle={{color:'black'}}>{this.state.cp1}</Button> 

                  <Button onPress={this.icp2} mode="contained"
                    contentStyle={{width:80,height:80}}
                    style={{width:80,height:80,top: -10, borderRadius:50,left: 60, justifyContent:'center',alignItems:'center',backgroundColor:'#FFFF00'}}
                    labelStyle={{color:'black'}}>{this.state.cp2}</Button>   

                  <Button onPress={this.icp3} mode="contained"
                    contentStyle={{width:80,height:80}}
                    style={{width:80,height:80,top: -10, borderRadius:50,left: 80, justifyContent:'center',alignItems:'center',backgroundColor:'red'}}
                    labelStyle={{color:'black'}}>{this.state.cp3}</Button>     
                  </View>
                  </List.Accordion>
                  <TouchableOpacity style={styles.car9}><Text style={{fontSize:16,top:10,color:'black',fontWeight:'bold'}}>{this.state.c2}</Text></TouchableOpacity>
                  <Divider />
                  <List.Accordion
                  title="PASSAGERS & CHARGEMENT"
                  left={props => <List.Icon {...props} icon="van-utility"/> }
                  titleStyle={{fontWeight:'bold' ,fontSize:18}}
                  expanded= {this.state.expanded3}
                  onPress={this._handlePressC3}
                   >
                  <List.Item title="Installation passagers" />
                  <View style={styles.test}>
                  <Button onPress={this.iip1} mode="contained"
                    contentStyle={{width:80,height:80}}
                    style={{width:80,height:80,top: -10, borderRadius:50,left: 40, justifyContent:'center',alignItems:'center',backgroundColor:'#7FA57F'}}
                    labelStyle={{color:'black'}}>{this.state.ip1}</Button> 

                  <Button onPress={this.iip2} mode="contained"
                    contentStyle={{width:80,height:80}}
                    style={{width:80,height:80,top: -10, borderRadius:50,left: 60, justifyContent:'center',alignItems:'center',backgroundColor:'#FFFF00'}}
                    labelStyle={{color:'black'}}>{this.state.ip2}</Button>     

                   <Button onPress={this.iip3} mode="contained"
                    contentStyle={{width:80,height:80}}
                    style={{width:80,height:80,top: -10, borderRadius:50,left: 80, justifyContent:'center',alignItems:'center',backgroundColor:'red'}}
                    labelStyle={{color:'black'}}>{this.state.ip3}</Button>       
                  </View>

                  <List.Item title="Répartition & arrimage chargement" />
                  <View style={styles.test}>
                    <Button onPress={this.ir1} mode="contained"
                    contentStyle={{width:80,height:80}}
                    style={{width:80,height:80,top: -10, borderRadius:50,left: 40, justifyContent:'center',alignItems:'center',backgroundColor:'#7FA57F'}}
                    labelStyle={{color:'black'}}>{this.state.r1}</Button> 
                    
                    <Button onPress={this.ir2} mode="contained"
                    contentStyle={{width:80,height:80}}
                    style={{width:80,height:80,top: -10, borderRadius:50,left: 60, justifyContent:'center',alignItems:'center',backgroundColor:'#FFFF00'}}
                    labelStyle={{color:'black'}}>{this.state.r2}</Button>    
                    
                    <Button onPress={this.ir3} mode="contained"
                    contentStyle={{width:80,height:80}}
                    style={{width:80,height:80,top: -10, borderRadius:50,left: 80, justifyContent:'center',alignItems:'center',backgroundColor:'red'}}
                    labelStyle={{color:'black'}}>{this.state.r3}</Button>       
                  </View>

                  </List.Accordion>
                  <TouchableOpacity style={styles.car9}><Text style={{fontSize:16,top:10,color:'black',fontWeight:'bold'}}>{this.state.c3}</Text></TouchableOpacity>
                  <Divider />
                  <List.Accordion
                  title="INSTALLATION AU POSTE CONDUITE"
                  left={props => <List.Icon {...props} icon="seat" /> }
                  titleStyle={{fontWeight:'bold' ,fontSize:18}}
                  expanded={this.state.expanded4}
                  onPress={this._handlePressC4}
                   >
                  <List.Item title="Réglage siège" />
                  <View style={styles.test}>
                  <Button onPress={this.irs1} mode="contained"
                    contentStyle={{width:80,height:80}}
                    style={{width:80,height:80,top: -10, borderRadius:50,left: 40, justifyContent:'center',alignItems:'center',backgroundColor:'#7FA57F'}}
                    labelStyle={{color:'black'}}>{this.state.rs1}</Button> 

                  <Button onPress={this.irs2} mode="contained"
                    contentStyle={{width:80,height:80}}
                    style={{width:80,height:80,top: -10, borderRadius:50,left: 60, justifyContent:'center',alignItems:'center',backgroundColor:'#FFFF00'}}
                    labelStyle={{color:'black'}}>{this.state.rs2}</Button>   

                   <Button onPress={this.irs3} mode="contained"
                    contentStyle={{width:80,height:80}}
                    style={{width:80,height:80,top: -10, borderRadius:50,left: 80, justifyContent:'center',alignItems:'center',backgroundColor:'red'}}
                    labelStyle={{color:'black'}}>{this.state.rs3}</Button>     
                  </View>

                  <List.Item title="Réglage appuie-tête" />
                  <View style={styles.test}>
                  <Button onPress={this.ira1} mode="contained"
                    contentStyle={{width:80,height:80}}
                    style={{width:80,height:80,top: -10, borderRadius:50,left: 40, justifyContent:'center',alignItems:'center',backgroundColor:'#7FA57F'}}
                    labelStyle={{color:'black'}}>{this.state.ra1}</Button> 

                  <Button onPress={this.ira2} mode="contained"
                    contentStyle={{width:80,height:80}}
                    style={{width:80,height:80,top: -10, borderRadius:50,left: 60, justifyContent:'center',alignItems:'center',backgroundColor:'#FFFF00'}}
                    labelStyle={{color:'black'}}>{this.state.ra2}</Button>   

                  <Button onPress={this.ira3} mode="contained"
                    contentStyle={{width:80,height:80}}
                    style={{width:80,height:80,top: -10, borderRadius:50,left: 80, justifyContent:'center',alignItems:'center',backgroundColor:'red'}}
                    labelStyle={{color:'black'}}>{this.state.ra3}</Button>     
                  </View>

                  <List.Item title="Réglage rétroviseurs" />
                  <View style={styles.test}>
                  <Button onPress={this.irr1} mode="contained"
                    contentStyle={{width:80,height:80}}
                    style={{width:80,height:80,top: -10, borderRadius:50,left: 40, justifyContent:'center',alignItems:'center',backgroundColor:'#7FA57F'}}
                    labelStyle={{color:'black'}}>{this.state.rr1}</Button> 
                  
                  <Button onPress={this.irr2} mode="contained"
                    contentStyle={{width:80,height:80}}
                    style={{width:80,height:80,top: -10, borderRadius:50,left: 60, justifyContent:'center',alignItems:'center',backgroundColor:'#FFFF00'}}
                    labelStyle={{color:'black'}}>{this.state.rr2}</Button>  

                  <Button onPress={this.irr3} mode="contained"
                    contentStyle={{width:80,height:80}}
                    style={{width:80,height:80,top: -10, borderRadius:50,left: 80, justifyContent:'center',alignItems:'center',backgroundColor:'red'}}
                    labelStyle={{color:'black'}}>{this.state.rr3}</Button>       
                  </View>

                  <List.Item title="Mise en place ceinture sécurité" />
                  <View style={styles.test}>
                  <Button onPress={this.im1} mode="contained"
                    contentStyle={{width:80,height:80}}
                    style={{width:80,height:80,top: -10, borderRadius:50,left: 40, justifyContent:'center',alignItems:'center',backgroundColor:'#7FA57F'}}
                    labelStyle={{color:'black'}}>{this.state.m1}</Button>

                  <Button onPress={this.im2} mode="contained"
                    contentStyle={{width:80,height:80}}
                    style={{width:80,height:80,top: -10, borderRadius:50,left: 60, justifyContent:'center',alignItems:'center',backgroundColor:'#FFFF00'}}
                    labelStyle={{color:'black'}}>{this.state.m2}</Button>    

                  <Button onPress={this.im3} mode="contained"
                    contentStyle={{width:80,height:80}}
                    style={{width:80,height:80,top: -10, borderRadius:50,left: 80, justifyContent:'center',alignItems:'center',backgroundColor:'red'}}
                    labelStyle={{color:'black'}}>{this.state.m3}</Button>         
                  </View>

                  </List.Accordion>
                  <TouchableOpacity style={styles.car9}><Text style={{fontSize:16,top:10,color:'black',fontWeight:'bold'}}>{this.state.c4}</Text></TouchableOpacity>
                  <Divider />
                  <List.Accordion
                  title="UTILISATION DU VEHICULE"
                  left={props => <List.Icon {...props} icon="bus-clock" /> }
                  titleStyle={{fontWeight:'bold' ,fontSize:18}}
                  expanded= {this.state.expanded5}
                  onPress ={this._handlePressC5}
                   >
                  <List.Item title="Adaptation au véhicule inhabituel" />
                  <View style={styles.test}>
                  <Button onPress={this.iav1} mode="contained"
                    contentStyle={{width:80,height:80}}
                    style={{width:80,height:80,top: -10, borderRadius:50,left: 40, justifyContent:'center',alignItems:'center',backgroundColor:'#7FA57F'}}
                    labelStyle={{color:'black'}}>{this.state.av1}</Button>

                   <Button onPress={this.iav2} mode="contained"
                    contentStyle={{width:80,height:80}}
                    style={{width:80,height:80,top: -10, borderRadius:50,left: 60, justifyContent:'center',alignItems:'center',backgroundColor:'#FFFF00'}}
                    labelStyle={{color:'black'}}>{this.state.av2}</Button>      
                    
                    <Button onPress={this.iav3} mode="contained"
                    contentStyle={{width:80,height:80}}
                    style={{width:80,height:80,top: -10, borderRadius:50,left: 80, justifyContent:'center',alignItems:'center',backgroundColor:'red'}}
                    labelStyle={{color:'black'}}>{this.state.av3}</Button>  
                  </View>
                  <List.Item title="Utilisation mécanique" />
                  <View style={styles.test}>
                  <Button onPress={this.iu1} mode="contained"
                    contentStyle={{width:80,height:80}}
                    style={{width:80,height:80,top: -10, borderRadius:50,left: 40, justifyContent:'center',alignItems:'center',backgroundColor:'#7FA57F'}}
                    labelStyle={{color:'black'}}>{this.state.u1}</Button>
                   
                   <Button onPress={this.iu2} mode="contained"
                    contentStyle={{width:80,height:80}}
                    style={{width:80,height:80,top: -10, borderRadius:50,left: 60, justifyContent:'center',alignItems:'center',backgroundColor:'#FFFF00'}}
                    labelStyle={{color:'black'}}>{this.state.u2}</Button>     
                    
                    <Button onPress={this.iu3} mode="contained"
                    contentStyle={{width:80,height:80}}
                    style={{width:80,height:80,top: -10, borderRadius:50,left: 80, justifyContent:'center',alignItems:'center',backgroundColor:'red'}}
                    labelStyle={{color:'black'}}>{this.state.u3}</Button>  
                  </View>

                  <List.Item title="Position des mains - Utilisation volant" />
                  <View style={styles.test}>
                  <Button onPress={this.ipo1} mode="contained"
                    contentStyle={{width:80,height:80}}
                    style={{width:80,height:80,top: -10, borderRadius:50,left: 40, justifyContent:'center',alignItems:'center',backgroundColor:'#7FA57F'}}
                    labelStyle={{color:'black'}}>{this.state.po1}</Button>

                   <Button onPress={this.ipo2} mode="contained"
                    contentStyle={{width:80,height:80}}
                    style={{width:80,height:80,top: -10, borderRadius:50,left: 60, justifyContent:'center',alignItems:'center',backgroundColor:'#FFFF00'}}
                    labelStyle={{color:'black'}}>{this.state.po2}</Button>   
                   
                   <Button onPress={this.ipo3} mode="contained"
                    contentStyle={{width:80,height:80}}
                    style={{width:80,height:80,top: -10, borderRadius:50,left: 80, justifyContent:'center',alignItems:'center',backgroundColor:'red'}}
                    labelStyle={{color:'black'}}>{this.state.po3}</Button>  
                  </View>
                  </List.Accordion>
                  
                  <TouchableOpacity style={styles.car9}><Text style={{fontSize:16,top:10,color:'black',fontWeight:'bold'}}>{this.state.c5}</Text></TouchableOpacity>
                  <Card style={styles.car0}></Card>
                  </ScrollView>
                 
              </Card>
              <Card style={styles.car10}>
                <View style={{flexDirection:'column'}}>
                <TouchableOpacity  style={styles.touch4} onPress={this.iEyeP}>
                           <Icon
                                name='cryengine'
                                type='material-community'
                                color='#000000'
                                size= {36}
                            />
                </TouchableOpacity>
                <TouchableOpacity  style={styles.touch5} onPress={this.iEarP}>
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
      backgroundColor:'#1b4f9c'
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
      borderRadius: 50,
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
    test: {
    flexDirection: 'row',
    },
    test1: {
      flexDirection: 'row',
      top:80
      },
    car: {
     height:300,
     width:800,
     backgroundColor:'#1b4f9c',
     //top:10,
    // borderColor:'black',
     //borderWidth:4,
    },
    car2: {
     height:90,
     width:100,
     top:30,
     left:540,
     backgroundColor:'#F2B97F',
    // borderColor:'black',
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
    // borderColor:'black',
     //borderWidth:2,
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
     backgroundColor:'#1b4f9c',
    }
    ,
    car8: {
     height:1000,
     width:530,
     backgroundColor:'#c8cce5',
     borderColor:'#1b4f9c',
     borderWidth:2
    },
    car0: {
      height:300,
      width:530,
      backgroundColor:'#E5E5FF',
     // borderWidth:2,
      top:500
     },
     car11: {
      height:200,
      width:800,
      backgroundColor:'#fff',
     // borderWidth:2,
      top:50
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
     backgroundColor:'#1b4f9c',
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
      borderWidth:2,
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
    top:-10
}
  });