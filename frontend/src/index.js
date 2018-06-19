import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import App from './pages/App';
import store from './store';
import { bindMQTTEvents } from './connection/MQTTEventHandler';
import Constants from './constants/';

const rootEl = document.getElementById('app');

const render = () => {
    ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <App/>
      </Provider>
    </AppContainer>,
    rootEl
  );
};

if (process.env.NODE_ENV !== 'production') {
  if (module.hot) {
    module.hot.accept('./pages/App', render);
  }
}
bindMQTTEvents(Constants.URLs.MQTT_URL);
render();
