import MQTTClient from './MQTTClient';
import Constants from '../constants/';
import store from '../store';
import * as action from '../action/';

const mqttEvents = Constants.MQTTEvents;


export const bindMQTTEvents = (url) => {
  const client = MQTTClient(url);

  client.bind(mqttEvents.CONNECTION_ESTABLISHED, (message) => {
    console.log(message.toString());
  });

  let nodeYPos = 100, sensorYPos = 100;
  const nodeXPos = 50, sensorXPos = 500;

  // client.bind(mqttEvents.NODE_STATUS, (node) => {
  //   store.dispatch(action.addNode(node, nodeXPos, nodeYPos));
  //   nodeYPos = nodeYPos + 200;
  // });
  client.bind(mqttEvents.NODE_ADDED, (nodeId) => {
    store.dispatch(action.fetchNode(Constants.URLs.FETCH_NODE_URL + nodeId));
    //store.dispatch(action.addNode(node, nodeXPos, nodeYPos));
    //nodeYPos = nodeYPos + 200;
  });
  client.bind(mqttEvents.NODE_REMOVED, (nodeId) => {
    console.log('Node went offline: ' + nodeId);
    //store.dispatch(action.addNode(node, nodeXPos, nodeYPos));
    //nodeYPos = nodeYPos + 200;
  });
  client.bind(mqttEvents.SENSOR_ADDED, (params) => {
    //getSensorStatus(sensorId, sensorXPos, sensorYPos);
    store.dispatch(action.fetchSensor(Constants.URLs.FETCH_SENSOR_URL, params.nodeId, params.sensorId));
    sensorYPos = sensorYPos + 250;
  });
  client.bind(mqttEvents.SENSOR_REMOVED, (sensorId) => {
    //getSensorStatus(sensorId, sensorXPos, sensorYPos);
    sensorYPos = sensorYPos + 250;
  });
  client.bind(mqttEvents.SENSOR_STATUS, (sensor) => {
    store.dispatch(action.addSensor(sensor));
  });
  client.bind(mqttEvents.SENSOR_UPDATED, (params) => {
    store.dispatch(action.updateSensorValue(params.sensorId, params.value));
  });
};
