import Constants from '../constants/';

export function mappings (state = {}, action) {
  switch (action.type) {
    case Constants.Actions.ADD_MAPPING:
      if (state[action.mapping.mappingID] !== undefined) return state;
      const newEntry = {};
      newEntry[action.mapping.mappingID] = action.mapping;
      return {...newEntry, ...state};

    case Constants.Actions.REMOVE_MAPPING:
      if (state[action.mappingID] === undefined) return state;
      const stateClone = Object.assign({}, state);
      delete stateClone[action.mappingID];
      return stateClone;

    case Constants.Actions.UPDATE_MAPPING_VALUE:
      if (state[action.mappingID] === undefined) return state;
      const mappingClone = Object.assign({}, state[action.mappingID]);
      mappingClone.value = action.value;
      if (mappingClone.valueHistory.length >= 100) mappingClone.valueHistory.shift();
      mappingClone.valueHistory = mappingClone.valueHistory.concat(action.value);
      return {...state, [action.mappingID]: mappingClone};

    default:
      return state;

  }
}
