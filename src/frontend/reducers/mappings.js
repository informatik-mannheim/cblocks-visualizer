import Constants from '../constants/';

const initialMappingsState = {
  count: 0,
  all_mappings: []
};

export function mappings (state = initialMappingsState, action) {
  switch (action.type) {
    case Constants.Actions.ADD_MAPPING:
      const newMapping = Object.assign({}, action.mapping);

      //check for duplicates
      for (let i = 0; i < state.all_mappings.length; i++) {
        if (state.all_mappings[i]._id === newMapping._id) {
          return state;
        }
      }

      const newAllMappings = state.all_mappings.concat(newMapping);
      return {
        count: newAllMappings.length,
        all_mappings: newAllMappings
      };
    case Constants.Actions.REMOVE_MAPPING:
      if (state.count !== 0) {
        let mappingToRemove;
        let mappingIndex;

        for (mappingIndex = 0; mappingIndex < state.all_mappings.length; mappingIndex++) {
          if (state.all_mappings[mappingIndex]._id === action.mappingId) {
            mappingToRemove = state.all_mappings[mappingIndex];
          }
        }
        mappingIndex--;
        const updatedMappings = [
          ...state.all_mappings.slice(0, mappingIndex),
          ...state.all_mappings.slice(mappingIndex + 1)
        ];
        return {count: updatedMappings.length, all_mappings: updatedMappings};
      }
      return state;
    case Constants.Actions.BLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA_MAPPING:
      return {count: state.all_mappings.length, all_mappings: state.all_mappings.map(n => mapping(n, action))};
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
      const movedmapping = Object.assign({}, state, {
        xPos: action.xPos,
        yPos: action.yPos
      });
      return movedmapping;
    default:
      return state;
  }
}
