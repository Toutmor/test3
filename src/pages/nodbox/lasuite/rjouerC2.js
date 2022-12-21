import React, {Component} from 'react'
import { View, StyleSheet, ScrollView,Dimensions,Text, Alert, TouchableOpacity, Image} from 'react-native'

import { Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Select2 from 'react-native-select-two';
import { Actions } from 'react-native-router-flux';


const screenWidth = Dimensions.get("window").width;
const grpeData = [
    { id : 1, name: 'Levée de pied' },
    { id : 2, name: 'Couple' },
    { id : 3, name: 'Pédales'},
    { id : 4, name: "Marche Arrière" },
    
  ];

//   //vert: couple moteur,fuel_consumption, rapport regime moteur  ****couple 
// rouge: coonsommation instantanée pedale acc regime moteur vitesse **levée de pied1
// bleu pedale acc pedale frein pedale emb vitesse ****pedales 3
// jaune marcheAR pedale acc regime vitesse  **** marche arrière 4
export class RejouerP2 extends Component{
    constructor(props){
        super(props)
            this.state={
             
                grpe1 : [this.props.stats2.consChart,  this.props.stats2.accChart , this.props.stats2.rMoteur,this.props.stats2.vitesseChart ],
                grpe2: [this.props.stats2.cMoteur,this.props.stats2.fuel_consChart,this.props.stats2.rapportChart, , this.props.stats2.rMoteur],
                grpe3 : [this.props.stats2.accChart,this.props.stats2.freinChart,this.props.stats2.embChart,this.props.stats2.vitesseChart],
                grpe4: [this.props.stats2.rapportChart, this.props.stats2.accChart, this.props.stats2.rMoteur, this.props.stats2.vitesseChart]
                ,legende : [],selectG:[],text:""
            }
        }
        selectGroupe(data){
            let selected = data
            let i =0
            if (selected.length != 0) {
                i = selected[0]-1
                // console.log(grpeData[i].name);
                
                switch (i) {
                    case 0:
                        this.setState({
                            selectG : this.state.grpe1, 
                            legende: ["consommation instantanée", "pédale accélération", "régime moteur", "vitesse"],
                            text: grpeData[i].name
                        })
                        break;
                    case 1:
                        this.setState({
                            selectG : this.state.grpe2,
                            legende :["couple moteur","fuel consumption", "rapport", "régime moteur"],
                            text: grpeData[i].name
                        })
                        break;
                    case 2:
                        this.setState({
                            selectG : this.state.grpe3,
                            legende : ["pedale accélération","pédale frein", "pedale embrayage", "vitesse"],
                            text: grpeData[i].name
                        })
                        break;
                    case 3:
                        this.setState({
                            selectG : this.state.grpe4,
                            legende :["rapport", "accélération", "régime moteur" , "vitesse"],
                            text: grpeData[i].name
                        })
                        break;
                    default: 0
                        break;
                }
            } else {
               Alert.alert(
                   "WARNING",
                   "choissisez un groupe",
                   [
                   {
                       text: "OK",
                       onPress: () => console.log("OK Pressed") 
                   }]
               ) 
            }
        }
        afficheCourbe(){
            // console.log(this.props.stats2.fuel_consChart);
            if (this.state.selectG.length !=0) {
              console.log(this.state.selectG[3]);
                
                
                return(
                    
                    <View style={styles.histo}>
                    
                    <LineChart
                    data={{
                    labels: this.props.stats2.rMoteurT,
                    datasets: [
                      {
                      data: this.state.selectG[0],
                      color: (opacity = 0.3) => `#e43137`,
                      },
                      {
                        data: this.state.selectG[1],
                        color: (opacity = 0.7) => `#003789`, // optional
                      },
                      {
                        data: this.state.selectG[2],
                        color: (opacity = 0.7) => '#00B0F0', // optional
                      },
                      {
                        data: this.state.selectG[3],
                        color: (opacity = 0.3) => `white`, // optiona
                      }
                      
                  ],
                  legend : this.state.legende
                       
                  
                    }}
                    width={Dimensions.get("window").width} // from react-native
                    height={600}
                    // yAxisLabel={"tr/min"}
                    xAxisLabel={"s"}
                    //yAxisSuffix={"tr/min"}
                    chartConfig={{
                        //backgroundColor: "white",
                        backgroundGradientFrom:'#CECECE',
                        backgroundGradientTo: 'grey',
                        //backgroundGradientTo: 'white',
                       
                        // backgroundGradientTo: "blue",
                        decimalPlaces: 2, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(255,255,255, ${opacity})`,
                        // labelColor: (opacity = 1) => `rgba(255, 0, 255, ${opacity})`,
                       
                        propsForDots: {
                            r: "2",
                            strokeWidth: "2",
                            stroke: "#ffa726"
                        },
                       
                    }}
                    //bezier
                    withInnerLines = {false}
                    withShadow = {false}
                    withOuterLines 
                   
               
                    style={{margin:6}}
                />
                <Text>{this.state.text}</Text>
                </View>
                          
                )
                
            } else {
                Alert.alert(
                    "WARNING",
                    "choissisez un groupe",
                    [
                    {
                        text: "OK",
                        onPress: () => console.log("OK Pressed") 
                    }]
                ) 
             
                
            }

        }
        render(){
            return(
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
                        <Select2
                            isSelectSingle = {true}
                            style={{ borderRadius: 5 , height:35, width:350}}
                            colorTheme={'#885159'}
                            popupTitle='Select groupe'
                            title='Select groupe'
                            data={grpeData}
                            cancelButtonText = "Cancel"
                            selectButtonText = "OK"
                            searchPlaceHolderText = "search"
                            
                            onSelect={data => {
                                
                                console.log(data);
                                
                                this.selectGroupe(data)
                                
                                
                            }}
                            onRemoveItem={data => {
                                this.selectGroupe(data)
                                console.log(data);
                                
                            }} 
                        />
                        {this.afficheCourbe()}
                 
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
               paddingTop : 10
               
       
           }, headerContainer: {
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