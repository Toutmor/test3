import React, {Component} from 'react'
import { View, StyleSheet, ScrollView,Dimensions,Text, TouchableOpacity, Image} from 'react-native'

import { Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Swiper from 'react-native-swiper';
import { Actions } from 'react-native-router-flux';

export class HistoParcours2 extends Component{
    constructor(props){
        super(props)
            this.state={
                rmoteurDChart: this.props.stats2.rMoteur,
                rmoteurTChart : this.props.stats2.rMoteurT,
                cmoteurDChart : this.props.stats2.cMoteur,
                cmoteurTChart : this.props.stats2.cMoteurT,
                vitesseDChart : this.props.stats2.vitesseChart,
                vitesseTChart : this.props.stats2.vitesseTChart,
                consDChart : this.props.stats2.consChart,
                consTChart : this.props.stats2.consTChart,
                accChart: this.props.stats2.accChart,
                accTChart: this.props.stats2.accTChart,
                freinChart: this.props.stats2.freinChart,
                freinTchart: this.props.stats2.freinTchart,
                embChart : this.props.stats2.embChart,
                embTChart : this.props.stats2.embTChart,
                rapportChart: this.props.stats2.rapportChart,
                rapportTChart: this.props.stats2.rapportTChart,
                fuel_consChart: this.props.stats2.fuel_consChart,
                fuel_consTChart: this.props.stats2.fuel_consTChart,
            }
        }
    
    render() {
        return (
          
            <View style ={styles.app} >
                 <View style={styles.headerContainer}>
                  <View style={styles.menuButton}>
                      <TouchableOpacity>
                      <Icon
                        name='arrow-right'
                        color='#b20000'
                        size= {36}
                        onPress={()=>Actions.pop()}
                      />
                      </TouchableOpacity>
                      
                  </View>
                  <View style={{top:7,}}>
                  <View style={{justifyContent:"space-around",alignItems:"center",flexDirection:"row"}}>
                  <Image
                    style={{resizeMode:'stretch', width:90, height:20, marginRight:5}}
                    source= {require("../../../images/CJ-JPB-new.png")}
               />
                  <Text style={styles.headerTitle}>ECO-CONDUITE</Text>
                 
                  </View>
                  <Text style={{color:'#00B0F0',fontSize:10,marginRight:-5, textAlign:'right',fontStyle:"italic"}}>Powered By CleanData</Text>
                  </View>
                  </View>     
                        
                        <View style={styles.label} > 
                        <Swiper showsButtons={true}>
                                
                                <View style={styles.histo}> 
                                
                                    <BarChart
    
                                        data={{ 
                                            labels: this.state.rmoteurTChart,
                                            datasets: [
                                                {
                                                data: this.state.rmoteurDChart,
                                                
                                                }
                                            ], legend : ["regime Moteur"]
                                            }}
                                            
                                        width={Dimensions.get("window").width} // from react-native
                                        height={700}
                                        yAxisLabel={"tr/min"}
                                        xAxisLabel={"s"}
                                        //yAxisSuffix={"tr/min"}
                                        chartConfig={{
                                            //backgroundColor: "white",
                                            backgroundGradientFrom:'#CECECE',
                                            backgroundGradientTo: 'grey',
    
                                            decimalPlaces: 2, 
                                           color: (opacity = 0.3) => `#e43137`,
                                            // labelColor: (opacity = 1) => `rgba(255, 0, 255, ${opacity})`,
    
    
                                        }}
                                        // style={{margin:6}}
                
                                     />
                                     <Text >Regime Moteur</Text>
                                    
                                </View>
                                <View  style={styles.histo}>
                                    <BarChart
    
                                        data={{ 
                                            labels: this.state.cmoteurTChart,
                                            datasets: [
                                                {
                                                data: this.state.cmoteurDChart
                                                }
                                            ],
                                            legend : ["couple Moteur"]
                                            }}
                                        width={Dimensions.get("window").width} // from react-native
                                        height={700}
                                        yAxisLabel={"tr/min"}
                                        xAxisLabel={"s"}
                                        //yAxisSuffix={"tr/min"}
                                        chartConfig={{
                                            //backgroundColor: "white",
                                            backgroundGradientFrom:'#CECECE',
                                            backgroundGradientTo: 'grey',
    
                                            decimalPlaces: 2, 
                                            color: (opacity = 0.7) => `#003789`,
                                            // labelColor: (opacity = 1) => `rgba(255, 0, 255, ${opacity})`,
    
    
                                        }}
                                        // style={{margin:6}}
                                        
                
                                     />
                                     <Text >Couple Moteur</Text>
                                    
                                </View>
                                <View  style={styles.histo}>
                                    <BarChart
    
                                        data={{ 
                                            labels: this.state.vitesseTChart,
                                            datasets: [
                                                {
                                                data: this.state.vitesseDChart
                                                }
                                            ], legend : ["Vitesse"]
                                            }}
                                        width={Dimensions.get("window").width} // from react-native
                                        height={700}
                                        yAxisLabel={"tr/min"}
                                        xAxisLabel={"s"}
                                        //yAxisSuffix={"tr/min"}
                                        chartConfig={{
                                            //backgroundColor: "white",
                                            backgroundGradientFrom:'#CECECE',
                                            backgroundGradientTo: 'grey',
    
                                            decimalPlaces: 2, 
                                            color: (opacity = 0.7) => '#00B0F0',
                                            // labelColor: (opacity = 1) => `rgba(255, 0, 255, ${opacity})`,
    
    
                                        }}
                                        // style={{margin:6}}
                
                                     />
                                     <Text>Vitesse</Text>
                                    
                                </View>
                                <View style={styles.histo}>
                                    <BarChart
    
                                        data={{ 
                                            labels: this.state.accTChart,
                                            datasets: [
                                                {
                                                data: this.state.accChart,
                                                
                                                }
                                            ], legend : ["acc"]
                                            }}
                                        width={Dimensions.get("window").width} // from react-native
                                        height={700}
                                        yAxisLabel={"tr/min"}
                                        xAxisLabel={"s"}
                                        //yAxisSuffix={"tr/min"}
                                        chartConfig={{
                                            //backgroundColor: "white",
                                            backgroundGradientFrom:'#CECECE',
                                            backgroundGradientTo: 'grey',
    
                                            decimalPlaces: 2, 
                                            color: (opacity = 0.3) => `white`,
                                            // labelColor: (opacity = 1) => `rgba(255, 0, 255, ${opacity})`,
    
    
                                        }}
                                        style={{margin:6}}
                
                                     />
                                     <Text>Accélération</Text>
                                    
                                </View>
                                <View style={styles.histo}>
                                    <BarChart
    
                                        data={{ 
                                            labels: this.state.embTChart,
                                            datasets: [
                                                {
                                                data: this.state.embChart,
                                               
                                                }
                                            ], 
                                            legend : ["embrayage"],
                                            }}
                                        width={Dimensions.get("window").width} // from react-native
                                        height={700}
                                        yAxisLabel={"tr/min"}
                                        xAxisLabel={"s"}
                                        //yAxisSuffix={"tr/min"}
                                        chartConfig={{
                                            //backgroundColor: "white",
                                            backgroundGradientFrom:'#CECECE',
                                            backgroundGradientTo: 'grey',
    
                                            decimalPlaces: 2, 
                                            color: (opacity = 0.3) => `#e43137`,
                                            // color: (opacity = 1) => `rgba(255,255,255, ${opacity})`,
                                            // labelColor: (opacity = 1) => `rgba(255, 0, 255, ${opacity})`,
    
    
                                        }}
                                        style={{margin:6}}
                
                                     />
                                    <Text>embrayage</Text>
                                </View>
                                {/* <View style={styles.histo}>
                                    <BarChart
    
                                        data={{ 
                                            labels: this.state.accChart,
                                            datasets: [
                                                {
                                                data: this.state.accTChart,
                                                
                                                }
                                            ], legend : ["acc"]
                                            }}
                                        width={Dimensions.get("window").width} // from react-native
                                        height={700}
                                        yAxisLabel={"tr/min"}
                                        xAxisLabel={"s"}
                                        //yAxisSuffix={"tr/min"}
                                        chartConfig={{
                                            backgroundGradientFrom:'#CECECE',
                                            backgroundGradientTo: 'grey',
    
                                            decimalPlaces: 2, 
                                            color: (opacity = 0.7) => `#003789`,
                                            // labelColor: (opacity = 1) => `rgba(255, 0, 255, ${opacity})`,
    
    
                                        }}
                                        style={{margin:6}}
                
                                     />
                                     <Text>Accélération</Text>
                                    
                                </View> */}
                                <View style={styles.histo}>
                                    <BarChart
    
                                        data={{ 
                                            labels: this.state.freinTchart,
                                            datasets: [
                                                {
                                                data: this.state.freinChart,
                                               
                                                }
                                            ], 
                                            legend : ["Frein"],
                                            }}
                                        width={Dimensions.get("window").width} // from react-native
                                        height={700}
                                        yAxisLabel={"tr/min"}
                                        xAxisLabel={"s"}
                                        //yAxisSuffix={"tr/min"}
                                        chartConfig={{
                                            //backgroundColor: "white",
                                            backgroundGradientFrom:'#CECECE',
                                            backgroundGradientTo: 'grey',
    
                                            decimalPlaces: 2, 
                                            color: (opacity = 0.7) => '#00B0F0'
    
    
                                        }}
                                        style={{margin:6}}
                
                                     />
                                    <Text>frein</Text>
                                </View>
                                {/* <View style={styles.histo}>
                                    <BarChart
    
                                        data={{ 
                                            labels: this.state.accChart,
                                            datasets: [
                                                {
                                                data: this.state.accTChart,
                                                
                                                }
                                            ], legend : ["acc"]
                                            }}
                                        width={Dimensions.get("window").width} // from react-native
                                        height={700}
                                        yAxisLabel={"tr/min"}
                                        xAxisLabel={"s"}
                                        //yAxisSuffix={"tr/min"}
                                        chartConfig={{
                                            //backgroundColor: "white",
                                            backgroundGradientFrom:'grey',
    
                                            decimalPlaces: 2, 
                                            color: (opacity = 1) => `rgba(255,255,255, ${opacity})`,
                                            labelColor: (opacity = 1) => `rgba(255, 0, 255, ${opacity})`,
    
    
                                        }}
                                        style={{margin:6}}
                
                                     />
                                     <Text>Accélération</Text>
                                    
                                </View> */}
                                <View style={styles.histo}>
                                    <BarChart
    
                                        data={{ 
                                            labels: this.state.rapportTChart,
                                            datasets: [
                                                {
                                                data: this.state.rapportChart,
                                               
                                                }
                                            ], 
                                            // legend : ["embrayage"],
                                            }}
                                        width={Dimensions.get("window").width} // from react-native
                                        height={700}
                                        yAxisLabel={"tr/min"}
                                        xAxisLabel={"s"}
                                        //yAxisSuffix={"tr/min"}
                                        chartConfig={{
                                            //backgroundColor: "white",
                                            backgroundGradientFrom:'#CECECE',
                                            backgroundGradientTo: 'grey',
    
                                            decimalPlaces: 2, 
                                            color: (opacity = 0.3) => `white`,
    
    
                                        }}
                                        style={{margin:6}}
                
                                     />
                                    <Text>rapport</Text>
                                </View>
                                {/* <View style={styles.histo}>
                                    <BarChart
    
                                        data={{ 
                                            labels: this.state.accChart,
                                            datasets: [
                                                {
                                                data: this.state.accTChart,
                                                
                                                }
                                            ], legend : ["acc"]
                                            }}
                                        width={Dimensions.get("window").width} // from react-native
                                        height={700}
                                        yAxisLabel={"tr/min"}
                                        xAxisLabel={"s"}
                                        //yAxisSuffix={"tr/min"}
                                        chartConfig={{
                                            //backgroundColor: "white",
                                            backgroundGradientFrom:'grey',
    
                                            decimalPlaces: 2, 
                                            color: (opacity = 1) => `rgba(255,255,255, ${opacity})`,
                                            labelColor: (opacity = 1) => `rgba(255, 0, 255, ${opacity})`,
    
    
                                        }}
                                        style={{margin:6}}
                
                                     />
                                     <Text>Accélération</Text>
                                    
                                </View> */}
                                <View style={styles.histo}>
                                    <BarChart
    
                                        data={{ 
                                            labels: this.state.fuel_consTChart,
                                            datasets: [
                                                {
                                                data: this.state.fuel_consChart,
                                               
                                                }
                                            ], 
                                            // legend : ["embrayage"],
                                            }}
                                        width={Dimensions.get("window").width} // from react-native
                                        height={700}
                                        yAxisLabel={"tr/min"}
                                        xAxisLabel={"s"}
                                        //yAxisSuffix={"tr/min"}
                                        chartConfig={{
                                            backgroundGradientFrom:'#CECECE',
                                            backgroundGradientTo: 'grey',
    
                                            decimalPlaces: 2, 
                                            color: (opacity = 0.3) => `#e43137`
    
    
                                        }}
                                        style={{margin:6}}
                
                                     />
                                    <Text>fuel cons</Text>
                                </View>
                                {/* <View style={styles.histo}>
                                    <BarChart
    
                                        data={{ 
                                            labels: this.state.accChart,
                                            datasets: [
                                                {
                                                data: this.state.accTChart,
                                                
                                                }
                                            ], legend : ["acc"]
                                            }}
                                        width={Dimensions.get("window").width} // from react-native
                                        height={700}
                                        yAxisLabel={"tr/min"}
                                        xAxisLabel={"s"}
                                        //yAxisSuffix={"tr/min"}
                                        chartConfig={{
                                            //backgroundColor: "white",
                                            backgroundGradientFrom:'#CECECE',
                                            backgroundGradientTo: 'grey',
    
                                            decimalPlaces: 2, 
                                            color: (opacity = 0.7) => `#003789`
    
    
                                        }}
                                        style={{margin:6}}
                
                                     />
                                     <Text>Accélération</Text>
                                    
                                </View> */}
                                <View style={styles.histo}>
                                    <BarChart
    
                                        data={{ 
                                            labels: this.state.consTChart,
                                            datasets: [
                                                {
                                                data: this.state.consDChart,
                                               
                                                }
                                            ], 
                                            // legend : ["embrayage"],
                                            }}
                                        width={Dimensions.get("window").width} // from react-native
                                        height={700}
                                        yAxisLabel={"tr/min"}
                                        xAxisLabel={"s"}
                                        //yAxisSuffix={"tr/min"}
                                        chartConfig={{
                                            backgroundGradientFrom:'#CECECE',
                                            backgroundGradientTo: 'grey',
    
                                            decimalPlaces: 2, 
                                            color: (opacity = 0.7) => '#00B0F0',
    
    
                                        }}
                                        style={{margin:6}}
                
                                     />
                                    <Text>Consommation</Text>
                                </View>
                                
                        </Swiper> 
                    
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
       marginHorizontal:8,
       paddingTop :10
       
        
    },
    histo:{
        alignItems:"center",
        

    },
    
      headerContainer: {
        height: 60, //80
        flexDirection: 'row',
        // flex: 1.0,
        // justifyContect: 'center',
        backgroundColor: 'black',
    },
    headerTitle: {
      // flex: 1.0,
      // marginLeft: 8,
      // marginRight: 8,
    //  right: 300,
      alignSelf: 'center',
      color: 'white',
      fontSize:24
  },
  menuButton: {
    // flexDirection: 'row',
    
    left: 750,
    alignSelf: 'center',
     
    tintColor: 'white'
  },
   
  });