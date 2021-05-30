import {combineReducers} from 'redux'
import slotReducer from './slotReducer'
import pageReducer from './pageReducer'

const reducers = combineReducers({
     slot : slotReducer,
     page : pageReducer
})

export default reducers