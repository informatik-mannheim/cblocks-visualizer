import {URLs, Actions} from '../Constants';
//TODO: make syntax the same everywhere...

export const addNode = (node, xPos = 0, yPos = 0) => ({type: Actions.ADD_NODE, node, xPos, yPos});


export const fetchNodeIDsHasErrored = (bool) =>
  ({type: Actions.FETCH_NODE_IDS_HAS_ERRORED, hasErrored: bool});

export const fetchNodeIDsIsLoading = (bool) => {
  return {type: Actions.FETCH_NODE_IDS_IS_LOADING, isLoading: bool};
};

export const fetchNodeHasErrored = (bool) =>
  ({type: Actions.FETCH_NODE_HAS_ERRORED, hasErrored: bool});

export const fetchNodeIsLoading = (bool) =>
  ({type: Actions.FETCH_NODE_IS_LOADING, isLoading: bool});

export const fetchNode = (url) => {
  return (dispatch) => {
    dispatch(fetchNodeIsLoading(true));

    fetch(url).then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }

      dispatch(fetchNodeIsLoading(false));
      return response;
    }).then((response) => response.json()
      ).then((node) => dispatch(addNode(node))
        ).catch(() => dispatch(fetchNodeHasErrored(true)));
  };
};

export const fetchNodeIDsSuccess = (nodeIds) => {
  return (dispatch) => {
    for (let i = 0; i < nodeIds.length; i++){
      dispatch(fetchNode(URLs.FETCH_NODE_URL + nodeIds[i]));
    }
  };
};

export const fetchNodeIDs = (url) => {
  return (dispatch) => {
    dispatch(fetchNodeIDsIsLoading(true));
    fetch(url).then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      dispatch(fetchNodeIDsIsLoading(false));

      return response;
    }).then((response) => response.json()).then((nodeIds) =>
      dispatch(fetchNodeIDsSuccess(nodeIds))
      ).catch(() => dispatch(fetchNodeIDsHasErrored(true)));
  };
};

export const fetchNodeSuccess = (node) => {
  return {type: Actions.FETCH_NODE_SUCCESS, node};
};

export const moveNode = (nodeId, xPos, yPos) => {
  return {type: 'MOVE_NODE', id: nodeId, xPos: xPos, yPos: yPos};
};
