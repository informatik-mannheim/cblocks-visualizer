import Constants from '../constants/';

const initialMappingsState = {
  mappings: []
};
/*
{
  _id: 'mapping1',
  name: 'Kilogram Mapping',
  sensorId: 'pressure_sensor',
  ressourceId: '2',
}
*/

export function mappings (state = initialMappingsState, action) {
  switch (action.type) {
    case Constants.Actions.ADD_MAPPING:
      console.log(action.mapping);
      const newMapping = Object.assign({}, action.mapping, {sensorId: action.sensorId});

      //check for duplicates
      for (let i = 0; i < state.all_nodes.length; i++) {
        if (state.all_nodes[i]._id === newNode._id) {
          return state;
        }
      }

      const newAllNodes = state.all_nodes.concat(newNode);
      return {
        count: newAllNodes.length,
        all_nodes: newAllNodes
      };
    case Constants.Actions.ZZZZZZZZZ:
      return {count: state.all_nodes.length, all_nodes: state.all_nodes.map(n => node(n, action))};
    default:
      return state;
  }
}

function mapping (state = {}, action){
  if (state._id !== action._id) {
    return state;
  }

  console.log(state);
  console.log(action);
  switch (action.type) {
    case Constants.Actions.ZZZZZZZZZ:
      const movedNode = Object.assign({}, state, {
        xPos: action.xPos,
        yPos: action.yPos
      });
      return movedNode;
    default:
      return state;
  }
}
