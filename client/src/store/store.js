import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import burgerReducer from './reducers/burgerReducer';
import orderReducer from './reducers/orderReducer';
import authReducer from './reducers/authReducer';

const composeEnhancers = process.env.NODE_ENV === 'development' ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;


const rootReducer = combineReducers({
  burger: burgerReducer,
  order: orderReducer,
  auth: authReducer
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
