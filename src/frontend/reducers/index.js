import {combineReducers} from 'redux';
import {deepFreeze} from 'deep-freeze';
import {expect} from 'expect';
import {fetchNodeIDsHasErrored, fetchNodeIDsIsLoading, nodeIDs} from './nodeIDs';
import {nodes, fetchNodeHasErrored, fetchNodeIsLoading, node} from './nodes';

const sensors = (state = [], action) => {
  switch (action.type) {
    case 'ADD_SENSOR':
      return [
        ...state, {
          id: action.id,
          type: action.type,
          live: false
        }
      ];
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  nodes,
  sensors,
  nodeIDs,
  fetchNodeIDsIsLoading,
  fetchNodeIDsHasErrored
});

export default rootReducer;

///////////////////////////
//////////TESTS////////////
///////////////////////////
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
};

const testAddNodeEmpty = () => {
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

  //deepFreeze(stateBefore);
  //deepFreeze(action);

  //expect(boxes(stateBefore, action)).toEqual(stateAfter);
};

//testAddBox();
//console.log('All tests passed!');
