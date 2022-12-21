import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity ,Image, Alert, Modal, TouchableWithoutFeedback
} from 'react-native';
import {
  Button,
    Card
   }  from 'react-native-paper'
import { Header,Icon} from 'react-native-elements'
//import Icon from 'react-native-vector-icons/FontAwesome'
import {Actions} from 'react-native-router-flux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BackHandler } from 'react-native';
// import { logoutTrainer } from '../actions/auth.actions';
import * as Sentry from '@sentry/react-native';


 export default class HomeP extends React.Component {
  constructor (props){
    super (props)
    this.state = {
        //infos trainer
        trainer_id:"",
        trainer_first_name:"",
        trainer_last_name:"",
        confirmParcours:false,
        confirmGcam:false,
        confirmEco:false,
        confirmRens:false,
        confirmFrein:false,
        confirmSurgence:false,
        confirmCloture:false

    }
    // this.getInfoTrainer = this.getInfoTrainer.bind(this)
    // // this.saveData = this.saveData.bind(this)
    // this.getInfoTrainer()
   
  }
  async getStageName(){
    try {
      let stageName=""
      if (this.props.stageName !== undefined) {
        stageName= this.props.stageName
      } else {
        let stageN = await AsyncStorage.getItem("stageName")
        stageName = stageN
      }
      // console.log(stageName);
      return stageName;
    } catch (error) {
      Sentry.captureException(error);
    }
   
  }
  async getStage(){
    try {
      let stage=""
      if (this.props.stage !== undefined) {
        stage= this.props.stage
      } else {
        let stageN = await AsyncStorage.getItem("stageName")
        stage = stageN
      }
      // console.log(stage);
      return stage;
    } catch (error) {
      Sentry.captureException(error);
    }
  
  }
  async goGCam() {
    try {
      let stage=""
      if (this.props.stage !== undefined) {
        stage= this.props.stage
      } else {
        stage = await AsyncStorage.getItem("stage")
        
      }
      let stageName=""
      if (this.props.stageName !== undefined) {
        stageName= this.props.stageName
      } else {
        stageName= await AsyncStorage.getItem("stageName")
        
      }
      Actions.evaluationGCAM({stage:stage ,stageName : stageName});
    } catch (error) {
      Sentry.captureException(error);
    }
   
  }
  async goScreen() {
    try {
      let stage=""
      if (this.props.stage !== undefined) {
        stage= this.props.stage
      } else {
        stage = await AsyncStorage.getItem("stage")
        
      }
      let stageName=""
      if (this.props.stageName !== undefined) {
        stageName= this.props.stageName
      } else {
        stageName= await AsyncStorage.getItem("stageName")
        
      }
      Actions.screenTest({stage:stage ,stageName : stageName});
    } catch (error) {
      Sentry.captureException(error);
    }
   
  }
  async goNodbox() {
    try {
      let stage=""
      if (this.props.stage !== undefined) {
        stage= this.props.stage
      } else {
        stage = await AsyncStorage.getItem("stage")
        
      }
      let stageName=""
      if (this.props.stageName !== undefined) {
        stageName= this.props.stageName
      } else {
        stageName= await AsyncStorage.getItem("stageName")
        
      }
      Actions.evaluationNodbox({stage:stage ,stageName : stageName});
    } catch (error) {
      Sentry.captureException(error);
    }
   
  }
  async goParcoursRoutier(){
    try {
      let stage=""
    if (this.props.stage !== undefined) {
      stage= this.props.stage
    } else {
      stage = await AsyncStorage.getItem("stage")
      
    }
    let stageName=""
    if (this.props.stageName !== undefined) {
      stageName= this.props.stageName
    } else {
      stageName= await AsyncStorage.getItem("stageName")
      
    }
    Actions.evaluationPR({stage:stage ,stageName : stageName});
    } catch (error) {
      Sentry.captureException(error);
    }
    
  }
  async goRenversement(){
    try {
      let stage=""
      if (this.props.stage !== undefined) {
        stage= this.props.stage
      } else {
        stage = await AsyncStorage.getItem("stage")
        
      }
      let stageName=""
      if (this.props.stageName !== undefined) {
        stageName= this.props.stageName
      } else {
        stageName= await AsyncStorage.getItem("stageName")
        
      }
      Actions.listeStudentR({stage:stage ,stageName : stageName});
    } catch (error) {
      Sentry.captureException(error);
    }
    
  }
  async goFreinographe(){
    try {
      let stage=""
      if (this.props.stage !== undefined) {
        stage= this.props.stage
      } else {
        stage = await AsyncStorage.getItem("stage")
        
      }
      let stageName=""
      if (this.props.stageName !== undefined) {
        stageName= this.props.stageName
      } else {
        stageName= await AsyncStorage.getItem("stageName")
        
      }
      Actions.listeStudentF({stage:stage ,stageName : stageName});
    } catch (error) {
      Sentry.captureException(error);
    }
   
  }
  async goSituation(){
    try {
      let stage=""
      if (this.props.stage !== undefined) {
        stage= this.props.stage
      } else {
        stage = await AsyncStorage.getItem("stage")
        
      }
      let stageName=""
      if (this.props.stageName !== undefined) {
        stageName= this.props.stageName
      } else {
        stageName= await AsyncStorage.getItem("stageName")
        
      }
      Actions.listeStudentSu({stage:stage ,stageName : stageName});
    } catch (error) {
      Sentry.captureException(error);
    }
    
  }

  async goCloture(){
    try {
      let stage=""
      if (this.props.stage !== undefined) {
        stage= this.props.stage
      } else {
        stage = await AsyncStorage.getItem("stage")
        
      }
      let stageName=""
      if (this.props.stageName !== undefined) {
        stageName= this.props.stageName
      } else {
        stageName= await AsyncStorage.getItem("stageName")
        
      }
      Actions.clotureStage({stage:stage ,stageName : stageName});
    } catch (error) {
      Sentry.captureException(error);
    }
   
  }
  showCloture(){
    this.setState({confirmCloture :true})
  }

// logoutTrainer = () => { 
//   try {
    
//     Alert.alert(
//       'Déconnexion',
//       'Voulez-vous vous déconnecter?',
//       [
//           {text: 'Non', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
//           {text: 'Oui', onPress: () => this.props.dispatch(logoutTrainer())},
//       ],
//       { cancelable: false }
//   );
    
//   } catch (error) {
//     console.log(error);
//   }
 
// }
async getInfoTrainer (){
  let str_trId= await AsyncStorage.getItem('@trainer_id')
  let str_trfname=await AsyncStorage.getItem('@trainer_first_name')
  let str_trlname = await AsyncStorage.getItem('@trainer_last_name')
  this.setState({
  trainer_id : str_trId,
  trainer_first_name : str_trfname,
  trainer_last_name : str_trlname,
})
  console.log(parseInt(str_trId,10));
}
capitalize(str){
  return str.charAt(0).toUpperCase();
}

async componentDidMount(){
  console.log( this.props.stageName+"rrrd");
  console.log(this.props.alertProps);
  if (this.props.alertProps!=="no") {
    Alert.alert(
      "Attention!",
      "Vérifiez que vous êtes bien connecté au réseau WiFi avant de démarrer les tests!",
      [
      {
          text: "OK",
          onPress: () => console.log("OK Pressed") 
      }]
  )
  }
   
 
  let isStageCompleted = await AsyncStorage.getItem('isStageCompleted')
		console.log(isStageCompleted);
  BackHandler.addEventListener('backPress', () => {return true});
}

    render() {
        return (
            <View style={styles.container}>
                 <View style={styles.headerContainer}> 
           <View style={{justifyContent:"center"}}>
           
                  <View style={{justifyContent:"center",alignItems:"center",flexDirection:"row"}}>
                    <Image
                          resizeMode ="contain"
                          style={{width:200, height:260,left:15}}
                          source= {require("../images/Sanstitre9.png")}
                    />
       
                  </View>
                  </View>
            </View>
            <View style={{top:80,justifyContent:"center",alignItems:"center"}}>
                <Text style={{color:'#00B0F0',fontSize:26,justifyContent:"center",alignItems:"center",fontWeight:"bold"}}>SELECTION OUTIL</Text>
            </View>
                   <View style={{flexDirection:'row',top:220}}>
                  <Card style={styles.Card1}>
                    <TouchableWithoutFeedback style={styles.touch1} 
                     onPress={()=>{this.setState({confirmEco : true})}}
                    >
                      <View style={styles.touch1}>
                        <Text style={{fontSize:16,color:'#fff'}}>ECO DATA</Text>
                        </View>
                    </TouchableWithoutFeedback>
                  </Card>
                  <Card style={styles.Card2}>
                    <TouchableWithoutFeedback style={styles.touch1} 
                    onPress={()=>{this.setState({confirmParcours : true})}}
                    >
                       <View style={styles.touch1}>
                        <Text style={{fontSize:16,color:'#fff'}}>PARCOURS</Text>
                        <Text style={{fontSize:16,color:'#fff'}}>ROUTIER</Text>
                        </View>
                    </TouchableWithoutFeedback>
                  </Card>
                </View>
                <View style={{flexDirection:'row',top:220}}>
                  <Card style={styles.Card3}>
                    <TouchableWithoutFeedback style={styles.touch1} 
                    onPress={()=>{this.setState({confirmGcam : true})}}
                    >
                       <View style={styles.touch1}>
                        <Text style={{fontSize:16,color:'#fff'}}>CAM DATA</Text>
                        </View>
                    </TouchableWithoutFeedback>
                  </Card>
                  <Card style={styles.Card4}>
                    <TouchableWithoutFeedback style={styles.touch1}
                    onPress={()=>{this.setState({confirmRens : true})} }
                    >
                       <View style={styles.touch1}>
                        <Text style={{fontSize:16,color:'#fff'}}>RENVERSEMENT </Text>
                        </View>
                        {/* <Text style={{fontSize:16,color:'#fff'}}>+</Text>
                        <Text style={{fontSize:16,color:'#fff'}}>ECO DATA</Text> */}
                        
                    </TouchableWithoutFeedback>
                  </Card>
                </View>
                <View style={{flexDirection:'row',top:220}}>
                  <Card style={styles.Card5}>
                    <TouchableWithoutFeedback style={styles.touch1} 
                    // onPress={()=>this.goScreen()}
                    onPress={()=>this.setState({confirmFrein : true}) }
                    >
                       <View style={styles.touch1}>
                       <Text style={{fontSize:16,color:'#fff'}}>FREINOGRAPHE</Text>
                       </View>
                    </TouchableWithoutFeedback> 
                  </Card>
                  <Card style={styles.Card6}>
                    <TouchableWithoutFeedback style={styles.touch1}
                     onPress={()=>{this.setState({confirmSurgence : true}) }}>
                        <View style={styles.touch1}>
                       <Text style={{fontSize:16,color:'#fff'}}>SITUATION</Text>
                       <Text style={{fontSize:16,color:'#fff'}}>D'URGENCE</Text>
                       </View>
                    </TouchableWithoutFeedback>   
                  </Card>
                </View>
                <View style={{top:250}}>
                <View style={{alignContent:"center",alignItems:'center',justifyContent:"center",}}>
                    {/* <Button
                    contentStyle={{width:350,height:150}}
                    color={"black"}
                    style={{alignContent:"center",alignItems:'center',justifyContent:"center",width:350,
                    height:150,borderColor:'#00B0F0',borderWidth:2,
                              borderRadius:5,marginRight:30}}
                              onPress={()=>{this.showCloture()}}
                              labelStyle={{color:'#e43137',fontSize:26, }}
                             
                              > 
                              CLOTURER STAGE
                                <View  style={{alignContent:"center",alignItems:'center',justifyContent:"center",width:350,
                                 height:150,borderColor:'#00B0F0',borderWidth:2,
                              borderRadius:5,marginRight:30}}> 
                                <Text style={{color:'#e43137',fontSize:26, }}>CLOTURER STAGE</Text> 
                                </View> 
                              
                              </Button> */}
                               <TouchableWithoutFeedback style={{alignContent:"center",alignItems:'center',justifyContent:"center",width:350,
                                 height:150,borderColor:'#00B0F0',borderWidth:2,
                              borderRadius:5,marginRight:30}}
                     onPress={()=>{this.setState({confirmCloture : true}) }}>

              <View  style={{alignContent:"center",alignItems:'center',justifyContent:"center",width:350,
                                              height:150,borderColor:'#00B0F0',borderWidth:2,
                                            borderRadius:5,marginRight:30}}> 
                                              <Text style={{color:'#e43137',fontSize:26, }}>CLOTURER STAGE</Text> 
                                              </View>
                     </TouchableWithoutFeedback>
            </View>
            
            <Modal animationType="slide"
                  transparent={true}  visible={this.state.confirmEco} 
                  
                  onRequestClose={(() => this.setState({confirmEco:false}))}>
                  <View style={styles.modals}>
                  
                    <View style={{flexDirection:"column",marginTop:15}}>
                    <Icon
                        name='exclamation-circle'
                        type='font-awesome-5'
                        color='#fff'
                        size= {36}
                        style={{right:270}}
                        />
                      <View style={{marginVertical:50,justifyContent:"center",alignItems: "center",}}>
                      <Text style={ { textAlign:"center",fontSize:14,color:'white',fontSize:20} }>
                           ECO DATA {"\n"}{"\n"} 
				              </Text>
                      </View>
                      <View style={{flexDirection :"row",alignItems:"center",
                          justifyContent:"center",marginTop:25}}>
                      <TouchableOpacity
                          onPress={ () => {
                            this.setState({confirmEco:false})
                            this.goNodbox()
                           
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
                             this.setState({confirmEco:false})
                            
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
                  transparent={true}  visible={this.state.confirmGcam} 
                  
                  onRequestClose={(() => this.setState({confirmGcam:false}))}>
                  <View style={styles.modals}>
                  
                    <View style={{flexDirection:"column",marginTop:15}}>
                    <Icon
                        name='exclamation-circle'
                        type='font-awesome-5'
                        color='#fff'
                        size= {36}
                        style={{right:270}}
                        />
                      <View style={{marginVertical:50,justifyContent:"center",alignItems: "center",}}>
                      <Text style={ { textAlign:"center",fontSize:14,color:'white',fontSize:20} }>
                           CAM DATA {"\n"}{"\n"} 
				              </Text>
                      </View>
                      <View style={{flexDirection :"row",alignItems:"center",
                          justifyContent:"center",marginTop:25}}>
                      <TouchableOpacity
                          onPress={ () => {
                            this.goGCam()
                            this.setState({confirmGcam:false})
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
                             this.setState({confirmGcam:false})
                            
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
                  transparent={true}  visible={this.state.confirmParcours} 
                  
                  onRequestClose={(() => this.setState({confirmParcours:false}))}>
                  <View style={styles.modals}>
                  
                    <View style={{flexDirection:"column",marginTop:15}}>
                    <Icon
                        name='exclamation-circle'
                        type='font-awesome-5'
                        color='#fff'
                        size= {36}
                        style={{right:270}}
                        />
                      <View style={{marginVertical:50,justifyContent:"center",alignItems: "center",}}>
                      <Text style={ { textAlign:"center",fontSize:14,color:'white',fontSize:20} }>
                          PARCOURS ROUTIER {"\n"}{"\n"} 
				              </Text>
                      </View>
                      <View style={{flexDirection :"row",alignItems:"center",
                          justifyContent:"center",marginTop:25}}>
                      <TouchableOpacity
                          onPress={ () => {
                            this.goParcoursRoutier()
                            this.setState({confirmParcours:false})
                           
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
                             this.setState({confirmParcours:false})
                            
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
                  transparent={true}  visible={this.state.confirmFrein} 
                  
                  onRequestClose={(() => this.setState({confirmFrein:false}))}>
                  <View style={styles.modals}>
                  
                    <View style={{flexDirection:"column",marginTop:15}}>
                    <Icon
                        name='exclamation-circle'
                        type='font-awesome-5'
                        color='#fff'
                        size= {36}
                        style={{right:270}}
                        />
                      <View style={{marginVertical:50,justifyContent:"center",alignItems: "center",}}>
                      <Text style={ { textAlign:"center",fontSize:14,color:'white',fontSize:20} }>
                          FREINOGRAPHE {"\n"}{"\n"} 
				              </Text>
                      </View>
                      <View style={{flexDirection :"row",alignItems:"center",
                          justifyContent:"center",marginTop:25}}>
                      <TouchableOpacity
                          onPress={ () => {
                            this.goFreinographe()
                            this.setState({confirmFrein:false})
                           
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
                             this.setState({confirmFrein:false})
                            
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
                  transparent={true}  visible={this.state.confirmRens} 
                  
                  onRequestClose={(() => this.setState({confirmRens:false}))}>
                  <View style={styles.modals}>
                  
                    <View style={{flexDirection:"column",marginTop:15}}>
                    <Icon
                        name='exclamation-circle'
                        type='font-awesome-5'
                        color='#fff'
                        size= {36}
                        style={{right:270}}
                        />
                      <View style={{marginVertical:50,justifyContent:"center",alignItems: "center",}}>
                      <Text style={ { textAlign:"center",fontSize:14,color:'white',fontSize:20} }>
                           RENVERSEMENT {"\n"}{"\n"} 
				              </Text>
                      </View>
                      <View style={{flexDirection :"row",alignItems:"center",
                          justifyContent:"center",marginTop:25}}>
                      <TouchableOpacity
                          onPress={ () => {
                            this.goRenversement()
                            this.setState({confirmRens:false})
                           
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
                             this.setState({confirmRens:false})
                            
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
                  transparent={true}  visible={this.state.confirmSurgence} 
                  
                  onRequestClose={(() => this.setState({confirmSurgence:false}))}>
                  <View style={styles.modals}>
                  
                    <View style={{flexDirection:"column",marginTop:15}}>
                    <Icon
                        name='exclamation-circle'
                        type='font-awesome-5'
                        color='#fff'
                        size= {36}
                        style={{right:270}}
                        />
                      <View style={{marginVertical:50,justifyContent:"center",alignItems: "center",}}>
                      <Text style={ { textAlign:"center",fontSize:14,color:'white',fontSize:20} }>
                           SITUATION D'URGENCE {"\n"}{"\n"} 
				              </Text>
                      </View>
                      <View style={{flexDirection :"row",alignItems:"center",
                          justifyContent:"center",marginTop:25}}>
                      <TouchableOpacity
                          onPress={ () => {
                            this.goSituation()
                            this.setState({confirmSurgence:false})
                           
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
                             this.setState({confirmSurgence:false})
                            
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
                  transparent={true}  visible={this.state.confirmCloture} 
                  
                  onRequestClose={(() => this.setState({confirmCloture:false}))}>
                  <View style={styles.modals}>
                  
                    <View style={{flexDirection:"column",marginTop:15}}>
                    <Icon
                        name='exclamation-circle'
                        type='font-awesome-5'
                        color='#fff'
                        size= {36}
                        style={{right:270}}
                        />
                      <View style={{marginVertical:50,justifyContent:"center",alignItems: "center",}}>
                      <Text style={ { textAlign:"center",fontSize:14,color:'white',fontSize:20} }>
                          CLÔTURE STAGE {"\n"}{"\n"} 
				              </Text>
                      </View>
                      <View style={{flexDirection :"row",alignItems:"center",
                          justifyContent:"center",marginTop:25}}>
                      <TouchableOpacity
                          onPress={ () => {
                            this.goCloture()
                            this.setState({confirmCloture:false})
                           
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
                             this.setState({confirmCloture:false})
                            
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
            <View style={{left:580,top:40}}>
                <Text style={{fontSize:20,color:'#00B0F0',fontStyle:'italic'}}>Powered by CleanData</Text>
                </View>
                   
                  </View>
                
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
      alignContent:'center',
      justifyContent:'center',
      alignItems:'center'
    },
    Card1: {
        width:200,
        height:200,
        //top:200,
        marginLeft:170,
        alignItems:'center',
        //justifyContent:'center',
        borderWidth:2,
        borderColor:'#00B0F0',
       backgroundColor:'#191919'
      },
      Card2: {
        width:200,
        height:200,
        //top:200,
        marginLeft:50,
        borderWidth:2,
        borderColor:'#00B0F0',
        alignItems:'center',
        backgroundColor:'#191919'
      },
      Card3: {
        width:200,
        height:200,
        top:10,
        marginLeft:170,
        borderWidth:2,
        borderColor:'#00B0F0',
        alignItems:'center',
        backgroundColor:'#191919'
      },
      Card4: {
        width:200,
        height:200,
        top:10,
        marginLeft:50,
        borderWidth:2,
        borderColor:'#00B0F0',
        alignItems:'center',
        backgroundColor:'#191919'
      },
      Card5: {
        width:200,
        height:200,
        top:20,
        marginLeft:170,
        borderWidth:2,
        borderColor:'#00B0F0',
        alignItems:'center',
        backgroundColor:'#191919'
      },
      Card6: {
        width:200,
        height:200,
        top:20,
        marginLeft:50,
        borderWidth:2,
        borderColor:'#00B0F0',
        alignItems:'center',
        backgroundColor:'#191919'
      },
      headerContainer: {
        height: 80, //80
        flexDirection: 'row',
        // flex: 1.0,
        // justifyContect: 'center',
        // backgroundColor:'#cdcdcd'
        backgroundColor:'#323232'
        
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

//   mapDispatchToProps = (dispatch) => ({
//   	dispatch
// })

// export default (HomeP)

