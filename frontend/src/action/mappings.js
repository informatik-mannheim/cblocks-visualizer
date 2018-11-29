import Constants from '../constants';
import axios from 'axios';

const getURLForMappingType = type => {
  if (type === 'category') return Constants.URLs.CATEGORY_MAPPING_URL;
  if (type === 'range') return Constants.URLs.RANGE_MAPPING_URL;
  if (type === 'label') return Constants.URLs.LABEL_MAPPING_URL;
};

// const getColorCodeForMapping = (getState, resource) => {
//   const sensorsArray = getState().sensors.all_sensors;
//   const mappings = getState().mappings;
//   for (const sens of sensorsArray) {
//     console.log(sens);
//     if (sens.objectID === resource.objectID
//       && sens.instanceID === resource.instanceID) {
//       const relevantMappings = sens.resources[resource.resourceID].mappings;
//       for (const mappingID of relevantMappings) {
//         mappings[mappingID];
//       }
//     }
//   }
// };

export const setMappingActivity = (mappingID, bool) => {
  return bool === true
    ? { type: Constants.Actions.SET_MAPPING_ACTIVE, mappingID: mappingID }
    : { type: Constants.Actions.SET_MAPPING_INACTIVE, mappingID: mappingID };
};

export const addMapping = mapping => ({
  type: Constants.Actions.ADD_MAPPING,
  mapping
});

export const updateMappingValue = (mappingID, value) => ({
  type: Constants.Actions.UPDATE_MAPPING_VALUE,
  mappingID,
  value
});

export const removeMapping = mappingID => ({
  type: Constants.Actions.REMOVE_MAPPING,
  mappingID
});

export const fetchMapping = (mappingType, mappingID, value) => {
  return (dispatch, getState) => {
    axios
      .get(`${getURLForMappingType(mappingType)}/${mappingID}`)
      .then(response => {
        if (response.status !== 200) {
          throw Error(response.statusText);
        }
        return response.data;
      })
      .then(mapping => {
        // const colorCode = getColorCodeForMapping(getState, {
        //   objectID: mapping.objectID,
        //   instanceID: mapping.instanceID,
        //   resourceID: mapping.resourceID
        // });
        // console.log(colorCode);
        // mapping.colorCode = colorCode;
        mapping.mappingType = mappingType;
        mapping.valueHistory = [];
        mapping.value = value;
        mapping.valueHistory[0] = value;
        dispatch(addMapping(mapping));
      })
      .catch(e => {
        console.log(e);
      });
  };
};

export const newMappingValue = (mappingType, mappingID, value) => {
  return (dispatch, getState) => {
    const isKnownMapping
      = getState().mappings[mappingID] !== undefined ? true : false;
    if (isKnownMapping === true) {
      return dispatch(updateMappingValue(mappingID, value));
    } else {
      return dispatch(fetchMapping(mappingType, mappingID, value));
    }
  };
};

export const createNewMapping = (
  mappingType,
  label,
  defaultValue,
  resource,
  ranges
) => {
  const data = {
    label: label,
    default: defaultValue,
    ...resource,
    ranges: ranges
  };
  return dispatch => {
    return axios
      .post(getURLForMappingType(mappingType), data)
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

export const updateMapping = (
  mappingID,
  mappingType,
  label,
  defaultValue,
  resource,
  ranges
) => {
  const data = {
    label: label,
    default: defaultValue,
    ...resource,
    ranges: ranges
  };
  return dispatch => {
    return axios
      .post(`${getURLForMappingType(mappingType)}/${mappingID}`, data)
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
    return axios
      .delete(`${getURLForMappingType(mappingType)}/${mappingID}`)
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
