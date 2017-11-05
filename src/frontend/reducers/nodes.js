import Constants from '../constants/';

const initialNodesState = {
  count: 0,
  all_nodes: []
};

export function nodes (state = initialNodesState, action) {
  switch (action.type) {
    case Constants.Actions.ADD_NODE:
      const newNode = Object.assign({}, action.node, {xPos: action.xPos}, {yPos: action.yPos});
        const newAllNodes = state.all_nodes.concat(newNode);
        return {
          count: newAllNodes.length,
          all_nodes: newAllNodes
        };
    case Constants.Actions.MOVE_NODE:
      return {count: state.all_nodes.length, all_nodes: state.all_nodes.map(n => node(n, action))};
    default:
      return state;
  }
}

function node (state = {}, action){
  if (state._id !== action.id) {
    return state;
  }

  switch (action.type) {
    case Constants.Actions.MOVE_NODE:
      const movedNode = Object.assign({}, state, {
        xPos: action.xPos,
        yPos: action.yPos
      });
      return movedNode;
    default:
      return state;
  }
}
/*
export const fetchNodeHasErrored = (state = false, action) => {
  switch (action.type) {
    case Constants.Actions.FETCH_NODE_HAS_ERRORED:
      return action.hasErrored;

    default:
      return state;
  }
};

export const fetchNodeIsLoading = (state = false, action) => {
  switch (action.type) {
    case Constants.Actions.FETCH_NODE_IS_LOADING:
      return action.isLoading;

    default:
      return state;
  }
};

export const node = (state = '{}', action) => {
  switch (action.type) {
    case Constants.Actions.FETCH_NODE_SUCCESS:
      return action.node;
    default:
      return state;
  }
};
*/
