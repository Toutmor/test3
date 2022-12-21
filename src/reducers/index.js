import {combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form'

import authReducer from './auth.reducer'
import trainerReducer from './trainer.reducer'

const reducers ={
    authReducer,
    trainerReducer,
    form: formReducer
}

const appReducer = combineReducers(reducers);

const rootReducer = (state, action) => {
   
    
    if (action.type === "TRAINER_LOGGED_OUT_SUCCESS") {
        state = {}
    }
    // if (action.type === "SUPPRESS_INDEX_SUCCESS") {
    //    console.log(store().store.getState());
  
    //    console.log(persist().store.getState());
    //     state = store().store.getState().authReducer
    // } 
   

    return appReducer(state, action);
}


export default rootReducer 