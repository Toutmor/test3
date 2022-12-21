import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  TouchableHighlight
} from 'react-native';
import {Actions} from 'react-native-router-flux'
import { Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import {Field, reduxForm} from 'redux-form'
import RadioForm from 'react-native-simple-radio-button'
import InputText from '../components/InputText';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {ErrorUtils} from '../utils/auth.utils'
import {createNewStudent} from '../actions/auth.actions'
import { Modal } from 'react-native';
import { BackHandler } from 'react-native';
import * as Sentry from '@sentry/react-native';
import {Dropdown} from 'react-native-element-dropdown';
import axios from 'axios'

const options = [
	{label: "Mme", value: "F"},
	{label: "M.", value: "M"}
]

 class LoginStudent extends React.Component {
  constructor(props) {
		super(props);
		this.state={
			selectedButton: 'F',
            showChoices:false,
            stageName:'',
            city:null,
             cityName:'',
             isFocus:false,
             cityDatas:[],

		}
		this.onSelect=this.onSelect.bind(this);
	}

	onSelect = (item) => {
		this.setState({selectedButton: item});
	};
  async fetchclient(){
    const token = await AsyncStorage.getItem("token_access")
    const url= 'https://api.cleandata.link/api/others/enterprise';
    const headers = {
      "Authorization": `Bearer ${token}`,
    };
    //const responseBeta = await axios.get(url, {headers})
    await axios.get(url, {headers}).then(responseBeta  =>{
    console.log(JSON.stringify(responseBeta.data));
    var count = Object.keys(responseBeta.data).length;
        let cityArray = [];
        for (var i = 0; i < count; i++) {
          cityArray.push({
            value: responseBeta.data[i].id,
            label: responseBeta.data[i].name,
          });
    } 
    this.setState({cityDatas:cityArray})
    console.log(this.state.cityDatas)
    })
    
    .catch(function(error){
      console.log(error)
    })
    
  }

    
  homeParcours() {
    try {
      console.log(this.props.stage);
      console.log(this.props.stageName);
      Actions.homP({stage:this.props.stage ,stageName : this.props.stageName})
    } catch (error) {
      Sentry.captureException(error);
    }
   
  }
  async nextStudent(){
    try {
      console.log(this.props.stageName);
      Actions.loginStudent({stage:this.props.stage ,stageName : this.props.stageName})
    } catch (error) {
      Sentry.captureException(error);
    }
  
  }
  
  componentDidMount(){
    BackHandler.addEventListener('backPress', () => {return true});
    this.fetchclient()
  }

  renderTextInput = (field) => {
    const {meta: { touched, error }, label, secureTextEntry, maxLength, keyboardType, placeholder, input: {onChange, ...restInput}} = field
      return(
        <View>
          <InputText
            onChangeText={ onChange }
            maxLength={ maxLength }
            placeholder={ placeholder }
            keyboardType={ keyboardType }
            secureTextEntry={ secureTextEntry }
            label={ label }
            {...restInput}/>
          {(touched && error) && <Text style={styles.errorText}>{error}</Text>}
        </View>
      )
    }
  myRadio = () => {
    return(
      <View>
        <RadioForm
          style={{margin: 5}}
          radio_props={options}
          initial={0}
          onPress={(item) => this.onSelect(item)}
          buttonSize={20}
          buttonColor={'#ffffff'}
          labelColor={'#ffffff'}
          labelStyle={{marginRight: 15,fontSize: 20}}
          selectedButtonColor={'#b20000'}
          selectedLabelColor={'white'}
          formHorizontal={true}
          labelHorizontal={true}
          />
      </View>
    )
  }
  renderLoginChoices(){
    return(
      <Modal 	
        visible={this.state.showChoices} 
        animationType="slide"
        style={{backgroundColor:'rgba(255, 255,255,0.2)'}}
        transparent={true}	
        >
          <View style={{
            
            width:600,
            height:700,
            borderRadius: 10,
            justifyContent:"center",
            alignItems: "center",
  
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            top:320,
            backgroundColor:"black",
            borderColor:'#00B0F0',
            borderWidth:2,
            
            left:100
          }}>
             <View style={{
            
              marginBottom:50
          }}>
            
          <Text style={{color:'#fff',fontSize:30 }}>Enregistrement Réussi !</Text>
          </View>
         
          <View style={{
            justifyContent:"center",
            alignItems: "center",
              flexDirection:'row',
              alignContent:"center",
              }}>
                
            <TouchableOpacity 
              onPress={()=>{
                this.nextStudent()
                
                this.setState({showChoices:false})
              }}
            style={{alignContent:"center",alignItems:'center',justifyContent:"center",width:250,height:90,marginRight:25,borderColor:'#00B0F0',borderWidth:2,
                     borderRadius:5}}>
              <Text style={{color:'#fff',fontSize:20 }}>Ajouter</Text>
              <Text style={{color:'#fff',fontSize:20 }}> un stagiaire</Text>
             
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={()=>{
                this.setState({showChoices:false})
                this.sendProps()
                this.homeParcours()
            }}
            style={{alignContent:"center",alignItems:'center',justifyContent:"center",width:250,height:90,borderColor:'#00B0F0',borderWidth:2,
                    borderRadius:5}}>
              <Text style={{color:'#fff',fontSize:20 }}>Débuter</Text>
              <Text style={{color:'#fff',fontSize:20 }}>stage</Text>
            </TouchableOpacity>
          </View>
          </View>
          
      </Modal>
      )
  }
  UNSAFE_componentWillReceiveProps(props){
    try {
      if(this.props.createUser.indexStudent > props.createUser.indexStudent){
        props.createUser.indexStudent = this.props.createUser.indexStudent

        AsyncStorage.getItem('totalStudent' ).then( (data) => {
            if(data === null){
            data= props.createUser.indexStudent.toString()
            AsyncStorage.setItem('totalStudent',data)
            }else{
            data=props.createUser.indexStudent.toString()
            AsyncStorage.removeItem('totalStudent').then(
             
            AsyncStorage.setItem('totalStudent',data)
            )
            }
            console.log( "data:" +data )
            // data=data+','+JSON.stringify(obj)
          
          }).done();

        AsyncStorage.getItem('pr_totalStudent' ).then( (data) => {
          if(data === null){
          data= props.createUser.indexStudent.toString()
          AsyncStorage.setItem('pr_totalStudent',data)
          }else{
          data=props.createUser.indexStudent.toString()
          AsyncStorage.removeItem('pr_totalStudent').then(
           
          AsyncStorage.setItem('pr_totalStudent',data)
          )
          }
          console.log( "data:" +data )
          // data=data+','+JSON.stringify(obj)
        
        }).done();

        AsyncStorage.getItem('r_totalStudent' ).then( (data) => {
          if(data === null){
          data= props.createUser.indexStudent.toString()
          AsyncStorage.setItem('r_totalStudent',data)
          }else{
          data=props.createUser.indexStudent.toString()
          AsyncStorage.removeItem('r_totalStudent').then(
           
          AsyncStorage.setItem('r_totalStudent',data)
          )
          }
          console.log( "data:" +data )
          // data=data+','+JSON.stringify(obj)
        
        }).done();
        
        AsyncStorage.getItem('f_totalStudent' ).then( (data) => {
          if(data === null){
          data= props.createUser.indexStudent.toString()
          AsyncStorage.setItem('f_totalStudent',data)
          }else{
          data=props.createUser.indexStudent.toString()
          AsyncStorage.removeItem('f_totalStudent').then(
           
          AsyncStorage.setItem('f_totalStudent',data)
          )
          }
          console.log( "data:" +data )
          // data=data+','+JSON.stringify(obj)
        
        }).done();

        AsyncStorage.getItem('su_totalStudent' ).then( (data) => {
          if(data === null){
          data= props.createUser.indexStudent.toString()
          AsyncStorage.setItem('su_totalStudent',data)
          }else{
          data=props.createUser.indexStudent.toString()
          AsyncStorage.removeItem('su_totalStudent').then(
           
          AsyncStorage.setItem('su_totalStudent',data)
          )
          }
          console.log( "data:" +data )
          // data=data+','+JSON.stringify(obj)
        
        }).done();

        AsyncStorage.getItem('nb_totalStudent' ).then( (data) => {
            if(data === null){
            data= props.createUser.indexStudent.toString()
            AsyncStorage.setItem('nb_totalStudent',data)
            }else{
            data=props.createUser.indexStudent.toString()
            AsyncStorage.removeItem('nb_totalStudent').then(
             
            AsyncStorage.setItem('nb_totalStudent',data)
            )
            }
            console.log( "data:" +data )
            // data=data+','+JSON.stringify(obj)
          
          }).done();

          AsyncStorage.getItem('gcam_totalStudent' ).then( (data) => {
            if(data === null){
            data= props.createUser.indexStudent.toString()
            AsyncStorage.setItem('gcam_totalStudent',data)
            }else{
            data=props.createUser.indexStudent.toString()
            AsyncStorage.removeItem('gcam_totalStudent').then(
             
            AsyncStorage.setItem('gcam_totalStudent',data)
            )
            }
            console.log( "data:" +data )
            // data=data+','+JSON.stringify(obj)
          
          }).done();
        
      }
    } catch (error) {
      Sentry.captureException(error);
    }

   

  }
  componentWillUnmount(){
    try {
      this.sendProps()
    } catch (error) {
      Sentry.captureException(error);
    }
   
  }
  sendProps(){
    
    console.log(this.props.createUser.indexStudent.toString());
    AsyncStorage.getItem( 'totalStudent' ).then( (data) => {
      if(data === null){
      data= this.props.createUser.indexStudent.toString()
      AsyncStorage.setItem('totalStudent',data)
      }else{
      data=this.props.createUser.indexStudent.toString()
      AsyncStorage.removeItem('totalStudent').then(
       
      AsyncStorage.setItem('totalStudent',data)
      )
      }
      console.log( "datar:" +data )
      // data=data+','+JSON.stringify(obj)
    
    }).done();
    AsyncStorage.getItem( 'pr_totalStudent' ).then( (data) => {
      if(data === null){
      data= this.props.createUser.indexStudent.toString()
      AsyncStorage.setItem('pr_totalStudent',data)
      }else{
      data=this.props.createUser.indexStudent.toString()
      AsyncStorage.removeItem('pr_totalStudent').then(
       
      AsyncStorage.setItem('pr_totalStudent',data)
      )
      }
      console.log( "datar:" +data )
      // data=data+','+JSON.stringify(obj)
    
    }).done();

    AsyncStorage.getItem('r_totalStudent' ).then( (data) => {
      if(data === null){
      data= this.props.createUser.indexStudent.toString()
      AsyncStorage.setItem('r_totalStudent',data)
      }else{
      data=this.props.createUser.indexStudent.toString()
      AsyncStorage.removeItem('r_totalStudent').then(
       
      AsyncStorage.setItem('r_totalStudent',data)
      )
      }
      console.log( "data:" +data )
      // data=data+','+JSON.stringify(obj)
    
    }).done();
    AsyncStorage.getItem('su_totalStudent' ).then( (data) => {
      if(data === null){
      data= this.props.createUser.indexStudent.toString()
      AsyncStorage.setItem('su_totalStudent',data)
      }else{
      data=this.props.createUser.indexStudent.toString()
      AsyncStorage.removeItem('su_totalStudent').then(
       
      AsyncStorage.setItem('su_totalStudent',data)
      )
      }
      console.log( "data:" +data )
      // data=data+','+JSON.stringify(obj)
    
    }).done();
    AsyncStorage.getItem('f_totalStudent' ).then( (data) => {
      if(data === null){
      data= this.props.createUser.indexStudent.toString()
      AsyncStorage.setItem('f_totalStudent',data)
      }else{
      data=this.props.createUser.indexStudent.toString()
      AsyncStorage.removeItem('f_totalStudent').then(
       
      AsyncStorage.setItem('f_totalStudent',data)
      )
      }
      console.log( "data:" +data )
      // data=data+','+JSON.stringify(obj)
    
    }).done();

    AsyncStorage.getItem( 'gcam_totalStudent' ).then( (data) => {
        if(data === null){
        data= this.props.createUser.indexStudent.toString()
        AsyncStorage.setItem('gcam_totalStudent',data)
        }else{
        data=this.props.createUser.indexStudent.toString()
        AsyncStorage.removeItem('gcam_totalStudent').then(
         
        AsyncStorage.setItem('gcam_totalStudent',data)
        )
        }
        console.log( "datar:" +data )
        // data=data+','+JSON.stringify(obj)
      
      }).done();

      AsyncStorage.getItem('nb_totalStudent').then( (data) => {
        if(data === null){
        data= this.props.createUser.indexStudent.toString()
        AsyncStorage.setItem('nb_totalStudent',data)
        }else{
        data=this.props.createUser.indexStudent.toString()
        AsyncStorage.removeItem('nb_totalStudent').then(
         
        AsyncStorage.setItem('nb_totalStudent',data)
        )
        }
        console.log( "datar:" +data )
        // data=data+','+JSON.stringify(obj)
      
      }).done();
  }
  

  createNewStudent = async (values) => {
    try {
          values.sexe = this.state.selectedButton
          values.enterprise = this.state.cityName
          values.type_profile = "student"
          const response = await this.props.dispatch(createNewStudent(values))
         console.log(response);
          if (!response.success) {
              throw response;
          }else{
          
            let i = this.props.createUser.indexStudent;
            console.log("useindex  "+i);
           
            await AsyncStorage.setItem('@st_is_registered'+i.toString(), "true")

            await AsyncStorage.setItem('@student_id'+i.toString(), (response.responseBody.id_intern).toString())
            await AsyncStorage.setItem('@student_first_name'+i.toString(),response.responseBody.first_name)
            await AsyncStorage.setItem('@student_last_name'+i.toString(),response.responseBody.last_name)
            await AsyncStorage.setItem('@student_email'+i.toString(),response.responseBody.email)

            await AsyncStorage.setItem('@pr_student_id'+i.toString(), (response.responseBody.id_intern).toString())
            await AsyncStorage.setItem('@pr_student_first_name'+i.toString(),response.responseBody.first_name)
            await AsyncStorage.setItem('@pr_student_last_name'+i.toString(),response.responseBody.last_name)
            await AsyncStorage.setItem('@pr_student_email'+i.toString(),response.responseBody.email)
            
            await AsyncStorage.setItem('@r_student_id'+i.toString(), (response.responseBody.id_intern).toString())
            await AsyncStorage.setItem('@r_student_first_name'+i.toString(),response.responseBody.first_name)
            await AsyncStorage.setItem('@r_student_last_name'+i.toString(),response.responseBody.last_name)
            await AsyncStorage.setItem('@r_student_email'+i.toString(),response.responseBody.email)

            await AsyncStorage.setItem('@f_student_id'+i.toString(), (response.responseBody.id_intern).toString())
            await AsyncStorage.setItem('@f_student_first_name'+i.toString(),response.responseBody.first_name)
            await AsyncStorage.setItem('@f_student_last_name'+i.toString(),response.responseBody.last_name)
            await AsyncStorage.setItem('@f_student_email'+i.toString(),response.responseBody.email)

            await AsyncStorage.setItem('@su_student_id'+i.toString(), (response.responseBody.id_intern).toString())
            await AsyncStorage.setItem('@su_student_first_name'+i.toString(),response.responseBody.first_name)
            await AsyncStorage.setItem('@su_student_last_name'+i.toString(),response.responseBody.last_name)
            await AsyncStorage.setItem('@su_student_email'+i.toString(),response.responseBody.email)
            
            await AsyncStorage.setItem('@nb_student_id'+i.toString(), (response.responseBody.id_intern).toString())
            await AsyncStorage.setItem('@nb_student_first_name'+i.toString(),response.responseBody.first_name)
            await AsyncStorage.setItem('@nb_student_last_name'+i.toString(),response.responseBody.last_name)
            await AsyncStorage.setItem('@nb_student_email'+i.toString(),response.responseBody.email)
            
            
            await AsyncStorage.setItem('@gcam_student_id'+i.toString(), (response.responseBody.id_intern).toString())
            await AsyncStorage.setItem('@gcam_student_first_name'+i.toString(),response.responseBody.first_name)
            await AsyncStorage.setItem('@gcam_student_last_name'+i.toString(),response.responseBody.last_name)
            await AsyncStorage.setItem('@gcam_student_email'+i.toString(),response.responseBody.email)
            
            
          }
          
         //"createUser":{"isLoading":false,"isError":false,"isSuccess":true,"errors":null}
         
        } catch (error) {
          console.log("erro:  "+error);
          Sentry.captureException(error);
          let errorText = ""
          if (error === undefined) {
            errorText = error
          }else{
            errorText = error.responseBody.detail
          }
            const newError = new ErrorUtils(errorText, "CREATE_STUDENT_FAILED")
            newError.showAlert()
        }
      }

      onSubmit = async  (values) => {
        try {
          values.sexe = this.state.selectedButton
          values.enterprise = this.state.cityName
          await this.createNewStudent(values)
          console.log("indexBefore:  " + this.props.createUser.indexStudent);
       
          const value = await AsyncStorage.getItem('@st_is_registered'+this.props.createUser.indexStudent.toString())
            if (value === "true") {
              console.log("index:  " + this.props.createUser.indexStudent);
              // this.props.createUser.indexStudent = this.props.createUser.indexStudent + 1
              this.setState({showChoices:true})
            }else if(value === "false"){
                return
            }
           // refresh item formulaire
          this.props.reset()
        } catch (error) {
          console.log(error);
          Sentry.captureException(error);
        }
      }

  

	render(){
    const {handleSubmit,createNewStudent} = this.props
    console.log(this.state.cityName, 'recu')
		return(
      <View style={styles.app}>
          
        <View style={styles.headerContainer}> 
           <View style={{justifyContent:"center"}}>
           
                <View style={{justifyContent:"center",alignItems:"center",flexDirection:"row"}}>
                    <Image
                        resizeMode ="contain"
                        style={{ width:200, height:260,left:15}}
                        source= {require("../images/Sanstitre9.png")}
                    />
                
                  </View>
                  </View>
            </View>
            
        {/* <View style= {{ flex:1,top:30, alignItems:"center"}}>
          <Text style={{color:'#fff',fontSize:36 }}>
            BELTOISE EVOLUTION</Text>
            <Text style={{color:'#fff',fontSize:36 ,paddingVertical:13, marginBottom:30}}>
            FORMATIONS</Text>
            <Image
              style={{width: 300, height :100, resizeMode:'stretch', marginVertical:90}}
              source= {require("../../images/logobeltoise.jpg")}
            />
          </View> */}
            {/* <View style={styles.headerContainer}> 
           <View style={{justifyContent:"center",flexDirection:'row'}}>
                  <View style={{justifyContent:"center",alignItems:"center",flexDirection:"row"}}>
                  <Text style={{color:'#fff',fontSize:18,fontWeight:'bold',paddingLeft:15 }}>BELTOISE EVOLUTION</Text>
                  </View>
                  </View>
            </View>

            <View style={{flexDirection:'row',paddingVertical:40, }}>
              <Image 
                resizeMode ="contain"
                 style={{ width:300, height:300,left:15,top:-130}}
                  source= {require("../../images/Sanstitre9.png")}
               />
               <View style={{flexDirection:'column',}}>
              <Text style={{ alignSelf: 'flex-start',color:'white',fontSize:30,fontWeight:"bold",left:170,top:-20}}>PARCOURS ROUTIER</Text>
              <Text style={{color:'#00B0F0',fontSize:20,fontStyle:"italic",left:280,top:-18}}>Powered By CleanData</Text>
              </View>
            </View> */}
            <View style={{top:80,justifyContent:"center",alignItems:"center"}}>
                <Text style={{color:'#00B0F0',fontSize:26,justifyContent:"center",
                alignItems:"center",fontWeight:"bold"}}>ENREGISTREMENT STAGIAIRE</Text>
            </View>
            
            
          <View style={styles.container}>
              
          
          {(createNewStudent && createNewStudent.isLoading)}
          
          <View style={{justifyContent:'center',
    alignItems: 'center',
    backgroundColor: 'black',
    top:205}}>
          <KeyboardAwareScrollView extraScrollHeight={90} enableAutomaticScroll={(Platform.OS === 'ios')} >
          {this.renderLoginChoices()}
          <ScrollView > 
          <View>
          <Field name="sexe"
							component={this.myRadio}
							/>
              <Field name="first_name"
							placeholder="Prénom"
							component={this.renderTextInput}
						/>
						<Field name="last_name"
							placeholder="Nom"
							component={this.renderTextInput}
						/>
						<Field name="email"
							placeholder="Adresse email"
							component={this.renderTextInput}
							keyboardType="email-address"
						/>
            {/*
           	<Field name="enterprise"
							placeholder="Entreprise"
							component={this.renderTextInput}
						/>
            */}
            <Dropdown
         style={[styles.dropdown, this.state.isFocus && {borderColor: 'blue'}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={this.state.cityDatas}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={ !this.state.isFocus ?'Selectionner client' : '...'}
          searchPlaceholder="Search..."
          value={this.state.city}
          onFocus={() => this.setState({isFocus:true})}
          onBlur={() => this.setState({isFocus:false})}
          onChange={item => {
            this.setState({city:item.value});
            this.setState({cityName:item.label});
            this.setState({isFocus:false});
            
          }}
          
         
        />
            <Field name="service"
							placeholder="Service"
							component={this.renderTextInput}
						/>
             <TouchableHighlight style={styles.button} onPress={handleSubmit(this.onSubmit)}>
                <Text style={styles.buttonText}>OK</Text>
           </TouchableHighlight> 
           
           </View> 
           
           </ScrollView>
           
           </KeyboardAwareScrollView>
           </View>
           <View style={{top:440,left:580}}>
                <Text style={{fontSize:20,color:'#00B0F0',fontStyle:'italic'}}>Powered by CleanData</Text>
                </View>
           </View>  
           
           
  		</View>
			)
	}
}

const styles = StyleSheet.create({
  app : {
    flex: 1,
    //justifyContent:'center',
    // alignItems: 'center',
    backgroundColor: 'black',
    
  },
  container : {
    flex: 1,
    
  
  },
  headerContainer: {
    height: 80, //80
    flexDirection: 'row',
    // flex: 1.0,
    // justifyContect: 'center',
    backgroundColor: '#323232',
    //top:24
},
headerTitle: {
  // flex: 1.0,
  // marginLeft: 8,
  //marginRight: 8,
//  right: 300,
  alignSelf: 'center',
  color: 'white',
  fontSize:20,
  paddingLeft:25,
  fontWeight:"bold"


},


  inputBox: {
    width:500,
    height: 60,
    backgroundColor:'rgba(255, 255,255,0.2)',
    //borderRadius: 25,
    paddingHorizontal:16,
    borderRadius: 25,
    fontSize:16,
    color:'#ffffff',
    marginVertical: 15,
   
  },
  button: {
    width:300,
    backgroundColor:'#b20000',
    borderRadius: 25,
    marginVertical: 25,
    paddingVertical: 13,
    justifyContent:"center",
    alignItems:"center",
    alignContent:'center',
    left:100
     
  },
  buttonText: {
    fontSize:16,
    fontWeight:'500',
    color:'#ffffff',
    textAlign:'center'
  },
  errorText: {
    color: "red",
    fontSize:14,
    // paddingHorizontal:16,
    // paddingBottom: 8
},
dropdown: {
  height: 60,
  //borderColor: 'gray',
  //borderWidth: 0.5,
  borderRadius: 25,
  paddingHorizontal:16,
  marginVertical: 15,
  backgroundColor:'rgba(255, 255,255,0.2)',
  fontSize:16,
},
icon: {
  marginRight: 5,
},
label: {
  position: 'absolute',
  backgroundColor: 'white',
  left: 22,
  top: 8,
  zIndex: 999,
  paddingHorizontal: 8,
  fontSize: 16,
},
placeholderStyle: {
  fontSize: 16,
  color:'#ffffff',
},
selectedTextStyle: {
  fontSize: 16,
  color:'#ffffff',
},
iconStyle: {
  width: 20,
  height: 20,
},
inputSearchStyle: {
  height: 40,
  fontSize: 16,
},  
  
});

const validate = (values) => {
	const errors = {};

	if (!values.first_name) {
		errors.first_name = "Veuillez renseigner ce champ";
	}
	if (!values.last_name) {
		errors.last_name = "Veuillez renseigner ce champ";
	}
	if (!values.email) {
		errors.email = "Veuillez renseigner ce champ";
	} else if(!values.email.match( /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)) {
		errors.email = "Entrez une adresse email valide";
	}
  if (!values.entreprise) {
		errors.entreprise= "Veuillez renseigner ce champ";
	}
  if (!values.service) {
		errors.service= "Veuillez renseigner ce champ";
	}

	return errors;
}


mapStateToProps = (state,props) => ({
  createUser: state.authReducer.createNewStudent
})

mapDispatchToProps = (dispatch) => ({
  dispatch
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    // a unique name for the form
    form: 'loginStudent',
    validate
  })
  )(LoginStudent) 