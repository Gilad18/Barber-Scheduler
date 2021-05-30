// import {configureStore} from '@reduxjs/toolkit'
// import slotReducer from '../features/slotSlice'

// export default configureStore({
//     reducer : {
//         slots : slotReducer
//     },
// });

import {createStore , applyMiddleware} from 'redux'
import reducers from '../features/index'
import thunk from 'redux-thunk'

export const store = createStore(
    reducers,
    {},
    applyMiddleware(thunk)
)