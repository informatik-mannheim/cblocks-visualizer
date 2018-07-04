import Constants from '../constants';

export const updateSensorValue = (sensorID, instanceID, resourceID, value) => {
  return {type: Constants.Actions.UPDATE_SENSOR_VALUE, sensorID, instanceID, resourceID, value};
};

export const move = (sensorID, instanceID, xPos, yPos) => {
  return {type: Constants.Actions.MOVE_SENSOR, sensorID: sensorID, instanceID: instanceID, xPos: xPos, yPos: yPos};
};

export const moveSensor = (sensorID, instanceID, xPos, yPos) => {
  return (dispatch) => {
    dispatch(move(sensorID, instanceID, xPos, yPos));
  };
};

export const addSensor = (sensor, instanceID, xPos = 500, yPos = 100) => {
  return {type: Constants.Actions.ADD_SENSOR, sensor, instanceID, xPos, yPos};
};

export const removeSensor = (objectID, instanceID) => {
  return {type: Constants.Actions.REMOVE_SENSOR, objectID, instanceID};
};

export const fetchSensorHasErrored = (bool) =>
  ({type: Constants.Actions.FETCH_SENSOR_HAS_ERRORED, hasErrored: bool});

export const fetchSensorIsLoading = (bool) =>
  ({type: Constants.Actions.FETCH_SENSOR_IS_LOADING, isLoading: bool});

export const fetchSensor = (url, sensorID, instanceID) => {
  return (dispatch) => {
      dispatch(fetchSensorIsLoading(true));

      fetch(url + sensorID).then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(fetchSensorIsLoading(false));
        return response;
      }).then((response) => response.json()
        ).then(
          (sens) => {
            dispatch(addSensor(sens, instanceID));
          }
       ).catch((e) => {
         console.log(e);
         dispatch(fetchSensorHasErrored(true));
       }
     );
  };
};
