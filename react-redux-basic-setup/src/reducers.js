function data( state, action ) {

    switch( action.type ) {

        case 'ADD_VALUE':

            let value = action.payload.value;

            return {
                ...state,
                test: value
            }
        
        default:
            
            return state;

    }


}

export default data;