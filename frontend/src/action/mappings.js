import Constants from '../constants';
import axios from 'axios';

const getURLForMappingType = type => {
  if (type === 'category') return Constants.URLs.CATEGORY_MAPPING_URL;
  if (type === 'range') return Constants.URLs.RANGE_MAPPING_URL;
  if (type === 'label') return Constants.URLs.LABEL_MAPPING_URL;
};

export const addMapping = mapping =>
  ({type: Constants.Actions.ADD_MAPPING, mapping});

export const updateMappingValue = (mappingID, value) =>
  ({type: Constants.Actions.UPDATE_MAPPING_VALUE, mappingID, value});

export const removeMapping = mappingID =>
  ({type: Constants.Actions.REMOVE_MAPPING, mappingID});

export const fetchMapping = (mappingType, mappingID, value) => {
  console.log(`fetching ${mappingType} mappings...`);
  return (dispatch) => {
     axios.get(`${getURLForMappingType(mappingType)}/${mappingID}`)
      .then((response) => {
        if (response.status !== 200) {
          throw Error(response.statusText);
        }
        return response.data;
      })
      .then((mapping) => {
        mapping.mappingType = mappingType;
        mapping.valueHistory = [];
        mapping.value = value;
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
      return dispatch(updateMappingValue(mappingID, value));
    } else {
      return dispatch(fetchMapping(mappingType, mappingID, value));
    }
  };
};

export const createNewMapping = (mappingType, label, defaultValue, resource, ranges) => {
  const data = {
    label: label,
    default: defaultValue,
    ...resource,
    ranges: ranges
  };
  return dispatch => {
    return axios.post(getURLForMappingType(mappingType), data)
      .then(response => {
        if (response.status !== 200) {
          throw Error(response.statusText);
        }
      })
      .catch(error => {
        //TODO: proper error handling
        console.log(error);
      });
  };
};

export const updateMapping = (mappingID, mappingType, label, defaultValue, resource, ranges) => {
  const data = {
    label: label,
    default: defaultValue,
    ...resource,
    ranges: ranges
  };
  return dispatch => {
    return axios.post(`${getURLForMappingType(mappingType)}/${mappingID}`, data)
      .then(response => {
        if (response.status !== 200) {
          throw Error(response.statusText);
        }
      })
      .catch(error => {
        //TODO: proper error handling
        console.log(error);
      });
  };
};

export const deleteMapping = (mappingType, mappingID) => {
  return dispatch => {
    return axios.delete(`${getURLForMappingType(mappingType)}/${mappingID}`)
      .then(response => {
        if (response.status !== 204) {
          throw Error(response.statusText);
        }
        return dispatch(removeMapping(mappingID));
      })
      .catch(error => {
        //TODO: proper error handling
        console.log(error);
      });
  };
};
