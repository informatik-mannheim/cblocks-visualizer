import {ServerEventDispatcher} from './ServerEventDispatcher';
import Constants from '../constants/';
import store from '../store';
import * as action from '../action/';
/*
Simplified WebSocket events dispatcher (no channels, no users)
var socket = new FancyWebSocket();
// bind to server events
socket.bind('some_event', function(data){
  alert(data.name + ' says: ' + data.message)
});
// broadcast events to all connected users
socket.send( 'some_event', {name: 'ismael', message : 'Hello world'} );
*/
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

const bindEvents = () => {
  socket.bind(serverEvents.NODE_ADDED, (nodeId) => {
    getNodeStatus(nodeId);
  });
  socket.bind(serverEvents.NODE_STATUS, (node) => {
    store.dispatch(action.addNode(node));
  });
  socket.bind(serverEvents.SENSOR_ADDED, (sensorId) => {
    getSensorStatus(sensorId);
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
