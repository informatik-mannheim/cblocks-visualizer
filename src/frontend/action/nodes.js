import Constants from '../constants';

export const addNode = (node, xPos = 0, yPos = 0) => ({type: Constants.Actions.ADD_NODE, node, xPos, yPos});

export const moveNode = (nodeId, xPos, yPos) => ({type: Constants.Actions.MOVE_NODE, _id: nodeId, xPos: xPos, yPos: yPos});

export const removeNode = (nodeId) => {
  //TODO: implement and test
};
