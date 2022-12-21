import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';

import { StyleSheet, Text, View, TouchableOpacity, ListView, TouchableHighlight } from 'react-native';
import { Image } from 'react-native';
import { FlatList } from 'react-native';

import { Alert } from 'react-native';
import { ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { SafeAreaView } from 'react-native';
import { BackHandler } from 'react-native';


export default class ListeStudentNB extends Component {
    constructor (props){
        super(props)

        this.state={
           liste: [],
           refresh:false,
           studentEvalue:""
        }
        // this.getAll = this.getAll.bind(this) 
        // this.getAll()  
    }
    reload(){
        try {
            this.state.liste.splice(0,this.state.liste.length)
            
           setTimeout(() => {
            this.getAll()
            
   
           }, 100); 
           setTimeout(() => {
            this.refresh() 
           
           }, 120);
          
          
           
        } catch (error) {
            console.log(error);
        }
        
    }
    async refresh(){
        this.setState({ 
            refresh: true
        })
        let studentEvalues = await AsyncStorage.getItem('nb_student_evalue')
        
        console.log(studentEvalues);
        this.setState({studentEvalue : studentEvalues})
       
    }
    async componentDidMount(){
        console.log(this.props.stageName+"rrrrrrss");
        let studentEvalues = await AsyncStorage.getItem('nb_student_evalue')
        
        console.log(studentEvalues);
        this.setState({studentEvalue : studentEvalues})
        this.refresh()
        
        BackHandler.addEventListener('backPress', () => {return true});
    } 
    async getAll(){
        
        try {
            let indextotal = await AsyncStorage.getItem('nb_totalStudent')
            console.log("d"+indextotal);
            if (parseInt(indextotal) === 1) {
                console.log("rrr");
                const first_name = await AsyncStorage.getItem('@nb_student_first_name'+indextotal)
                const last_name = await AsyncStorage.getItem('@nb_student_last_name'+indextotal)
                const id = await AsyncStorage.getItem('@nb_student_id'+indextotal)
                const email = await AsyncStorage.getItem('@nb_student_email'+indextotal)
                let obj  ={
                    "name" : first_name +" "+last_name,
                    "id" : id,
                    "email":email
                 }
                this.state.liste.push(obj) 
            }else{
                console.log('yes!! ')
            for (let index = 1; index < parseInt (indextotal)+1; index++) {
                const first_name = await AsyncStorage.getItem('@nb_student_first_name'+index.toString())
                const last_name = await AsyncStorage.getItem('@nb_student_last_name'+index.toString())
                const id = await AsyncStorage.getItem('@nb_student_id'+index.toString())
                const email = await AsyncStorage.getItem('@nb_student_email'+index.toString())
                let obj  ={
                    "name" : first_name +" "+last_name,
                    "id" : id,
                    "email":email
                 }
                this.state.liste.push(obj) 
                
            }
            this.removeDuplicate()
        }
       
        
        
            console.log(this.state.liste);
           console.log(this.state.liste.length+'rhk ')   
            
        } catch (error) {
            console.log(error)
        }
    }
    removeDuplicate(){
        console.log("++++++++");
        //Remove duplicate from Array list
        const newArrayList = [];
        this.state.liste.forEach(obj => {
          if (!newArrayList.some(o => o.id === obj.id)) {
            newArrayList.push({...obj});
          }
        });
        console.log(newArrayList);
     
        this.setState({liste: newArrayList});  
      }
 
    async componentWillMount(){
        this.reload()
        let studentEvalues = await AsyncStorage.getItem('nb_student_evalue')
        
        console.log(studentEvalues);
        this.setState({studentEvalue : studentEvalues})
        console.log(this.props.stage);
    }
    async storeStudentId(index){
        let obj =[]
        obj.push(index)
        AsyncStorage.getItem('nb_student_evalue' ).then( (data) => {
            if(data === null){
            data=JSON.stringify(obj)
            AsyncStorage.setItem('nb_student_evalue',data)
            console.log( "dataEv:" +data )
            }else{
                console.log(data);
            let datas = []
            datas= JSON.parse(data)
            datas.push(index)
            console.log( "dataEv:" +datas )
            AsyncStorage.removeItem('nb_student_evalue').then(
             
            AsyncStorage.setItem('nb_student_evalue',JSON.stringify(datas))
            )
            }
            
            // data=data+','+JSON.stringify(obj)
          
          }).done();
    }
    


    renderSeparator = () => {
		return (
		<View
			style={{
			height: 1,
			width: "100%",
			backgroundColor: '#00B0F0',
			// marginLeft: "9%"
			}}
		/>
		)
	} 
   
    iconName(ind){
        let name = ""
        let studentEvalue = this.state.studentEvalue
        console.log("inde"+ind);
        console.log('hj'+studentEvalue);
        if (studentEvalue !== null) {
                let jsonStudentE = JSON.parse(studentEvalue)
                        console.log("fff"+jsonStudentE.length);
               
                    
             
                   
                        
                            for (let index = 0; index <= jsonStudentE.length ; index++) {
                   
                                if ((ind === jsonStudentE[index]) ) {
                                    name = "check-circle" 
                                    break;
                                   
                               }else{
                                name = "checkbox-blank-circle-outline"
                               
                            } 
                                           
                            }
                            
                        
                        
                        
                   
                        
                         
                        //name = "checkbox-blank-circle-outline"
                        
                                    
                      
                    
            }else{
                name = "checkbox-blank-circle-outline"
               
       
            }    
            return name; 
            console.log('jj'+name);  
         
            //  console.log("g"+name)
           
            
           
    }
            // AsyncStorage.getItem('pr_student_evalue')
            //     .then((result)=>{
            //         console.log(result);
            //         studentEvalue = result
            //         if (studentEvalue !== null) {
            //             let jsonStudentE = JSON.parse(studentEvalue)
                        
            //             for (let index = 0; index < jsonStudentE.length; index++) {
            //                 const el= jsonStudentE[index];
            //                 console.log(el);
                           
            //                 if (ind === el) {
            //                     name = "checkbox-blank-circle"
            //                 }else{
            //                     name = "checkbox-blank-circle-outline"
                                
            //                 }
                            
            //                 console.log(name);
                            
                             
            //             }
                    
            //         }else{
            //             name = "checkbox-blank-circle-outline"
                     
            //         }
                   
                  
            //         })
               
    

    renderListe(){
        
        return(
             
            <FlatList
                data={this.state.liste}
                keyExtractor={(item, index) => index}
                extraData={this.state.refresh}
                
                renderItem={({item})=>(
                    
                   
                    <View style={{
                        alignItems:"center",
                        justifyContent:'center',alignContent:"center",flexDirection:"row"}}>
                            <Text style={{color: 'white',fontSize:22,}}>
					        {(this.state.liste.findIndex(it=>it === item))+1}
					    </Text>
                            
                        <TouchableOpacity style={{height:150, 
                            width:300,
                            alignItems:"center",
                            justifyContent:'center'}}
                            onPress = {()=>
                                {   this.storeStudentId(this.state.liste.findIndex(it=>it === item)+1)
                                    console.log(this.props.stageName);
                                    Actions.homeNodbox({asyncId: this.state.liste.findIndex(it=>it === item)+1,
                                         stage:this.props.stage,
                                         stageName : this.props.stageName,
                                         typeF:this.props.typeF
                                         
                                        })
                                }
                            }
                            >
                        
                        <Text style={{color: 'white',fontSize:22,}}>{item.name}</Text>
                        
                        
                        </TouchableOpacity>
                        
                        <Icon
                            name = {this.iconName(this.state.liste.findIndex(it=>it === item)+1)}
                            type = "material-community" 
                            color ='#00B0F0'
                            size = {30}
                        	
                        />
                        
                        
                          
                    </View>
                    
                )}
                ItemSeparatorComponent={this.renderSeparator}
            />
            )   
    
   
       
    
  
       
    }
 
render(){
   
 
        return(
            <View style={styles.container}>
               <View style={styles.headerContainer}>
                 <View style={{alignItems:"center",flexDirection:"row"}}>
                 <Image
                         resizeMode ="contain"
                         style={{ width:200, height:260,left:15}}
                         source= {require("../../images/Sanstitre9.png")}
                    />
                  <Text style={styles.headerTitle}>ECO DATA</Text>
                  </View>
                  <Text style={{color:'#00B0F0',fontSize:16,left:-177, textAlign:'right',fontStyle:"italic",top:45}}>Powered by CleanData</Text>
               
                </View>
                <View style={{top:50,flex:1}}>
                <View style={{flexDirection:"row",alignItems:"center",left:26}}>
                    <Text style={{alignSelf: 'center',color: 'white',fontSize:22,fontWeight:'bold',marginLeft:50 ,marginRight:20}}>LISTE DES STAGIAIRES : </Text>
                    <Icon
                        name='reload'
                        type="material-community"
                        color='red'
                        size= {30}
                        onPress={() => this.refresh()}	
                    />
                </View>
                <View style={{borderWidth:2,borderColor:'#00B0F0',padding:30,width:'100%',height:500,marginTop:70}}>
               
                 <SafeAreaView
                    style={{width:"100%",height:500
                }}
                    >
                   
                    {/* <Text style={{color:'#fff',textAlign: 'left', left:25,marginVertical:50}}>STAGIAIRES:</Text> */}
                        {this.renderListe()}
                       
                    <View style={{height:30}}></View>
                    </SafeAreaView>
                </View>
                </View>
            </View>
        ) 
   // }
    
}


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#191919'
      },
    headerContainer: {
        //top:24
        height: 80, //80
        flexDirection: 'row',
        // flex: 1.0,
        // justifyContect: 'center',
        backgroundColor:'#323232',
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
 
})