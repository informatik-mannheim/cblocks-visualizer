import MQTTClient from './MQTTClient';
import MQTTMockDataSupplier from './MQTTMockDataSupplier';
import Constants from '../constants/';
import store from '../store';
import * as action from '../action/';

const mqttEvents = Constants.MQTTEvents;

export const bindMQTTEvents = (url) => {
  const client = MQTTClient(url);

  if (Constants.MQTT_MOCKING_ENABLED === true) {
    console.log('MQTT Mocking Enabled');
    MQTTMockDataSupplier(url);
  }

  client.bind(mqttEvents.CONNECTION_ESTABLISHED, (message) => {
    console.log(message.toString());
  });
  client.bind(mqttEvents.SENSOR_ADDED, (params) => {
    store.dispatch(action.fetchSensor(Constants.URLs.FETCH_SENSOR_URL, params.sensorID, params.instanceID));
  });
  client.bind(mqttEvents.SENSOR_REMOVED, (params) => {
    store.dispatch(action.removeSensor(params.sensorID, params.instanceID));
  });
  client.bind(mqttEvents.SENSOR_STATUS, (sensor) => {
    store.dispatch(action.addSensor(sensor));
  });
  client.bind(mqttEvents.SENSOR_UPDATED, (params) => {
    store.dispatch(action.updateSensorValue(params.sensorID, params.instanceID, params.resourceID, params.value));
  });
  client.bind(mqttEvents.REQUEST_RESPONSE_RECEIVED, (params) => {
    store.dispatch(action.handleRequestResponse(params));
  });
  client.bind(mqttEvents.REQUEST_SENT, (params) => {
    store.dispatch(action.sendRequest(params));
  });
  client.bind(mqttEvents.NEW_MAPPING_VALUE, (params) => {
    const mappingState = store.getState().mappings.all_mappings;
    const relevantMapping = mappingState.filter(mapping => mapping.mappingID === params.mappingID);

    if (relevantMapping.length > 0) {
      store.dispatch(action.updateMappingValue(params.mappingID, params.value));
    } else {
      store.dispatch(action.fetchMapping(params.mappingID));
    }
  });
};
