import {URLs} from '../Constants';

const ADD_BOX = 'ADD_BOX';
const ADD_SENSOR = 'ADD_SENSOR';
const FETCH_BOX_IDS_HAS_ERRORED = 'FETCH_BOX_IDS_HAS_ERRORED';
const FETCH_BOX_IDS_IS_LOADING = 'FETCH_BOX_IDS_IS_LOADING';
const FETCH_BOX_IDS_SUCCESS = 'FETCH_BOX_IDS_SUCCESS';


//TODO: Make above constants usable in other files
//TODO: make syntax the same everywhere...

export const addBox = (box, xPos = 0, yPos = 0) => ({type: ADD_BOX, box, xPos, yPos})

export const fetchBoxIDsHasErrored = (bool) =>
  ({type: 'FETCH_BOX_IDS_HAS_ERRORED', hasErrored: bool})

export const fetchBoxIDsIsLoading = (bool) => {
  return {type: 'FETCH_BOX_IDS_IS_LOADING', isLoading: bool};
}

export const fetchBoxIDsSuccess = (boxIds) => {
  return (dispatch) => {
    for (let i=0; i<boxIds.length; i++){
      dispatch(fetchBox(URLs.FETCH_BOX_URL + boxIds[i]));
    }
  };
}

export const fetchBoxIDs = (url) => {
  return (dispatch) => {
    dispatch(fetchBoxIDsIsLoading(true));
    fetch(url).then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }

      dispatch(fetchBoxIDsIsLoading(false));

      return response;
    }).then((response) => response.json()).then((boxIds) =>
      dispatch(fetchBoxIDsSuccess(boxIds))
      ).catch(() => dispatch(fetchBoxIDsHasErrored(true)));
  };
}

export const fetchBoxHasErrored = (bool) =>
  ({type: 'FETCH_BOX_HAS_ERRORED', hasErrored: bool})

export const fetchBoxIsLoading = (bool) => {
  return {type: 'FETCH_BOX_IS_LOADING', isLoading: bool};
}

export const fetchBoxSuccess = (box) => {
  return {type: 'FETCH_BOX_SUCCESS', box};
}

export const moveBox = (boxId, xPos, yPos) => {
  return {type: 'MOVE_BOX', id: boxId, xPos: xPos, yPos: yPos};
}

export const fetchBox = (url) => {
  return (dispatch) => {
    dispatch(fetchBoxIsLoading(true));
    fetch(url).then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }

      dispatch(fetchBoxIsLoading(false));
      return response;
    }).then((response) => response.json()).then((box) => dispatch(addBox(box))).catch(() => dispatch(fetchBoxHasErrored(true)));
  };
}
