import {ServerEventDispatcher} from './ServerEventDispatcher';
import Constants from '../constants/';
import store from '../store';
import * as action from '../action/';

let socket;
const serverEvents = Constants.ServerEvents;

const getNodeStatus = (nodeId) => {
  socket.send('get_node_status', nodeId);
};

const getSensorStatus = (sensorId) => {
  socket.send('get_sensor_status', sensorId);
};

const defineMappingContinuous = (mappingName, sensorId, resourceId, states) => {
  /*
    states: [{stateName, [fromValue, toValue]}, {stateName, [fromValue, toValue]}]
  */
};

let nodeYPos = 100, sensorYPos = 100;
const nodeXPos = 50, sensorXPos = 500;

const bindEvents = () => {
  socket.bind(serverEvents.NODE_ADDED, (nodeId) => {
    getNodeStatus(nodeId);
  });

  socket.bind(serverEvents.NODE_STATUS, (node) => {
    store.dispatch(action.addNode(node, nodeXPos, nodeYPos));
    nodeYPos = nodeYPos + 200;
  });
  socket.bind(serverEvents.SENSOR_ADDED, (sensorId) => {
    getSensorStatus(sensorId, sensorXPos, sensorYPos);
    sensorYPos = sensorYPos + 250;
  });
  socket.bind(serverEvents.SENSOR_STATUS, (sensor) => {
    store.dispatch(action.addSensor(sensor));
  });
  socket.bind(serverEvents.SENSOR_UPDATED, (message) => {
    store.dispatch(action.updateSensorValue(message._id, message.value));
  });
};

export const connectToServer = (url) => {
  socket = ServerEventDispatcher(url);
  bindEvents();

  socket.send('init', null);
};
