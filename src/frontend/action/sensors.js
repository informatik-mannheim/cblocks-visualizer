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
  return {type: Constants.Actions.REMOVE_SENSOR, sensorId};
};

export const fetchSensorHasErrored = (bool) =>
  ({type: Constants.Actions.FETCH_SENSOR_HAS_ERRORED, hasErrored: bool});

export const fetchSensorIsLoading = (bool) =>
  ({type: Constants.Actions.FETCH_SENSOR_IS_LOADING, isLoading: bool});

export const addSensorToNode = (nodeId, sensorId) => ({type: Constants.Actions.ADD_SENSOR_TO_NODE, _id: nodeId, sensorId: sensorId});

export const fetchSensor = (url, nodeId, sensorId) => {
  return (dispatch, getState) => {
    if (getState().nodes.count !== 0) {
      dispatch(fetchSensorIsLoading(true));

      fetch(url + sensorId).then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(fetchSensorIsLoading(false));
        return response;
      }).then((response) => response.json()
        ).then(
          (sens) => {
            dispatch(addSensorToNode(nodeId, sensorId));
            dispatch(addSensor(sens));
          }
       ).catch((e) => {
         console.log(e);
         dispatch(fetchSensorHasErrored(true));
       }
     );
    }
  };
};
