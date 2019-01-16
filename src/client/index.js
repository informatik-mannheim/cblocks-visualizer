import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './pages/App';
import store from './store';
import { bindMQTTEvents } from './connection/MQTTEventHandler';
import Constants from './constants/';
import { getUrlFor } from './reducers';

const rootEl = document.getElementById('app');

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    rootEl
  );
};

if (process.env.NODE_ENV !== 'production') {
  if (module.hot) {
    module.hot.accept('./pages/App', render);
  }
}
bindMQTTEvents(getUrlFor(store.getState(), 'mqtt'));
render();
