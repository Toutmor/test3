import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity ,
  Button,Image,BackHandler,Alert,Modal
} from 'react-native';
import { Card } from 'react-native-paper';
//import { Icon } from 'react-native-elements';
import {Icon} from 'react-native-elements';
import {Actions} from 'react-native-router-flux';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default class AccueilEnCours extends React.Component {

  constructor (props){
    super(props)
    this.state = {
      showC7:false,
    }
}
current=()=>{
    let today=new Date();
    let datetime=("0" + today.getUTCHours()).slice(-2) + ":" +("0" + today.getUTCMinutes()).slice(-2) + ":" + ("0" +today.getUTCSeconds()).slice(-2);
    return datetime;
}
_backAndroidHandler = () => {
    let scene = ""
    // this.stopStreaming()
    Actions.pop();
    
  // //  alert(Actions.currentScene)
  //   if (Actions.currentScene !== "accueil") {
  //     scene="accueil"
  //     Actions.pop()
  
  //   }else{
  //     Actions.pop();
  //   }
  };
  
    render() {
      return (
            <View style={styles.container}>
              <View style={styles.headerContainer}> 
              <View style={{alignItems:"center",flexDirection:"row"}}>
                <Image
                         resizeMode ="contain"
                         style={{ width:200, height:260,left:15}}
                         source= {require("../../images/Sanstitre9.png")}
                    />
                  <Text style={styles.headerTitle}>RENVERSEMENT</Text>
                  </View>
                  <Text style={{color:'#00B0F0',fontSize:16,left:-177, textAlign:'right',fontStyle:"italic",top:45}}>Powered by CleanData</Text>
                  <View style={{top:20,left:155 }}>
                    <Icon
                      name='menu-left-outline'
                      color='#fff'
                      type='material-community'
                      size= {55}
                      onPress={() =>{
                        this.setState({showC7:true})
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
            <View style={styles.textslan}>
            <Text style={{fontSize:170,color:'#565656'}}>Test</Text>    
            <Text style={{fontSize:170,color:'#565656'}}>en</Text>
            <Text style={{fontSize:170,color:'#565656'}}>cours</Text>
            </View>
           
            </View>
            )
        }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#191919',
      //justifyContent:'center'
    },
   
    Card1: {
        width:800,
        height:800,
        //top:100,
        borderTopLeftRadius:400,
        //borderBottomLeftRadius:200,
        borderBottomRightRadius:500,
        //marginLeft:170,
        alignItems:'center',
        backgroundColor:'#fff'
      },
      Card2: {
        width:800,
        height:1000,
        top:150,
        borderTopLeftRadius:400,
        alignItems:'center',
        backgroundColor:'#191919'
      },
      Card3: {
        width:700,
        height:700,
        top:20,
        borderRadius:400,
        borderBottomEndRadius:0,
        //borderTopRightRadius:300,
        //borderBottomLeftRadius:300,
        //marginLeft:170,
        alignItems:'center',
        backgroundColor:'#f2e2cd'
      },
      button: {
        width:300,
        backgroundColor:'#1c313a',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 13,
        top:220,
        justifyContent:"center",
        alignContent:"center",
        alignItems:'center',
      },
      button1: {
        width:400,
        height:400,
        backgroundColor:'#ccccbbb7',
        borderRadius: 200,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent:'center',
        // paddingVertical: 130,
        
      },
      buttonText: {
        fontSize:16,
        fontWeight:'500',
        color:'#ffffff',
        textAlign:'center'
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
      marginLeft: 40,
      // marginRight: 8,
    //  right: 300,
      alignSelf: 'center',
      color: 'white',
      fontSize:22,
      top:-10
  },
  arrow_1_6: {
    transform: [{ rotate: '14deg' }],
   width: 260,
   marginTop: 145,
   position: 'absolute',
   marginLeft: 75,
   backgroundColor: 'orange',
   height: 4,
   flexDirection: "row",
   padding: 0,
   alignItems: 'center',
   justifyContent: 'flex-start',
   borderBottomColor: '#075fff',
   borderBottomWidth: 4,
},
textslan:{
position : 'absolute',
bottom : 0,
top : 50,
left : 0,
right : 0,
alignItems: 'center',
justifyContent:'center',
transform: [{ rotate: '-60deg' }],
color:'#ffffff',fontSize:150,

}
  });

