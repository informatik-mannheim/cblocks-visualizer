import {combineReducers} from 'redux';
import {deepFreeze} from 'deep-freeze';
import {expect} from 'expect';

export function boxes(boxes = [], action) {
  if (action.type === 'ADD_BOX') {
    
    Object.assign(action.box, {xPos: action.xPos}, {yPos: action.yPos});
    return [
      ...boxes,
      action.box
    ];
  } else {
    return boxes.map(box => reduceBox(box, action))
  }
}

export function reduceBox(box, action) {

  if (box._id !== action.id) {
    return box;
  }

  switch (action.type) {
    case 'MOVE_BOX':
      let movedBox = Object.assign({}, box, {
        xPos: action.xPos,
        yPos: action.yPos
        });
      return movedBox;
    case 'REMOVE_BOX':
      //TODO: implement
      return [
        ...state, {
          _id: action.id
        }
      ];
      break;
    default:
      return box;
  }
}

export const fetchBoxHasErrored = (state = false, action) => {
  switch (action.type) {
    case 'FETCH_BOX_HAS_ERRORED':
      return action.hasErrored;

    default:
      return state;
  }
}

export const fetchBoxIsLoading = (state = false, action) => {
  switch (action.type) {
    case 'FETCH_BOX_IS_LOADING':
      return action.isLoading;

    default:
      return state;
  }
}

export const box = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_BOX_SUCCESS':
      return action.box;
      break;
    default:
      return state;
  };
}

const testMoveBox = () => {
  const stateBefore = [
    {
      _id: 'testUID123akls-asdlkj2939949-4u58995',
      label: 'testtest',
      xPos: 50,
      yPos: 50
    }, {
      _id: 'asd1234-asdlkj2939949-4u58995',
      label: 'testtest2',
      xPos: 0,
      yPos: 0
    }
  ];
  const action = {
    type: 'MOVE_BOX',
    id: 'testUID123akls-asdlkj2939949-4u58995',
    xPos: 500,
    yPos: 400
  };
  const stateAfter = [
    {
      _id: 'testUID123akls-asdlkj2939949-4u58995',
      label: 'testtest',
      xPos: 500,
      yPos: 400
    }, {
      _id: 'asd1234-asdlkj2939949-4u58995',
      label: 'testtest2',
      xPos: 0,
      yPos: 0
    }
  ];

  var deepFreeze = require('deep-freeze');
  deepFreeze(stateBefore);
  deepFreeze(action);

  var expect = require('expect');
  expect(boxes(stateBefore, action)).toEqual(stateAfter);
};

testMoveBox();
