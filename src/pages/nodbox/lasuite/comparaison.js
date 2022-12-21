import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { Icon } from 'react-native-elements';

import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'react-native';


export default class Comparaison extends React.Component {
    constructor(){
    super()
    this.state={
            // asyncId:this.props.asyncId,
        	//infos trainer
			trainer_id:"",
			trainer_first_name:"",
			trainer_last_name:"",
			//infos student
			student_id:"",
			student_first_name:"",
			student_last_name:"",
			student_email:"",
            p1: [],
            p2:[],
            message:""
    }
    // this.video = Video
			// this.getInfo = this.getInfo.bind(this)
			// // this.saveData = this.saveData.bind(this)
			// this.getInfo()
    }

    // getPInitiale(){
    //     try {
    //         const url='https://api.cleandata.link/api/formation/nodbox/initial/'
    //         console.log(url+this.state.trainer_id+'/'+this.state.student_email);
    //         axios.get(url+this.state.trainer_id+'/'+this.state.student_email)
           
    //             .then((response)=> {
    //                 console.log("yess");
    //                 console.log(response.data);
    //                 this.setState({p1:response.data})
    //             })
    //             .catch((error)=> console.log(error)) 
    //     } catch (error) {
    //         console.log(error);
    //     }
       
    // }
    async getPInitiale(){
        if (this.props.typeF ==="finale") {
            try {
                // let post_data = await AsyncStorage.getItem('post_data')
                // let json_post_data= JSON.parse("["+post_data+"]")
                // this.setState({p1 : json_post_data}) 
                
                let initialData = await AsyncStorage.getItem('nb_initial'+this.props.asyncId.toString())
                console.log(initialData);
                if (initialData === null) {
                    const url='https://api.cleandata.link/api/formation/nodbox/initial/'
                    console.log(url+this.state.trainer_id+'/'+this.state.student_email);
                    axios.get(url+this.state.trainer_id+'/'+this.state.student_email)
                   
                        .then((response)=> {
                            console.log("yess");
                            console.log(response);
                            if (response.data.status === "failed" ) {
                                this.setState({p1:[], message : response.data.message+" pour l'"+"évaluation initiale"}) 
                            } else {
                                this.setState({p1:response.data}) 
                            }
                           
                        })
                        .catch((error)=> console.log(error)) 
        
                        
                    //alert("post_VALUE_SAVED" + post_data)
                
                }
                
           
        else{
            //let post_data = await AsyncStorage.getItem('post_data')
                //alert("post_VALUE_SAVED" + post_data)
            let json_post_data= JSON.parse(initialData)
            console.log(json_post_data.stats);
            this.setState({p1 : json_post_data.stats}) 
            // this.setState({conso1:json_post_data[0].mean_fuel_consumption.toFixed(2)})
            // this.setState({conso2:0})
        }
    } catch (error) {
        console.log(error);
    }
       
    }}
    async getInfo(){
        // this.setState({asyncId: this.props.asyncId})
        try {
            let str_stdId = await AsyncStorage.getItem('@nb_student_id'+this.props.asyncId.toString())
            let str_trId= await AsyncStorage.getItem('@trainer_id')
    
            let str_std_fname =await AsyncStorage.getItem('@nb_student_first_name'+this.props.asyncId.toString())
            let str_std_lname= await AsyncStorage.getItem('@nb_student_last_name'+this.props.asyncId.toString())
    
            let str_trfname=await AsyncStorage.getItem('@trainer_first_name')
            let str_trlname = await AsyncStorage.getItem('@trainer_last_name')
    
            // let str_signstd=await AsyncStorage.getItem('@sign1')
            // let str_signtr = await AsyncStorage.getItem('@sign2')
    
            let str_heure = await AsyncStorage.getItem('@heure')  
            let str_heureF = await AsyncStorage.getItem('@heurefin') 
        
    
            let str_email = await AsyncStorage.getItem('@nb_student_email'+this.props.asyncId.toString())  
            // console.warn(str_heureF);
            // console.log(str_std_fname);
            // console.log(str_trfname);
            // console.warn(str_email);
            this.setState({
                trainer_id : str_trId,
                trainer_first_name : str_trfname,
                trainer_last_name : str_trlname,
    
                student_id : str_stdId,
                student_first_name : str_std_fname,
                student_last_name : str_std_lname,
    
                heureDebut : str_heure,
                heureFin : str_heureF,
            
        
                student_email : str_email,
               
            })
            // console.log(typeof this.state.trainer_id);
            // console.log(parseInt(this.state.trainer_id,10) +1);
    
        } catch (error) {
            console.log(error);
        }
    }
    async getInfoP2(){
        let post_data = await AsyncStorage.getItem('post_data')
            //alert("post_VALUE_SAVED" + post_data)
            if (post_data !== null) {
                let json_post_data= JSON.parse("["+post_data+"]")
                this.setState({p2 : json_post_data})
            }
       
    }

    componentDidMount(){
     
       this.getInfo()
        setTimeout(() => {
            this.getPInitiale()
            this.getInfoP2()
        }, 2000)
    }
    
    render() {
        // console.log(this.props.parcours1);
        // console.log(this.props.parcours2);
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
                    <View style={{flexDirection:"column",left:-60 }}>
					{/* <Text style={{color:'#fff',fontSize:20,top:5,left:-30}}>Synthèse</Text> */}
                        <Text style={{color:'#fff',fontSize:20,top: 15,left:-70}}>{this.state.student_first_name} {this.state.student_last_name}</Text>
                        <Text style={{color:'#00B0F0',fontSize:14,top:17,left:-70}}>{this.state.heureDebut}</Text>
                    </View>
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
             
                
                <View style={styles.label}>
                    <Text style={{fontWeight:"bold",alignSelf:"center",fontSize:22,color:'#00B0F0'}}>COMPARAISON</Text>
                    <View style={{flexDirection: "row",flexDirection:"row", marginTop:20}}>

                        <View style ={{flexDirection: "column", borderWidth: 1,borderColor:'#00B0F0',}}>
                            <View style ={{borderWidth: 1,borderColor:'#00B0F0',width:200,
                            height:75,alignContent:"center",justifyContent:"center", alignItems:"center"}}>
                                <Text>TEST</Text>
                            </View>
                            <View style ={{borderWidth: 1,borderColor:'#00B0F0',width:200,
                            height:75,alignContent:"center",justifyContent:"center", alignItems:"center"}}>
                                <Text >DISTANCE</Text>
                            </View>
                            <View style ={{borderWidth: 1,borderColor:'#00B0F0',width:200,
                            height:75,alignContent:"center",justifyContent:"center", alignItems:"center"}}>
                                <Text>DUREE</Text>
                            </View>
                            <View style ={{borderWidth: 1,borderColor:'#00B0F0',width:200,
                            height:75,alignContent:"center",justifyContent:"center", alignItems:"center"}}>
                                <Text >VITESSE MOYENNE</Text>
                            </View>
                            <View style ={{borderWidth: 1,borderColor:'#00B0F0',width:200,
                            height:75,alignContent:"center",justifyContent:"center", alignItems:"center"}}>
                                <Text >VITESSE MAXIMALE</Text>
                            </View>
                            <View style ={{borderWidth: 1,borderColor:'#00B0F0',width:200,
                            height:75,alignContent:"center",justifyContent:"center", alignItems:"center"}}>
                                <Text >REGIME MOYEN</Text>
                            </View>
                            <View style ={{borderWidth: 1,borderColor:'#00B0F0',width:200,
                            height:75,alignContent:"center",justifyContent:"center", alignItems:"center"}}>
                                <Text >REGIME MAXIMAL</Text>
                            </View>
                            <View style ={{borderWidth: 1,borderColor:'#00B0F0',width:200,
                            height:75,alignContent:"center",justifyContent:"center", alignItems:"center",alignItems:"center"}}>
                                <Text >CONSOMMATION</Text>
                                <Text >MOYENNE</Text>
                            </View>
                            <View style ={{borderWidth: 1,borderColor:'#00B0F0',width:200,
                            height:75,alignContent:"center",justifyContent:"center", alignItems:"center"}}>
                                <Text >REJET CO2</Text>
                            </View>
                            <View style ={{borderWidth: 1,borderColor:'#00B0F0',width:200,
                            height:75,alignContent:"center",justifyContent:"center", alignItems:"center"}}>
                                <Text >DISTANCE SUR L'ELAN</Text>
                            </View>
                            <View style ={{borderWidth: 1,borderColor:'#00B0F0',width:200,
                            height:75,alignContent:"center",justifyContent:"center", alignItems:"center"}}>
                                <Text >TEMPS A L'ARRET</Text>
                            </View>
                            
                        </View>
                        {this.state.p1.length !== 0?(
                        <View style ={{flexDirection: "column",borderWidth: 1,borderColor:'#00B0F0'}}>
                            <View style ={{borderWidth: 1,borderColor:'#00B0F0',width:200,
                            height:75,alignContent:"center",justifyContent:"center", alignItems:"center"}}>
                                <Text>PRIMAIRE</Text>
                            </View>
                            <View style ={{borderWidth: 1,borderColor:'#00B0F0',width:200,
                            height:75,alignContent:"center",justifyContent:"center", alignItems:"center"}}>
                                <Text>{this.state.p1.distance_travelled.toFixed(2)}</Text>
                            </View>
                            <View style ={{borderWidth: 1,borderColor:'#00B0F0',width:200,
                            height:75,alignContent:"center",justifyContent:"center", alignItems:"center"}}>
                                <Text >{this.state.p1.travel_time}</Text>
                            </View>
                            <View style ={{borderWidth: 1,borderColor:'#00B0F0',width:200,
                            height:75,alignContent:"center",justifyContent:"center", alignItems:"center"}}>
                                <Text>{this.state.p1.avg_vehicle_speed.toFixed(2)}</Text>
                            </View>
                            <View style ={{borderWidth: 1,borderColor:'#00B0F0',width:200,
                            height:75,alignContent:"center",justifyContent:"center", alignItems:"center"}}>
                                <Text >{this.state.p1.max_vehicle_speed.toFixed(2)}</Text>
                            </View>
                            <View style ={{borderWidth: 1,borderColor:'#00B0F0',width:200,
                            height:75,alignContent:"center",justifyContent:"center", alignItems:"center"}}>
                                <Text >{this.state.p1.avg_engine_speed.toFixed(2)}</Text>
                            </View>
                            <View style ={{borderWidth: 1,borderColor:'#00B0F0',width:200,
                            height:75,alignContent:"center",justifyContent:"center", alignItems:"center"}}>
                                <Text >{this.state.p1.max_engine_speed.toFixed(2)}</Text>
                            </View>
                            <View style ={{borderWidth: 1,borderColor:'#00B0F0',width:200,
                            height:75,alignContent:"center",justifyContent:"center",alignItems:"center"}}>
                                <Text>{this.state.p1.mean_fuel_consumption.toFixed(2)}</Text>
                            </View>
                            <View style ={{borderWidth: 1,borderColor:'#00B0F0',width:200,
                            height:75,alignContent:"center",justifyContent:"center", alignItems:"center"}}>
                                <Text>{this.state.p1.total_co2_rejection.toFixed(2)}</Text>
                            </View>
                            <View style ={{borderWidth: 1,borderColor:'#00B0F0',width:200,
                            height:75,alignContent:"center",justifyContent:"center", alignItems:"center"}}>
                                <Text >{this.state.p1.tip_out_distance}</Text>
                            </View>
                            <View style ={{borderWidth: 1,borderColor:'#00B0F0',width:200,
                            height:75,alignContent:"center",justifyContent:"center", alignItems:"center"}}>
                                <Text>{this.state.p1.waiting_time}</Text>
                            </View>
                            
                        </View>
                        ):(
                            <View style ={{flexDirection: "column", borderWidth: 1,borderColor:'#00B0F0',}}>
                            <View style ={{borderWidth: 1,borderColor:'#00B0F0',width:200,
                            height:75,alignContent:"center",justifyContent:"center", alignItems:"center"}}>
                                <Text>PRIMAIRE</Text>
                            </View> 
                            </View> 
                        )}
                        {this.state.p2.length !== 0 ? (
                        <View style ={{flexDirection: "column",borderWidth: 1,borderColor:'#00B0F0',}}>
                            <View style ={{borderWidth: 1,borderColor:'#00B0F0',width:200,
                            height:75,alignContent:"center",justifyContent:"center", alignItems:"center"}}>
                                <Text >FINAL</Text>
                            </View>
                            
                                <View style ={{borderWidth: 1,borderColor:'#00B0F0',width:200,
                            height:75,alignContent:"center",justifyContent:"center", alignItems:"center"}}>
                                    <Text >{this.state.p2[0].distance_travelled.toFixed(2)}</Text>
                                </View>
                                <View style ={{borderWidth: 1,borderColor:'#00B0F0',width:200,
                            height:75,alignContent:"center",justifyContent:"center", alignItems:"center"}}>
                                    <Text >{this.state.p2[0].travel_time}</Text>
                                </View>
                                <View style ={{borderWidth: 1,borderColor:'#00B0F0',width:200,
                            height:75,alignContent:"center",justifyContent:"center", alignItems:"center"}}>
                                    <Text>{this.state.p2[0].avg_vehicle_speed.toFixed(2)}</Text>
                                </View>
                                <View style ={{borderWidth: 1,borderColor:'#00B0F0',width:200,
                            height:75,alignContent:"center",justifyContent:"center", alignItems:"center"}}>
                                    <Text>{this.state.p2[0].max_vehicle_speed.toFixed(2)}</Text>
                                </View>
                                <View style ={{borderWidth: 1,borderColor:'#00B0F0',width:200,
                            height:75,alignContent:"center",justifyContent:"center", alignItems:"center"}}>
                                    <Text>{this.state.p2[0].avg_engine_speed.toFixed(2)}</Text>
                                </View>
                                <View style ={{borderWidth: 1,borderColor:'#00B0F0',width:200,
                            height:75,alignContent:"center",justifyContent:"center", alignItems:"center"}}>
                                    <Text>{this.state.p2[0].max_engine_speed.toFixed(2)}</Text>
                                </View>
                                <View style ={{borderWidth: 1,borderColor:'#00B0F0',width:200,
                            height:75,alignContent:"center",justifyContent:"center", alignItems:"center"}}>
                                    <Text>{this.state.p2[0].mean_fuel_consumption.toFixed(2)}</Text>
                                </View>
                                <View style ={{borderWidth: 1,borderColor:'#00B0F0',width:200,
                            height:75,alignContent:"center",justifyContent:"center", alignItems:"center"}}>
                                    <Text>{this.state.p2[0].total_co2_rejection.toFixed(2)}</Text>
                                </View>
                                <View style ={{borderWidth: 1,borderColor:'#00B0F0',width:200,
                            height:75,alignContent:"center",justifyContent:"center", alignItems:"center"}}>
                                    <Text >{this.state.p2[0].tip_out_distance}</Text>
                                </View>
                                <View style ={{borderWidth: 1,borderColor:'#00B0F0',width:200,
                            height:75,alignContent:"center",justifyContent:"center", alignItems:"center"}}>
                                    <Text>{this.state.p2[0].waiting_time}</Text>
                                </View>
                              
                        </View>
                        ):(
                            <View style ={{flexDirection: "column", borderWidth: 1,borderColor:'#00B0F0'}}>
                            <View style ={{width:200, borderWidth: 1,borderColor:'#00B0F0',
                            height:75,alignContent:"center",justifyContent:"center", alignItems:"center"}}>
                                <Text >FINAL</Text>
                            </View>
                            </View>
                        )}
                            
                    </View>
                    <Text  style={{fontSize:12,textAlign:"center",color:"red",marginTop:10}}>{this.state.message}</Text>
                </View>
               

                        
              
           
       
       

            </View>
           
           
           )
        }
}

const styles = StyleSheet.create({
    app:{
       flex: 1,
        backgroundColor:"white"
    },
    haut:{
        flex:0,
        justifyContent: 'flex-start',
        },
    Header:{
       
        alignItems: 'center'
       
        },
        
      headerContainer: {
        height: 80, //80
        flexDirection: 'row',
        // flex: 1.0,
        // justifyContect: 'center',
        backgroundColor: 'black',
    },
    headerTitle: {
        marginLeft: 90 ,
        alignSelf: 'center',
        color: 'white',
        fontSize:22,
        top:-10
  },
  menuButton: {
    // flexDirection: 'row',
    
    top:20,
     
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
        top:-50,
        
        alignContent:"center",
        justifyContent:"center",
        alignItems:"center"

    }
   
  });
