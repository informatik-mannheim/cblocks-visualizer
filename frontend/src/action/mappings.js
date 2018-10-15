import Constants from '../constants';

const getURLForMappingType = type => {
  if (type === 'category') return Constants.URLs.FETCH_CATEGORY_MAPPING_URL;
  if (type === 'range') return Constants.URLs.FETCH_RANGE_MAPPING_URL;
  if (type === 'label') return Constants.URLs.FETCH_LABEL_MAPPING_URL;
};

export const addMapping = (mapping) => ({type: Constants.Actions.ADD_MAPPING, mapping});

export const updateMappingValue = (mappingID, value) => ({type: Constants.Actions.UPDATE_MAPPING_VALUE, mappingID, value});

export const removeMapping = (mappingID) =>
  ({type: Constants.Actions.REMOVE_MAPPING, mappingID});

export const fetchMapping = (mappingType, mappingID, value) => {
  return (dispatch) => {
      fetch(getURLForMappingType(mappingType) + '/' + mappingID)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then((response) => response.json())
      .then((mapping) => {
        mapping.mappingType = mappingType;
        mapping.value = value;
        mapping.valueHistory = [];
        mapping.valueHistory[0] = value;
        dispatch(addMapping(mapping));
      })
      .catch((e) => {
         console.log(e);
      });
  };
};

export const newMappingValue = (mappingType, mappingID, value) => {
  return (dispatch, getState) => {
    const isKnownMapping = getState().mappings[mappingID] !== undefined ? true : false;
    if (isKnownMapping === true){
      return updateMappingValue(mappingID, value);
    } else {
      return fetchMapping(mappingType, mappingID, value);
    }
  };
};
