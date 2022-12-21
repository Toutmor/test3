import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';



import {fetchApi} from '../services/api'

       
export const createNewStudent = (payload) => {
    console.log(payload);
    return async (dispatch) => {
        
        try {
            dispatch({
                type : "CREATE_STUDENT_LOADING"
            })
            if (payload === undefined) {
                console.log("nopaylload");
                dispatch({
                    type : "SUPPRESS_INDEX2",
                })
            }
            const token_access = await AsyncStorage.getItem("token_access")
            console.log(token_access);
            const response = await fetchApi("/api/profile/intern", "POST" ,payload,200,token_access);
            console.log(response.responseBody);
           
            if (response.success) {
                
               
                
                if (response.responseBody.status === "success") {
                    dispatch({
                        type : "CREAT_STUDENT_SUCCESS",
                    })
                    
                    
                    // Alert.alert(
                    //     'Enregistrement réussi',
                    //     "",
                    //     [
                    //         {text: 'OK', onPress: () => console.log('OK Pressed')},
                    //     ],
                    //     {cancelable: true},
                    // );
                  
                  
                    
                    // await AsyncStorage.multiSe
                       
                    //     ['@student_id',response.responseBody.id],
                    //     ['@student_first_name',response.responseBody.first_name],
                    //     ['@student_last_name',response.responseBody.last_name]
                    //     )
                }
                if(response.responseBody.status==="failed") {
                     let message=response.responseBody.message;
                    // if(response.responseBody.error_email){
                    //     if(response.responseBody.error_email==true){
                    //         message+="email";
                    //     }
                    // }
                   
                    // if(response.responseBody.error_enterprise){
                    //     if(response.responseBody.error_enterprise==true){
                    //         if(message){
                    //             message+=", ";
                    //         }
                    //         message+="entreprise";
                    //     }
                    // }
                    // console.log(message)
                    
                    // if(message) {
                    //     message="ERROR ON "+message+".";
                    // } else {
                    //     message="It looks like we have server error.";
                    // }
                    
                    Alert.alert(
                        "Enregistrement échoué",
                        message,
                        [
                            {
                                text: 'Retour',
                                onPress: () => console.log('Cancel Pressed'),
                                style: 'cancel',
                            },
                        ]
                    );
                    //await AsyncStorage.setItem('@is_registered'+i.toString(), "false")
                }
                if (response.responseBody.status==="exist") {
                    dispatch({
                        type : "CREAT_STUDENT_SUCCESS",
                    })
                   
                    
                    // Alert.alert(
                    //     'Enregistrement confirmé',
                    //     "",
                    //     [
                    //         {text: 'OK', onPress: () => console.log('OK Pressed')},
                    //     ],
                    //     {cancelable: false}, 
                    // )
                   
                    
                   
                } 
               
                throw response
            }
          
           
                
             
            
        }
        catch(error) {
           
            dispatch({
                type: "CREATE_STUDENT_FAILED",
                payload: error.responseBody
            })
            return error
        }
    }
}



export const loginTrainer = (payload)=> {
    return async (dispatch) =>{
        try {
            dispatch({
                type: "LOGIN_TRAINER_LOADING"
            })
            const response = await fetchApi("/api/auth/login", "POST", payload, 200);
             console.log("a"+response.success)
            if(response.success){
             console.log(response.responseBody.status)
                if(response.responseBody.status ==="success") {
                    // await AsyncStorage.setItem('@first_name', response.responseBody.first_name)
                    // await AsyncStorage.multiSet(
                    //     ['@trainer_id',response.responseBody.id],
                    //     ['@trainer_first_name',response.responseBody.first_name],
                    //     ['@trainer_last_name',response.responseBody.last_name]
                    //     )
                    await AsyncStorage.setItem('@trainer_id', (response.responseBody.id).toString())
                    await AsyncStorage.setItem('@trainer_first_name',response.responseBody.first_name)
                    await AsyncStorage.setItem('@trainer_last_name',response.responseBody.last_name)
                    await AsyncStorage.setItem('token_access',response.responseBody.token_access)
                    await AsyncStorage.setItem('token_refresh',response.responseBody.token_refresh)
                    dispatch({
                        type: "LOGIN_TRAINER_SUCCESS"
                    })
                    dispatch({
                        type: "AUTH_TRAINER_SUCCESS",
                        token: response.token
                    })
                    dispatch({
                        type: "GET_TRAINER_SUCCESS",
                        payload: response.responseBody
                    })
                    //return response
                } 
                else {
                    console.log("bbbbb")
                    let message =response.responseBody.message
                    dispatch({
                        type: "LOGIN_TRAINER_FAIL",
                        payload:response.responseBody
                    })
                    Alert.alert(
                        "Authentification formateur échoué",
                        message,
                        [
                            {
                                text: 'Retour',
                                onPress: () => console.log('Cancel Pressed'),
                                style: 'cancel',
                            },
                        ]
                    );
                    console.log(6+response.responseBody.status);
                }
                 return response 
            } 
        else {
                throw response
            }
        } catch(err) {
            console.log(err+"eee");
            dispatch({
                type: "LOGIN_TRAINER_FAIL",
                payload: err
            })
            
            return err
        }
    }
}

export const logoutTrainer = () => {
    return async (dispatch, getState) => {
        const state = getState()
         try {
            const {authReducer: {authData: {token}}} = state 
            const response = await fetchApi("/api/logout", "DELETE", null, 200, token)
             await AsyncStorage.multiRemove(['@trainer_id','@trainer_first_name','@trainer_last_name'])
           dispatch({
                type: "TRAINER_LOGGED_OUT_SUCCESS",
            })
        } catch (e) {
            console.log(e)
        }
    }
}

