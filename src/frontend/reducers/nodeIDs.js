import {combineReducers} from 'redux';
import {deepFreeze} from 'deep-freeze';
import {expect} from 'expect';

export const fetchNodeIDsHasErrored = (state = false, action) => {
    switch (action.type) {
        case 'FETCH_NODE_IDS_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
};

export const fetchNodeIDsIsLoading = (state = false, action) => {
    switch (action.type) {
        case 'FETCH_NODE_IDS_IS_LOADING':
            return action.isLoading;
        default:
            return state;
    }
};

export const nodeIDs = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_NODE_IDS_SUCCESS':
      return action.nodeIds;
    default:
      return state;
  }
};
