import { connect } from 'mqtt';
import Constants from '../constants/';
import { subscribe } from 'redux-subscriber';

const isParsableJSON = (jsonString) => {
    try {
        const o = JSON.parse(jsonString);
        return true;
    } catch (e) {
      //ignore
    }
    return false;
};

const mqttEvents = Constants.MQTTEvents;
const MQTTClient = (url) => {
  const client = connect(url);

  const callbacks = {};

  this.requestResourceChange = (objectID, instanceID, resourceID, data) => {
    const topic = 'cblocks-ui/' + objectID + '/' + instanceID + '/' + resourceID + '/input';
    console.log(topic);
    const message = {
      requestID: 1234,
      data: data
    };
    client.publish(topic, message + '');
  };

  const dispatch = (event_name, message) => {
    const chain = callbacks[event_name];
    if (chain === undefined) return;
    for (let i = 0; i < chain.length; i++){
      chain[i](message);
    }
  };

  this.bind = (event_name, callback) => {
    callbacks[event_name] = callbacks[event_name] || [];
    callbacks[event_name].push(callback);
    return this;
  };

  client.on('connect', () => {
    client.subscribe('#');
    client.publish('cblocks-ui', 'connected');
  });

  client.on('message', function (topic, message) {
    let sensorID, instanceID;

    if (message !== null && message !== undefined) {
      switch (true) {
        /*
        UI topic
        */
        case (/cblocks-ui[^\/]/).test(topic):
          if (message === 'connected') {
            dispatch(mqttEvents.CONNECTION_ESTABLISHED, message);
          }
          break;
        /*
        response to a request
        */
        case (/cblocks-ui\/responses/).test(topic):
          const requestID = JSON.parse(message).requestID;
          const success = JSON.parse(message).success;
          const msg = JSON.parse(message).message;

          if (success === true) {
            dispatch(mqttEvents.REQUEST_RESPONSE_RECEIVED, requestID, success, msg);
          }
          break;
        /*
        sensor status change
        */
        case (/^\d+\/\d\/status/).test(topic):
          sensorID = Number((/^(\d+)\/(\d)\/status/).exec(topic)[1]);
          instanceID = Number((/^(\d)+\/(\d)\/status/).exec(topic)[2]);

          if (message.toString() === 'online') {
            console.log(sensorID + '-' + instanceID + ': online');
            dispatch(mqttEvents.SENSOR_ADDED, {sensorID: sensorID, instanceID: instanceID});
          } else if (message.toString() === 'offline') {
            console.log(sensorID + '-' + instanceID + ': offline');
            dispatch(mqttEvents.SENSOR_REMOVED, {sensorID: sensorID, instanceID: instanceID});
          }
          break;
        /*
        sensor value updated
        */
        case (/^\d+\/\d\/\d\/output/).test(topic):
          sensorID = Number((/^(\d+)\/(\d)\/(\d)\/output/).exec(topic)[1]);
          instanceID = Number((/^(\d+)\/(\d)\/(\d)\/output/).exec(topic)[2]);
          const resourceID = Number((/^(\d+)\/(\d)\/(\d)\/output/).exec(topic)[3]);

          let value;
          if (isParsableJSON(message.toString())) {
            value = JSON.parse(message);
          } else {
            value = message.toString();
          }

          dispatch(mqttEvents.SENSOR_UPDATED, {sensorID: sensorID, instanceID: instanceID, resourceID: resourceID, value: value});
          break;
        default:
      }
    }
  });

  const unsubscribeFromRequests = subscribe('requests.totalRequests', state => {

    for (let i = 0; i < state.requests.unresolvedRequests.length; i++) {
      const currentRequest = state.requests.unresolvedRequests[i];
      const topic = 'cblocks-ui/' + currentRequest.objectID + '/' + currentRequest.instanceID + '/' + currentRequest.resourceID + '/input';
      const data = Object.assign({}, {requestID: currentRequest.requestID, data: currentRequest.value});
      client.publish(topic, JSON.stringify(data));
    }
  });

  return this;
};

export default MQTTClient;
