const reducer = (state = null , action) => {
    switch (action.type) {
        case 'NEW_SLOT' :
            return state = action.payload
       case 'ADD_DETAILS' :
            return {...state , details : action.payload }
            case 'ADD_DATE' :
                return {...state , date : action.payload }     
       default :
       return state  
    }
};

export default reducer