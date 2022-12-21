import React  from 'react'
import { View, StyleSheet, ScrollView,Dimensions,Text, TouchableOpacity, Image} from 'react-native'

import {Icon} from 'react-native-elements'
import Swiper from 'react-native-swiper';
import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BarChart} from 'react-native-chart-kit'
import HistoVariables from '../../../components/nodboxMQTT/histoMQTT'
import SSHClient from 'react-native-sshclient';

HistoVariables.create(
	'test/histogram',//userID pour canal

	{
	 uri: 'mqtt://10.3.141.1:1883',//url 
	},
 );

export default class HistoParcours extends React.Component{
    constructor(props){
        super(props)
            this.state={
              courbe_data : [],
              
              rapport:[],
              rapportX:[],
              
              vitesse: [],
              vitesseX: [],
              
              regime : [],
              regimeX : [],
            
              pedale_acc :[],
              pedale_accX :[],
              //gestion erreur
                error:false,
                errorSmb:"",
                errorMqtt:"",
                isMessage:false
             
            }
        }
        histoScript(){
            try {
              SSHClient.setup("pi","10.3.141.1",22);
              SSHClient.usePrivateKey(false);
              SSHClient.setPassword("raspberry");
              SSHClient.connect().then(
                  (result)=>{
                      console.log(result);
              //for us : stream_simulator.py
              //for tushar capture_video.py
              //can_post.py
                  SSHClient.execute("python3 histogram.py").then(
                      (result)=>{
                          console.log(result);
                          // alert("can_post result: "+result);
                         
                      },
                      (error)=>{
                        this.setState({
                            error : true,
                            errorMqtt:"vérifiez votre connexion au WiFi"
                          })
                        console.log(error)
                        // alert("can_post error: "+error);
                      }
                      );
                  },
                  (error)=>{
                    this.setState({
                        error : true,
                        errorMqtt:"vérifiez votre connexion au WiFi"
                      })
                    console.log(error)
                    // alert("can_post connexion: "+error);
                  }
                );

                HistoVariables.client.on('message', (message)=> {
                    if (message) {
                        let data = message.data
                        let newdata = data.replace(/'/g,'"')
                         console.log(newdata);
                        this.setState({
                            isMessage: true,
                         
                          })
                        try {
                           
                            // console.log("gg"+courbe_data);
                            let json_data = JSON.parse(newdata)
                            
                            this.setState({courbe_data : json_data})
    
                            
                            setTimeout(() => {
                                this.decomposition()
                            }, 5000); 
                            this.setState({
                                error : false,
                                errorMqtt:""
                              })
                            
                        } catch (error) {
                            // alert("POST DATA error: "+ error)
                            this.setState({
                                error : true,
                                errorMqtt:"vérifiez votre connexion au WiFi"
                              })
                            console.log(error);
                        }
                        
                    } else {
                        this.setState({
                            isMessage:false,
                            error : true,
                            errorMqtt:"vérifiez votre connexion au WiFi"
                          })
                    }
                   
      
                   
                })
                setTimeout(() => {
                    if (this.state.error ===false && this.state.isMessage===false) {
                        this.setState({
                            error : true,
                            errorMqtt:"vérifiez votre connexion au WiFi"
                          })

                    }
                  }, 5000);
               
      
                  HistoVariables.client.on('error', (err)=> {
                    console.log('mqtt.event.error', err);
                    this.setState({
                      error : true,
                      errorMqtt:"vérifiez votre connexion au WiFi"
                    })
                   
                  });
                  HistoVariables.client.on('closed', (err)=> {
                    console.log('mqtt.event.closed', err);
                    this.setState({
                      error : true,
                      errorMqtt:"vérifiez votre connexion au WiFi"
                    })
                   
                  });
             
        
          } catch (error) {
            this.setState({
                error : true,
                errorMqtt:"vérifiez votre connexion au WiFi"
              })
              console.log(error);
          }
  
          }
        async getData(){
    
    
        
                try {
                
                
                let courbe_data = await AsyncStorage.getItem('histo_data')
                // console.log("gg"+courbe_data);
                let json_data = JSON.parse(courbe_data)
                
                this.setState({courbe_data : json_data})
                // RTS:"timestamp"// "Gear",// "Pedale_frein",// "Position_embrayage", // "Vitesse_vehicule" 
    
                
                } catch (error) {
                //   alert("retrieve RTS DATA and POST DATA error:" + error)
                console.log(error);
                }
                
            
        }
        decomposition(){
            // {'gear_rapport': {0.0: 49.3, -1.0: 8.68, 1.0: 6.9, 2.0: 8.56, 3.0: 5.36, 4.0: 2.43, 5.0: 6.64, 6.0: 12.13}, 
            //'vitesse_vehicule': {'0': 57.09, '0-20': 1.79, '20-40': 4.98, '40-60': 2.43, '60-80': 7.02, '80-100': 7.54, '100-120': 14.56, '120-140': 4.6, '140-160': 0.0, '>160': 0.0}, 
            //'regime_moteur': {'arret': 5.75, '500-1000': 47.89, '1000-1500': 19.92, '1500-2000': 11.88, '2000-2500': 10.34, '2500-3000': 1.15, '3000-3500': 0.38, '3500-4000': 2.68, '4000-4500': 0.0, '>4500': 0.0}, 
            //'pedal_accelerator': {'0': 63.6, '0-20': 24.27, '20-40': 7.92, '40-60': 0.89, '60-80': 0.38, '100': 2.81}}
            try {
            let obj = this.state.courbe_data
            let tab1 = []
            let tab2 = []
            let tab3 = []
            let tab4 = []
            let tab1_1 = ["-1.0","0.0","1.0","2.0","3.0","4.0","5.0","6.0"]
            let tab2_1 = ["0","0-20","20-40","40-60","60-80","80-100","100-120","120-140","140-160",">160"]
            let tab3_1= ['arret', '500-1000', '1000-1500', '1500-2000', '2000-2500', '2500-3000', '3000-3500', '3500-4000','4000-4500','>4500']
            let tab4_1 = ['0', '0-20', '20-40', '40-60', '60-80', '100']
            
                tab1 = obj.gear_rapport
                tab2 = obj.vitesse_vehicule
                tab3 = obj.regime_moteur
                tab4 = obj.pedal_accelerator
           
        
                console.log(tab1);
            
            this.setState({ 
                
                rapport: tab1,
                vitesse: tab2,
                regime : tab3,
                pedale_acc :tab4,

                rapportX: tab1_1,
                vitesseX: tab2_1,
                regimeX: tab3_1,
                pedale_accX :tab4_1,
            
            })
            
            } catch (error) {
                console.log(error);
            //   alert("decomposition RTS DATA error:" + error)
            }
            
        }

        reconnectMqtt(){
    
            try {
             
            if (this.state.isMessage) 
            {
                HistoVariables.client.connect()    
                HistoVariables.client.on('message', (message)=> {
                    if (message) {
                        let data = message.data
                        let newdata = data.replace(/'/g,'"')
                        console.log(newdata);
                        this.setState({
                            isMessage: true,
                         
                          })
                        try {
                           
                            // console.log("gg"+courbe_data);
                            let json_data = JSON.parse(newdata)
                            
                            this.setState({courbe_data : json_data})
    
                            
                            setTimeout(() => {
                                this.decomposition()
                            }, 5000); 
                            this.setState({
                                error : false,
                                errorMqtt:""
                              })
                            
                        } catch (error) {
                            // alert("POST DATA error: "+ error)
                            this.setState({
                                error : true,
                                errorMqtt:"vérifiez votre connexion au WiFi"
                              })
                            console.log(error);
                        }
                        
                    } else {
                        this.setState({
                            isMessage:false,
                            error : true,
                            errorMqtt:"vérifiez votre connexion au WiFi"
                          })
                    }
                   
      
                   
                })
                // setTimeout(() => {
                //     if (this.state.error ===false && this.state.isMessage===false) {
                //         HistoVariables.client.connect()

                //     }
                //   }, 5000);
                
            }else {
                HistoVariables.client.connect()    
              
                this.histoScript()
            }
            
            HistoVariables.client.on('error', (err)=> {
                console.log('mqtt.event.error', err);
                this.setState({
                  error : true,
                  errorMqtt:"vérifiez votre connexion au WiFi"
                })
               
              });
              HistoVariables.client.on('closed', (err)=> {
                console.log('mqtt.event.closed', err);
                this.setState({
                  error : true,
                  errorMqtt:"vérifiez votre connexion au WiFi"
                })
               
              });
             
              this.setState({
                error : false,
                errorMqtt:""
              })
              
            } catch (error) {
              this.setState({
                error : true,
                errorMqtt:"vérifiez votre connexion au WiFi"
              })
              console.log(error);
            }
          }

    componentDidMount(){
          try {
            this.histoScript()
         
          } catch (error) {
              console.log(error)
          }
          
    }
    
    render() {
        return (
          
            <View style ={styles.app} >
                 <View style={styles.headerContainer}>
                    <View style={{alignItems:"center",flexDirection:"row"}}>
                        <Image
                                resizeMode ="contain"
                                style={{ width:200, height:260,right:-15}}
                                source= {require("../../../images/Sanstitre9.png")}
                            />
                        <Text style={styles.headerTitle}>ECO DATA</Text>
                    </View>
                    <Text style={{color:'#00B0F0',fontSize:16,left:-177, textAlign:'right',fontStyle:"italic",top:45}}>Powered by CleanData</Text>

                    <View style={styles.menuButton}>
                   
                    <Icon
                      name='arrow-right'
                      color='white'
                      size= {40}
                      type='font-awesome'
                      onPress={()=>Actions.pop()}
                    />
                   
                    
                    </View>
                </View>
           
       
                <View style={styles.label} > 
                <Text style={{color:'#00B0F0',fontSize:22,marginBottom:45,fontWeight:"bold"}}>HISTOGRAMMES</Text>
                    <Swiper 
                        showsButtons={true}
                        
                        buttonWrapperStyle={{alignItems: 'center',
                        
                        flexDirection:"row",top:-75}}
                    >
                                
                        <View style={styles.histo}> 
                            
                            <BarChart

                                data={{  
                                        labels: this.state.regimeX,
                                        datasets: [
                                            {
                                            data: this.state.regime,
                                            
                                            }
                                        ], 
                                        legend : ["Regime Moteur"]
                                    }}
                                        
                                width={690} // from react-native
                                height={800}
                               
                                // yAxisLabel={"tr/min"}
                                    
                                    // yAxisuffix={"tr/min"}
                                    // withVerticalLabels ={false}
                                    fromZero = {true}
                                    withHorizontalLabels ={false}
                                    showValuesOnTopOfBars ={true}
                                chartConfig={{
                                        //backgroundColor: "white",
                                    backgroundGradientFrom:'#CECECE',
                                    backgroundGradientTo: '#CECECE',
                                    fillShadowGradient: 'red',
                                    fillShadowGradientOpacity: 1,

                                    decimalPlaces: 2, 
                                    color: (opacity = 0.3) => `red`,
                                        // labelColor: (opacity = 1) => `rgba(255, 0, 255, ${opacity})`,


                                }}
                                    style={{margin:6}}
            
                                 />
                            <Text style={{margin:16,fontSize:20,fontWeight:"bold"}}>Régime Moteur</Text>
                                
                        </View>
                       
                            <View  style={styles.histo}>
                                <BarChart

                                    data={{ 
                                        labels: this.state.vitesseX,
                                        datasets: [
                                            {
                                            data: this.state.vitesse
                                            }
                                        ], legend : ["Vitesse"]
                                        }}
                                    //width={Dimensions.get("window").width} // from react-native
                                    width={690} // from react-native
                                    height={800}
                                  
                                    // xAxisLabel={"s"}
                                    // yAxisSuffix={"tr/min"}
                                    // withVerticalLabels ={false}
                                    fromZero = {true}
                                    withHorizontalLabels ={false}
                                    showValuesOnTopOfBars ={true}
                                    chartConfig={{
                                        //backgroundColor: "white",
                                        backgroundGradientFrom:'#CECECE',
                                        backgroundGradientTo: '#CECECE',
                                        fillShadowGradient: '#00B0F0',
                                    fillShadowGradientOpacity: 1,
                                        decimalPlaces: 2, 
                                        color: (opacity = 0.7) => '#00B0F0',
                                        // labelColor: (opacity = 1) => `rgba(255, 0, 255, ${opacity})`,


                                    }}
                                    style={{margin:6}}
            
                                 />
                                 <Text style={{margin:16,fontSize:20,fontWeight:"bold"}}>Vitesse</Text>
                                
                            </View>
                            <View style={styles.histo}>
                                <BarChart

                                    data={{ 
                                        labels: this.state.pedale_accX,
                                        datasets: [
                                            {
                                            data: this.state.pedale_acc,
                                            
                                            }
                                        ], legend : ["Pédale Accélaration"]
                                        }}
                                        width={690} // from react-native
                                        height={800}
                                       
                                    // yAxisLabel={"%"}
                                    // xAxisLabel={"s"}
                                    //yAxisSuffix={"tr/min"}
                                    // withVerticalLabels ={false}
                                    fromZero = {true}
                                    withHorizontalLabels ={false}
                                    showValuesOnTopOfBars ={true}
                                    chartConfig={{
                                        //backgroundColor: "white",
                                        backgroundGradientFrom:'#CECECE',
                                        backgroundGradientTo: '#CECECE',
                                        fillShadowGradient: '#6c0277',
                                        fillShadowGradientOpacity: 1,
                                        decimalPlaces: 2, 
                                        color: (opacity = 0.3) => `#6c0277`,
                                        // labelColor: (opacity = 1) => `rgba(255, 0, 255, ${opacity})`,


                                    }}
                                    style={{margin:6}}
            
                                 />
                                 <Text style={{margin:16,fontSize:20,fontWeight:"bold"}}>Accélération</Text>
                                
                            </View>
                         
                            <View style={styles.histo}>
                                <BarChart

                                    data={{ 
                                        labels: this.state.rapportX,
                                        datasets: [
                                            {
                                            data: this.state.rapport,
                                           
                                            }
                                        ], 
                                        // legend : ["embrayage"],
                                        }}
                                        width={690} // from react-native
                                        height={800}
                                    // yAxisLabel={"tr/min"}
                                    // xAxisLabel={"s"}
                                    //yAxisSuffix={"tr/min"}
                                    fromZero = {true}
                                    withHorizontalLabels ={false}
                                    showValuesOnTopOfBars ={true}
                                    chartConfig={{
                                        //backgroundColor: "white",
                                        backgroundGradientFrom:'#CECECE',
                                        backgroundGradientTo: '#CECECE',
                                        fillShadowGradient: '#003789',
                                        fillShadowGradientOpacity: 1,

                                        decimalPlaces: 2, 
                                        color: (opacity = 0.3) => `#003789`,


                                    }}
                                    style={{margin:6}}
            
                                 />
                                <Text style={{margin:16,fontSize:20,fontWeight:"bold"}}>Rapport Boite de Vitesse</Text>
                            </View>
                           
                            
                          
                            
                            
                    </Swiper> 

                    {(this.state.error && this.state.errorMqtt!=="")?  ( 
                      
                      <TouchableOpacity style={{ backgroundColor:'red',alignItems:"center",width:200,height:60,marginVertical: 20,}} onPress={()=>this.reconnectMqtt()}>
                        <Text style={{color:'#fff',fontWeight:'bold',fontSize:14}}>Appuyez ici pour réessayer</Text>
                        <Text style={{color:'#fff',fontWeight:'bold',fontSize:10,marginTop :10}}>{this.state.errorMqtt}</Text>
                      </TouchableOpacity>
                      
                ):(null)}
                    </View>

                    
            </View>
        )
    }
}

const styles = StyleSheet.create({
    app:{
        flex:1,
        backgroundColor:"white"
    },
    
    headerContainer: {
        height: 80, //80
        flexDirection: 'row',
        // flex: 1.0,
        // justifyContect: 'center',
        backgroundColor: 'black',
    },
    menuButton: {
        // flexDirection: 'row',
        top:20,
        left:180
    
      },
    headerTitle: {
        marginLeft: 90 ,
        alignSelf: 'center',
        color: 'white',
        fontSize:22,
        top:-10
  },
    haut:{
        flex:0,
        justifyContent: 'flex-start',
        },
    Header:{
       
        alignItems: 'center'
       
        },

    container: {
     
        alignItems: 'center'
    },
    bouton:{
        flex:1,
        justifyContent:'space-between',
        alignItems: 'center'

    }
    ,
    label:{
        flex:1,
       alignItems:"center",
       marginHorizontal:20,
       paddingTop :30
       
        
    },
    histo:{
        alignItems:"center",
        

    }
   
  });