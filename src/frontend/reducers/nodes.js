import Constants from '../constants/';

const initialNodesState = {
  count: 0,
  all_nodes: []
};

export function nodes (state = initialNodesState, action) {
  switch (action.type) {
    case Constants.Actions.ADD_NODE:
      const newNode = Object.assign({}, action.node, {xPos: action.xPos}, {yPos: action.yPos}, {sensors: []});

      //check for duplicates
      for (let i = 0; i < state.all_nodes.length; i++) {
        if (state.all_nodes[i]._id === newNode._id) {
          console.log('duplicate node added');
          return state;
        }
      }

      const newAllNodes = state.all_nodes.concat(newNode);
      return {
        count: newAllNodes.length,
        all_nodes: newAllNodes
      };
    case Constants.Actions.REMOVE_NODE:
    if (state.count !== 0) {
      let nodeToRemove;
      let nodeIndex;

      for (nodeIndex = 0; nodeIndex < state.all_nodes.length; nodeIndex++) {
        if (state.all_nodes[nodeIndex]._id === action._id) {
          nodeToRemove = state.all_nodes[nodeIndex];
        }
      }
      nodeIndex--;
      const updatedNodes = [
        ...state.all_nodes.slice(0, nodeIndex),
        ...state.all_nodes.slice(nodeIndex + 1)
      ];
      return {count: updatedNodes.length, all_nodes: updatedNodes};
    }
    return state;
    case Constants.Actions.MOVE_NODE:
      return {count: state.all_nodes.length, all_nodes: state.all_nodes.map(n => node(n, action))};
    case Constants.Actions.ADD_SENSOR_TO_NODE:
      return {count: state.all_nodes.length, all_nodes: state.all_nodes.map(n => node(n, action))};
    default:
      return state;
  }
}

function node (state = {}, action){
  if (state._id !== action._id) {
    return state;
  }

  switch (action.type) {
    case Constants.Actions.MOVE_NODE:
      const movedNode = Object.assign({}, state, {
        xPos: action.xPos,
        yPos: action.yPos
      });
      return movedNode;
    case Constants.Actions.ADD_SENSOR_TO_NODE:
    const sensors = state.sensors;
    if ((sensors.indexOf(action.sensorId) === -1)) {
      sensors.push(action.sensorId);

      const modifiedNode = Object.assign({}, state, {sensors: sensors});
      return modifiedNode;
    }
    break;
    default:
      return state;
  }
}
