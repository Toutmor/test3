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
  Card,
  Button
} from 'react-native-paper'
import {Icon} from 'react-native-elements';
import {Actions} from 'react-native-router-flux';
import { Header} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LivePlayer} from "react-native-live-stream";

export default class AnticiperParcours extends React.Component {
  state = {
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
    cEarA:0


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
      item_sub_category:'deplacement_de_la_chaussee',
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
        item_sub_category:'DÉPLACEMENT SUR LA CHAUSSÉE',
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
      item_sub_category:'deplacement_de_la_chaussee',
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
        item_sub_category:'DÉPLACEMENT SUR LA CHAUSSÉE',
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
      item_sub_category:'deplacement_de_la_chaussee',
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
        item_sub_category:'DÉPLACEMENT SUR LA CHAUSSÉE',
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
      item_sub_category:'deplacement_de_la_chaussee',
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
        item_sub_category:'DÉPLACEMENT SUR LA CHAUSSÉE',
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
      item_sub_category:'deplacement_de_la_chaussee',
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
        item_sub_category:'DÉPLACEMENT SUR LA CHAUSSÉE',
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
      item_sub_category:'deplacement_de_la_chaussee',
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
        item_sub_category:'DÉPLACEMENT SUR LA CHAUSSÉE',
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
      item_sub_category:'deplacement_de_la_chaussee',
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
        item_sub_category:'DÉPLACEMENT SUR LA CHAUSSÉE',
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
      item_sub_category:'deplacement_de_la_chaussee',
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
        item_sub_category:'DÉPLACEMENT SUR LA CHAUSSÉE',
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
      item_sub_category:'deplacement_de_la_chaussee',
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
        item_sub_category:'DÉPLACEMENT SUR LA CHAUSSÉE',
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
      item_sub_category:'deplacement_de_la_chaussee',
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
        item_sub_category:'DÉPLACEMENT SUR LA CHAUSSÉE',
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
      item_sub_category:'deplacement_de_la_chaussee',
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
        item_sub_category:'DÉPLACEMENT SUR LA CHAUSSÉE',
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
      item_sub_category:'deplacement_de_la_chaussee',
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
        item_sub_category:'DÉPLACEMENT SUR LA CHAUSSÉE',
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
      item_sub_category:'deplacement_de_la_chaussee',
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
        item_sub_category:'DÉPLACEMENT SUR LA CHAUSSÉE',
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
      item_sub_category:'deplacement_de_la_chaussee',
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
        item_sub_category:'DÉPLACEMENT SUR LA CHAUSSÉE',
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
      item_sub_category:'deplacement_de_la_chaussee',
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
        item_sub_category:'DÉPLACEMENT SUR LA CHAUSSÉE',
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
      item_sub_category:'deplacement_de_la_chaussee',
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
        item_sub_category:'DÉPLACEMENT SUR LA CHAUSSÉE',
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
      item_sub_category:'deplacement_de_la_chaussee',
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
        item_sub_category:'DÉPLACEMENT SUR LA CHAUSSÉE',
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
      item_sub_category:'deplacement_de_la_chaussee',
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
        item_sub_category:'DÉPLACEMENT SUR LA CHAUSSÉE',
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
  //
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
  HomeP() {
    Actions.homeP();
  }



  // incrementValue = () =>{
  //   this.setState({count: this.state.count + 1})
  // }
  // incrementValues = () =>{
  //   this.setState({counts: this.state.counts + 1})
  // }
  // _goBack = () => console.log('Went back');
  // _handlePress = () =>
  //   this.setState({
  //     expanded: !this.state.expanded
  //   });
  // async componentDidMount(){
  //   try {
  //     await AsyncStorage.multiRemove(['totalA','data']);
  //     } catch (error) {
  //     // Error retrieving data
  //     console.log(error.message);
  //     }
  // }
  async componentWillUnmount(){
    // console.log('aaaaaaaaaaaaaaaa');
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
  
  renderNodePlayerView = () => {
    return (
      <LivePlayer 
      source={{uri:"http://192.168.100.124:8554"}}
      // source={{uri:"https://www.radiantmediaplayer.com/media/big-buck-bunny-360p.mp4"}}
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
          <View style={styles.containerAnt}>
         
                <Card style={styles.carAnt}>
                <View style={{flexDirection:'row',top:90, alignItems:"center"}}>
                  <Text style={{fontSize:30,color:'white',marginHorizontal:140}}>ANTICIPER</Text>
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
              <View style={{flexDirection:'row'}}>
              <Card style={styles.car7Ant}>
                 <View style={{flexDirection:'row'}}>
                 <Card style={styles.car8Ant}>
                   <ScrollView style={{height: '100%',width: '100%'}}
					nestedScrollEnabled={true}
					contentContainerStyle={{height: '400%',
					width: '100%'}}>
                 <List.Accordion
                  title="ADAPTATION DE L’ALLURE"
                  left={props => <List.Icon {...props} icon="walk"  /> }
                  titleStyle={{fontWeight:'bold' ,fontSize:18}}
                  expanded={this.state.expanded1}
                  onPress={this._handlePressC1}
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
                  title="DÉPLACEMENT SUR LA CHAUSSÉE"
                  left={props => <List.Icon {...props} icon="road" /> }
                  titleStyle={{fontWeight:'bold' ,fontSize:18}}
                  expanded = {this.state.expanded2}
                  onPress = {this._handlePressC2}
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
                  </List.Accordion>
                  <TouchableOpacity style={styles.car9Ant}><Text style={{fontSize:16,top:10,color:'black',fontWeight:'bold'}}>{this.state.ca2}</Text></TouchableOpacity>
                  <Divider />
                  <List.Accordion
                  title="TECHNIQUE PIED FREIN"
                  left={props => <List.Icon {...props} icon="car-brake-alert" /> }
                  titleStyle={{fontWeight:'bold' ,fontSize:18}}
                  expanded={this.state.expanded3}
                  onPress ={this._handlePressC3}

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
                  left={props => <List.Icon {...props} icon="map-marker-distance" /> }
                  titleStyle={{fontWeight:'bold' ,fontSize:18}}
                  expanded={this.state.expanded4}
                  onPress={this._handlePressC4}
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
                  left={props => <List.Icon {...props} icon="nfc" /> }
                  titleStyle={{fontWeight:'bold' ,fontSize:18}}
                  expanded={this.state.expanded5}
                  onPress ={this._handlePressC5}
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
                  title="COMPORTEMENT DU CONDUCTEUR"
                  left={props => <List.Icon {...props} icon="car" /> }
                  titleStyle={{fontWeight:'bold' ,fontSize:18}}
                  expanded={this.state.expanded6}
                  onPress={this._handlePressC6}
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
                  <Card style={styles.car0Ant}></Card>
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
          </View>
            )
        }
}

const styles = StyleSheet.create({
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
      left:120,
      top:25,
    },
    counters1Ant: {
      width:50,
      height:50,
		  backgroundColor:'#FFFF00',
      borderRadius: 25,
      justifyContent:'center',
      alignItems:'center',
      left:140,
      top:25
    },
    counters2Ant: {
      width:50,
      height:50,
		  backgroundColor:'red',
      borderRadius: 25,
      justifyContent:'center',
      alignItems:'center',
      left:160,
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
     borderWidth:2
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