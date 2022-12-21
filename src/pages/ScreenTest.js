import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity ,Image, Alert
} from 'react-native';
import {
    Card
   }  from 'react-native-paper'
import { Header,Icon} from 'react-native-elements'
//import Icon from 'react-native-vector-icons/FontAwesome'
import {Actions} from 'react-native-router-flux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logoutTrainer } from '../actions/auth.actions';
import { connect } from 'react-redux';

 export default class ScreenTest extends React.Component {
  
  goGCam() {
    Actions.loginGCam();
}
goNodbox() {
  Actions.loginNodbox();
}
goParcoursRoutier(){
  Actions.loginP();
}


// async componentDidMount(){
  
// }

    render() {
        return (
            <View style={styles.container}>
                 <View style={styles.headerContainer}> 
           <View style={{justifyContent:"center"}}>
           
                  
                  </View>
            </View>
                   <View style={{flexDirection:'row'}}>
                  <Card style={styles.Card1}>
                    <TouchableOpacity style={styles.touch1} onPress={this.goNodbox}>
                        <Text style={{fontSize:16,color:'#fff',fontWeight:'bold'}}>PAS REGARDÉ</Text>
                    </TouchableOpacity>
                  </Card>
                  <Card style={styles.Card2}>
                    <TouchableOpacity style={styles.touch1} onPress={this.goParcoursRoutier}>
                        <Text style={{fontSize:16,color:'#fff',fontWeight:'bold'}}>PAS VU</Text>
                    </TouchableOpacity>
                  </Card>
                </View>
                <View style={{flexDirection:'row'}}>
                  <Card style={styles.Card3}>
                    <TouchableOpacity style={styles.touch1} onPress={this.goGCam}>
                        <Text style={{fontSize:16,color:'#fff',fontWeight:'bold'}}>PAS COMPRIS</Text>
                    </TouchableOpacity>
                  </Card>
                  <Card style={styles.Card4}>
                    <TouchableOpacity style={styles.touch1}>
                        <Text style={{fontSize:16,color:'#fff',fontWeight:'bold'}}>MAUVAISE DECISION</Text>
                    </TouchableOpacity>
                  </Card>
                </View>
                <View style={{flexDirection:'row'}}>
                  <Card style={styles.Card5}>
                    <TouchableOpacity style={styles.touch1}>
                       <Text style={{fontSize:16,color:'#fff',fontWeight:'bold'}}>MAL EXÉCUTÉ</Text>
                    </TouchableOpacity> 
                  </Card>
                  <Card style={styles.Card6}>
                    <TouchableOpacity style={styles.touch1}>
                       <Text style={{fontSize:16,color:'#fff',fontWeight:'bold'}}>NON SIGNALÉ</Text>
                    </TouchableOpacity>   
                  </Card>
                </View>
                <Text style={{top:450,fontSize:20,left:555,color:'#00B0F0',fontStyle:'italic'}}>Powered by CleanData</Text>
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
        width:300,
        height:200,
        top:190,
        left:-20,
        marginLeft:100,
        alignItems:'center',
        //justifyContent:'center',
        borderWidth:2,
        //borderColor:'#00B0F0',
       backgroundColor:'#ADD8E6'
      },
      Card2: {
        width:300,
        height:200,
        top:60,
        //left:100,
        marginLeft:10,
        borderWidth:2,
        //borderColor:'#00B0F0',
        alignItems:'center',
        backgroundColor:'#00008B'
      },
      Card3: {
        width:300,
        height:200,
        top:250,
        left:-20,
        marginLeft:100,
        borderWidth:2,
        //borderColor:'#00B0F0',
        alignItems:'center',
        backgroundColor:'#FFD700'
      },
      Card4: {
        width:300,
        height:200,
        top:120,
        //left:100,
        marginLeft:10,
        borderWidth:2,
        //borderColor:'#00B0F0',
        alignItems:'center',
        backgroundColor:'#FF8C00'
      },
      Card5: {
        width:300,
        height:200,
        left:-20,
        top:320,
        marginLeft:100,
        borderWidth:2,
        //borderColor:'#00B0F0',
        alignItems:'center',
        backgroundColor:'#DEB887'
      },
      Card6: {
        width:300,
        height:200,
        top:190,
        //left:100,
        marginLeft:10,
        borderWidth:2,
        //borderColor:'#00B0F0',
        alignItems:'center',
        backgroundColor:'#EE82EE'
      },
      headerContainer: {
        height: 80, //80
        flexDirection: 'row',
        // flex: 1.0,
        // justifyContect: 'center',
        backgroundColor:'#323232'
        
    },
  });


// export default (ScreenTest)

