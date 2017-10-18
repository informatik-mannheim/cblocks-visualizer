import {combineReducers} from 'redux';
import {deepFreeze} from 'deep-freeze';
import {expect} from 'expect';
import {fetchBoxIDsHasErrored, fetchBoxIDsIsLoading, boxIDs} from './boxIDs';
import {boxes, fetchBoxHasErrored, fetchBoxIsLoading, box} from './boxes';

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
  boxes,
  sensors,
  boxIDs,
  fetchBoxIDsIsLoading,
  fetchBoxIDsHasErrored
});

export default rootReducer;

///////////////////////////
//////////TESTS////////////
///////////////////////////
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

  //deepFreeze(stateBefore);
  //deepFreeze(action);

  //expect(boxes(stateBefore, action)).toEqual(stateAfter);
};

const testAddBoxEmpty = () => {
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

  //deepFreeze(stateBefore);
  //deepFreeze(action);

  //expect(boxes(stateBefore, action)).toEqual(stateAfter);
};

//testAddBox();
//console.log('All tests passed!');
