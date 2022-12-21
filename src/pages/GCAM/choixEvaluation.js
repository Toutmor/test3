import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity ,
  Button,Image
} from 'react-native';
import { Card } from 'react-native-paper';

import {Actions} from 'react-native-router-flux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BackHandler } from 'react-native';

export default class EvaluationGCAM extends React.Component {
    componentDidMount(){
      BackHandler.addEventListener('backPress', () => {return true});
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
                  <Text style={styles.headerTitle}>CAM DATA</Text>
                  </View>
                  <Text style={{color:'#00B0F0',fontSize:16,left:-177, textAlign:'right',fontStyle:"italic",top:45}}>Powered by CleanData</Text>
               
                </View>
                <View style={{top:100,justifyContent:"center",alignItems:"center"}}>
                <Text style={{color:'#00B0F0',fontSize:26,justifyContent:"center",alignItems:"center",fontWeight:"bold"}}>SELECTION MODE</Text>
            </View>
                <View style={{flexDirection:'row',top:250}}>
                  <Card style={styles.Card1}>
                    <TouchableOpacity style={styles.touch1} 
                       onPress={()=>Actions.listeStudentGCAM({
                         stage:this.props.stage,
                         stageName : this.props.stageName,
                         typeF: "initial"
                        })}
                    >
                        <Text style={{fontSize:16,color:'#fff',fontWeight:'bold'}}>EVALUATION</Text>
                        <Text style={{fontSize:16,color:'#fff',fontWeight:'bold'}}>PRIMAIRE</Text>
                    </TouchableOpacity>
                  </Card>
                  
                  <Card style={styles.Card2}>
                    <TouchableOpacity style={styles.touch1}
                      onPress={()=>Actions.listeStudentGCAM({
                        stage:this.props.stage,
                        stageName : this.props.stageName,
                        typeF: "finale"
                       })}
                    >
                        <Text style={{fontSize:16,color:'#fff',fontWeight:'bold'}}>EVALUATION</Text>
                        <Text style={{fontSize:16,color:'#fff',fontWeight:'bold'}}>FINALE</Text>
                        
                    </TouchableOpacity>
                  </Card>
                </View>
                <View style={{flexDirection:'row',top:270}}>
                  <Card style={styles.Card3}>
                    <TouchableOpacity style={styles.touch1}
                    onPress={()=>Actions.listeStudentGCAM({
                      stage:this.props.stage,
                      stageName : this.props.stageName,
                      typeF:"simultane"
                     })}
                    >
                    <Text style={{fontSize:16,color:'#fff',fontWeight:'bold'}}>EVALUATIONS</Text>
                        <Text style={{fontSize:16,color:'#fff',fontWeight:'bold'}}>PRIMAIRE ET</Text>
                        
                        <Text style={{fontSize:16,color:'#fff',fontWeight:'bold'}}>FINALE</Text>
                        <Text style={{fontSize:16,color:'#fff',fontWeight:'bold'}}>SIMULTANEES</Text>
                        
                    </TouchableOpacity>
                  </Card>
                  
                  <Card style={styles.Card4}>
                    <TouchableOpacity style={styles.touch1}
                    onPress={()=>Actions.listeStudentGCAM({
                      stage:this.props.stage,
                      stageName : this.props.stageName,
                      typeF: "sans_evaluation"
                     })}
                    >
                        <Text style={{fontSize:16,color:'#fff',fontWeight:'bold'}}>SANS</Text>
                        <Text style={{fontSize:16,color:'#fff',fontWeight:'bold'}}>EVALUATION</Text>
                    </TouchableOpacity>
                  </Card>
                  
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
    touch1:{
        width:250,
        height:250,
        alignContent:'center',
        justifyContent:'center',
        alignItems:'center'
      },
      Card1: {
        width:250,
        height:250,
        //top:200,
        marginLeft:140,
        alignItems:'center',
        //justifyContent:'center',
        borderWidth:2,
        borderColor:'#00B0F0',
       backgroundColor:'#191919'
      },
      Card2: {
        width:250,
        height:250,
        //top:200,
        marginLeft:50,
        borderWidth:2,
        borderColor:'#00B0F0',
        alignItems:'center',
        backgroundColor:'#191919'
      },
      Card3: {
        width:250,
        height:250,
        top:10,
        marginLeft:140,
        borderWidth:2,
        borderColor:'#00B0F0',
        alignItems:'center',
        backgroundColor:'#191919'
      },
      Card4: {
        width:250,
        height:250,
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
     
      button: {
        width:300,
        backgroundColor:'#1c313a',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 13,
        top:220
      },
      buttonText: {
        fontSize:16,
        fontWeight:'500',
        color:'#ffffff',
        textAlign:'center'
      },
      headerContainer: {
        height: 80, //80
        flexDirection: 'row',
        // flex: 1.0,
        // justifyContect: 'center',
        backgroundColor:'#323232'
        //top:24
    },
  });
