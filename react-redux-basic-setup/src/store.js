import { createStore } from 'redux';

import data from './reducers';


const initialState = {
    test: 'valor inicial'
};

const enhancements = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(
    data, // reducers
    initialState,
    enhancements
)


export default store;