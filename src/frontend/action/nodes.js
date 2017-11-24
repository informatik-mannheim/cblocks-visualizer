import Constants from '../constants';
import { refreshConnections } from './connections';

export const addNode = (node, xPos = 50, yPos = 100) => ({type: Constants.Actions.ADD_NODE, node, xPos, yPos});

export const moveN = (nodeId, xPos, yPos) => {
  return {type: Constants.Actions.MOVE_NODE, _id: nodeId, xPos: xPos, yPos: yPos};
};

export const moveNode = (nodeId, xPos, yPos) => {
  return (dispatch, getState) => {
    dispatch(moveN(nodeId, xPos, yPos));

    const nodeConnections = [];
    getState().connections.forEach((con) => {
      if (con.nodeId === nodeId) {
          nodeConnections.push(con);
      }
    });

    if (nodeConnections.length > 0) {
      setTimeout(function () {
        dispatch(refreshConnections(nodeConnections));
      }, 10);
    }
  };
};

export const removeNode = (nodeId) => {
  //TODO: implement and test
};
