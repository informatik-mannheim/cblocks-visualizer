import Constants from '../constants';
import { refreshConnection } from './connections';

export const updateSensorValue = (_id, value) => {
  return {type: Constants.Actions.UPDATE_SENSOR_VALUE, _id, value};
};

export const move = (sensorId, xPos, yPos) => {
  return {type: Constants.Actions.MOVE_SENSOR, _id: sensorId, xPos: xPos, yPos: yPos};
};

export const moveSensor = (sensorId, xPos, yPos) => {
  return (dispatch, getState) => {
    dispatch(move(sensorId, xPos, yPos));

    let thisConnection;

    getState().connections.forEach((con) => {
      if (con.sensorId === sensorId) {
          thisConnection = con;
      }
    });

    if (typeof thisConnection !== 'undefined') {
      setTimeout(function () {
          dispatch(refreshConnection(thisConnection));
      }, 10);
    }
  };
};

export const addSensor = (sensor, xPos = 500, yPos = 100) => {
  return {type: Constants.Actions.ADD_SENSOR, sensor, xPos, yPos};
};

export const removeSensor = (sensorId) => {
  //TODO: implement and test
};
