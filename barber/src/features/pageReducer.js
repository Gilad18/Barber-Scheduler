const reducer2 = (state=0 , action) => {
    switch (action.type) {
        case 'NEXT_PAGE' :
            return state = state + 1
        case 'DISABLE' :
            return state = 0  
        default :
        return state     
    }
};

export default reducer2