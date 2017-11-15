import Constants from '../constants';

export const updateSensorValue = (_id, value) => {
  return {type: Constants.Actions.UPDATE_SENSOR_VALUE, _id, value};
};

export const moveSensor = (sensorId, xPos, yPos) => {
  return (dispatch, getState) => {
    const htmlIds = getState().htmlIds;
    let sensorHtmlId;
    getState().htmlIds.forEach((mapping) => {
      if (mapping._id === sensorId) {
        sensorHtmlId = mapping.htmlId;
      }
    });
    let thisConnection;
    getState().connections.forEach((conn) => {
      if (conn.sensorHtmlId === sensorHtmlId) {
        thisConnection = conn;
      }
    });
  };
};

export const addSensor = (sensor, xPos = 0, yPos = 0) => {
  return {type: Constants.Actions.ADD_SENSOR, sensor, xPos, yPos};
};
