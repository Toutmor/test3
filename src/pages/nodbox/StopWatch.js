import React, { Component } from 'react';
 
import { StyleSheet, Text, View, TouchableOpacity, ListView, TouchableHighlight } from 'react-native';


export default class StopWatch extends Component {
    constructor (props){
        super(props)

        this.state={
            // dataSource: ds.cloneWithRows(laps)
            isRunning :false,
            mainTimer : null,
            mainTimerStart: null,
        }
        
    }
 
  _renderTitle(){
      return(
         <View style={styles.header}>
             <Text style={styles.title}>StopWatch</Text>
         </View> 
      )
  }
  _renderTimers(){
    
      if(this.state.mainTimer === null){
          
        return(
            <View style={styles.timerWrapper}>
                <View style={styles.timerWrapperInner}>
                 <Text style={styles.mainTimer}>00:00:00.0</Text>
                </View>
            </View> )


      }else{
    return(
       <View style={styles.timerWrapper}>
           <View style={styles.timerWrapperInner}>
            <Text style={styles.mainTimer}>{this.state.mainTimer.toLocaleTimeString('en-US')}</Text>
           </View>
       </View> 
    )
    }
}

_renderButtons(){
    return(
       <View style={styles.buttonWrapper}>
           
           <TouchableHighlight
           underlayColor='#ddd' 
            onPress={this.handleStartStop.bind(this)} 
           style={styles.button}>
                <Text style={[styles.startBtn, this.state.isRunning && styles.stopBtn]}>{this.state.isRunning? 'Stop' : 'Start'}</Text>
           </TouchableHighlight>
       </View> 
    )
}

handleStartStop(){
    let {isRunning,mainTimer} = this.state;
    if (isRunning) {
        clearInterval(this.interval);
        this.setState({
            isRunning: false
        })
        return;
    }

    this.setState({
        mainTimerStart: new Date(),
        isRunning : true
    })

    this.interval = setInterval(()=>{
        this.setState({
            mainTimer:new Date( new Date() - this.state.mainTimerStart + mainTimer)
        })
    },30)
}

// _renderLaps(){
//     return(
//         <View style={styles.lapsWrapper}>
//             <ListView
//                 enableEmptySections={true}
//                 dataSource={this.state.dataSource}
//                 renderRow={
//                     (rowData)=>(
//                         <View style = {styles.lapRow}>
//                             <Text style={styles.lapNumber}>{rowData.name}</Text>
//                             <Text style={styles.lapTime}>{rowData.value}</Text>
//                         </View>
//                     )
//                 }
//             >

//             </ListView>

//         </View>
//     )
// }

render(){
    return(
        <View style={styles.container}>
            <View style={styles.top}>
                {this._renderTitle()}
                {this._renderTimers()}
            </View>
            <View style= {styles.bottom}>
                {this._renderButtons()}
            </View>

        </View>
    )
}


}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    header:{
        borderBottomWidth: 0.5,
        paddingTop: 20,
        paddingBottom:10,
        backgroundColor: '#F9F9F9'
    },
    title:{
        alignSelf: 'center',
        fontWeight :'600'
    },
    timerWrapper:{
        backgroundColor: '#FFFFFF',
        justifyContent:'center',
        flex:1
    },
    top:{
        flex:1
    },
    bottom:{
        flex:2,
        backgroundColor:'#F0EFF5'
    },
    timerWrapperInner:{
        borderWidth: 0.5,
        alignSelf:'center'
    },
    mainTimer:{
        fontSize:60,
        fontWeight: '100',
        // borderWidth: 0.5,
        alignSelf:'flex-end'
    },
    lapTimer:{
        fontSize:18,
        // borderWidth: 0.5,
        alignSelf:'flex-end'
    },
    buttonWrapper:{
        flexDirection:'row',
        justifyContent: 'space-around',
        paddingTop: 15,
        paddingBottom: 30
    },
    button: {
        height: 80,
        width: 80,
        borderRadius: 40,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    startBtn:{
        color:'#00cc00'
    },
    stopBtn:{
        color: 'red'
    }
})