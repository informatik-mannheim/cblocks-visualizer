import Constants from '../constants';
import { refreshConnections } from './connections';

export const addNode = (node, xPos = 50, yPos = 100) => ({type: Constants.Actions.ADD_NODE, node, xPos, yPos});

export const moveN = (nodeId, xPos, yPos) => {
  return {type: Constants.Actions.MOVE_NODE, _id: nodeId, xPos: xPos, yPos: yPos};
};

export const moveNode = (nodeId, xPos, yPos) => {
  return (dispatch, getState) => {
    dispatch(moveN(nodeId, xPos, yPos));

    const nodeConnections = [];
    getState().connections.forEach((con) => {
      if (con.nodeId === nodeId) {
          nodeConnections.push(con);
      }
    });

    if (nodeConnections.length > 0) {
      setTimeout(function () {
        dispatch(refreshConnections(nodeConnections));
      }, 10);
    }
  };
};

export const removeNode = (nodeId) =>
  ({type: Constants.Actions.REMOVE_NODE, nodeId});

export const fetchNodeHasErrored = (bool) =>
  ({type: Constants.Actions.FETCH_NODE_HAS_ERRORED, hasErrored: bool});

export const fetchNodeIsLoading = (bool) =>
  ({type: Constants.Actions.FETCH_NODE_IS_LOADING, isLoading: bool});

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
      ).then(
        (node) => {
          dispatch(addNode(node));
          //dispatch(fetchSensorsForNode(node));
        }
     ).catch(() => dispatch(fetchNodeHasErrored(true)));
  };
};
