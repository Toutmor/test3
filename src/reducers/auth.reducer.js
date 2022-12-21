import { combineReducers } from 'redux'

const initialState ={
    token: null,
    isLoggedIn: false,
    isLoading: false,
    isError: false,
    isSuccess: false,
    errors: null,
    indexStudent: 0,

}
const authData = (state = initialState, action) => {
   
    switch (action.type) {
        case "AUTH_TRAINER_SUCCESS":
            return {
                ...state,
              token: action.token,
              isLoggedIn: true
            }

        case "AUTH_TRAINER_FAIL":
            return {
                ...state,
              token: null,
              isLoggedIn: false
            }
       
        default:
          return state;
}
}




const createNewStudent = (state = initialState, action) => {
    
    if (state.indexStudent === undefined) {
        switch (action.type) { 

            case "CREATE_STUDENT_LOADING":
                return {
                    ...state,
                    isLoading: true,
                    isError: false, 
                    isSuccess: false,
                    errors: null,
                    indexStudent: 0,
                }
            
            case "CREAT_STUDENT_SUCCESS":
              
                return {
                    ...state,
                    isLoading: false,
                    isError: false,
                    isSuccess: true,
                    errors: null,
                    indexStudent: state.indexStudent +1,
                   
                }
            case "CREAT_STUDENT_FAILED":
                return {
                    ...state,
                    isLoading: false,
                    isError: true,
                    isSuccess: false,
                    errors: action.payload,
                    indexStudent: 0,
                }
            case "SUPPRESS_INDEX2":
                return {
                    isLoading: false,
                    isError: true,
                    isSuccess: false,
                    errors:null,
                    indexStudent: undefined,}
               
            default:
                return state       
        }    
    } else {

        switch (action.type) { 

            case "CREATE_STUDENT_LOADING":
                return {
                    ...state,
                    isLoading: true,
                    isError: false, 
                    isSuccess: false,
                    errors: null,
                    indexStudent: state.indexStudent ,
                }
            
            case "CREAT_STUDENT_SUCCESS":
              
                return {
                    ...state,
                    isLoading: false,
                    isError: false,
                    isSuccess: true,
                    errors: null,
                    indexStudent: state.indexStudent +1,
                   
                }
            case "CREAT_STUDENT_FAILED":
                return {
                    ...state,
                    isLoading: false,
                    isError: true,
                    isSuccess: false,
                    errors: action.payload,
                    indexStudent: state.indexStudent,
                }
            case "SUPPRESS_INDEX2":
                return {
                    isLoading: false,
                    isError: true,
                    isSuccess: false,
                    errors:null,
                    indexStudent: undefined,}
           
               
            default:
                return state       
        }    
        
    }
    
}
const suppressIndex = (state=initialState, action) => {
   
   try {

        if (action.type === "SUPPRESS_INDEX_SUCCESS") {
                return {...state,indexStudent: 0,}
        } 

   } catch (error) {
        console.log(error); 
   }
   return state
    

}

const loginTrainer = (state = initialState, action) => {
    switch (action.type) { 
        case "LOGIN_TRAINER_LOADING":
            return {
                ...state,
                isLoading: true,
                isError: false,
                isSuccess: false,
                errors: null
            }
        
        case "LOGIN_TRAINER_SUCCESS":
            return {
                ...state,
                isLoading: false,
                isError: false,
                isSuccess: true,
                errors: null
            }
        
        case "LOGIN_TRAINER_FAIL":
            return {
                ...state,
                isLoading: false,
                isError: true,
                isSuccess: false,
                errors: action.payload,
            }
       

  
        default:
            return state       
    }    
}

export default combineReducers({
    createNewStudent,
    loginTrainer,
    authData,
    suppressIndex,
})