import Constants from '../constants/';

const initialMappingsState = {
  count: 0,
  all_mappings: []
};

const mappingIdIsInArray = (m, currentMappings) => {
  let isInArray = false;
  currentMappings.forEach((currentMapping) => {if (currentMapping.mappingID === m.mappingID) isInArray = true;});
  return isInArray;
};

export function mappings (state = initialMappingsState, action) {
  switch (action.type) {
    case Constants.Actions.ADD_MAPPINGS:
      let newMappings = [];
      state.all_mappings.forEach((m) => {
        if (!mappingIdIsInArray(m, action.mappings)) {
          m.value = '';
          m.valueHistory = [];
          newMappings.push(m);
        }
      });
      const actionMappingsClone = [];
      action.mappings.forEach((m) => {
        const mClone = Object.assign({}, m);
        mClone.value = '';
        mClone.valueHistory = [];
        actionMappingsClone.push(m);
      });
      newMappings = newMappings.concat(actionMappingsClone);

      return {
        count: newMappings.length,
        all_mappings: newMappings
      };
      case Constants.Actions.UPDATE_MAPPING_VALUE:
        return {count: state.all_mappings.length, all_mappings: state.all_mappings.map(currentMapping => mapping(currentMapping, action))};
    case Constants.Actions.REMOVE_MAPPING:
    if (state.count !== 0) {
      const updatedMappings = state.all_mappings.filter(item => (item.mappingID !== action.mappingID));
      return {count: updatedMappings.length, all_mappings: updatedMappings};
    }
    return state;
    default:
      return state;
  }
}

function mapping (state = {}, action) {
  if (state.mappingID !== action.mappingID) {
    return state;
  }

  switch (action.type) {
    case Constants.Actions.UPDATE_MAPPING_VALUE:

      const mappingToUpdate = Object.assign({}, state);
      //Replace old values with new values
      mappingToUpdate.value = action.value;

      //Add new values to valueHistory if max 100 values, else delete oldest
      if (mappingToUpdate.valueHistory !== undefined) {
        if (mappingToUpdate.valueHistory.length >= 100) {
          mappingToUpdate.valueHistory.shift();
        }
        mappingToUpdate.valueHistory = mappingToUpdate.valueHistory.concat(action.value);
      }

      return mappingToUpdate;
    default:
      return state;
  }
}
