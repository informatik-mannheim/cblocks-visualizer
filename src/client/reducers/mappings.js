import Constants from '../constants/';
import clonedeep from 'lodash.clonedeep';

export function mappings (state = {}, action) {
  switch (action.type) {
    case Constants.Actions.ADD_MAPPING:
      if (state[action.mapping.mappingID] !== undefined) return state;
      const newEntry = {};
      newEntry[action.mapping.mappingID] = action.mapping;
      newEntry[action.mapping.mappingID].active = false;
      return { ...newEntry, ...state };

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
      if (mappingClone.valueHistory.length >= 100) {
        mappingClone.valueHistory.shift();
      }
      mappingClone.valueHistory = mappingClone.valueHistory.concat(
        action.value
      );
      return { ...state, [action.mappingID]: mappingClone };
    }

    case Constants.Actions.SET_MAPPING_ACTIVE: {
      if (state[action.mappingID] === undefined) return state;
      const owningResource = {
        objectID: state[action.mappingID].objectID,
        instanceID: state[action.mappingID].instanceID,
        resourceID: state[action.mappingID].resourceID
      };

      const relatedMappings = {};
      for (const mappingID in state) {
        if (
          state[mappingID].objectID === owningResource.objectID
          && state[mappingID].instanceID === owningResource.instanceID
          && state[mappingID].resourceID === owningResource.resourceID
          && mappingID !== action.mappingID
        ) {
          relatedMappings[mappingID] = {
            ...clonedeep(state[mappingID]),
            active: false
          };
        }
      }

      const mappingClone = {
        ...clonedeep(state[action.mappingID]),
        active: true
      };
      relatedMappings[action.mappingID] = mappingClone;
      return { ...state, ...relatedMappings };
    }

    case Constants.Actions.SET_MAPPING_INACTIVE: {
      if (state[action.mappingID] === undefined) return state;
      const mappingClone = {
        ...clonedeep(state[action.mappingID]),
        active: false
      };
      return { ...state, [action.mappingID]: mappingClone };
    }

    default:
      return state;
  }
}
