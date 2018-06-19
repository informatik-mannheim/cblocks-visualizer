import Constants from '../constants';

export const addMapping = (mapping) => ({type: Constants.Actions.ADD_MAPPING, mapping});

export const removeMapping = (mappingId) =>
  ({type: Constants.Actions.REMOVE_MAPPING, mappingId});
