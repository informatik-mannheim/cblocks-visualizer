import { connect } from 'mqtt';
import Constants from '../constants/';

const mqttEvents = Constants.MQTTEvents;
const MQTTClient = (url) => {
  const client = connect(url);

  const callbacks = {};

  const dispatch = (event_name, message) => {
    const chain = callbacks[event_name];
    if (typeof chain === 'undefined') return;
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
    client.subscribe('cblocks-ui');
    client.subscribe('nodes/+/status');
    client.subscribe('sensors/+/status');
    client.subscribe('sensors/+/outputs/#');
    client.publish('cblocks-ui', 'connected');
  });

  client.on('message', function (topic, message) {
    let sensorId;

    if (message !== null && typeof message !== 'undefined') {
      switch (true) {
        /*
        UI topic
        */
        case (/cblocks-ui/).test(topic):
          if (message === 'connected') {
            dispatch(mqttEvents.CONNECTION_ESTABLISHED, message);
          }
          break;
        /*
        sensor status change
        */
        case (/sensors\/[^\/]*\/status/).test(topic):
          sensorId = (/sensors\/(.*)\/status/).exec(topic)[1];
          if (JSON.parse(message).status === 'plugged') {
            dispatch(mqttEvents.SENSOR_ADDED, {sensorId: sensorId});
          } else if (JSON.parse(message).status === 'unplugged') {
            dispatch(mqttEvents.SENSOR_REMOVED, sensorId);
          }
          break;
        /*
        sensor value updated
        */
        case (/sensors\/[^\/]*\/outputs\/.*/).test(topic):
          sensorId = (/sensors\/(.*)\/outputs\/.*/).exec(topic)[1];
          //check if number
          if (/^\d+$/.test(message)) {
            const value = JSON.parse(message);
            dispatch(mqttEvents.SENSOR_UPDATED, {sensorId: sensorId, value: value});
          }
          break;
        default:
      }
    }
  });
  return this;
};

export default MQTTClient;
