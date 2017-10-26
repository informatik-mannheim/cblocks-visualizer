import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';
import initSubscriber from 'redux-subscriber';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
console.log(store.getState());
const subscribe = initSubscriber(store);

export default store;
