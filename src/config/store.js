
import {createStore , applyMiddleware} from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'

import reducers from '../reducers'
import AsyncStorage from '@react-native-async-storage/async-storage'

const persistConfig = {
    key : 'root',
    storage : AsyncStorage,
    timeout: null,
    whitelist: ['authReducer' , 'trainerReducer']
}

const persistedReducer = persistReducer(persistConfig,reducers)

export default ()  => {
    let store = createStore(persistedReducer,{},applyMiddleware(thunk))
    let persistor = persistStore(store)
    return{store,persistor}
}