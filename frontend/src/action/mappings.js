import Constants from '../constants';
// import store from '../store';

export const addMappings = (mappings) => ({type: Constants.Actions.ADD_MAPPINGS, mappings});

export const updateMappingValue = (mappingID, value) => ({type: Constants.Actions.UPDATE_MAPPING_VALUE, mappingID, value});

export const removeMapping = (mappingId) =>
  ({type: Constants.Actions.REMOVE_MAPPING, mappingId});

export const fetchMappingHasErrored = (bool) =>
  ({type: Constants.Actions.FETCH_MAPPING_HAS_ERRORED, hasErrored: bool});

export const fetchMappingIsLoading = (bool) =>
  ({type: Constants.Actions.FETCH_MAPPING_IS_LOADING, isLoading: bool});

const fetchSpecificMappings = (url) => {
  return dispatch => {
    fetch(
      url
    ).then(
      (response) => {
        if (!response.ok) throw Error(response.statusText);
        return response;
      }
    ).then(
      (response) => response.json()
    ).then(
      (mappings) => dispatch(addMappings(mappings))
    ).catch((e) => {
      console.log(e);
      dispatch(fetchMappingHasErrored(true));
    });
  };
};

const fetchAllMappings = (dispatch) => {
  dispatch(fetchMappingIsLoading(true));
  Promise.all([
    dispatch(fetchSpecificMappings(Constants.URLs.FETCH_CATEGORY_MAPPING_URL)),
    dispatch(fetchSpecificMappings(Constants.URLs.FETCH_RANGE_MAPPING_URL))
    //dispatch(fetchSpecificMappings(Constants.URLs.FETCH_LABEL_MAPPING_URL))
  ]);
};

export const fetchMapping = (mappingID) => {
  return (dispatch, getState) => {
    const mappingsState = getState().mappings.all_mappings;
    const currentMapping = mappingsState.find(el => (mappingID === el.mappingID));
    if (currentMapping !== undefined){
      console.log('Mapping is known');
    } else {
      return fetchAllMappings(dispatch);
    }
  };
};
