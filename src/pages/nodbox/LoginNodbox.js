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
import InputText from '../../components/InputText';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {ErrorUtils} from '../../utils/auth.utils'
import {createNewStudent} from '../../actions/auth.actions'
import { Modal } from 'react-native';

const options = [
	{label: "Mme", value: "F"},
	{label: "M.", value: "M"}
]

 class LoginNodbox extends React.Component {
  constructor(props) {
		super(props);
		this.state={
			selectedButton: 'F',
      showChoices:false,
		}
		this.onSelect=this.onSelect.bind(this);
	}

	onSelect = (item) => {
		this.setState({selectedButton: item});
	};
  accueil() {
    Actions.loginNodbox({stage:this.props.stage, typeF : this.props.typeF})
  }
  homeNodbox() {
    Actions.listeStudentNB({stage:this.props.stage, typeF : this.props.typeF})
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
                borderRadius: 20,
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
                top:300,
                backgroundColor:"#323232",
                
                left:90
              }}>
                 <View style={{
                
                  marginBottom:50
              }}>
                
              <Text style={{color:'#fff',fontSize:30 }}>ENREGISTREMENT REUSSI!</Text>
              </View>
             
              <View style={{
                justifyContent:"center",
                alignItems: "center",
                  flexDirection:'row',
                  alignContent:"center",
                  }}>
                    
                <TouchableOpacity 
                  onPress={()=>{
                    this.accueil()
                    
                    this.setState({showChoices:false})
                  }}
                style={{alignContent:"center",alignItems:'center',justifyContent:"center",width:250,height:100,backgroundColor:"#003789",marginRight:25}}>
                  <Text>AJOUTER UN AUTRE STAGIAIRE</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={()=>{
                    this.setState({showChoices:false})
                    this.sendProps()
                    this.homeNodbox()
                }}
                style={{alignContent:"center",alignItems:'center',justifyContent:"center",width:250,height:100,backgroundColor:'#e43137'}}>
                  <Text>DEBUTER TEST</Text>
                </TouchableOpacity>
              </View>
              </View>
    
          </Modal>
          )
      }
      UNSAFE_componentWillReceiveProps(props){

        if(this.props.createUser.indexStudent > props.createUser.indexStudent){
          props.createUser.indexStudent = this.props.createUser.indexStudent
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
        }
  
    }
    componentWillUnmount(){
      this.sendProps()
    }
    sendProps(){
      
      console.log(this.props.createUser.indexStudent.toString());
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
            values.type_profile = "student"
            const response = await this.props.dispatch(createNewStudent(values))
           console.log(response);
            if (!response.success) {
                throw response;
            }else{
            
              let i = this.props.createUser.indexStudent;
              console.log("useindex  "+i);
             
              await AsyncStorage.setItem('@nb_is_registered'+i.toString(), "true")
              await AsyncStorage.setItem('@nb_student_id'+i.toString(), (response.responseBody.id_intern).toString())
              await AsyncStorage.setItem('@nb_student_first_name'+i.toString(),response.responseBody.first_name)
              await AsyncStorage.setItem('@nb_student_last_name'+i.toString(),response.responseBody.last_name)
              await AsyncStorage.setItem('@nb_student_email'+i.toString(),response.responseBody.email)
              
              
            }
            
           //"createUser":{"isLoading":false,"isError":false,"isSuccess":true,"errors":null}
           
          } catch (error) {
            console.log("erro:  "+error);
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
         
            await this.createNewStudent(values)
            console.log("indexBefore:  " + this.props.createUser.indexStudent);
         
            const value = await AsyncStorage.getItem('@nb_is_registered'+this.props.createUser.indexStudent.toString())
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
          }
        }
  
    

	render(){
    const {handleSubmit,createNewStudent} = this.props
		return(
      <View style={styles.app}>
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
            <View style={styles.headerContainer}> 
           <View style={{justifyContent:"center",flexDirection:'row'}}>
                  <View style={{justifyContent:"center",alignItems:"center",flexDirection:"row"}}>
                  <Text style={{color:'#fff',fontSize:18,fontWeight:'bold',paddingLeft:15 }}>BELTOISE EVOLUTION</Text>
                  </View>
                  </View>
            </View>

            <View style={{flexDirection:'row',paddingVertical:40,}}>
            <Image 
                resizeMode ="contain"
                 style={{ width:300, height:300,left:15,top:-130}}
                  source= {require("../../images/Sanstitre9.png")}
               />
               <View style={{flexDirection:'column',}}>
              <Text style={{ alignSelf: 'flex-start',color:'white',fontSize:30,fontWeight:"bold",left:325,top:-20}}>ECO DATA</Text>
              <Text style={{color:'#00B0F0',fontSize:20,fontStyle:"italic",left:270,top:-18}}>Powered by CleanData</Text>
              </View>
            </View>
          <View style={styles.container}>
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
           	<Field name="enterprise"
							placeholder="Entreprise"
							component={this.renderTextInput}
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
    flex: 2,
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: 'black',
    top:-100
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

	return errors;
}


mapStateToProps = (state) => ({
  createUser: state.authReducer.createNewStudent
})

mapDispatchToProps = (dispatch) => ({
  dispatch
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    // a unique name for the form
    form: 'loginNodbox',
    validate
  })
  )(LoginNodbox) 