import Constants from '../constants';

export const addNode = (node, xPos = 0, yPos = 0) => ({type: Constants.Actions.ADD_NODE, node, xPos, yPos});

export const moveNode = (nodeId, xPos, yPos) => {
  return (dispatch, getState) => {
    const nodes = getState().nodes;
    //type: Constants.Actions.MOVE_SENSOR, _id: sensorId, xPos: xPos, yPos: yPos};
    //console.log(move('node', nodeId, xPos, yPos))
    return {type: Constants.Actions.MOVE_NODE, nodeId, xPos, yPos};
  };
};
