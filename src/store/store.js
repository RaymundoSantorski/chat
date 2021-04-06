import thunk from 'redux-thunk';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { socketReducer } from '../reducers/socketReducer';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const reducers = combineReducers({
    sockets: socketReducer
});

export const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(thunk))
)