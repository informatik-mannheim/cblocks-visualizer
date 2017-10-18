import {combineReducers} from 'redux';
import {deepFreeze} from 'deep-freeze';
import {expect} from 'expect';

export const fetchBoxIDsHasErrored = (state = false, action) => {
    switch (action.type) {
        case 'FETCH_BOX_IDS_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
};

export const fetchBoxIDsIsLoading = (state = false, action) => {
    switch (action.type) {
        case 'FETCH_BOX_IDS_IS_LOADING':
            return action.isLoading;
        default:
            return state;
    }
};

export const boxIDs = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_BOX_IDS_SUCCESS':
      return action.boxIds;
    default:
      return state;
  }
};


///////////////////////////
//////////TESTS////////////
///////////////////////////
/*
const testAddBox = () => {
  const stateBefore = [];
  const action = {
    type: 'ADD_BOX',
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
  expect(boxIDs(stateBefore, action)).toEqual(stateAfter);
};

testAddBox();
console.log('All tests passed!');
*/
