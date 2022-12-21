import { combineReducers } from 'redux'

const getTrainer = (state = {}, action) => {
    switch (action.type) {
        case "GET_TRAINER_LOADING":
            return {
                isLoading: true,
                isError: false,
                isSuccess: false,
                userDetails: null,
                errors: null
            }

        case "GET_TRAINER_SUCCESS":
            return {
                isLoading: false,
                isError: false,
                isSuccess: true,
                userDetails: action.payload,
                errors: null  
            }

        case "GET_TRAINER_FAIL":
            return {
                isLoading: false,
                isError: true,
                isSuccess: false,
                userDetails: null , 
                errors: action.payload
            }

            default:
                return state     
    }
}

export default combineReducers ({
    getTrainer
})