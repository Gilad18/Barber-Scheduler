export const addSlot = ( myObj) => {
    return (dispatch) => {
        dispatch({
            type : 'NEW_SLOT',
            payload : myObj
        })
    }
}

export const addDetials = ( myObj) => {
    return (dispatch) => {
        dispatch({
            type : 'ADD_DETAILS',
            payload : myObj
        })
    }
}

export const addDate = ( myObj) => {
    return (dispatch) => {
        dispatch({
            type : 'ADD_DATE',
            payload : myObj
        })
    }
}

export const nextPage = ( ) => {
    return (dispatch) => {
        dispatch({
            type : 'NEXT_PAGE'
        })
    }
}

export const disable = ( ) => {
    return (dispatch) => {
        dispatch({
            type : 'DISABLE'
        })
    }
}