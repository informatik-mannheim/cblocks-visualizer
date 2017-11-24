import Constants from '../constants';
import { refreshConnection } from './connections';

export const addNode = (node, xPos = 50, yPos = 100) => ({type: Constants.Actions.ADD_NODE, node, xPos, yPos});

export const moveN = (nodeId, xPos, yPos) => {
  return {type: Constants.Actions.MOVE_NODE, _id: nodeId, xPos: xPos, yPos: yPos};
};

export const moveNode = (nodeId, xPos, yPos) => {
  return (dispatch) => {
    dispatch(moveN(nodeId, xPos, yPos));
    dispatch(refreshConnection({sensorId: 'pressure_sensor_id', nodeId: 'node1_id'}));
  };
};

export const removeNode = (nodeId) => {
  //TODO: implement and test
};
