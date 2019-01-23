import Constants from '../constants';
import axios from 'axios';
import store from '../store';
import { getUrlFor } from '../reducers';

const getURLForMappingType = type => {
  return getUrlFor(store.getState(), type);
};

export const setMappingActivity = (mappingID, bool) => {
  return bool === true
    ? { type: Constants.Actions.SET_MAPPING_ACTIVE, mappingID }
    : { type: Constants.Actions.SET_MAPPING_INACTIVE, mappingID };
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
  return dispatch => {
    axios
      .get(`${getURLForMappingType(mappingType)}/${mappingID}`)
      .then(response => {
        if (response.status !== 200) {
          throw Error(response.statusText);
        }
        return response.data;
      })
      .then(mapping => {
        mapping.mappingType = mappingType;
        mapping.valueHistory = [];
        mapping.value = value;
        mapping.valueHistory[0] = value;
        console.log(mapping);
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

export const createNewMapping = mappingInfo => {
  let data;
  switch (mappingInfo.mappingType) {
    case 'category':
      data = {
        label: mappingInfo.label,
        default: mappingInfo.defaultValue,
        objectID: mappingInfo.resource.objectID,
        instanceID: mappingInfo.resource.instanceID,
        resourceID: mappingInfo.resource.resourceID,
        ranges: mappingInfo.ranges
      };
      break;
    case 'range':
      data = {
        label: mappingInfo.label,
        objectID: mappingInfo.resource.objectID,
        instanceID: mappingInfo.resource.instanceID,
        resourceID: mappingInfo.resource.resourceID,
        greaterEqualsThan: mappingInfo.greaterEqualsThan,
        lessEqualsThan: mappingInfo.lessEqualsThan
      };
      break;
    case 'label':
      //TODO: implement
      data = null;
      break;
    default:
      data = null;
  }

  console.log(data);

  return () => {
    return axios
      .post(
        getURLForMappingType(mappingInfo.mappingType),
        JSON.stringify(data),
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      .then(response => {
        console.log(response);
        if (response.status !== 200) {
          throw Error(response);
        }
      })
      .catch(error => {
        //TODO: proper error handling
        throw Error(error);
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
    label,
    default: defaultValue,
    ...resource,
    ranges
  };
  return () => {
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
