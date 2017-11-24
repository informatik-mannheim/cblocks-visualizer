import Constants from '../constants';
import { refreshConnection } from './connections';

export const updateSensorValue = (_id, value) => {
  return {type: Constants.Actions.UPDATE_SENSOR_VALUE, _id, value};
};

export const move = (sensorId, xPos, yPos) => {
  return {type: Constants.Actions.MOVE_SENSOR, _id: sensorId, xPos: xPos, yPos: yPos};
};

export const moveSensor = (sensorId, xPos, yPos) => {
  return (dispatch) => {
    dispatch(move(sensorId, xPos, yPos));
    setTimeout(function () {
      dispatch(refreshConnection({sensorId: 'pressure_sensor_id', nodeId: 'node1_id'}));
    }, 10);
  };
};

export const addSensor = (sensor, xPos = 500, yPos = 100) => {
  return {type: Constants.Actions.ADD_SENSOR, sensor, xPos, yPos};
};

export const removeSensor = (sensorId) => {
  //TODO: implement and test
};
