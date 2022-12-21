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


export default class AnticiperParcours extends React.Component {
  state = {
    expanded1: false,
    expanded2: false,
    expanded3: false,
    expanded4: false,
    expanded5: false,
    expanded6: false,
    count: 0,
    counts: 0,
    
    //Adaptation de l'allure
    c1:0,
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
    c2:0,
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
    v1:0,
    v2:0,
    v3:0,
    //Lors des croisements
    lc1:0,
    lc2:0,
    lc3:0,
    //pour preparer un depassement
    pp1:0,
    pp2:0,
    pp3:0,

    //La technique pied frein
    c3:0,
    //frequence d'application
    fa1:0,
    fa2:0,
    fa3:0,
    //dosage, gestion de l'elan et du rapport superieur
    d1:0,
    d2:0,
    d3:0,
    
    //le respect des distances de sécurité
    c4:0,
    //en roulant
    r1:0,
    r2:0,
    r3:0,
    //arrêt
    a1:0,
    a2:0,
    a3:0,

    //La communication
    c5:0,
    //indiquer sa présence
    ip1:0,
    ip2:0,
    ip3:0,
    //indiquer ses intentions
    is1:0,
    is2:0,
    is3:0,

    //Le comportement du conducteur
    c6:0,
    //le respect de la réglementation
    rr1:0,
    rr2:0,
    rr3:0,
    //la courtoisie
    co1:0,
    co2:0,
    co3:0,
    //la tolerance
    to1:0,
    to2:0,
    to3:0,

    //total
    tB:0,
    tN:0,
    tM:0,
    
    //oeil
    cEye:0,
    //oreille
    cEar:0


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
    this.setState({ev1: this.state.ev1 + 1 , tB: this.state.tB+1})
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
    this.setState({ev2: this.state.ev2 + 1, tN : this.state.tN+1})
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
    this.setState({ev3: this.state.ev3 + 1, tM : this.state.tM+1})
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
    this.setState({ea1: this.state.ea1 + 1 , tB: this.state.tB+1})
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
    this.setState({ea2: this.state.ea2 + 1, tN : this.state.tN+1})
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
    this.setState({ea3: this.state.ea3 + 1, tM : this.state.tM+1})
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
    this.setState({ee1: this.state.ee1 + 1 , tB: this.state.tB+1})
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
    this.setState({ee2: this.state.ee2 + 1, tN : this.state.tN+1})
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
    this.setState({ee3: this.state.ee3 + 1, tM : this.state.tM+1})
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
    this.setState({efv1: this.state.efv1 + 1 , tB: this.state.tB+1})
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
    this.setState({efv2: this.state.efv2 + 1, tN : this.state.tN+1})
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
    this.setState({efv3: this.state.efv3 + 1, tM : this.state.tM+1})
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
    this.setState({efa1: this.state.efa1 + 1 , tB: this.state.tB+1})
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
    this.setState({efa2: this.state.efa2 + 1, tN : this.state.tN+1})
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
    this.setState({efa3: this.state.efa3 + 1, tM : this.state.tM+1})
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
    this.setState({pm1: this.state.pm1 + 1 , tB: this.state.tB+1})
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
    this.setState({pm2: this.state.pm2 + 1, tN : this.state.tN+1})
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
    this.setState({pm3: this.state.pm3 + 1, tM : this.state.tM+1})
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
  iv1 = () =>{
    this.setState({v1: this.state.v1 + 1 , tB: this.state.tB+1})
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
  iv2 = () =>{
    this.setState({v2: this.state.v2 + 1, tN : this.state.tN+1})
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
  iv3 = () =>{
    this.setState({v3: this.state.v3 + 1, tM : this.state.tM+1})
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
    this.setState({lc1: this.state.lc1 + 1 , tB: this.state.tB+1})
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
    this.setState({lc2: this.state.lc2 + 1, tN : this.state.tN+1})
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
    this.setState({lc3: this.state.lc3 + 1, tM : this.state.tM+1})
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
    this.setState({pp1: this.state.pp1 + 1 , tB: this.state.tB+1})
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
    this.setState({pp2: this.state.pp2 + 1, tN : this.state.tN+1})
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
    this.setState({pp3: this.state.pp3 + 1, tM : this.state.tM+1})
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
    this.setState({fa1: this.state.fa1 + 1 , tB: this.state.tB+1})
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
    this.setState({fa2: this.state.fa2 + 1, tN : this.state.tN+1})
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
    this.setState({fa3: this.state.fa3 + 1, tM : this.state.tM+1})
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
    this.setState({d1: this.state.d1 + 1 , tB: this.state.tB+1})
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
    this.setState({d2: this.state.d2 + 1, tN : this.state.tN+1})
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
    this.setState({d3: this.state.d3 + 1, tM : this.state.tM+1})
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
  ir1 = () =>{
    this.setState({r1: this.state.r1 + 1 , tB: this.state.tB+1})
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
  ir2 = () =>{
    this.setState({r2: this.state.r2 + 1, tN : this.state.tN+1})
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
  ir3 = () =>{
    this.setState({r3: this.state.r3 + 1, tM : this.state.tM+1})
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
    this.setState({a1: this.state.a1 + 1 , tB: this.state.tB+1})
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
    this.setState({a2: this.state.a2 + 1, tN : this.state.tN+1})
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
    this.setState({a3: this.state.a3 + 1, tM : this.state.tM+1})
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
  iip1 = () =>{
    this.setState({ip1: this.state.ip1+ 1 , tB: this.state.tB+1})
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
  iip2 = () =>{
    this.setState({ip2: this.state.ip2 + 1, tN : this.state.tN+1})
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
  iip3 = () =>{
    this.setState({ip3: this.state.ip3 + 1, tM : this.state.tM+1})
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
    this.setState({is1: this.state.is1 + 1 , tB: this.state.tB+1})
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
    this.setState({is2: this.state.is2 + 1, tN : this.state.tN+1})
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
    this.setState({is3: this.state.is3 + 1, tM : this.state.tM+1})
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
  irr1 = () =>{
    this.setState({rr1: this.state.rr1 + 1 , tB: this.state.tB+1})
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
  irr2 = () =>{
    this.setState({rr2: this.state.rr2 + 1, tN : this.state.tN+1})
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
  irr3 = () =>{
    this.setState({rr3: this.state.rr3 + 1, tM : this.state.tM+1})
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
    this.setState({co1: this.state.co1 + 1 , tB: this.state.tB+1})
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
    this.setState({co2: this.state.co2 + 1, tN : this.state.tN+1})
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
    this.setState({co3: this.state.co3 + 1, tM : this.state.tM+1})
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
    this.setState({to1: this.state.to1 + 1 , tB: this.state.tB+1})
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
    this.setState({to2: this.state.to2 + 1, tN : this.state.tN+1})
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
    this.setState({to3: this.state.to3 + 1, tM : this.state.tM+1})
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
    this.setState({cEye : this.state.cEye +1})
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
    this.setState({cEar : this.state.cEar+1})
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
  _handlePressC6 = () =>{
    this.setState({
      expanded6: !this.state.expanded6
    });
    if (this.state.expanded6 === true){
      this.setState({c6: this.state.c6 + 1})
      }
  }
  HomeP() {
    Actions.homeP();
  }
  
  async componentWillUnmount(){
    // console.log('aaaaaaaaaaaaaaaa');
    try {
      let obj={
        // 
        tBA: this.state.tB,
        tNA: this.state.tN,
        tMA: this.state.tM,
        cEarA : this.state.cEar,
        cEyeA : this.state.cEye
      }
      
      let totalA= JSON.stringify(obj)
      await AsyncStorage.setItem( 'totalA', totalA );

    } catch (error) {
      console.log(error);
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
                  <Text style={{fontSize:30,color:'white',marginHorizontal:140}}>ANTICIPER</Text>
                </View>
				<View style={styles.test1}>
                    <View style={styles.counters}>
                    <TouchableOpacity>
                        <Text>{this.state.tB}</Text>
                     </TouchableOpacity>
                    </View>
                    <View style={styles.counters1}>
                    <TouchableOpacity>
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
              <View style={{flexDirection:'row'}}>
              <Card style={styles.car7}>
                 <View style={{flexDirection:'row'}}>
                 <Card style={styles.car8}>
                   <ScrollView>
                 <List.Accordion
                  title="ADAPTATION DE L’ALLURE"
                  left={props => <List.Icon {...props} icon="walk"  /> }
                  titleStyle={{fontWeight:'bold' ,fontSize:18}}
                  expanded={this.state.expanded1}
                  onPress={this._handlePressC1}
                   >
                  <List.Item title="En fonction de la visibilité" />
                  <View style={styles.test}>
                    
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
                  <View style={styles.test}>
                    
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
                  <View style={styles.test}>
                   
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
                  <TouchableOpacity style={styles.car9}><Text style={{fontSize:16,top:10,color:'black',fontWeight:'bold'}}>{this.state.c1}</Text></TouchableOpacity>
                  <Divider />
                  <List.Accordion
                  title="DÉPLACEMENT SUR LA CHAUSSÉE"
                  left={props => <List.Icon {...props} icon="road" /> }
                  titleStyle={{fontWeight:'bold' ,fontSize:18}}
                  expanded = {this.state.expanded2}
                  onPress = {this._handlePressC2}
                   >
                  <List.Item title="En fonction de la visibilité" />
                  <View style={styles.test}>
                   
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
                  <View style={styles.test}>
                   
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
                  <View style={styles.test}>
                    
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
                  <View style={styles.test}>
                    
                    <Button onPress={this.iv1} mode="contained"
                    contentStyle={{width:80,height:80}}
                    style={{width:80,height:80,top: -10, borderRadius:50,left: 40, justifyContent:'center',alignItems:'center',backgroundColor:'#7FA57F'}}
                    labelStyle={{color:'black'}}>
                      {this.state.v1}
                     </Button>
                   
                    <Button onPress={this.iv2}  mode="contained"
                    contentStyle={{width:80,height:80}}
                    style={{width:80,height:80,top: -10, borderRadius:50,left: 60, justifyContent:'center',alignItems:'center',backgroundColor:'#FFFF00'}}
                    labelStyle={{color:'black'}}>
                      {this.state.v2}
                     </Button>
                   
                    <Button onPress={this.iv3} mode="contained"
                    contentStyle={{width:80,height:80}}
                    style={{width:80,height:80,top: -10, borderRadius:50,left: 80, justifyContent:'center',alignItems:'center',backgroundColor:'red'}}
                    labelStyle={{color:'black'}}>
                      {this.state.v3}
                    </Button>
                    
                  </View>
                  <List.Item title="Lors des croisements" />
                  <View style={styles.test}>
                    
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
                  <View style={styles.test}>
                    
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
                  <TouchableOpacity style={styles.car9}><Text style={{fontSize:16,top:10,color:'black',fontWeight:'bold'}}>{this.state.c2}</Text></TouchableOpacity>
                  <Divider />
                  <List.Accordion
                  title="TECHNIQUE PIED FREIN"
                  left={props => <List.Icon {...props} icon="car-brake-alert" /> }
                  titleStyle={{fontWeight:'bold' ,fontSize:18}}
                  expanded={this.state.expanded3}
                  onPress ={this._handlePressC3}

                   >
                  <List.Item title="Fréquence d’application" />
                  <View style={styles.test}>
                    
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
                  <View style={styles.test}>
                    
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
                  <TouchableOpacity style={styles.car9}><Text style={{fontSize:16,top:10,color:'black',fontWeight:'bold'}}>{this.state.c3}</Text></TouchableOpacity>
                  <Divider />
                  <List.Accordion
                  title="RESPECT DISTANCES DE SECURITÉ"
                  left={props => <List.Icon {...props} icon="map-marker-distance" /> }
                  titleStyle={{fontWeight:'bold' ,fontSize:18}}
                  expanded={this.state.expanded4}
                  onPress={this._handlePressC4}
                   >
                  <List.Item title="En roulant (règle des 2 secondes)" />
                  <View style={styles.test}>
                    
                    <Button onPress={this.ir1} mode="contained"
                    contentStyle={{width:80,height:80}}
                    style={{width:80,height:80,top: -10, borderRadius:50,left: 40, justifyContent:'center',alignItems:'center',backgroundColor:'#7FA57F'}}
                    labelStyle={{color:'black'}}> 
                        {this.state.r1}
                     </Button>
                    
                    <Button onPress={this.ir2} mode="contained"
                    contentStyle={{width:80,height:80}}
                    style={{width:80,height:80,top: -10, borderRadius:50,left: 60, justifyContent:'center',alignItems:'center',backgroundColor:'#FFFF00'}}
                    labelStyle={{color:'black'}}>
                        {this.state.r2}
                     </Button>
                    
                    <Button onPress={this.ir3} mode="contained"
                    contentStyle={{width:80,height:80}}
                    style={{width:80,height:80,top: -10, borderRadius:50,left: 80, justifyContent:'center',alignItems:'center',backgroundColor:'red'}}
                    labelStyle={{color:'black'}}>
                      {this.state.r3}
                    </Button>
                    
                  </View>
                  <List.Item title="L’arrêt (règle pneus & échappatoires)" />
                  <View style={styles.test}>
                    
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
                  <TouchableOpacity style={styles.car9}><Text style={{fontSize:16,top:10,color:'black',fontWeight:'bold'}}>{this.state.c4}</Text></TouchableOpacity>
                  <Divider />
                  <List.Accordion
                  title="COMMUNICATION"
                  left={props => <List.Icon {...props} icon="nfc" /> }
                  titleStyle={{fontWeight:'bold' ,fontSize:18}}
                  expanded={this.state.expanded5}
                  onPress ={this._handlePressC5}
                   >
                  <List.Item title="Indiquer sa présence" />
                  <View style={styles.test}>
                    
                    <Button onPress={this.iip1}  mode="contained"
                    contentStyle={{width:80,height:80}}
                    style={{width:80,height:80,top: -10, borderRadius:50,left: 40, justifyContent:'center',alignItems:'center',backgroundColor:'#7FA57F'}}
                    labelStyle={{color:'black'}}>
                       {this.state.ip1}
                     </Button>
                   
                    <Button onPress={this.iip2}  mode="contained"
                    contentStyle={{width:80,height:80}}
                    style={{width:80,height:80,top: -10, borderRadius:50,left: 60, justifyContent:'center',alignItems:'center',backgroundColor:'#FFFF00'}}
                    labelStyle={{color:'black'}}>
                      {this.state.ip2}
                     </Button>
                    
                    <Button onPress={this.iip3}  mode="contained"
                    contentStyle={{width:80,height:80}}
                    style={{width:80,height:80,top: -10, borderRadius:50,left: 80, justifyContent:'center',alignItems:'center',backgroundColor:'red'}}
                    labelStyle={{color:'black'}}>
                      {this.state.ip3}
                     </Button>
                    
                  </View>
                  <List.Item title="Indiquer ses intentions" />
                  <View style={styles.test}>
                    
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
                  <TouchableOpacity style={styles.car9}><Text style={{fontSize:16,top:10,color:'black',fontWeight:'bold'}}>{this.state.c5}</Text></TouchableOpacity>
                  <Divider />
                  <List.Accordion
                  title="COMPORTEMENT DU CONDUCTEUR"
                  left={props => <List.Icon {...props} icon="car" /> }
                  titleStyle={{fontWeight:'bold' ,fontSize:18}}
                  expanded={this.state.expanded6}
                  onPress={this._handlePressC6}
                   >
                  <List.Item title="Respect de la règlementation " />
                  <View style={styles.test}>
                    
                    <Button onPress={this.irr1} mode="contained"
                    contentStyle={{width:80,height:80}}
                    style={{width:80,height:80,top: -10, borderRadius:50,left: 40, justifyContent:'center',alignItems:'center',backgroundColor:'#7FA57F'}}
                    labelStyle={{color:'black'}}>
                      {this.state.rr1}
                     </Button>
                    
                    <Button onPress={this.irr2} mode="contained"
                    contentStyle={{width:80,height:80}}
                    style={{width:80,height:80,top: -10, borderRadius:50,left: 60, justifyContent:'center',alignItems:'center',backgroundColor:'#FFFF00'}}
                    labelStyle={{color:'black'}}>
                      {this.state.rr2}
                     </Button>
                    
                    <Button onPress={this.irr3}  mode="contained"
                    contentStyle={{width:80,height:80}}
                    style={{width:80,height:80,top: -10, borderRadius:50,left: 80, justifyContent:'center',alignItems:'center',backgroundColor:'red'}}
                    labelStyle={{color:'black'}}>
                      {this.state.rr3}
                     </Button>
                    
                  </View>
                  <List.Item title="Courtoisie" />
                  <View style={styles.test}>
                    
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
                  <View style={styles.test}>
                    
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
                  <TouchableOpacity style={styles.car9}><Text style={{fontSize:16,top:10,color:'black',fontWeight:'bold'}}>{this.state.c6}</Text></TouchableOpacity>
                  <Card style={styles.car0}></Card>
                  </ScrollView>
              </Card>
              <Card style={styles.car10}>
                <View style={{flexDirection:'column'}}>
                <TouchableOpacity  style={styles.touch4} onPress={this.iEyeA}>
                           <Icon
                                name='cryengine'
                                type='material-community'
                                color='#000000'
                                size= {36}
                            />
                </TouchableOpacity>
                <TouchableOpacity  style={styles.touch5} onPress={this.iEarA}>
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
      backgroundColor:'#5fb157'
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
    car: {
     height:300,
     backgroundColor:'#5fb157',
     //Wtop:10,
    // borderColor:'black',
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
     backgroundColor:'#5fb157',
    }
    ,
    car8: {
     height:1000,
     width:530,
     backgroundColor:'#d8ecd4',
     borderColor:'#5fb157',
     borderWidth:2
    },
    car0: {
      height:300,
      width:530,
      backgroundColor:'#E5E5FF',
      borderWidth:2,
      top:500
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
     backgroundColor:'#5fb157',
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
     test1: {
      flexDirection: 'row',
      top:80
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