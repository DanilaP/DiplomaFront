import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'
import mySagaWatcher from './SagaJS';

const stateInitial = {
    balance: 5000,
    user: {},
    userFiles: [],
}
const sagaMiddleware = createSagaMiddleware()

function reducer(state = stateInitial, action) {
    switch(action.type) {
        case "USER": return {...state, user: action.payload}
        case "USERFILES": return {...state, userFiles: action.payload}
        case "UPLOADEDFILE": return {...state, file: action.payload}
        case "DELETEDFILEPATH": return {...state, filePath: action.payload}
        case "USER_CODE": return {...state, userCode: action.payload}
        default: return state;
    }
}
const store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(mySagaWatcher);

export default store;