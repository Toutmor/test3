import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity ,
  Button,Image,BackHandler, Modal
} from 'react-native';
import { Card } from 'react-native-paper';
//import { Icon } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {Actions} from 'react-native-router-flux';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default class AccueilRenversement extends React.Component {

  constructor (props){
    super(props)
    this.state ={
      showC2 : false,
    }

}
async current(){
  let today=new Date();
  let datetime=("0" + today.getDate()).slice(-2)+ "/" +("0" + (today.getMonth()+1)).slice(-2)+ "/" +today.getFullYear()+ " " +("0" + today.getHours()).slice(-2) + ":" +("0" + today.getMinutes()).slice(-2) + ":" + ("0" +today.getSeconds()).slice(-2);
  try {
    await AsyncStorage.setItem("@heure",datetime)

    console.log(datetime)
  } catch (error) {
    console.log(error);
  }
 
}
async cloture(){
  let heure = await AsyncStorage.getItem("@heure")
  if (heure != null) {
  // this.currentF()
  Actions.clotureRen(({stage:this.props.stage, typeF : this.props.typeF,asyncId:this.props.asyncId}))
  } else {
    this.setState({showC2 : true})
  // Alert.alert(
  // 	'Accès Refusé',
  // 	'Vous ne pouvez pas accéder à cette fonctionnalité pour le moment. Lancer le test d'+"'"+'abord.',
  // 	[
  // 		{text: 'OK', onPress: () => console.log('OK Pressed'), style :"cancel" },
  // 	],
  // 	{ cancelable: false }
  // );
  }
}





async componentDidMount(){
  BackHandler.addEventListener('backPress', () => {return true});
  console.log(this.props.asyncId);
  console.log(this.props.stage);
  console.log(this.props.typeF);
  try {
    await AsyncStorage.multiRemove(['@heure',
    '@heurefin',
    
  ])
    console.log('yes');
    BackHandler.addEventListener('backPress', () => {return true});
    } catch (error) {
    // Error retrieving data
    console.log(error.message);
    }
} 
  
  
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
            </View>
            <View style={styles.textslan}>
            <Text style={{fontSize:180,color:'#565656'}}>ATELIER</Text>
            </View>
            <View style={{flexDirection:'column',justifyContent:"center",alignContent:"center",alignItems:"center",top:200}}>
                   <TouchableOpacity style={styles.button} onPress={() => {
                      this.current()
                      Actions.accueilC()
                   }
                    }>
                      <Icon
              name='car'
              color='#ffffff'
               size= {50}
               style={{transform: [{rotate: '-60deg'}]}}
                          
                  />   
                <Text style={styles.buttonText}>Lancer Test</Text>
                 </TouchableOpacity> 
				 <TouchableOpacity style={styles.button}
           onPress={() => 
            {
            //  this.currentF()
             this.cloture()
            }
            
          }
				>
                 <Icon
                  name='stop-circle-outline'
                  color='white'
                  type="material-community"
                  size= {50}
                  // style={{left:120}} 
                      />
                	<Text style={styles.buttonText}>Clôturer Test</Text>
                 </TouchableOpacity>  
                   </View> 
                   <Modal animationType="slide"
                  transparent={true}  visible={this.state.showC2} 
                  
                  onRequestClose={(() => this.setState({showC2:false}))}>
                  <View style={{ width:620,
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
                        
                        left:90}}>
                  
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
                      Accès Refusé {"\n"}{"\n"} Vous ne pouvez pas accéder à cette fonctionnalité pour le moment.
                      {"\n"} Lancer le test d'abord.
				              </Text>
                      </View>
                      <View style={{flexDirection :"row",alignItems:"center",
                          justifyContent:"center",marginTop:25}}>
                      <TouchableOpacity
                         
                          style={ { width:250,height:90,  backgroundColor:'#191919',alignItems:"center",
                          justifyContent:"center",borderColor:'#00B0F0',
                          borderWidth:2,
                          alignContent:"center",borderRadius:5 } }
                          onPress={ () => {
                            this.setState({showC2:false})
                           
                         }}
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

