import { connect } from 'mqtt';
import Constants from '../constants/';

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

          console.log(requestID + ': ' + success);

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
            console.log(sensorID + '-' + instanceID + ': offline... ignoring');
            //TODO: take this back in as soon as the offline bug is fixed (hardware)
            //dispatch(mqttEvents.SENSOR_REMOVED, {sensorID: sensorID, instanceID: instanceID});
          }
          break;
        /*
        sensor value updated
        */
        case (/^\d+\/\d\/\d\/output/).test(topic):
          sensorID = Number((/^(\d+)\/(\d)\/(\d)\/output/).exec(topic)[1]);
          instanceID = Number((/^(\d+)\/(\d)\/(\d)\/output/).exec(topic)[2]);
          const resourceID = Number((/^(\d+)\/(\d)\/(\d)\/output/).exec(topic)[3]);

          const value = JSON.parse(message);
          dispatch(mqttEvents.SENSOR_UPDATED, {sensorID: sensorID, instanceID: instanceID, resourceID: resourceID, value: value});
          break;
        default:
      }
    }
  });
  return this;
};

export default MQTTClient;
