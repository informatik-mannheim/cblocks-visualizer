import Constants from '../constants/';
import clonedeep from 'lodash.clonedeep';

export function mappings (state = {}, action) {
  switch (action.type) {
    case Constants.Actions.ADD_MAPPING:
      if (state[action.mapping.mappingID] !== undefined) return state;
      const newEntry = {};
      newEntry[action.mapping.mappingID] = action.mapping;
      return {...newEntry, ...state};

    case Constants.Actions.REMOVE_MAPPING: {
      if (state[action.mappingID] === undefined) return state;
      const stateClone = clonedeep(state);
      delete stateClone[action.mappingID];
      return stateClone;
    }

    case Constants.Actions.UPDATE_MAPPING_VALUE: {
      if (state[action.mappingID] === undefined) return state;
      const mappingClone = clonedeep(state[action.mappingID]);
      mappingClone.value = action.value;
      if (mappingClone.valueHistory.length >= 100) mappingClone.valueHistory.shift();
      mappingClone.valueHistory = mappingClone.valueHistory.concat(action.value);
      return {...state, [action.mappingID]: mappingClone};
    }

    case Constants.Actions.SET_MAPPING_ACTIVE: {
      if (state[action.mappingID] === undefined) return state;
      const mappingClone = {...clonedeep(state[action.mappingID]), active: true};
      return {...state, [action.mappingID]: mappingClone};
    }

    case Constants.Actions.SET_MAPPING_INACTIVE: {
      if (state[action.mappingID] === undefined) return state;
      const mappingClone = {...clonedeep(state[action.mappingID]), active: false};
      return {...state, [action.mappingID]: mappingClone};
    }

    default:
      return state;
  }
}
