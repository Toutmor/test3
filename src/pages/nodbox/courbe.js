import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Dimensions,
  ScrollView
} from 'react-native';
import { Header,Icon} from 'react-native-elements'

import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";
 
  const screenWidth = Dimensions.get("window").width;  

export default class HomeScreen extends React.Component {
    render() {
        return (
            <View style ={styles.app} >
                <ScrollView>
                <View style ={styles.haut}>
                    <View style ={styles.Header}>
                        <Header
                            backgroundColor='#396B9E'
                            rightComponent={
                                <View >
                                    <Icon
                                        name='settings'
                                        color='white'
                                        size= {36}
                                       
                                    />
                                </View>
                            }    
                        />
                    </View>
                   

                   
       
                    <View style={styles.container}>

                        <LineChart
                            data={{
                            labels: ["January", "February", "March", "April", "May", "June"],
                            datasets: [
                                {
                                data: [
                               
                                   10,20,30,40,50,60
                                ]
                                }
                            ]
                            }}
                            width={Dimensions.get("window").width} // from react-native
                            height={500}
                            yAxisLabel={"$"}
                            yAxisSuffix={"k"}
                            chartConfig={{
                                backgroundColor: "white",
                                backgroundGradientFrom: "grey",
                                // backgroundGradientTo: "blue",
                                decimalPlaces: 2, // optional, defaults to 2dp
                                color: (opacity = 1) => `rgba(255,255,255, ${opacity})`,
                                // labelColor: (opacity = 1) => `rgba(255, 0, 255, ${opacity})`,
                               
                                propsForDots: {
                                    r: "5",
                                    strokeWidth: "2",
                                    stroke: "#ffa726"
                                },
                               
                            }}
                            bezier
                            withInnerLines = {false}
                            withShadow = {false}
                            withOuterLines = {false}
                           
                       
                            style={{marginVertical: 8,marginRight:16,marginLeft:16}}
                        />

                    </View>
                </View>
               
                <View style={styles.bouton}>
                    <View style={{flexDirection:"row",marginHorizontal:100, marginVertical:35
                }}>
                        <View style={{marginHorizontal:10}}>
                            <Button title="Start" color="#841584"/>
                        </View>
                        <View style={{marginHorizontal:100}}>  
                            <Button title="Stop" color="#841584"/>
                        </View>
                       
                       
                    </View>

                </View>
                <View style={styles.label} >
                    <View style={{flexDirection:"row",marginHorizontal:40, marginVertical:10}}>
                    <View>
                        <Text style={{fontWeight:"bold"}}>Statisques parcours</Text>
                        <View style={{flexDirection:"row",marginHorizontal:20}}>
                            <Text style={{fontWeight:"bold"}}>Temps de Parcours: </Text>
                            <Text style={{marginHorizontal:40}}> s</Text>
                        </View>
                        <View style={{flexDirection:"row",marginHorizontal:20}}>
                            <Text style={{fontWeight:"bold"}}>Temps de Parcours: </Text>
                            <Text style={{marginHorizontal:40}}> s</Text>
                        </View>
                        <View style={{flexDirection:"row",marginHorizontal:20}}>
                            <Text style={{fontWeight:"bold"}}>Temps de Parcours: </Text>
                            <Text style={{marginHorizontal:40}}> s</Text>
                        </View>
                        <View style={{flexDirection:"row",marginHorizontal:20}}>
                            <Text style={{fontWeight:"bold"}}>Temps de Parcours: </Text>
                            <Text style={{marginHorizontal:40}}> s</Text>
                        </View>
                        <View style={{flexDirection:"row",marginHorizontal:20}}>
                            <Text style={{fontWeight:"bold"}}>Temps de Parcours: </Text>
                            <Text style={{marginHorizontal:40}}> s</Text>
                        </View>
                        <View style={{flexDirection:"row",marginHorizontal:20}}>
                            <Text style={{fontWeight:"bold"}}>Temps de Parcours: </Text>
                            <Text style={{marginHorizontal:40}}> s</Text>
                        </View>
                        <View style={{flexDirection:"row",marginHorizontal:20}}>
                            <Text style={{fontWeight:"bold"}}>Temps de Parcours: </Text>
                            <Text style={{marginHorizontal:40}}> s</Text>
                        </View>
                        <View style={{flexDirection:"row",marginHorizontal:20}}>
                            <Text style={{fontWeight:"bold"}}>Temps de Parcours: </Text>
                            <Text style={{marginHorizontal:40}}> s</Text>
                        </View>
                        <View style={{flexDirection:"row",marginHorizontal:20}}>
                            <Text style={{fontWeight:"bold"}}>Temps de Parcours: </Text>
                            <Text style={{marginHorizontal:40}}> s</Text>
                        </View>
                        <View style={{flexDirection:"row",marginHorizontal:20}}>
                            <Text style={{fontWeight:"bold"}}>Temps de Parcours: </Text>
                            <Text style={{marginHorizontal:40}}> s</Text>
                        </View>

                    </View>
                    <View>
                        <Text style={{fontWeight:"bold"}}>Statisques parcours</Text>
                            <View style={{flexDirection:"row",marginHorizontal:20}}>
                                <Text style={{fontWeight:"bold"}}>Temps de Parcours: </Text>
                                <Text style={{marginHorizontal:40}}> s</Text>
                            </View>
                            <View style={{flexDirection:"row",marginHorizontal:20}}>
                                <Text style={{fontWeight:"bold"}}>Temps de Parcours: </Text>
                                <Text style={{marginHorizontal:40}}> s</Text>
                            </View>
                            <View style={{flexDirection:"row",marginHorizontal:20}}>
                                <Text style={{fontWeight:"bold"}}>Temps de Parcours: </Text>
                                <Text style={{marginHorizontal:40}}> s</Text>
                            </View>
                            <View style={{flexDirection:"row",marginHorizontal:20}}>
                                <Text style={{fontWeight:"bold"}}>Temps de Parcours: </Text>
                                <Text style={{marginHorizontal:40}}> s</Text>
                            </View>
                            <View style={{flexDirection:"row",marginHorizontal:20}}>
                                <Text style={{fontWeight:"bold"}}>Temps de Parcours: </Text>
                                <Text style={{marginHorizontal:40}}> s</Text>
                            </View>
                            <View style={{flexDirection:"row",marginHorizontal:20}}>
                                <Text style={{fontWeight:"bold"}}>Temps de Parcours: </Text>
                                <Text style={{marginHorizontal:40}}> s</Text>
                            </View>
                            <View style={{flexDirection:"row",marginHorizontal:20}}>
                                <Text style={{fontWeight:"bold"}}>Temps de Parcours: </Text>
                                <Text style={{marginHorizontal:40}}> s</Text>
                            </View>
                            <View style={{flexDirection:"row",marginHorizontal:20}}>
                                <Text style={{fontWeight:"bold"}}>Temps de Parcours: </Text>
                                <Text style={{marginHorizontal:40}}> s</Text>
                            </View>
                            <View style={{flexDirection:"row",marginHorizontal:20}}>
                                <Text style={{fontWeight:"bold"}}>Temps de Parcours: </Text>
                                <Text style={{marginHorizontal:40}}> s</Text>
                            </View>
                            <View style={{flexDirection:"row",marginHorizontal:20}}>
                                <Text style={{fontWeight:"bold"}}>Temps de Parcours: </Text>
                                <Text style={{marginHorizontal:40}}> s</Text>
                            </View>

                        </View>
               
                   
                    </View>
                   
                </View>
                </ScrollView>
           
       
       

            </View>
           
           
           )
        }
}

const styles = StyleSheet.create({
    app:{
        flexGrow:1,
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
        flex:4,
        borderWidth: 2,
        padding:8,
        margin:8,
        borderColor:"grey",
    }
   
  });
