import {combineReducers} from 'redux';
import {deepFreeze} from 'deep-freeze';
import {expect} from 'expect';
import Constants from '../constants/index.js';

export function nodes (nodes = [], action) {
  if (action.type === Constants.Actions.ADD_NODE) {
    Object.assign(action.node, {xPos: action.xPos}, {yPos: action.yPos});
    return [
      ...nodes,
      action.node
    ];
  } else {
    return nodes.map(node => reduceNode(node, action))
  }
}

export function reduceNode (node, action) {

  if (node._id !== action.id) {
    return node;
  }

  switch (action.type) {
    case 'MOVE_NODE':
      const movedNode = Object.assign({}, node, {
        xPos: action.xPos,
        yPos: action.yPos
        });
      return movedNode;
    case 'REMOVE_NODE':
      //TODO: implement
      return [
        ...state, {
          _id: action.id
        }
      ];
    default:
      return node;
  }
}

export const fetchNodeHasErrored = (state = false, action) => {
  switch (action.type) {
    case 'FETCH_NODE_HAS_ERRORED':
      return action.hasErrored;

    default:
      return state;
  }
};

export const fetchNodeIsLoading = (state = false, action) => {
  switch (action.type) {
    case 'FETCH_NODE_IS_LOADING':
      return action.isLoading;

    default:
      return state;
  }
};

export const node = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_NODE_SUCCESS':
      return action.node;
    default:
      return state;
  }
};

const testMoveNode = () => {
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
    type: 'MOVE_NODE',
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
  const deepFreeze = require('deep-freeze');
  deepFreeze(stateBefore);
  deepFreeze(action);

  const expect = require('expect');
  expect(nodes(stateBefore, action)).toEqual(stateAfter);
};

testMoveNode();
