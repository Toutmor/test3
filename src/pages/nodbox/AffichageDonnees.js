import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity, 
  Alert,
  Image,
  Modal
} from 'react-native';
import {
    Card
   }  from 'react-native-paper'
import { Header} from 'react-native-elements'
import { Icon } from 'react-native-elements';
import {Actions } from 'react-native-router-flux';
import { BackHandler } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import * as Sentry from '@sentry/react-native';

export default class AffichageDonnees extends React.Component {
    constructor(props){
        super(props)
        this.state ={
          rcparcours:false,
          spinner:false,
          closeTest:false
        }
       
    }
      // console.log(this.props.parcours1);
        // console.log(this.props.parcours2);
      
goBack() {
    Actions.accueilNodbox();
}
goHisto1(){
  try {
    Actions.histo()
  } catch (error) {
    console.log(error);
    Sentry.captureException(error);
  }
 
}

componentDidMount(){
  console.log(this.props.typeF);
  BackHandler.addEventListener('backPress', () => {return true});
}
async recommencer(){
  try {
    await AsyncStorage.multiRemove([
		
      'qcmDataN', 
      '@heurefin', 
      '@heure',
      'courbe_data',
      'post_data',
      'nodbox_video_path'
      
    ]) 
    Actions.popTo("homeNodbox",{stage:this.props.stage,stageName : this.props.stageName, typeF : this.props.typeF,asyncId:this.props.asyncId})
  } catch (error) {
    Sentry.captureException(error);
    console.log(error);
  }
 
}
async rcp(){
 
  
  Alert.alert(
    "WARNING",
    "êtes-vous sûr de vouloir recommencer ce parcours?",
    [
    {
        text: "OK",
        onPress: () => {
          this.recommencer()
          
        }
    }]
)  
}
rj1(){
  try {
    Actions.rjouer1({stage:this.props.stage,stageName : this.props.stageName, typeF : this.props.typeF,asyncId:this.props.asyncId})
  } catch (error) {
    Sentry.captureException(error);
  }
 
  // Actions.rjouer1({stats1: this.state.pcrs1})
}


getComp(){
  try {
    Actions.comparaison({stage:this.props.stage,stageName : this.props.stageName, typeF : this.props.typeF,asyncId:this.props.asyncId})
  } catch (error) {
    Sentry.captureException(error);
  }
  console.log(this.props.asyncId)
  
}

renderInitiale(){
  if (this.props.typeF === "initial") {
    return(
      <View style={{flexDirection:'row',top:400}}>
          <Card style={styles.Card1 } >
            <TouchableOpacity style={styles.touch1}  activeOpacity={0.2} onPress={()=>this.rj1()}>
                        <Text style={{fontSize:20,fontWeight:'bold',color:"white"}}>REJOUER </Text>
                        <Text style={{fontSize:18, fontWeight:'300',color:"white"}}>PARCOURS </Text>
                        <Text style={{fontSize:40,fontWeight:'bold',color:"white"}}>1</Text>
                    </TouchableOpacity>
                  </Card>
                  <Card style={styles.Card2  }>
                    <TouchableOpacity style={styles.touch1}  activeOpacity={0.2} onPress={()=>this.goHisto1()}>
                    <Text style={{fontSize:20,fontWeight:'bold',color:"white"}}>HISTOGRAMMES </Text>
                        <Text style={{fontSize:18, fontWeight:'300',color:"white"}}>PARCOURS </Text>
                        <Text style={{fontSize:40,fontWeight:'bold',color:"white"}}>1</Text>
                    </TouchableOpacity>
                  </Card>
                  <Card style={styles.Card3 }>
                    <TouchableOpacity style={styles.touch1} activeOpacity={0.2} onPress={()=>this.setState({rcparcours:true})}>
                    <Text style={{fontSize:20,fontWeight:'bold',color:"white"}}>RECOMMENCER </Text>
                        <Text style={{fontSize:18, fontWeight:'300',color:"white"}}>PARCOURS </Text>
                        <Text style={{fontSize:40,fontWeight:'bold',color:"white"}}>1</Text>
                    </TouchableOpacity>
                  </Card>
        </View>
    )
  }
  else{
    return(null)
  }
}
renderFinale(){
  if (this.props.typeF ==="finale") {
    return(
      <View>
      <View style={{flexDirection:'row',top:300}}>
                <Card style={styles.Card4} >
                    <TouchableOpacity style={styles.touch1}  activeOpacity={0.2} onPress={()=>this.rj1()}>
                    <Text style={{fontSize:20,fontWeight:'bold',color:"white"}}>REJOUER </Text>
                        <Text style={{fontSize:18, fontWeight:'300',color:"white"}}>PARCOURS </Text>
                        <Text style={{fontSize:40,fontWeight:'bold',color:"white"}}>2</Text>
                    </TouchableOpacity>
                  </Card>
                  <Card style={styles.Card5 } >
                    <TouchableOpacity style={styles.touch1} activeOpacity={0.2} onPress={()=>this.goHisto1()} >
                    <Text style={{fontSize:20,fontWeight:'bold',color:"white"}}>HISTOGRAMMES </Text>
                        <Text style={{fontSize:18, fontWeight:'300',color:"white"}}>PARCOURS </Text>
                        <Text style={{fontSize:40,fontWeight:'bold',color:"white"}}>2</Text>
                    </TouchableOpacity> 
                  </Card>
                  <Card style={styles.Card6 }>
                    <TouchableOpacity style={styles.touch1}  activeOpacity={0.2} onPress={()=>this.setState({rcparcours:true})}>
                    <Text style={{fontSize:20,fontWeight:'bold',color:"white"}}>RECOMMENCER </Text>
                        <Text style={{fontSize:18, fontWeight:'300',color:"white"}}>PARCOURS </Text>
                        <Text style={{fontSize:40,fontWeight:'bold',color:"white"}}>2</Text>
                    </TouchableOpacity>   
                  </Card>
                  
                </View>
               
                <Card  style={styles.Card7 } >
                    {/* //style={this.state.error == false ? styles.base : [styles.base, {backgroundColor: 'red'}]} */}
                    <TouchableOpacity style={styles.touch1}  activeOpacity={0.2} onPress={()=>this.getComp()} >
                    <Text style={{fontSize:24,fontWeight:'bold',color:"white"}}>COMPARAISON </Text>
                    </TouchableOpacity>   
                  </Card>
                
          </View>
    )
    
  }else{
    return(null)
  }
}
renderOther(){
  if (this.props.typeF === "simultane"|| this.props.typeF ==="sans_evaluation") {
    return(
      <View style={{flexDirection:'row',top:400}}>
          <Card style={styles.Card1 } >
            <TouchableOpacity style={styles.touch1}  activeOpacity={0.2} onPress={()=>this.rj1()}>
                        <Text style={{fontSize:20,fontWeight:'bold',color:"white"}}>REJOUER </Text>
                        <Text style={{fontSize:18, fontWeight:'300',color:"white"}}>PARCOURS </Text>
                        {/* <Text style={{fontSize:40,fontWeight:'bold',color:"white"}}>1</Text> */}
                    </TouchableOpacity>
                  </Card>
                  <Card style={styles.Card2  }>
                    <TouchableOpacity style={styles.touch1}  activeOpacity={0.2} onPress={()=>this.goHisto1()}>
                    <Text style={{fontSize:20,fontWeight:'bold',color:"white"}}>HISTOGRAMMES </Text>
                        <Text style={{fontSize:18, fontWeight:'300',color:"white"}}>PARCOURS </Text>
                        {/* <Text style={{fontSize:40,fontWeight:'bold',color:"white"}}>1</Text> */}
                    </TouchableOpacity>
                  </Card>
                  <Card style={styles.Card3 }>
                    <TouchableOpacity style={styles.touch1} activeOpacity={0.2} onPress={()=>this.setState({rcparcours:true})}>
                    <Text style={{fontSize:20,fontWeight:'bold',color:"white"}}>RECOMMENCER </Text>
                        <Text style={{fontSize:18, fontWeight:'300',color:"white"}}>PARCOURS </Text>
                        {/* <Text style={{fontSize:40,fontWeight:'bold',color:"white"}}>1</Text> */}
                    </TouchableOpacity>
                  </Card>
        </View>
    )
  }
  else{
    return(null)
  }
}
goHome(){
  try {
    console.log(this.props.stageName);
    Actions.popTo("homeNodbox",{stage:this.props.stage,
      stageName : this.props.stageName,
      typeF:this.props.typeF,
      asyncId:this.props.asyncId})
  } catch (error) {
    Sentry.captureException(error);
  }
 
}

    render() {
        return (
            <View style={styles.container}>
              <View style={styles.headerContainer}>
                
              <View style={{alignItems:"center",flexDirection:"row"}}>
                  <Image
                         resizeMode ="contain"
                         style={{ width:200, height:260,right:-15}}
                         source= {require("../../images/Sanstitre9.png")}
                    />
                  <Text style={styles.headerTitle}>ECO DATA</Text>
                  </View>
                  <Text style={{color:'#00B0F0',fontSize:16,left:-177, textAlign:'right',fontStyle:"italic",top:45}}>Powered by CleanData</Text>
                
                  <View style={styles.menuButton}>
                  <Icon
                      name='menu-left-outline'
                      color='#fff'
                      type='material-community'
                      size= {40}
                      onPress={() =>{
                       this.setState({
                         closeTest :true
                       })
                    //     Alert.alert(
                    //     'Clôturer',
                    //     'Voulez-vous clôturer cette évaluation ?',
                    //     [
                    //         {text: 'Non', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    //         {text: 'Oui', onPress: () => this.goHome()},
                    //     ],
                    //     { cancelable: false }
                    // )
                  }}
                    />
                     
                      {/* <Icon
                        name='arrow-right'
                        type='material-community'
                        color='#b20000'
                        size= {40}
                        onPress={()=>Actions.pop()}
                      /> */}
                     
                      
                  </View>
                  </View>
                  {this.renderInitiale()}
                  {this.renderFinale()}
                  {this.renderOther()}
                  <Spinner
                        visible={this.state.spinner}
                        animation={"slide"}
                        overlayColor={"#40606060"}
                        indicatorStyle ={{size: "large"}}
                        textContent={'RECONNEXION AU CAN...'}
                        textStyle={styles.spinnerTextStyle}
                      />
                   <Modal animationType="slide"
                    transparent={true}  visible={this.state.rcparcours}  
                    onRequestClose={(() => this.setState({rcparcours:false}))}>
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
                      RECOMMENCER,
                      {"\n"}{"\n"}ATTENTION: DONNEES DU PARCOURS PRECEDENT NON SAUVEGARDEES
				        </Text>
                      </View>
                      <View style={{flexDirection :"row",alignItems:"center",
                          justifyContent:"center",marginTop:25}}>
                      <TouchableOpacity
                          onPress={ () => {
                            setTimeout(() => {
                              this.recommencer()
                              this.setState({spinner:false})
                            }, 2000);
                           
                            this.setState({
                              rcparcours : false,
                              spinner : true
                            })
                           
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
                             this.setState({rcparcours: false})
                            
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
                            this.goHome()
                           
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
                             this.setState({closeTest: false})
                            
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
               
           
            )
        }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#191919'
    },
    touch1:{
      width:200,
      height:200,
      alignItems: 'center',
      justifyContent:'center',

    },
    Card1: {
        width:200,
        height:200,
        //top:200,
        marginLeft:70,
        alignItems:'center',
        backgroundColor:'#e43137' 
      },
      Card2: {
        width:200,
        height:200,
        //top:200,
        marginLeft:30,
        alignItems:'center',
        backgroundColor:'#ef5d55'
      },
      Card3: {
        width:200,
        height:200,
        // top:10,
        marginLeft:30,
        alignItems:'center',
        backgroundColor:'#fea196'
      },
      Card4: {
        width:200,
        height:200,
        top:40,
        marginLeft:70,
        alignItems:'center',
        backgroundColor:'#6c73b0'
      },
      Card5: {
        width:200,
        height:200,
        top:40,
        marginLeft:30,
        alignItems:'center',
        backgroundColor:'#44549d'
      },
      Card6: {
        width:200,
        height:200,
        top:40,
        marginLeft:30,
        alignItems:'center',
        backgroundColor:'#003789'
      },
      Card7: {
        width:300,
        height:200,
        top:390,
        marginHorizontal:250,
        justifyContent:"center",
        alignItems:'center',
        backgroundColor:'#207299'
      },
      headerContainer: {
        height: 80, //80
        flexDirection: 'row',
        // flex: 1.0,
        // justifyContect: 'center',
        backgroundColor:'#323232',
    },
    headerTitle: {
      marginLeft: 90 ,
      // marginRight: 8,
    //  right: 300,
      alignSelf: 'center',
      color: 'white',
      fontSize:22,
      top:-10
  },
  menuButton: {
    // flexDirection: 'row',
    top:20,
    left:180
  },
  spinnerTextStyle: {
		color: '#FFF'
	  },
  });

