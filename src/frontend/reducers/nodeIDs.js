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


///////////////////////////
//////////TESTS////////////
///////////////////////////
/*
const testAddNode = () => {
  const stateBefore = [];
  const action = {
    type: 'ADD_NODE',
    id: 'testUID123akls-asdlkj2939949-4u58995',
    label: 'testtest'
  };
  const stateAfter = [
    {
      id: 'testUID123akls-asdlkj2939949-4u58995',
      label: 'testtest'
    }
  ];

  deepFreeze(stateBefore);
  deepFreeze(action);
  expect(nodeIDs(stateBefore, action)).toEqual(stateAfter);
};

testAddNode();
console.log('All tests passed!');
*/
