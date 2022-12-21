import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Modal
} from 'react-native';
import {
	List,
	Divider,
	Badge,
	Card,
	Button
}  from 'react-native-paper'
import {Icon} from 'react-native-elements';
 
import { Actions, Router, Scene, Tabs } from 'react-native-router-flux';
  import {LivePlayer} from "react-native-live-stream";
import { Alert } from 'react-native';
import { BackHandler } from 'react-native';
import { TouchableOpacity } from 'react-native';


import AsyncStorage from '@react-native-async-storage/async-storage';
import MyHiddenView from './Hidden';
import { Dimensions } from 'react-native';
import SSHClient from 'react-native-sshclient';

// import  MqttStreamingAddress from '../../components/gcamMQTT/receiveStreamingLink'

// Simple component to render something in place of icon
// const TabIcon = ({ tintColor }) => {
//   return (
//     <Icon style={[{color: tintColor}]} size={25} name={'ios-home'}type='ionicon' />
//   );
// }
// const TabIcon4 = ({ tintColor }) => {
//   return (
//     <Icon color={tintColor} size={36} name={'ios-car'}  type='ionicon' />
//   );
// }
// const TabIcon1 = ({ tintColor }) => {
//   return (
//     <Icon color={tintColor} size={36} name={'ios-person'} type='ionicon'  />
//   );
// }
// const TabIcon2 = ({ tintColor }) => {
//   return (
//     <Icon color={tintColor} size={36} name={'ios-walk'} type='ionicon' />
//   );
// }
// const TabIcon3 = ({ tintColor }) => {
//   return (
//     <Icon color={tintColor} size={36} name={'ios-eye'} type='ionicon' />
//   );
// }



class Accueil extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
		expandedPrep1: false,
		expandedPrep2: false,
		expandedPrep3: false,
		expandedPrep4: false,
		expandedPrep5: false,
    hidePreparer:true,
    hideVoir:false,
    hidePrevoir:false,
    hideAnticiper:false,
    color:"#0e4bef",
    colorA:"grey",
    colorP:"grey",
    colorV:"grey",
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
    cEar:0,

    //prevoir
    expandedPrev: false,
		countPrev: 0,
		//counts: 0,
		//compteurs totaux
		totalBPrev :0,
		totalMPrev :0,
		totalNPrev :0,
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
		//modalVisible: false,

		//oeil
		cEyePrev:0,
		//oreille
		cEarPrev:0,

    //prevoir
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
		cEarV:0,

    //Anticiper
    expanded1: false,
    expanded2: false,
    expanded3: false,
    expanded4: false,
    expanded5: false,
    expanded6: false,
    // count: 0,
    // counts: 0,
    
    //Adaptation de l'allure
    ca1:0,
    //en fonction de la  visibilité
    ev1:0,
    ev2:0,
    ev3:0,
    //en fonction de l'adhérance
    ea1:0,
    ea2:0,
    ea3:0,
    //en fonction des eventuelles actions des autres
    ee1:0,
    ee2:0,
    ee3:0,

    //le deplacement sur la chaussée
    ca2:0,
    // en fonction de la visibilité
    efv1:0,
    efv2:0,
    efv3:0,
    //en fonction des eventuelles actions des autres
    efa1:0,
    efa2:0,
    efa3:0,
    //Pour mieux être vu
    pm1:0,
    pm2:0,
    pm3:0,
    //en virage
    vAnt1:0,
    vAnt2:0,
    vAnt3:0,
    //Lors des croisements
    lc1:0,
    lc2:0,
    lc3:0,
    //pour preparer un depassement
    pp1:0,
    pp2:0,
    pp3:0,
    //selon l'etat de la chaussée
    ec1:0,
    ec2:0,
    ec3:0,

    //La technique pied frein
    ca3:0,
    //frequence d'application
    fa1:0,
    fa2:0,
    fa3:0,
    //dosage, gestion de l'elan et du rapport superieur
    d1:0,
    d2:0,
    d3:0,
    
    //le respect des distances de sécurité
    ca4:0,
    //en roulant
    rAnt1:0,
    rAnt2:0,
    rAnt3:0,
    //arrêt
    a1:0,
    a2:0,
    a3:0,

    //La communication
    ca5:0,
    //indiquer sa présence
    ipAnt1:0,
    ipAnt2:0,
    ipAnt3:0,
    //indiquer ses intentions
    is1:0,
    is2:0,
    is3:0,

    //Le comportement du conducteur
    ca6:0,
    //le respect de la réglementation
    rra1:0,
    rra2:0,
    rra3:0,
    //la courtoisie
    co1:0,
    co2:0,
    co3:0,
    //la tolerance
    to1:0,
    to2:0,
    to3:0,

    //total
    tBA:0,
    tNA:0,
    tMA:0,
    
    //oeil
    cEyeA:0,
    //oreille
    cEarA:0,
    showC7:false,
    //streaming link
    streamingLink:"",

    closeTest:false
  }
}
  _backAndroidHandler = () => {
    let scene = ""
    this.stopStreaming()
    Actions.pop();
    
  // //  alert(Actions.currentScene)
  //   if (Actions.currentScene !== "accueil") {
  //     scene="accueil"
  //     Actions.pop()
  
  //   }else{
  //     Actions.pop();
  //   }
  };
  current=()=>{
		let today=new Date();
		let datetime=("0" + today.getHours()).slice(-2) + ":" +("0" + today.getMinutes()).slice(-2) + ":" + ("0" +today.getSeconds()).slice(-2);
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
  _handlePress = () =>{
    this.setState({
      expandedPrev: !this.state.expandedPrev
    });
    if (this.state.expandedPrev === true){
      this.setState({countPrev: this.state.countPrev + 1})
      }
  }
  _handlePressC1 = () =>{
    this.setState({
      expandedPrep1: !this.state.expandedPrep1
    });
    if (this.state.expandedPrep1 === true){
      this.setState({c1: this.state.c1 + 1})
      }
  }

  _handlePressC2= () =>{
    this.setState({
      expandedPrep2: !this.state.expandedPrep2
    });
    if (this.state.expandedPrep2 === true){
      this.setState({c2: this.state.c2 + 1})
      }
  }

  _handlePressC3 = () =>{
    this.setState({
      expandedPrep3: !this.state.expandedPrep3
    });
    if (this.state.expandedPrep3 === true){
      this.setState({c3: this.state.c3+ 1})
      }
  }

  _handlePressC4 = () =>{
    this.setState({
      expandedPrep4: !this.state.expandedPrep4
    });
    if (this.state.expandedPrep4 === true){
      this.setState({c4: this.state.c4 + 1})
      }
  }

  _handlePressC5 = () =>{
    this.setState({
      expandedPrep5: !this.state.expandedPrep5
    });
    if (this.state.expandedPrep5 === true){
      this.setState({c5: this.state.c5 + 1})
      }
  }


  iPcmvB= () =>{
		this.current();
		this.setState({pcmvB: this.state.pcmvB + 1 , totalBPrev:1+this.state.totalBPrev })
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
		this.setState({pcmvM: this.state.pcmvM + 1 , totalMPrev: 1+this.state.totalMPrev})
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
		this.setState({pcmvN: this.state.pcmvN + 1 , totalNPrev : 1+this.state.totalNPrev})
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
		this.setState({pcmeaaB: this.state.pcmeaaB + 1 , totalBPrev:1+this.state.totalBPrev })
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
		this.setState({pcmeaaM: this.state.pcmeaaM + 1 , totalMPrev:1+this.state.totalMPrev })
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
		this.setState({pcmeaaN: this.state.pcmeaaN + 1 , totalNPrev:1+this.state.totalNPrev })
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
    this.setState({pcaecB: this.state.pcaecB + 1 , totalBPrev:1+this.state.totalBPrev })
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
    this.setState({pcaecM: this.state.pcaecM + 1 , totalMPrev:1+this.state.totalMPrev })
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
    this.setState({pcaecN: this.state.pcaecN + 1 , totalNPrev:1+this.state.totalNPrev })
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
	this.setState({cEyePrev : this.state.cEyePrev +1})
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
		this.setState({cEarPrev: this.state.cEarPrev+1})
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


	incrementValue = () =>{
		this.setState({
		expandedV: !this.state.expandedV
		});
		if (this.state.expandedV === true){
		this.setState({countV: this.state.countV + 1})
		}
	}
  iev1 = () =>{
    this.setState({ev1: this.state.ev1 + 1 , tBA: this.state.tBA+1})
    let obj={
      color:'green',
      item: 'en_fonction_visibilite',
      item_sub_category:'adapter_allure',
      item_category:'anticiper',
      registered_at:this.current()
    }
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
        item: 'En fonction de la visibilité',
        item_sub_category:'ADAPTATION DE L'+"'"+'ALLURE',
        item_category:'Anticiper',
        time: new Date(),
        registered_at:this.current(),
        iconF:'ios-walk',
        typeF:'ionicon',
        iconFcolor:'#5fb157',
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
  iev2 = () =>{
    this.setState({ev2: this.state.ev2 + 1, tNA : this.state.tNA+1})
    let obj={
      color:'yellow',
      item: 'en_fonction_visibilite',
      item_sub_category:'adapter_allure',
      item_category:'anticiper',
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
        item: 'En fonction de la visibilité',
        item_sub_category:'ADAPTATION DE  L'+"'"+'ALLURE',
        item_category:'Anticiper',
        time: new Date(),
        registered_at:this.current(),
        iconF:'ios-walk',
        typeF:'ionicon',
        iconFcolor:'#5fb157',
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
  iev3 = () =>{
    this.setState({ev3: this.state.ev3 + 1, tMA : this.state.tMA+1})
    let obj={
      color:'red',
      item: 'en_fonction_visibilite',
      item_sub_category:'adapter_allure',
      item_category:'anticiper',
      registered_at:this.current()
    }
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
        item: 'En fonction de la visibilité',
        item_sub_category:'ADAPTATION DE  L'+"'"+'ALLURE',
        item_category:'Anticiper',
        time: new Date(),
        registered_at:this.current(),
        iconF:'ios-walk',
        typeF:'ionicon',
        iconFcolor:'#5fb157',
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
  iea1 = () =>{
    this.setState({ea1: this.state.ea1 + 1 , tBA: this.state.tBA+1})
    let obj={
      color:'green',
      item: 'en_fonction_adherence',
      item_sub_category:'adapter_allure',
      item_category:'anticiper',
      registered_at:this.current()
    }
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
        item: 'Selon l’adhérence',
        item_sub_category:'ADAPTATION DE L'+"'"+'ALLURE',
        item_category:'Anticiper',
        time: new Date(),
        registered_at:this.current(),
        iconF:'ios-walk',
        typeF:'ionicon',
        iconFcolor:'#5fb157',
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
  iea2 = () =>{
    this.setState({ea2: this.state.ea2 + 1, tNA : this.state.tNA+1})
    let obj={
      color:'yellow',
      item: 'en_fonction_adherence',
      item_sub_category:'adapter_allure',
      item_category:'anticiper',
      registered_at:this.current()
    }
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
        item: 'Selon l’adhérence',
        item_sub_category:'ADAPTATION DE L'+"'"+'ALLURE',
        item_category:'Anticiper',
        time: new Date(),
        registered_at:this.current(),
        iconF:'ios-walk',
        typeF:'ionicon',
        iconFcolor:'#5fb157',
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
  iea3 = () =>{
    this.setState({ea3: this.state.ea3 + 1, tMA : this.state.tMA+1})
    let obj={
      color:'red',
      item: 'en_fonction_adherence',
      item_sub_category:'adapter_allure',
      item_category:'anticiper',
      registered_at:this.current()
    }
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
        item: 'Selon l’adhérence',
        item_sub_category:'ADAPTATION DE L'+"'"+'ALLURE',
        item_category:'Anticiper',
        time: new Date(),
        registered_at:this.current(),
        iconF:'ios-walk',
        typeF:'ionicon',
        iconFcolor:'#5fb157',
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
  iee1 = () =>{
    this.setState({ee1: this.state.ee1 + 1 , tBA: this.state.tBA+1})
    let obj={
      color:'green',
      item: 'en_fonction_action_des_autres',
      item_sub_category:'adapter_allure',
      item_category:'anticiper',
      registered_at:this.current()
    }
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
        item: 'Selon éventuelles actions des autres',
        item_sub_category:'ADAPTATION DE L'+"'"+'ALLURE',
        item_category:'Anticiper',
        time: new Date(),
        registered_at:this.current(),
        iconF:'ios-walk',
        typeF:'ionicon',
        iconFcolor:'#5fb157',
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
  iee2 = () =>{
    this.setState({ee2: this.state.ee2 + 1, tNA : this.state.tNA+1})
    let obj={
      color:'yellow',
      item: 'en_fonction_action_des_autres',
      item_sub_category:'adapter_allure',
      item_category:'anticiper',
      registered_at:this.current()
    }
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
        item: 'Selon éventuelles actions des autres',
        item_sub_category:'ADAPTATION DE L'+"'"+'ALLURE',
        item_category:'Anticiper',
        time: new Date(),
        registered_at:this.current(),
        iconF:'ios-walk',
        typeF:'ionicon',
        iconFcolor:'#5fb157',
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
  iee3 = () =>{
    this.setState({ee3: this.state.ee3 + 1, tMA : this.state.tMA+1})
    let obj={
      color:'red',
      item: 'en_fonction_action_des_autres',
      item_sub_category:'adapter_allure',
      item_category:'anticiper',
      registered_at:this.current()
    }
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
        item: 'Selon éventuelles actions des autres',
        item_sub_category:'ADAPTATION DE L'+"'"+'ALLURE',
        item_category:'Anticiper',
        time: new Date(),
        registered_at:this.current(),
        iconF:'ios-walk',
        typeF:'ionicon',
        iconFcolor:'#5fb157',
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
  iefv1 = () =>{
    this.setState({efv1: this.state.efv1 + 1 , tBA: this.state.tBA+1})
    let obj={
      color:'green',
      item: 'en_fonction_visibilite',
      item_sub_category:'placement_sur_la_chaussee',
      item_category:'anticiper',
      registered_at:this.current()
    }
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
        item: 'En fonction de la visibilité',
        item_sub_category:'PLACEMENT SUR LA CHAUSSÉE',
        item_category:'Anticiper',
        time: new Date(),
        registered_at:this.current(),
        iconF:'ios-walk',
        typeF:'ionicon',
        iconFcolor:'#5fb157',
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
  iefv2 = () =>{
    this.setState({efv2: this.state.efv2 + 1, tNA : this.state.tNA+1})
    let obj={
      color:'yellow',
      item: 'en_fonction_visibilite',
      item_sub_category:'placement_sur_la_chaussee',
      item_category:'anticiper',
      registered_at:this.current()
    }
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
        item: 'En fonction de la visibilité',
        item_sub_category:'PLACEMENT LA CHAUSSÉE',
        item_category:'Anticiper',
        time: new Date(),
        registered_at:this.current(),
        iconF:'ios-walk',
        typeF:'ionicon',
        iconFcolor:'#5fb157',
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
  iefv3 = () =>{
    this.setState({efv3: this.state.efv3 + 1, tMA : this.state.tMA+1})
    let obj={
      color:'red',
      item: 'en_fonction_visibilite',
      item_sub_category:'placement_sur_la_chaussee',
      item_category:'anticiper',
      registered_at:this.current()
    }
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
        item: 'En fonction de la visibilité',
        item_sub_category:'PLACEMENT SUR LA CHAUSSÉE',
        item_category:'Anticiper',
        time: new Date(),
        registered_at:this.current(),
        iconF:'ios-walk',
        typeF:'ionicon',
        iconFcolor:'#5fb157',
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
  iefa1 = () =>{
    this.setState({efa1: this.state.efa1 + 1 , tBA: this.state.tBA+1})
    let obj={
      color:'green',
      item: 'en_fonction_action_des_autres',
      item_sub_category:'placement_sur_la_chaussee',
      item_category:'anticiper',
      registered_at:this.current()
    }
    AsyncStorage.getItem( 'data' ).then( data => {
			console.log( data );
			data=data+','+JSON.stringify(obj)
			AsyncStorage.setItem( 'data', data );
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
        item: 'Selon éventuelles actions des autres',
        item_sub_category:'PLACEMENT SUR LA CHAUSSÉE',
        item_category:'Anticiper',
        time: new Date(),
        registered_at:this.current(),
        iconF:'ios-walk',
        typeF:'ionicon',
        iconFcolor:'#5fb157',
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
  iefa2 = () =>{
    this.setState({efa2: this.state.efa2 + 1, tNA : this.state.tNA+1})
    let obj={
      color:'yellow',
      item: 'en_fonction_action_des_autres',
      item_sub_category:'placement_sur_la_chaussee',
      item_category:'anticiper',
      registered_at:this.current()
    }
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
        item: 'Selon éventuelles actions des autres',
        item_sub_category:'PLACEMENT SUR LA CHAUSSÉE',
        item_category:'Anticiper',
        time: new Date(),
        registered_at:this.current(),
        iconF:'ios-walk',
        typeF:'ionicon',
        iconFcolor:'#5fb157',
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
  iefa3 = () =>{
    this.setState({efa3: this.state.efa3 + 1, tMA : this.state.tMA+1})
    let obj={
      color:'red',
      item: 'en_fonction_action_des_autres',
      item_sub_category:'placement_sur_la_chaussee',
      item_category:'anticiper',
      registered_at:this.current()
    }
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
        item: 'Selon éventuelles actions des autres',
        item_sub_category:'PLACEMENT SUR LA CHAUSSÉE',
        item_category:'Anticiper',
        time: new Date(),
        registered_at:this.current(),
        iconF:'ios-walk',
        typeF:'ionicon',
        iconFcolor:'#5fb157',
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
  ipm1 = () =>{
    this.setState({pm1: this.state.pm1 + 1 , tBA: this.state.tBA+1})
    let obj={
      color:'green',
      item: 'pour_mieux_etre_vu',
      item_sub_category:'placement_sur_la_chaussee',
      item_category:'anticiper',
      registered_at:this.current()
    }
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
        item: 'pour être mieux vu',
        item_sub_category:'PLACEMENT SUR LA CHAUSSÉE',
        item_category:'Anticiper',
        time: new Date(),
        registered_at:this.current(),
        iconF:'ios-walk',
        typeF:'ionicon',
        iconFcolor:'#5fb157',
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
  ipm2 = () =>{
    this.setState({pm2: this.state.pm2 + 1, tNA : this.state.tNA+1})
    let obj={
      color:'yellow',
      item: 'pour_mieux_etre_vu',
      item_sub_category:'placement_sur_la_chaussee',
      item_category:'anticiper',
      registered_at:this.current()
    }
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
        item: 'Pour être mieux vu',
        item_sub_category:'PLACEMENT SUR LA CHAUSSÉE',
        item_category:'Anticiper',
        time: new Date(),
        registered_at:this.current(),
        iconF:'ios-walk',
        typeF:'ionicon',
        iconFcolor:'#5fb157',
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
  ipm3 = () =>{
    this.setState({pm3: this.state.pm3 + 1, tMA : this.state.tMA+1})
    let obj={
      color:'red',
      item: 'pour_mieux_etre_vu',
      item_sub_category:'placement_sur_la_chaussee',
      item_category:'anticiper',
      registered_at:this.current()
    }
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
        item: 'Pour être mieux vu',
        item_sub_category:'PLACEMENT SUR LA CHAUSSÉE',
        item_category:'Anticiper',
        time: new Date(),
        registered_at:this.current(),
        iconF:'ios-walk',
        typeF:'ionicon',
        iconFcolor:'#5fb157',
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
  ivAnt1 = () =>{
    this.setState({vAnt1: this.state.vAnt1 + 1 , tBA: this.state.tBA+1})
    let obj={
      color:'green',
      item: 'en_virage',
      item_sub_category:'placement_sur_la_chaussee',
      item_category:'anticiper',
      registered_at:this.current()
    }
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
        item: 'En virage (trajectoire)',
        item_sub_category:'PLACEMENT SUR LA CHAUSSÉE',
        item_category:'Anticiper',
        time: new Date(),
        registered_at:this.current(),
        iconF:'ios-walk',
        typeF:'ionicon',
        iconFcolor:'#5fb157',
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
  ivAnt2 = () =>{
    this.setState({vAnt2: this.state.vAnt2 + 1, tNA: this.state.tNA+1})
    let obj={
      color:'yellow',
      item: 'en_virage',
      item_sub_category:'placement_sur_la_chaussee',
      item_category:'anticiper',
      registered_at:this.current()
    }
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
        item: 'En virage (trajectoire)',
        item_sub_category:'PLACEMENT SUR LA CHAUSSÉE',
        item_category:'Anticiper',
        time: new Date(),
        registered_at:this.current(),
        iconF:'ios-walk',
        typeF:'ionicon',
        iconFcolor:'#5fb157',
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
  ivAnt3 = () =>{
    this.setState({vAnt3: this.state.vAnt3 + 1, tMA : this.state.tMA+1})
    let obj={
      color:'red',
      item: 'en_virage',
      item_sub_category:'placement_sur_la_chaussee',
      item_category:'anticiper',
      registered_at:this.current()
    }
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
        item: 'En virage (trajectoire)',
        item_sub_category:'PLACEMENT SUR LA CHAUSSÉE',
        item_category:'Anticiper',
        time: new Date(),
        registered_at:this.current(),
        iconF:'ios-walk',
        typeF:'ionicon',
        iconFcolor:'#5fb157',
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
  ilc1 = () =>{
    this.setState({lc1: this.state.lc1 + 1 , tBA: this.state.tBA+1})
    let obj={
      color:'green',
      item: 'lors_des_croisement',
      item_sub_category:'placement_sur_la_chaussee',
      item_category:'anticiper',
      registered_at:this.current()
    }
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
        item: 'Lors des croisements',
        item_sub_category:'PLACEMENT SUR LA CHAUSSÉE',
        item_category:'Anticiper',
        time: new Date(),
        registered_at:this.current(),
        iconF:'ios-walk',
        typeF:'ionicon',
        iconFcolor:'#5fb157',
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
  ilc2 = () =>{
    this.setState({lc2: this.state.lc2 + 1, tNA : this.state.tNA+1})
    let obj={
      color:'yellow',
      item: 'lors_des_croisement',
      item_sub_category:'placement_sur_la_chaussee',
      item_category:'anticiper',
      registered_at:this.current()
    }
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
        item: 'Lors des croisements',
        item_sub_category:'PLACEMENT SUR LA CHAUSSÉE',
        item_category:'Anticiper',
        time: new Date(),
        registered_at:this.current(),
        iconF:'ios-walk',
        typeF:'ionicon',
        iconFcolor:'#5fb157',
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
  ilc3 = () =>{
    this.setState({lc3: this.state.lc3 + 1, tMA : this.state.tMA+1})
    let obj={
      color:'red',
      item: 'lors_des_croisement',
      item_sub_category:'placement_sur_la_chaussee',
      item_category:'anticiper',
      registered_at:this.current()
    }
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
        item: 'Lors des croisements',
        item_sub_category:'PLACEMENT SUR LA CHAUSSÉE',
        item_category:'Anticiper',
        time: new Date(),
        registered_at:this.current(),
        iconF:'ios-walk',
        typeF:'ionicon',
        iconFcolor:'#5fb157',
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
  ipp1 = () =>{
    this.setState({pp1: this.state.pp1 + 1 , tBA: this.state.tBA+1})
    let obj={
      color:'green',
      item: 'pour_preparer_un_deplacement',
      item_sub_category:'placement_sur_la_chaussee',
      item_category:'anticiper',
      registered_at:this.current()
    }
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
        item: 'Pour préparer un dépassement',
        item_sub_category:'PLACEMENT SUR LA CHAUSSÉE',
        item_category:'Anticiper',
        time: new Date(),
        registered_at:this.current(),
        iconF:'ios-walk',
        typeF:'ionicon',
        iconFcolor:'#5fb157',
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
  ipp2 = () =>{
    this.setState({pp2: this.state.pp2 + 1, tNA : this.state.tNA+1})
    let obj={
      color:'yellow',
      item: 'pour_preparer_un_deplacement',
      item_sub_category:'placement_sur_la_chaussee',
      item_category:'anticiper',
      registered_at:this.current()
    }
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
        item: 'Pour préparer un dépassement',
        item_sub_category:'PLACEMENT SUR LA CHAUSSÉE',
        item_category:'Anticiper',
        time: new Date(),
        registered_at:this.current(),
        iconF:'ios-walk',
        typeF:'ionicon',
        iconFcolor:'#5fb157',
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
  ipp3 = () =>{
    this.setState({pp3: this.state.pp3 + 1, tMA : this.state.tMA+1})
    let obj={
      color:'red',
      item: 'pour_preparer_un_deplacement',
      item_sub_category:'placement_sur_la_chaussee',
      item_category:'anticiper',
      registered_at:this.current()
    }
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
        item: 'Pour préparer un dépassement',
        item_sub_category:'PLACEMENT SUR LA CHAUSSÉE',
        item_category:'Anticiper',
        time: new Date(),
        registered_at:this.current(),
        iconF:'ios-walk',
        typeF:'ionicon',
        iconFcolor:'#5fb157',
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
  iec1 = () =>{
    this.setState({ec1: this.state.ec1 + 1 , tBA: this.state.tBA+1})
    let obj={
      color:'green',
      item: 'selon_etat_de_la_chaussee',
      item_sub_category:'placement_sur_la_chaussee',
      item_category:'anticiper',
      registered_at:this.current()
    }
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
        item: 'Selon l'+"'"+'état de la chaussée',
        item_sub_category:'PLACEMENT SUR LA CHAUSSÉE',
        item_category:'Anticiper',
        time: new Date(),
        registered_at:this.current(),
        iconF:'ios-walk',
        typeF:'ionicon',
        iconFcolor:'#5fb157',
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
  iec2 = () =>{
    this.setState({ec2: this.state.ec2 + 1, tNA : this.state.tNA+1})
    let obj={
      color:'yellow',
      item: 'selon_etat_de_la_chaussee',
      item_sub_category:'placement_sur_la_chaussee',
      item_category:'anticiper',
      registered_at:this.current()
    }
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
        item: 'Selon l'+"'"+'état de la chaussée',
        item_sub_category:'PLACEMENT SUR LA CHAUSSÉE',
        item_category:'Anticiper',
        time: new Date(),
        registered_at:this.current(),
        iconF:'ios-walk',
        typeF:'ionicon',
        iconFcolor:'#5fb157',
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
  iec3 = () =>{
    this.setState({ec3: this.state.ec3 + 1, tMA : this.state.tMA+1})
    let obj={
      color:'red',
      item: 'selon_etat_de_la_chaussee',
      item_sub_category:'placement_sur_la_chaussee',
      item_category:'anticiper',
      registered_at:this.current()
    }
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
        item: 'Selon l'+"'"+'état de la chaussée',
        item_sub_category:'PLACEMENT SUR LA CHAUSSÉE',
        item_category:'Anticiper',
        time: new Date(),
        registered_at:this.current(),
        iconF:'ios-walk',
        typeF:'ionicon',
        iconFcolor:'#5fb157',
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
  ifa1 = () =>{
    this.setState({fa1: this.state.fa1 + 1 , tBA: this.state.tBA+1})
    let obj={
      color:'green',
      item: 'frequence_application',
      item_sub_category:'technique_pied_frein',
      item_category:'anticiper',
      registered_at:this.current()
    }
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
        item: 'Fréquence  d'+"'"+'application',
        item_sub_category:'TECHNIQUE PIED FREIN',
        item_category:'Anticiper',
        time: new Date(),
        registered_at:this.current(),
        iconF:'ios-walk',
        typeF:'ionicon',
        iconFcolor:'#5fb157',
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
  ifa2 = () =>{
    this.setState({fa2: this.state.fa2 + 1, tNA : this.state.tNA+1})
    let obj={
      color:'yellow',
      item: 'frequence_application',
      item_sub_category:'technique_pied_frein',
      item_category:'anticiper',
      registered_at:this.current()
    }
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
        item: 'Fréquence d'+"'"+'application',
        item_sub_category:'TECHNIQUE PIED FREIN',
        item_category:'Anticiper',
        time: new Date(),
        registered_at:this.current(),
        iconF:'ios-walk',
        typeF:'ionicon',
        iconFcolor:'#5fb157',
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
        
        }).done()
  }
  ifa3 = () =>{
    this.setState({fa3: this.state.fa3 + 1, tMA : this.state.tMA+1})
    let obj={
      color:'red',
      item: 'frequence_application',
      item_sub_category:'technique_pied_frein',
      item_category:'anticiper',
      registered_at:this.current()
    }
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
        item: 'Fréquence d'+"'"+'application',
        item_sub_category:'TECHNIQUE PIED FREIN',
        item_category:'Anticiper',
        time: new Date(),
        registered_at:this.current(),
        iconF:'ios-walk',
        typeF:'ionicon',
        iconFcolor:'#5fb157',
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
        
        }).done()
  }
  //
  id1 = () =>{
    this.setState({d1: this.state.d1 + 1 , tBA: this.state.tBA+1})
    let obj={
      color:'green',
      item: 'dosage_gestion',
      item_sub_category:'technique_pied_frein',
      item_category:'anticiper',
      registered_at:this.current()
    }
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
        item: 'Dosage, gestion élan & rapport sup.',
        item_sub_category:'TECHNIQUE PIED FREIN',
        item_category:'Anticiper',
        time: new Date(),
        registered_at:this.current(),
        iconF:'ios-walk',
        typeF:'ionicon',
        iconFcolor:'#5fb157',
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
        
        }).done()
  }
  id2 = () =>{
    this.setState({d2: this.state.d2 + 1, tNA : this.state.tNA+1})
    let obj={
      color:'yellow',
      item: 'dosage_gestion',
      item_sub_category:'technique_pied_frein',
      item_category:'anticiper',
      registered_at:this.current()
    }
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
        item: 'Dosage, gestion élan & rapport sup.',
        item_sub_category:'TECHNIQUE PIED FREIN',
        item_category:'Anticiper',
        time: new Date(),
        registered_at:this.current(),
        iconF:'ios-walk',
        typeF:'ionicon',
        iconFcolor:'#5fb157',
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
        
        }).done()
  }
  id3 = () =>{
    this.setState({d3: this.state.d3 + 1, tMA : this.state.tMA+1})
    let obj={
      color:'red',
      item: 'dosage_gestion',
      item_sub_category:'technique_pied_frein',
      item_category:'anticiper',
      registered_at:this.current()
    }
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
        item: 'Dosage, gestion élan & rapport sup.',
        item_sub_category:'TECHNIQUE PIED FREIN',
        item_category:'Anticiper',
        time: new Date(),
        registered_at:this.current(),
        iconF:'ios-walk',
        typeF:'ionicon',
        iconFcolor:'#5fb157',
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
        
        }).done()
  }
  //
  irAnt1 = () =>{
    this.setState({rAnt1: this.state.rAnt1 + 1 , tBA: this.state.tBA+1})
    let obj={
      color:'green',
      item: 'en_roulant',
      item_sub_category:'respect_distance_securite',
      item_category:'anticiper',
      registered_at:this.current()
    }
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
        item: 'En roulant (règle des 2 secondes)',
        item_sub_category:'RESPECT DISTANCES DE SECURITÉ',
        item_category:'Anticiper',
        time: new Date(),
        registered_at:this.current(),
        iconF:'ios-walk',
        typeF:'ionicon',
        iconFcolor:'#5fb157',
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
        
        }).done()
  }
  irAnt2 = () =>{
    this.setState({rAnt2: this.state.rAnt2 + 1, tNA : this.state.tNA+1})
    let obj={
      color:'yellow',
      item: 'en_roulant',
      item_sub_category:'respect_distance_securite',
      item_category:'anticiper',
      registered_at:this.current()
    }
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
        item: 'En roulant (règle des 2 secondes)',
        item_sub_category:'RESPECT DISTANCES DE SECURITÉ',
        item_category:'Anticiper',
        time: new Date(),
        registered_at:this.current(),
        iconF:'ios-walk',
        typeF:'ionicon',
        iconFcolor:'#5fb157',
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
        
        }).done()
  }
  irAnt3 = () =>{
    this.setState({rAnt3: this.state.rAnt3 + 1, tMA : this.state.tMA+1})
    let obj={
      color:'red',
      item: 'en_roulant',
      item_sub_category:'respect_distance_securite',
      item_category:'anticiper',
      registered_at:this.current()
    }
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
        item: 'En roulant (règle des 2 secondes)',
        item_sub_category:'RESPECT DISTANCES DE SECURITÉ',
        item_category:'Anticiper',
        time: new Date(),
        registered_at:this.current(),
        iconF:'ios-walk',
        typeF:'ionicon',
        iconFcolor:'#5fb157',
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
        
        }).done()
  }
  //
  ia1 = () =>{
    this.setState({a1: this.state.a1 + 1 , tBA: this.state.tBA+1})
    let obj={
      color:'green',
      item: 'arret',
      item_sub_category:'respect_distance_securite',
      item_category:'anticiper',
      registered_at:this.current()
    }
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
        item: 'L'+"'"+'arrêt (règle pneus & échappatoires)',
        item_sub_category:'RESPECT DISTANCES DE SECURITÉ',
        item_category:'Anticiper',
        time: new Date(),
        registered_at:this.current(),
        iconF:'ios-walk',
        typeF:'ionicon',
        iconFcolor:'#5fb157',
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
        
        }).done()
  }
  ia2 = () =>{
    this.setState({a2: this.state.a2 + 1, tNA : this.state.tNA+1})
    let obj={
      color:'yellow',
      item: 'arret',
      item_sub_category:'respect_distance_securite',
      item_category:'anticiper',
      registered_at:this.current()
    }
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
        item: 'L'+"'"+'arrêt (règle pneus & échappatoires)',
        item_sub_category:'RESPECT DISTANCES DE SECURITÉ',
        item_category:'Anticiper',
        time: new Date(),
        registered_at:this.current(),
        iconF:'ios-walk',
        typeF:'ionicon',
        iconFcolor:'#5fb157',
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
        
        }).done()
  }
  ia3 = () =>{
    this.setState({a3: this.state.a3 + 1, tMA : this.state.tMA+1})
    let obj={
      color:'red',
      item: 'arret',
      item_sub_category:'respect_distance_securite',
      item_category:'anticiper',
      registered_at:this.current()
    }
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
        item: 'L'+"'"+'arrêt (règle pneus & échappatoires)',
        item_sub_category:'RESPECT DISTANCES DE SECURITÉ',
        item_category:'Anticiper',
        time: new Date(),
        registered_at:this.current(),
        iconF:'ios-walk',
        typeF:'ionicon',
        iconFcolor:'#5fb157',
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
        
        }).done()
  }
   //
  iipAnt1 = () =>{
    this.setState({ipAnt1: this.state.ipAnt1+ 1 , tBA: this.state.tBA+1})
    let obj={
      color:'green',
      item: 'indiquer_presence',
      item_sub_category:'communication',
      item_category:'anticiper',
      registered_at:this.current()
    }
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
        item: 'Indiquer sa présence',
        item_sub_category:'COMMUNICATION',
        item_category:'Anticiper',
        time: new Date(),
        registered_at:this.current(),
        iconF:'ios-walk',
        typeF:'ionicon',
        iconFcolor:'#5fb157',
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
        
        }).done()
  }
  iipAnt2 = () =>{
    this.setState({ipAnt2: this.state.ipAnt2 + 1, tNA : this.state.tNA+1})
    let obj={
      color:'yellow',
      item: 'indiquer_presence',
      item_sub_category:'communication',
      item_category:'anticiper',
      registered_at:this.current()
    }
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
        item: 'Indiquer sa présence',
        item_sub_category:'COMMUNICATION',
        item_category:'Anticiper',
        time: new Date(),
        registered_at:this.current(),
        iconF:'ios-walk',
        typeF:'ionicon',
        iconFcolor:'#5fb157',
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
        
        }).done()
  }
  iipAnt3 = () =>{
    this.setState({ipAnt3: this.state.ipAnt3 + 1, tMA : this.state.tMA+1})
    let obj={
      color:'red',
      item: 'indiquer_presence',
      item_sub_category:'communication',
      item_category:'anticiper',
      registered_at:this.current()
    }
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
        item: 'Indiquer sa présence',
        item_sub_category:'COMMUNICATION',
        item_category:'Anticiper',
        time: new Date(),
        registered_at:this.current(),
        iconF:'ios-walk',
        typeF:'ionicon',
        iconFcolor:'#5fb157',
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
        
        }).done()
  }
   //
  iis1 = () =>{
    this.setState({is1: this.state.is1 + 1 , tBA: this.state.tBA+1})
    let obj={
      color:'green',
      item: 'indiquer_intentions',
      item_sub_category:'communication',
      item_category:'anticiper',
      registered_at:this.current()
    }
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
        item: 'Indiquer ses intentions',
        item_sub_category:'COMMUNICATION',
        item_category:'Anticiper',
        time: new Date(),
        registered_at:this.current(),
        iconF:'ios-walk',
        typeF:'ionicon',
        iconFcolor:'#5fb157',
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
        
        }).done()
  }
  iis2 = () =>{
    this.setState({is2: this.state.is2 + 1, tNA : this.state.tNA+1})
    let obj={
      color:'yellow',
      item: 'indiquer_intentions',
      item_sub_category:'communication',
      item_category:'anticiper',
      registered_at:this.current()
    }
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
        item: 'Indiquer ses intentions',
        item_sub_category:'COMMUNICATION',
        item_category:'Anticiper',
        time: new Date(),
        registered_at:this.current(),
        iconF:'ios-walk',
        typeF:'ionicon',
        iconFcolor:'#5fb157',
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
        
        }).done()
  }
  iis3 = () =>{
    this.setState({is3: this.state.is3 + 1, tMA : this.state.tMA+1})
    let obj={
      color:'red',
      item: 'indiquer_intentions',
      item_sub_category:'communication',
      item_category:'anticiper',
      registered_at:this.current()
    }
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
        item: 'Indiquer ses intentions',
        item_sub_category:'COMMUNICATION',
        item_category:'Anticiper',
        time: new Date(),
        registered_at:this.current(),
        iconF:'ios-walk',
        typeF:'ionicon',
        iconFcolor:'#5fb157',
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
        
        }).done()
  }
  //
  irra1 = () =>{
    this.setState({rra1: this.state.rra1 + 1 , tBA: this.state.tBA+1})
    let obj={
      color:'green',
      item: 'respect_reglementation',
      item_sub_category:'comportement_conducteur',
      item_category:'anticiper',
      registered_at:this.current()
    }
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
        item: 'Respect de la règlementation ',
        item_sub_category:'COMPORTEMENT DU CONDUCTEUR',
        item_category:'Anticiper',
        time: new Date(),
        registered_at:this.current(),
        iconF:'ios-walk',
        typeF:'ionicon',
        iconFcolor:'#5fb157',
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
        
        }).done()
  }
  irra2 = () =>{
    this.setState({rra2: this.state.rra2 + 1, tNA : this.state.tNA+1})
    let obj={
      color:'yellow',
      item: 'respect_reglementation',
      item_sub_category:'comportement_conducteur',
      item_category:'anticiper',
      registered_at:this.current()
    }
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
        item: 'Respect de la règlementation ',
        item_sub_category:'COMPORTEMENT DU CONDUCTEUR',
        item_category:'Anticiper',
        time: new Date(),
        registered_at:this.current(),
        iconF:'ios-walk',
        typeF:'ionicon',
        iconFcolor:'#5fb157',
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
        
        }).done()
  }
  irra3 = () =>{
    this.setState({rra3: this.state.rra3 + 1, tMA : this.state.tMA+1})
    let obj={
      color:'red',
      item: 'respect_reglementation',
      item_sub_category:'comportement_conducteur',
      item_category:'anticiper',
      registered_at:this.current()
    }
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
        item: 'Respect de la règlementation ',
        item_sub_category:'COMPORTEMENT DU CONDUCTEUR',
        item_category:'Anticiper',
        time: new Date(),
        registered_at:this.current(),
        iconF:'ios-walk',
        typeF:'ionicon',
        iconFcolor:'#5fb157',
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
        
        }).done()
  }
  //
  ico1 = () =>{
    this.setState({co1: this.state.co1 + 1 , tBA: this.state.tBA+1})
    let obj={
      color:'green',
      item: 'courtoisie',
      item_sub_category:'comportement_conducteur',
      item_category:'anticiper',
      registered_at:this.current()
    }
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
        item: 'Courtoisie',
        item_sub_category:'COMPORTEMENT DU CONDUCTEUR',
        item_category:'Anticiper',
        time: new Date(),
        registered_at:this.current(),
        iconF:'ios-walk',
        typeF:'ionicon',
        iconFcolor:'#5fb157',
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
        
        }).done()
  }
  ico2 = () =>{
    this.setState({co2: this.state.co2 + 1, tNA : this.state.tNA+1})
    let obj={
      color:'yellow',
      item: 'courtoisie',
      item_sub_category:'comportement_conducteur',
      item_category:'anticiper',
      registered_at:this.current()
    }
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
        item: 'Courtoisie',
        item_sub_category:'COMPORTEMENT DU CONDUCTEUR',
        item_category:'Anticiper',
        time: new Date(),
        registered_at:this.current(),
        iconF:'ios-walk',
        typeF:'ionicon',
        iconFcolor:'#5fb157',
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
        
        }).done()
  }
  ico3 = () =>{
    this.setState({co3: this.state.co3 + 1, tMA : this.state.tMA+1})
    let obj={
      color:'red',
      item: 'courtoisie',
      item_sub_category:'comportement_conducteur',
      item_category:'anticiper',
      registered_at:this.current()
    }
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
        item: 'Courtoisie',
        item_sub_category:'COMPORTEMENT DU CONDUCTEUR',
        item_category:'Anticiper',
        time: new Date(),
        registered_at:this.current(),
        iconF:'ios-walk',
        typeF:'ionicon',
        iconFcolor:'#5fb157',
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
        
        }).done()
  }
  //
  ito1 = () =>{
    this.setState({to1: this.state.to1 + 1 , tBA: this.state.tBA+1})
    let obj={
      color:'green',
      item: 'tolerance',
      item_sub_category:'comportement_conducteur',
      item_category:'anticiper',
      registered_at:this.current()
    }
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
        item: 'Tolérance',
        item_sub_category:'COMPORTEMENT DU CONDUCTEUR',
        item_category:'Anticiper',
        time: new Date(),
        registered_at:this.current(),
        iconF:'ios-walk',
        typeF:'ionicon',
        iconFcolor:'#5fb157',
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
        
        }).done()
  }
  ito2 = () =>{
    this.setState({to2: this.state.to2 + 1, tNA : this.state.tNA+1})
    let obj={
      color:'yellow',  
      item: 'tolerance',
      item_sub_category:'comportement_conducteur',
      item_category:'anticiper',
      registered_at:this.current()
    }
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
        item: 'Tolérance ',
        item_sub_category:'COMPORTEMENT DU CONDUCTEUR',
        item_category:'Anticiper',
        time: new Date(),
        registered_at:this.current(),
        iconF:'ios-walk',
        typeF:'ionicon',
        iconFcolor:'#5fb157',
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
        
        }).done()
  }
  ito3 = () =>{
    this.setState({to3: this.state.to3 + 1, tMA : this.state.tMA+1})
    let obj={
      color:'red',
      item: 'tolerance',
      item_sub_category:'comportement_conducteur',
      item_category:'anticiper',
      registered_at:this.current()
    }
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
        item: 'Tolérance ',
        item_sub_category:'COMPORTEMENT DU CONDUCTEUR',
        item_category:'Anticiper',
        time: new Date(),
        registered_at:this.current(),
        iconF:'ios-walk',
        typeF:'ionicon',
        iconFcolor:'#5fb157',
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
        
        }).done()
  }
  
  iEyeA = () =>{
    this.setState({cEyeA : this.state.cEyeA +1})
		let obj={
      type_sense:'eye',
      category: 'anticiper',
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
          item_category:'Anticiper',
          time: new Date(),
          registered_at:this.current(),
          iconF:'ios-walk',
          typeF:'ionicon',
          iconFcolor:'#5fb157',
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
	iEarA = () =>{
    this.setState({cEarA : this.state.cEarA+1})
		let obj={
      type_sense:'ear',
      category: 'anticiper',
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
          item_category:'Anticiper',
          time: new Date(),
          registered_at:this.current(),
          iconF:'ios-walk',
          typeF:'ionicon',
          iconFcolor:'#5fb157',
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
  _handlePressCA1 = () =>{
    this.setState({
      expanded1: !this.state.expanded1
    });
    if (this.state.expanded1 === true){
      this.setState({ca1: this.state.ca1 + 1})
      }
  }

  _handlePressCA2= () =>{
    this.setState({
      expanded2: !this.state.expanded2
    });
    if (this.state.expanded2 === true){
      this.setState({ca2: this.state.ca2 + 1})
      }
  }

  _handlePressCA3 = () =>{
    this.setState({
      expanded3: !this.state.expanded3
    });
    if (this.state.expanded3 === true){
      this.setState({ca3: this.state.ca3+ 1})
      }
  }

  _handlePressCA4 = () =>{
    this.setState({
      expanded4: !this.state.expanded4
    });
    if (this.state.expanded4 === true){
      this.setState({ca4: this.state.ca4 + 1})
      }
  }

  _handlePressCA5 = () =>{
    this.setState({
      expanded5: !this.state.expanded5
    });
    if (this.state.expanded5 === true){
      this.setState({ca5: this.state.ca5 + 1})
      }
  }
  _handlePressCA6 = () =>{
    this.setState({
      expanded6: !this.state.expanded6
    });
    if (this.state.expanded6 === true){
      this.setState({ca6: this.state.ca6 + 1})
      }
  }
  async startVideoTime(){
		let datetime = new Date()
    let video = {startTime: datetime}
    let str_video = JSON.stringify(video)
    console.log(str_video);
    try {
      //console.log(datetime.toLocaleTimeString());
      await AsyncStorage.setItem("@startVideoTime",str_video)
    } catch (error) {
      console.log(error);
    }
  }
  async componentDidMount(){
    BackHandler.addEventListener('backPress', () => {return true});
    setTimeout(() => {
      try {
      AsyncStorage.getItem("streaming_link").then(
          (data) =>{
            console.log((data));
            let str_link =""
            if(data != null){
              str_link=data
              this.setState({streamingLink : str_link})
            }
            
            
          } 
          )
      } catch (error) {
        console.log(error);
      }
      this.startVideoTime()
    },1000);

    
  }
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
      try {
        let obj={
          // 
          tBP: this.state.totalBPrev,
          tNP: this.state.totalNPrev,
          tMP: this.state.totalMPrev,
          cEarP : this.state.cEarPrev,
          cEyeP : this.state.cEyePrev
        }
        let totalP = JSON.stringify(obj)
        AsyncStorage.setItem( 'totalP', totalP);
      
      } catch (error) {
        
      }
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
      try {
        let obj={
          // 
          tBA: this.state.tBA,
          tNA: this.state.tNA,
          tMA: this.state.tMA,
          cEarA : this.state.cEarA,
          cEyeA : this.state.cEyeA
        }
        
        let totalA= JSON.stringify(obj)
        await AsyncStorage.setItem( 'totalA', totalA );
  
      } catch (error) {
        console.log(error);
      }	
    }
    ///hideViews
    showPrep(){
      this.setState({hidePreparer: true, 
        hidePrevoir:false, 
        hideVoir:false,
      hideAnticiper:false,
      color: "#0e4bef",
      colorA:"grey",
      colorP:"grey",
      colorV:"grey",
    
    })
    }
    showPrev(){
      this.setState({hidePreparer: false, 
        hidePrevoir:true, 
        hideVoir:false,
      hideAnticiper:false,
      colorP: "#0e4bef",
      colorA:"grey",
      color:"grey",
      colorV:"grey",
      
    })
    }
    showAnt(){
      this.setState({hidePreparer: false, 
        hidePrevoir:false, 
        hideVoir:false,
      hideAnticiper:true,
      colorA: "#0e4bef",
      color:"grey",
      colorP:"grey",
      colorV:"grey",
    })
    }
    showVoir(){
      this.setState({hidePreparer: false, 
        hidePrevoir:false, 
        hideVoir:true,
        hideAnticiper:false,
        colorV: "#0e4bef",
        colorA:"grey",
        colorP:"grey",
        color:"grey",
  })
  }
 stopStreaming(){
    try {
        SSHClient.setup("pi",'10.3.141.1',22);
        SSHClient.usePrivateKey(false);
        SSHClient.setPassword("raspberry");
        SSHClient.connect().then(
            (result)=>{
              //  alert("close streaming" + result)
        //for us : stream_simulator.py
        //for tushar capture_video.py
            SSHClient.execute("python3 close_streaming.py").then(
                (result)=>{
                    console.log(result);
                    //alert(result);
                },
                (error)=>{
                  console.log(error);
                    // alert(error);
                }
                );
            },
            (error)=>{
              // alert(error);
            }
          );
       
  
    } catch (error) {
        console.log(error);
    }
  
  
  }
  renderPreparer(){
    return(
      <MyHiddenView style={styles.containerPreparer} hide={!this.state.hidePreparer}>
     
  
          <Card style={styles.car}>
          <View style={{flexDirection:"row", alignItems:"center"}}>
         
            <Text style={{fontSize:30,color:'white',top:90,marginHorizontal:50,}}>PRÉPARER</Text>
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
            
        
        </Card>
        {/* <ScrollView 
    nestedScrollEnabled={true}
    contentContainerStyle={{height: '200%',
    width: '100%',
    }}> */}
     
        <View style={{flexDirection:'row'}}>
        <Card style={styles.car7}>
           <View style={{flexDirection:'row'}}>
           <Card style={styles.car8}>
           <ScrollView style={{height: '100%',width: '100%'}}
    nestedScrollEnabled={true}
    contentContainerStyle={{height: '230%',
    width: '100%',
    }}>
    
           <List.Accordion
            title="VEHICULE"
            left={props => <List.Icon {...props} icon="car" /> }
            titleStyle={{fontWeight:'bold' ,fontSize:18}}
            style={{backgroundColor:'#c8cce5'}}
            expanded= {this.state.expandedPrep1}
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
            style={{backgroundColor:'#c8cce5'}}
            left={props => <List.Icon {...props} icon="arrow-expand-all" /> }
            titleStyle={{fontWeight:'bold' ,fontSize:18}}
            expanded = {this.state.expandedPrep2}
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
            expanded= {this.state.expandedPrep3}
            style={{backgroundColor:'#c8cce5'}}
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
            expanded={this.state.expandedPrep4}
            onPress={this._handlePressC4}
            style={{backgroundColor:'#c8cce5'}}
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
            style={{backgroundColor:'#c8cce5'}}
            left={props => <List.Icon {...props} icon="bus-clock" /> }
            titleStyle={{fontWeight:'bold' ,fontSize:18}}
            expanded= {this.state.expandedPrep5}
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
            {/* <Card style={styles.car0}></Card> */}
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
        {/* </ScrollView> */}
       
    </MyHiddenView>
    )
  }
  renderPrevoir(){
    return (
      <MyHiddenView style={styles.containerPrev} hide={!this.state.hidePrevoir}>
        
            <Card style={styles.carPrev}>
            <View style={{flexDirection:'row',top:90, alignItems:"center"}}>
              <Text style={{fontSize:30,color:'white',marginHorizontal:50}}>PRÉVOIR</Text>
            </View>
    <View style={styles.test1Prev}>
    <View style={styles.countersPrev}>
                <TouchableOpacity>
                    <Text>{this.state.totalBPrev}</Text>
                 </TouchableOpacity>
                </View>
                <View style={styles.counters1Prev}>
                <TouchableOpacity >
                    <Text>{this.state.totalNPrev}</Text>
                 </TouchableOpacity>
                </View>
                <View style={styles.counters2Prev}>
                <TouchableOpacity >
                    <Text>{this.state.totalMPrev}</Text>
                 </TouchableOpacity>
                </View>
              </View>
      {/* {this.renderNodePlayerView()} */}
          </Card>

          <View style={{flexDirection:'row'}}>
          <Card style={styles.car7Prev}>
             <View style={{flexDirection:'row'}}>
             <Card style={styles.car8Prev}>
     <ScrollView style={{height: '100%',width: '100%'}}
      nestedScrollEnabled={true}
      contentContainerStyle={{height: '120%',
      width: '100%',
      }}>
             <List.Accordion
              title="ÉVALUER SITUATIONS DANGEREUSES"
              style={{backgroundColor:'#d6eff7'}}
              left={props => <List.Icon {...props} icon="account-alert" /> }
              expanded = {this.state.expandedPrev}
              onPress={this._handlePress}
              titleStyle={{fontWeight:'bold' ,fontSize:18}}
               >
              <List.Item title="Manque de visibilité" />
              <View style={styles.testPrev}>
            
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
              <View style={styles.testPrev}>
                
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
              <View style={styles.testPrev}>
                
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
              <TouchableOpacity style={styles.car9Prev}><Text style={{fontSize:16,top:10,color:'black',fontWeight:'bold'}}>{this.state.countPrev}</Text></TouchableOpacity>
      </ScrollView>
    </Card>
    
          <Card style={styles.car10Prev}>
            <View style={{flexDirection:'column'}}>
            <TouchableOpacity  style={styles.touch4Prev} onPress={this.iEyeV}>
                       <Icon
                            name='cryengine'
                            type='material-community'
                            color='#000000'
                            size= {36}
                        />
            </TouchableOpacity>
            <TouchableOpacity  style={styles.touch5Prev} onPress={this.iEarV}>
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
         
      </MyHiddenView>
        )

  }
  renderAnticiper(){
    return (
      <MyHiddenView style={styles.containerAnt} hide={!this.state.hideAnticiper}>
     
            <Card style={styles.carAnt}>
            <View style={{flexDirection:'row',top:90, alignItems:"center"}}>
              <Text style={{fontSize:30,color:'white',marginHorizontal:50}}>ANTICIPER</Text>
            </View>
    <View style={styles.test1Ant}>
                <View style={styles.countersAnt}>
                <TouchableOpacity>
                    <Text>{this.state.tBA}</Text>
                 </TouchableOpacity>
                </View>
                <View style={styles.counters1Ant}>
                <TouchableOpacity>
                    <Text>{this.state.tNA}</Text>
                 </TouchableOpacity>
                </View>
                <View style={styles.counters2Ant}>
                <TouchableOpacity>
                    <Text>{this.state.tMA}</Text>
                 </TouchableOpacity>
                </View>
              </View>
              {/* {this.renderNodePlayerView()} */}
          </Card>
          {/* <ScrollView 
    nestedScrollEnabled={true}
    contentContainerStyle={{height: '200%',
    width: '100%',
    }}> */}
          <View style={{flexDirection:'row'}}>
          <Card style={styles.car7Ant}>
             <View style={{flexDirection:'row'}}>
             <Card style={styles.car8Ant}>
               <ScrollView style={{height: '100%',width: '100%'}}
      nestedScrollEnabled={true}
      contentContainerStyle={{height: '350%',
      width: '100%'}}>
             <List.Accordion
              title="ADAPTATION DE L’ALLURE"
              style={{backgroundColor:'#d8ecd4'}}
              left={props => <List.Icon {...props} icon="walk"  /> }
              titleStyle={{fontWeight:'bold' ,fontSize:18}}
              expanded={this.state.expanded1}
              onPress={this._handlePressCA1}
               >
              <List.Item title="En fonction de la visibilité" />
              <View style={styles.testAnt}>
                
                <Button onPress={this.iev1} mode="contained"
                contentStyle={{width:80,height:80}}
                style={{width:80,height:80,top: -10, borderRadius:50,left: 40, justifyContent:'center',alignItems:'center',backgroundColor:'#7FA57F'}}
                labelStyle={{color:'black'}}>
                  {this.state.ev1}
                </Button>
                
                
                <Button onPress={this.iev2} mode="contained"
                contentStyle={{width:80,height:80}}
                style={{width:80,height:80,top: -10, borderRadius:50,left: 60, justifyContent:'center',alignItems:'center',backgroundColor:'#FFFF00'}}
                labelStyle={{color:'black'}}>
                  {this.state.ev2}
                </Button>
                
                
                <Button onPress={this.iev3}  mode="contained"
                contentStyle={{width:80,height:80}}
                style={{width:80,height:80,top: -10, borderRadius:50,left: 80, justifyContent:'center',alignItems:'center',backgroundColor:'red'}}
                labelStyle={{color:'black'}}>
                    {this.state.ev3}
                </Button>
                
              </View>
              <List.Item title="Selon l’adhérence" />
              <View style={styles.testAnt}>
                
                <Button onPress={this.iea1} mode="contained"
                contentStyle={{width:80,height:80}}
                style={{width:80,height:80,top: -10, borderRadius:50,left: 40, justifyContent:'center',alignItems:'center',backgroundColor:'#7FA57F'}}
                labelStyle={{color:'black'}}>
                  {this.state.ea1}
                </Button>

                <Button onPress={this.iea2} mode="contained"
                contentStyle={{width:80,height:80}}
                style={{width:80,height:80,top: -10, borderRadius:50,left: 60, justifyContent:'center',alignItems:'center',backgroundColor:'#FFFF00'}}
                labelStyle={{color:'black'}}>
                    {this.state.ea2}
                </Button>
                
                
                <Button onPress={this.iea3} mode="contained"
                contentStyle={{width:80,height:80}}
                style={{width:80,height:80,top: -10, borderRadius:50,left: 80, justifyContent:'center',alignItems:'center',backgroundColor:'red'}}
                labelStyle={{color:'black'}}>
                  {this.state.ea3}
                </Button>
                
              </View>
              <List.Item title="Selon éventuelles actions des autres" />
              <View style={styles.testAnt}>
               
                <Button onPress={this.iee1} mode="contained"
                contentStyle={{width:80,height:80}}
                style={{width:80,height:80,top: -10, borderRadius:50,left: 40, justifyContent:'center',alignItems:'center',backgroundColor:'#7FA57F'}}
                labelStyle={{color:'black'}}>
                  {this.state.ee1}
                </Button>
               
                
                <Button onPress={this.iee2}  mode="contained"
                contentStyle={{width:80,height:80}}
                style={{width:80,height:80,top: -10, borderRadius:50,left: 60, justifyContent:'center',alignItems:'center',backgroundColor:'#FFFF00'}}
                labelStyle={{color:'black'}}>
                  {this.state.ee2}
                </Button>
               
                
                <Button onPress={this.iee3} mode="contained"
                contentStyle={{width:80,height:80}}
                style={{width:80,height:80,top: -10, borderRadius:50,left: 80, justifyContent:'center',alignItems:'center',backgroundColor:'red'}}
                labelStyle={{color:'black'}}>
                  {this.state.ee3}
                </Button>
                
              </View>
              </List.Accordion>
              <TouchableOpacity style={styles.car9Ant}><Text style={{fontSize:16,top:10,color:'black',fontWeight:'bold'}}>{this.state.ca1}</Text></TouchableOpacity>
              <Divider />
              <List.Accordion
              title="PLACEMENT SUR LA CHAUSSÉE"
              style={{backgroundColor:'#d8ecd4'}}
              left={props => <List.Icon {...props} icon="road" /> }
              titleStyle={{fontWeight:'bold' ,fontSize:18}}
              expanded = {this.state.expanded2}
              onPress = {this._handlePressCA2}
               >
              <List.Item title="En fonction de la visibilité" />
              <View style={styles.testAnt}>
               
                <Button onPress={this.iefv1}  mode="contained"
                contentStyle={{width:80,height:80}}
                style={{width:80,height:80,top: -10, borderRadius:50,left: 40, justifyContent:'center',alignItems:'center',backgroundColor:'#7FA57F'}}
                labelStyle={{color:'black'}}>
                  {this.state.efv1}
                </Button>
               
                <Button onPress={this.iefv2} mode="contained"
                contentStyle={{width:80,height:80}}
                style={{width:80,height:80,top: -10, borderRadius:50,left: 60, justifyContent:'center',alignItems:'center',backgroundColor:'#FFFF00'}}
                labelStyle={{color:'black'}}>
                  {this.state.efv2}
                </Button>
              
                <Button onPress={this.iefv3} mode="contained"
                contentStyle={{width:80,height:80}}
                style={{width:80,height:80,top: -10, borderRadius:50,left: 80, justifyContent:'center',alignItems:'center',backgroundColor:'red'}}
                labelStyle={{color:'black'}}>
                  {this.state.efv3}
                </Button>
               
              </View>
              <List.Item title="Selon éventuelles actions des autres" />
              <View style={styles.testAnt}>
               
                <Button onPress={this.iefa1}  mode="contained"
                contentStyle={{width:80,height:80}}
                style={{width:80,height:80,top: -10, borderRadius:50,left: 40, justifyContent:'center',alignItems:'center',backgroundColor:'#7FA57F'}}
                labelStyle={{color:'black'}}>
                  {this.state.efa1}
                </Button>
                
                <Button onPress={this.iefa2} mode="contained"
                contentStyle={{width:80,height:80}}
                style={{width:80,height:80,top: -10, borderRadius:50,left: 60, justifyContent:'center',alignItems:'center',backgroundColor:'#FFFF00'}}
                labelStyle={{color:'black'}}>
                   {this.state.efa2}
                </Button>
                
                <Button onPress={this.iefa3} mode="contained"
                contentStyle={{width:80,height:80}}
                style={{width:80,height:80,top: -10, borderRadius:50,left: 80, justifyContent:'center',alignItems:'center',backgroundColor:'red'}}
                labelStyle={{color:'black'}}>
                  {this.state.efa3}
                </Button>
                
              </View>
              <List.Item title="Pour être mieux vu" />
              <View style={styles.testAnt}>
                
                <Button onPress={this.ipm1}  mode="contained"
                contentStyle={{width:80,height:80}}
                style={{width:80,height:80,top: -10, borderRadius:50,left: 40, justifyContent:'center',alignItems:'center',backgroundColor:'#7FA57F'}}
                labelStyle={{color:'black'}}>
                  {this.state.pm1}
                </Button>
                
                <Button onPress={this.ipm2}  mode="contained"
                contentStyle={{width:80,height:80}}
                style={{width:80,height:80,top: -10, borderRadius:50,left: 60, justifyContent:'center',alignItems:'center',backgroundColor:'#FFFF00'}}
                labelStyle={{color:'black'}}>
                  {this.state.pm2}
                 </Button>
                
                <Button onPress={this.ipm3}  mode="contained"
                contentStyle={{width:80,height:80}}
                style={{width:80,height:80,top: -10, borderRadius:50,left: 80, justifyContent:'center',alignItems:'center',backgroundColor:'red'}}
                labelStyle={{color:'black'}}>
                  {this.state.pm3}
                 </Button>
                
              </View>
              <List.Item title="En virage (trajectoire)" />
              <View style={styles.testAnt}>
                
                <Button onPress={this.ivAnt1} mode="contained"
                contentStyle={{width:80,height:80}}
                style={{width:80,height:80,top: -10, borderRadius:50,left: 40, justifyContent:'center',alignItems:'center',backgroundColor:'#7FA57F'}}
                labelStyle={{color:'black'}}>
                  {this.state.vAnt1}
                 </Button>
               
                <Button onPress={this.ivAnt2}  mode="contained"
                contentStyle={{width:80,height:80}}
                style={{width:80,height:80,top: -10, borderRadius:50,left: 60, justifyContent:'center',alignItems:'center',backgroundColor:'#FFFF00'}}
                labelStyle={{color:'black'}}>
                  {this.state.vAnt2}
                 </Button>
               
                <Button onPress={this.ivAnt3} mode="contained"
                contentStyle={{width:80,height:80}}
                style={{width:80,height:80,top: -10, borderRadius:50,left: 80, justifyContent:'center',alignItems:'center',backgroundColor:'red'}}
                labelStyle={{color:'black'}}>
                  {this.state.vAnt3}
                </Button>
                
              </View>
              <List.Item title="Lors des croisements" />
              <View style={styles.testAnt}>
                
                <Button onPress={this.ilc1} mode="contained"
                contentStyle={{width:80,height:80}}
                style={{width:80,height:80,top: -10, borderRadius:50,left: 40, justifyContent:'center',alignItems:'center',backgroundColor:'#7FA57F'}}
                labelStyle={{color:'black'}}>
                  {this.state.lc1}
                 </Button>
                
                <Button onPress={this.ilc2}  mode="contained"
                contentStyle={{width:80,height:80}}
                style={{width:80,height:80,top: -10, borderRadius:50,left: 60, justifyContent:'center',alignItems:'center',backgroundColor:'#FFFF00'}}
                labelStyle={{color:'black'}}>
                  {this.state.lc2}
                 </Button>
                
                <Button onPress={this.ilc3} mode="contained"
                contentStyle={{width:80,height:80}}
                style={{width:80,height:80,top: -10, borderRadius:50,left: 80, justifyContent:'center',alignItems:'center',backgroundColor:'red'}}
                labelStyle={{color:'black'}}>
                  {this.state.lc3}
                </Button>
                
              </View>
              <List.Item title="Pour préparer un dépassement" />
              <View style={styles.testAnt}>
                
                <Button onPress={this.ipp1} mode="contained"
                contentStyle={{width:80,height:80}}
                style={{width:80,height:80,top: -10, borderRadius:50,left: 40, justifyContent:'center',alignItems:'center',backgroundColor:'#7FA57F'}}
                labelStyle={{color:'black'}}>
                  {this.state.pp1}
                </Button>
                
                <Button onPress={this.ipp2} mode="contained"
                contentStyle={{width:80,height:80}}
                style={{width:80,height:80,top: -10, borderRadius:50,left: 60, justifyContent:'center',alignItems:'center',backgroundColor:'#FFFF00'}}
                labelStyle={{color:'black'}}>
                  {this.state.pp2}
                 </Button>
               
                <Button onPress={this.ipp3} mode="contained"
                contentStyle={{width:80,height:80}}
                style={{width:80,height:80,top: -10, borderRadius:50,left: 80, justifyContent:'center',alignItems:'center',backgroundColor:'red'}}
                labelStyle={{color:'black'}}>
                  {this.state.pp3}
                </Button>
                
              </View>
              <List.Item title="Selon l’état de la chaussée " />
              <View style={styles.testAnt}>
                
                <Button onPress={this.iec1} mode="contained"
                contentStyle={{width:80,height:80}}
                style={{width:80,height:80,top: -10, borderRadius:50,left: 40, justifyContent:'center',alignItems:'center',backgroundColor:'#7FA57F'}}
                labelStyle={{color:'black'}}>
                  {this.state.ec1}
                </Button>
                
                <Button onPress={this.iec2} mode="contained"
                contentStyle={{width:80,height:80}}
                style={{width:80,height:80,top: -10, borderRadius:50,left: 60, justifyContent:'center',alignItems:'center',backgroundColor:'#FFFF00'}}
                labelStyle={{color:'black'}}>
                  {this.state.ec2}
                 </Button>
               
                <Button onPress={this.iec3} mode="contained"
                contentStyle={{width:80,height:80}}
                style={{width:80,height:80,top: -10, borderRadius:50,left: 80, justifyContent:'center',alignItems:'center',backgroundColor:'red'}}
                labelStyle={{color:'black'}}>
                  {this.state.ec3}
                </Button>
                
              </View>
              </List.Accordion>
              <TouchableOpacity style={styles.car9Ant}><Text style={{fontSize:16,top:10,color:'black',fontWeight:'bold'}}>{this.state.ca2}</Text></TouchableOpacity>
              <Divider />
              <List.Accordion
              title="TECHNIQUE PIED FREIN"
              style={{backgroundColor:'#d8ecd4'}}
              left={props => <List.Icon {...props} icon="car-brake-alert" /> }
              titleStyle={{fontWeight:'bold' ,fontSize:18}}
              expanded={this.state.expanded3}
              onPress ={this._handlePressCA3}

               >
              <List.Item title="Fréquence d’application" />
              <View style={styles.testAnt}>
                
                <Button onPress={this.ifa1} mode="contained"
                contentStyle={{width:80,height:80}}
                style={{width:80,height:80,top: -10, borderRadius:50,left: 40, justifyContent:'center',alignItems:'center',backgroundColor:'#7FA57F'}}
                labelStyle={{color:'black'}}>
                  {this.state.fa1}
                </Button>
                
                <Button onPress={this.ifa2} mode="contained"
                contentStyle={{width:80,height:80}}
                style={{width:80,height:80,top: -10, borderRadius:50,left: 60, justifyContent:'center',alignItems:'center',backgroundColor:'#FFFF00'}}
                labelStyle={{color:'black'}}>
                  {this.state.fa2}
                </Button>
                
                <Button onPress={this.ifa3} mode="contained"
                contentStyle={{width:80,height:80}}
                style={{width:80,height:80,top: -10, borderRadius:50,left: 80, justifyContent:'center',alignItems:'center',backgroundColor:'red'}}
                labelStyle={{color:'black'}}>
                  {this.state.fa3}
                </Button>
                
              </View>
              <List.Item title="Dosage, gestion élan & rapport sup." />
              <View style={styles.testAnt}>
                
                <Button onPress={this.id1}  mode="contained"
                contentStyle={{width:80,height:80}}
                style={{width:80,height:80,top: -10, borderRadius:50,left: 40, justifyContent:'center',alignItems:'center',backgroundColor:'#7FA57F'}}
                labelStyle={{color:'black'}}>
                  {this.state.d1}
                </Button>
                
                <Button onPress={this.id2} mode="contained"
                contentStyle={{width:80,height:80}}
                style={{width:80,height:80,top: -10, borderRadius:50,left: 60, justifyContent:'center',alignItems:'center',backgroundColor:'#FFFF00'}}
                labelStyle={{color:'black'}}>
                  {this.state.d2}
                </Button>
                
                <Button onPress={this.id3} mode="contained"
                contentStyle={{width:80,height:80}}
                style={{width:80,height:80,top: -10, borderRadius:50,left: 80, justifyContent:'center',alignItems:'center',backgroundColor:'red'}}
                labelStyle={{color:'black'}}>
                  {this.state.d3}
                </Button>
                
              </View>
              </List.Accordion>
              <TouchableOpacity style={styles.car9Ant}><Text style={{fontSize:16,top:10,color:'black',fontWeight:'bold'}}>{this.state.ca3}</Text></TouchableOpacity>
              <Divider />
              <List.Accordion
              title="RESPECT DISTANCES DE SECURITÉ"
              style={{backgroundColor:'#d8ecd4'}}
              left={props => <List.Icon {...props} icon="map-marker-distance" /> }
              titleStyle={{fontWeight:'bold' ,fontSize:18}}
              expanded={this.state.expanded4}
              onPress={this._handlePressCA4}
               >
              <List.Item title="En roulant (règle des 2 secondes)" />
              <View style={styles.testAnt}>
                
                <Button onPress={this.irAnt1} mode="contained"
                contentStyle={{width:80,height:80}}
                style={{width:80,height:80,top: -10, borderRadius:50,left: 40, justifyContent:'center',alignItems:'center',backgroundColor:'#7FA57F'}}
                labelStyle={{color:'black'}}> 
                    {this.state.rAnt1}
                 </Button>
                
                <Button onPress={this.irAnt2} mode="contained"
                contentStyle={{width:80,height:80}}
                style={{width:80,height:80,top: -10, borderRadius:50,left: 60, justifyContent:'center',alignItems:'center',backgroundColor:'#FFFF00'}}
                labelStyle={{color:'black'}}>
                    {this.state.rAnt2}
                 </Button>
                
                <Button onPress={this.irAnt3} mode="contained"
                contentStyle={{width:80,height:80}}
                style={{width:80,height:80,top: -10, borderRadius:50,left: 80, justifyContent:'center',alignItems:'center',backgroundColor:'red'}}
                labelStyle={{color:'black'}}>
                  {this.state.rAnt3}
                </Button>
                
              </View>
              <List.Item title="L’arrêt (règle pneus & échappatoires)" />
              <View style={styles.testAnt}>
                
                <Button onPress={this.ia1}  mode="contained"
                contentStyle={{width:80,height:80}}
                style={{width:80,height:80,top: -10, borderRadius:50,left: 40, justifyContent:'center',alignItems:'center',backgroundColor:'#7FA57F'}}
                labelStyle={{color:'black'}}>
                  {this.state.a1}
                </Button>
               
                <Button onPress={this.ia2} mode="contained"
                contentStyle={{width:80,height:80}}
                style={{width:80,height:80,top: -10, borderRadius:50,left: 60, justifyContent:'center',alignItems:'center',backgroundColor:'#FFFF00'}}
                labelStyle={{color:'black'}}>
                  {this.state.a2}
                </Button>
                
                <Button onPress={this.ia3} mode="contained"
                contentStyle={{width:80,height:80}}
                style={{width:80,height:80,top: -10, borderRadius:50,left: 80, justifyContent:'center',alignItems:'center',backgroundColor:'red'}}
                labelStyle={{color:'black'}}>
                  {this.state.a3}
                </Button>
                
              </View>
              </List.Accordion>
              <TouchableOpacity style={styles.car9Ant}><Text style={{fontSize:16,top:10,color:'black',fontWeight:'bold'}}>{this.state.ca4}</Text></TouchableOpacity>
              <Divider />
              <List.Accordion
              title="COMMUNICATION"
              style={{backgroundColor:'#d8ecd4'}}
              left={props => <List.Icon {...props} icon="nfc" /> }
              titleStyle={{fontWeight:'bold' ,fontSize:18}}
              expanded={this.state.expanded5}
              onPress ={this._handlePressCA5}
               >
              <List.Item title="Indiquer sa présence" />
              <View style={styles.testAnt}>
                
                <Button onPress={this.iipAnt1}  mode="contained"
                contentStyle={{width:80,height:80}}
                style={{width:80,height:80,top: -10, borderRadius:50,left: 40, justifyContent:'center',alignItems:'center',backgroundColor:'#7FA57F'}}
                labelStyle={{color:'black'}}>
                   {this.state.ipAnt1}
                 </Button>
               
                <Button onPress={this.iipAnt2}  mode="contained"
                contentStyle={{width:80,height:80}}
                style={{width:80,height:80,top: -10, borderRadius:50,left: 60, justifyContent:'center',alignItems:'center',backgroundColor:'#FFFF00'}}
                labelStyle={{color:'black'}}>
                  {this.state.ipAnt2}
                 </Button>
                
                <Button onPress={this.iipAnt3}  mode="contained"
                contentStyle={{width:80,height:80}}
                style={{width:80,height:80,top: -10, borderRadius:50,left: 80, justifyContent:'center',alignItems:'center',backgroundColor:'red'}}
                labelStyle={{color:'black'}}>
                  {this.state.ipAnt3}
                 </Button>
                
              </View>
              <List.Item title="Indiquer ses intentions" />
              <View style={styles.testAnt}>
                
                <Button onPress={this.iis1}  mode="contained"
                contentStyle={{width:80,height:80}}
                style={{width:80,height:80,top: -10, borderRadius:50,left: 40, justifyContent:'center',alignItems:'center',backgroundColor:'#7FA57F'}}
                labelStyle={{color:'black'}}>
                  {this.state.is1}
                 </Button>
                
                <Button onPress={this.iis2} mode="contained"
                contentStyle={{width:80,height:80}}
                style={{width:80,height:80,top: -10, borderRadius:50,left: 60, justifyContent:'center',alignItems:'center',backgroundColor:'#FFFF00'}}
                labelStyle={{color:'black'}}>
                  {this.state.is2}
                 </Button>
                
                <Button onPress={this.iis3}  mode="contained"
                contentStyle={{width:80,height:80}}
                style={{width:80,height:80,top: -10, borderRadius:50,left: 80, justifyContent:'center',alignItems:'center',backgroundColor:'red'}}
                labelStyle={{color:'black'}}>
                    {this.state.is3}
                 </Button>
               
              </View>
              </List.Accordion>
              <TouchableOpacity style={styles.car9Ant}><Text style={{fontSize:16,top:10,color:'black',fontWeight:'bold'}}>{this.state.ca5}</Text></TouchableOpacity>
              <Divider />
              <List.Accordion
              style={{backgroundColor:'#d8ecd4'}}
              title="COMPORTEMENT DU CONDUCTEUR"
              left={props => <List.Icon {...props} icon="car" /> }
              titleStyle={{fontWeight:'bold' ,fontSize:18}}
              expanded={this.state.expanded6}
              onPress={this._handlePressCA6}
               >
              <List.Item title="Respect de la règlementation " />
              <View style={styles.testAnt}>
                
                <Button onPress={this.irra1} mode="contained"
                contentStyle={{width:80,height:80}}
                style={{width:80,height:80,top: -10, borderRadius:50,left: 40, justifyContent:'center',alignItems:'center',backgroundColor:'#7FA57F'}}
                labelStyle={{color:'black'}}>
                  {this.state.rra1}
                 </Button>
                
                <Button onPress={this.irra2} mode="contained"
                contentStyle={{width:80,height:80}}
                style={{width:80,height:80,top: -10, borderRadius:50,left: 60, justifyContent:'center',alignItems:'center',backgroundColor:'#FFFF00'}}
                labelStyle={{color:'black'}}>
                  {this.state.rra2}
                 </Button>
                
                <Button onPress={this.irra3}  mode="contained"
                contentStyle={{width:80,height:80}}
                style={{width:80,height:80,top: -10, borderRadius:50,left: 80, justifyContent:'center',alignItems:'center',backgroundColor:'red'}}
                labelStyle={{color:'black'}}>
                  {this.state.rra3}
                 </Button>
                
              </View>
              <List.Item title="Courtoisie" />
              <View style={styles.testAnt}>
                
                <Button onPress={this.ico1} mode="contained"
                contentStyle={{width:80,height:80}}
                style={{width:80,height:80,top: -10, borderRadius:50,left: 40, justifyContent:'center',alignItems:'center',backgroundColor:'#7FA57F'}}
                labelStyle={{color:'black'}}>
                  {this.state.co1}
                 </Button>
                
                <Button onPress={this.ico2} mode="contained"
                contentStyle={{width:80,height:80}}
                style={{width:80,height:80,top: -10, borderRadius:50,left: 60, justifyContent:'center',alignItems:'center',backgroundColor:'#FFFF00'}}
                labelStyle={{color:'black'}}>
                    {this.state.co2}
                 </Button>
                
                <Button onPress={this.ico3}  mode="contained"
                contentStyle={{width:80,height:80}}
                style={{width:80,height:80,top: -10, borderRadius:50,left: 80, justifyContent:'center',alignItems:'center',backgroundColor:'red'}}
                labelStyle={{color:'black'}}>
                  {this.state.co3}
                 </Button>
               
              </View>
              <List.Item title="Tolérance " />
              <View style={styles.testAnt}>
                
                <Button onPress={this.ito1} mode="contained"
                contentStyle={{width:80,height:80}}
                style={{width:80,height:80,top: -10, borderRadius:50,left: 40, justifyContent:'center',alignItems:'center',backgroundColor:'#7FA57F'}}
                labelStyle={{color:'black'}}>
                    {this.state.to1}
                 </Button>
               
                <Button onPress={this.ito2} mode="contained"
                contentStyle={{width:80,height:80}}
                style={{width:80,height:80,top: -10, borderRadius:50,left: 60, justifyContent:'center',alignItems:'center',backgroundColor:'#FFFF00'}}
                labelStyle={{color:'black'}}>
                  {this.state.to2}
                 </Button>
              
                <Button onPress={this.ito3}  mode="contained"
                contentStyle={{width:80,height:80}}
                style={{width:80,height:80,top: -10, borderRadius:50,left: 80, justifyContent:'center',alignItems:'center',backgroundColor:'red'}}
                labelStyle={{color:'black'}}>
                  {this.state.to3}
                 </Button>
                
              </View>
              </List.Accordion>
              <TouchableOpacity style={styles.car9Ant}><Text style={{fontSize:16,top:10,color:'black',fontWeight:'bold'}}>{this.state.ca6}</Text></TouchableOpacity>
              {/* <Card style={styles.car0Ant}></Card> */}
              </ScrollView>
          </Card>
          <Card style={styles.car10Ant}>
            <View style={{flexDirection:'column'}}>
            <TouchableOpacity  style={styles.touch4Ant} onPress={this.iEyeA}>
                       <Icon
                            name='cryengine'
                            type='material-community'
                            color='#000000'
                            size= {36}
                        />
            </TouchableOpacity>
            <TouchableOpacity  style={styles.touch5Ant} onPress={this.iEarA}>
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
          {/* </ScrollView> */}
      </MyHiddenView>
        )
  }
  renderVoir(){
    return (
      <MyHiddenView style={styles.containerVoir} hide={!this.state.hideVoir}>
  
            <Card style={styles.carVoir}>
            <View style={{flexDirection:'row',top:90, alignItems:"center"}}>
              <Text style={{fontSize:30,color:'white',marginHorizontal:50}}>VOIR</Text>
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
          {/* <ScrollView 
     nestedScrollEnabled={true}
    contentContainerStyle={{height: '200%',
    width: '100%',
    }}> */}
          <View style={{flexDirection:'row'}}>
          <Card style={styles.car7Voir}>
             <View style={{flexDirection:'row'}}>
             <Card style={styles.car8Voir}>
               <ScrollView  style={{height: '100%',width: '100%'}}
       nestedScrollEnabled={true}
      contentContainerStyle={{height: '160%',
      width: '100%',
      }}>
             <List.Accordion
              title="RECHERCHER INDICES UTILES"
              expanded = {this.state.expandedV}
              style={{backgroundColor:'#fefadb'}}
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
              {/* <Card style={styles.car0Voir}></Card> */}
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
          {/* </ScrollView> */}
   
      </MyHiddenView>
        )
  } 
  renderLivePLayer(){
  
      return(
        <LivePlayer
              source={{uri:"http://10.3.141.1:8554" }}
              ref={(ref) => {
                this.player = ref
              }}
              style={{ height:290,width:403,left:190,top:-338 }}
              paused={false}
              muted={false}
              bufferTime={300}
              maxBufferTime={1000}
              resizeMode={"stretch"}
              onLoading={()=>{}}
              onLoad={()=>{}}
              onEnd={()=>{}}
            />

      )
      
    
    
  }
  render(){
  return(
   
    <View  style={styles.container}>
      <View style={styles.center}>
          <View style={styles.behind}>
          <View style={styles.headerContainer}>
             <View style={{alignItems:"center",flexDirection:"row"}}>
             <Image
                         resizeMode ="contain"
                         style={{ width:200, height:260,left:15}}
                         source= {require("../../images/Sanstitre9.png")}
                    />
                  <Text style={styles.headerTitle}>CAM DATA</Text>
                  </View>
                  <Text style={{color:'#00B0F0',fontSize:16,left:-177, textAlign:'right',fontStyle:"italic",top:45}}>Powered by CleanData</Text>
               
                  <View style={{top:20,left:165 }}>
                    <Icon
                      name='menu-left-outline'
                      color='#fff'
                      type='material-community'
                      size= {55}
                      onPress={() =>{
                      //   Alert.alert(
                      //     'Clôturer',
                      //     'Voulez-vous clôturer cette évaluation ?',
                      //     [
                      //         {text: 'Non', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                      //         {text: 'Oui', onPress: () => this._backAndroidHandler()},
                      //     ],
                      //     { cancelable: false }
                      // )
                       this.setState({closeTest:true})
                       }}
                    />
                  </View>
                  <Modal animationType="slide"
                  transparent={true}  visible={this.state.showC7} 
                  
                  onRequestClose={(() => this.setState({showC7:false}))}>
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
                      CLOTURER
				              </Text>
                      </View>
                      <View style={{flexDirection :"row",alignItems:"center",
                          justifyContent:"center",marginTop:25}}>
                      <TouchableOpacity
                          onPress={ () => {
                            this._backAndroidHandler()
                           
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
                             this.setState({showC7: false})
                            
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
            
              {this.renderPreparer()}
              {this.renderVoir()}
              {this.renderPrevoir()}
              {this.renderAnticiper()}
      

        
           
          </View>
          {this.renderLivePLayer()}
          {/* <LivePlayer
              source={{uri:this.state.streamingLink}}
              ref={(ref) => {
                this.player = ref
              }}
              style={{ height:290,width:403,left:190,top:-338 }}
              paused={false}
              muted={false}
              bufferTime={300}
              maxBufferTime={1000}
              resizeMode={"stretch"}
              onLoading={()=>{}}
              onLoad={()=>{}}
              onEnd={()=>{}}
            /> */}
               <View style={{height:70,backgroundColor:"white",elevation:1.5,top:430}}>
                <Modal animationType="slide"
                    transparent={true}  visible={this.state.closeTest}  
                    onRequestClose={(() => this.setState({closeTest:false}))}>
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
                    
                    left:80
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
                      CLOTURER
				        </Text>
                      </View>
                      <View style={{flexDirection :"row",alignItems:"center",
                          justifyContent:"center",marginTop:25}}>
                      <TouchableOpacity
                          onPress={ () => {
                            this._backAndroidHandler()
                           
                           }}
                          style={ { width:250,height:90,  backgroundColor:"black",alignItems:"center",
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
                             this.setState({closeTest: false})
                            
                          }}
                          style={ { width:250,height:90,  backgroundColor:"black",alignItems:"center",
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
        <View style={{flexDirection:"row",marginVertical:5,marginLeft:20}}>
        <TouchableOpacity 
          onPress = {() => {this.showPrep()} }
        style={{marginRight:50,width:150, 
        justifyContent:"center",alignContent:"center",alignItems:"center"}}>
          <Icon size={36} name={'ios-car'}  type='ionicon' color={this.state.color} />
          <Text style={{fontSize:12,color:this.state.color}}>PRÉPARER</Text>
        </TouchableOpacity >
     
        <TouchableOpacity 
          onPress = {() => {this.showVoir()} }
        style={{marginRight:50,width:150,justifyContent:"center",alignContent:"center",alignItems:"center"}}>
          <Icon  size={36}  name={'ios-eye'} type='ionicon'  color={this.state.colorV} />
          <Text style={{fontSize:12,color: this.state.colorV,}}>VOIR</Text>
        </TouchableOpacity >
        <TouchableOpacity  
          onPress = {() => {this.showPrev()} }
        style={{marginRight:50,width:150,justifyContent:"center",alignContent:"center",alignItems:"center"}}>

          <Icon size={36} name={'ios-person'} type='ionicon'  color={this.state.colorP} />
          <Text style={{fontSize:12,color:this.state.colorP,}}>PRÉVOIR</Text>
        </TouchableOpacity >
        <TouchableOpacity  
          onPress = {() => {this.showAnt()} }
        style={{marginRight:50,width:150,justifyContent:"center",alignContent:"center",alignItems:"center"}}>
          <Icon  size={36} name={'ios-walk'} type='ionicon'
          color={this.state.colorA}
           />
          <Text style={{fontSize:12,color:this.state.colorA}}>ANTICIPER</Text>
        </TouchableOpacity >
        </View>
        </View>
         
        </View>
       
     

    </View>



    
    
   
 
  )}
}

  const styles = StyleSheet.create({
    app:{
      flex: 1,
      backgroundColor:'grey'
    },
  
    container: {
      flex: 1,
     
      // height: 500,
      
      
    },
    center: {
      
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
     
    },
    behind: {
      // alignItems: 'center',
      // justifyContent: 'center',
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%'
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
    marginLeft: 90,
    // marginRight: 8,
  //  right: 300,
    alignSelf: 'center',
    color: 'white',
    fontSize:22,
    top:-10
}, 
//Preparer
 containerPreparer: {
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
  left:50,
  top:25,
},
counters1: {
  width:50,
  height:50,
  backgroundColor:'#FFFF00',
  borderRadius: 25,
  justifyContent:'center',
  alignItems:'center',
  left:70,
  top:25
},
counters2: {
  width:50,
  height:50,
  backgroundColor:'red',
  borderRadius: 25,
  justifyContent:'center',
  alignItems:'center',
  left:90,
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
 height:1300,
 width:530,
 backgroundColor:'#c8cce5',
 borderColor:'#1b4f9c',
 borderWidth:2,
 marginLeft:10
},
car0: {
  height:300,
  width:530,
  backgroundColor:'red',
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
 containerPrev: {
  flex: 1,
  backgroundColor:'#48bbdd'
},
countersPrev: {
    width:50,
    height:50,
backgroundColor:'#7FA57F',
borderRadius: 25,
justifyContent:'center',
alignItems:'center',
left:50,
top:25,
},
counters1Prev: {
width:50,
height:50,
backgroundColor:'#FFFF00',
borderRadius: 25,
justifyContent:'center',
alignItems:'center',
left:70,
top:25
},
counters2Prev: {
width:50,
height:50,
backgroundColor:'red',
borderRadius: 25,
justifyContent:'center',
alignItems:'center',
left:90,
top:25
},
counterPrev: {
width:80,
height:80,
backgroundColor:'#7FA57F',
borderRadius: 50,
justifyContent:'center',
alignItems:'center',
left:40,
top:-10,
},
counter1Prev: {
width:80,
height:80,
backgroundColor:'#FFFF00',
borderRadius:50,
justifyContent:'center',
alignItems:'center',
left:60,
top:-10
},
counter2Prev: {
width:80,
height:80,
backgroundColor:'red',
borderRadius: 50,
justifyContent:'center',
alignItems:'center',
left:80,
top:-10
},
testPrev: {
  flexDirection: 'row',
},
test1Prev: {
flexDirection: 'row',
top:80
},
carPrev: {
height:300,
backgroundColor:'#48bbdd',
//top:10,
//borderColor:'black',
//borderWidth:1,
},
car2Prev: {
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
car3Prev: {
height:90,
width:100,
top:30,
left:550,
backgroundColor:'#F2B97F',
borderColor:'black',
  // borderWidth:2,
   alignItems:'center'
},
car4Prev: {
height:50,
width:150,
top:50,
left:300,
backgroundColor:'#7FB8F2',
alignItems:'center'
},
car5Prev: {
height:60,
width:500,
top:20,
left:20,
//backgroundColor:'blue',
//borderColor:'black',
//borderWidth:2
},
car6Prev: {
height:50,
width:150,
top:25,
left:30,
backgroundColor:'#7FB8F2',
alignItems:'center'
},
car7Prev: {
height:1000,
width:800,
//top:28,
//left:5,
backgroundColor:'#48bbdd',
}
,
car8Prev: {
height:1000,
width:530,
backgroundColor:'#d6eff7',
borderColor:'#48bbdd',
borderWidth:2,
marginLeft:10
},
car9Prev: {
height:40,
width:25,
left:420,
top:-15,
//backgroundColor:'#fff',
alignItems:'center'
},
car10Prev: {
height:1000,
width:300,
//top:35,
//left:10,
backgroundColor:'#48bbdd',
//borderColor:'black',
//borderWidth:2
},
touchPrev: {
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
touch1Prev: {
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
touch3Prev: {
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
touch4Prev: {
height:50,
width:50,
top:560,
left:120,
backgroundColor:'#fff',
justifyContent:'center',
borderWidth:2,
alignItems:'center'
},
touch5Prev: {
height:50,
width:50,
top:590,
left:120,
backgroundColor:'#fff',
justifyContent:'center',
borderWidth:2,
alignItems:'center'
},
containerAnt: {
  flex: 1,
  backgroundColor:'#5fb157'
},
counterAnt: {
  width:80,
  height:80,
  backgroundColor:'#7FA57F',
  borderRadius: 50,
  justifyContent:'center',
  alignItems:'center',
  left:40,
  top:-10,
},
counter1Ant: {
  width:80,
  height:80,
  backgroundColor:'#FFFF00',
  borderRadius: 50,
  justifyContent:'center',
  alignItems:'center',
  left:60,
  top:-10
},
counter2Ant: {
  width:80,
  height:80,
  backgroundColor:'red',
  borderRadius: 50,
  justifyContent:'center',
  alignItems:'center',
  left:80,
  top:-10
},
countersAnt: {
  width:50,
  height:50,
  backgroundColor:'#7FA57F',
  borderRadius: 25,
  justifyContent:'center',
  alignItems:'center',
  left:50,
  top:25,
},
counters1Ant: {
  width:50,
  height:50,
  backgroundColor:'#FFFF00',
  borderRadius: 25,
  justifyContent:'center',
  alignItems:'center',
  left:70,
  top:25
},
counters2Ant: {
  width:50,
  height:50,
  backgroundColor:'red',
  borderRadius: 25,
  justifyContent:'center',
  alignItems:'center',
  left:90,
  top:25
},
testAnt: {
flexDirection: 'row',
},
carAnt: {
 height:300,
 backgroundColor:'#5fb157',
 //Wtop:10,
// borderColor:'black',
 //borderWidth:1,
},
car2Ant: {
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
car3Ant: {
 height:90,
 width:100,
 top:30,
 left:550,
 backgroundColor:'#F2B97F',
 borderColor:'black',
 //borderWidth:2,
 alignItems:'center'
},
car4Ant: {
 height:50,
 width:150,
 top:50,
 left:300,
 backgroundColor:'#7FB8F2',
 alignItems:'center'
},
car5Ant: {
 height:60,
 width:500,
 top:20,
 left:20,
 //backgroundColor:'blue',
 //borderColor:'black',
 //borderWidth:2
},
car6Ant: {
 height:50,
 width:150,
 top:25,
 left:30,
 backgroundColor:'#7FB8F2',
 alignItems:'center'
},
car7Ant: {
 height:1000,
 width:800,
 //top:28,
 //left:5,
 backgroundColor:'#5fb157',
}
,
car8Ant: {
 height:1000,
 width:530,
 backgroundColor:'#d8ecd4',
 borderColor:'#5fb157',
 borderWidth:2,
 marginLeft:10
},
car0Ant: {
  height:300,
  width:530,
  backgroundColor:'#E5E5FF',
  borderWidth:2,
  top:500
 },
car9Ant: {
 height:40,
 width:25,
 left:420,
 top:-15,
 //backgroundColor:'#fff',
alignItems:'center'
},
car10Ant: {
 height:1000,
 width:300,
 //top:35,
 //left:10,
 backgroundColor:'#5fb157',
 //borderColor:'black',
 //borderWidth:2
},
touchAnt: {
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
touch1Ant: {
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
 touch3Ant: {
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
 touch4Ant: {
  height:50,
  width:50,
  top:560,
  left:120,
  backgroundColor:'#fff',
  justifyContent:'center',
  borderWidth:2,
  alignItems:'center'
 },
 test1Ant: {
  flexDirection: 'row',
  top:80
  },
 touch5Ant: {
  height:50,
  width:50,
  top:590,
  left:120,
  backgroundColor:'#fff',
  justifyContent:'center',
  borderWidth:2,
  alignItems:'center'
 },
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
    left:50,
    top:25,
  },
  counters1Voir: {
    width:50,
    height:50,
    backgroundColor:'#FFFF00',
    borderRadius: 25,
    justifyContent:'center',
    alignItems:'center',
    left:70,
    top:25
  },
  counters2Voir: {
    width:50,
    height:50,
    backgroundColor:'red',
    borderRadius: 25,
    justifyContent:'center',
    alignItems:'center',
    left:90,
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
   borderWidth:2,
   marginLeft:10
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
  });
  export default Accueil;
  