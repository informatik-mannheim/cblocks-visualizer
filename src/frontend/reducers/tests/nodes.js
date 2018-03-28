import deepFreeze from 'deep-freeze';
import expect from 'expect';
import { nodes } from '../nodes';
import * as actions from '../../action';

const initialNodesState = {
  count: 0,
  all_nodes: []
};

const testAddNode = () => {
  const stateBefore = initialNodesState;
  const action = actions.addNode({
    _id: 'testUID123akls-asdlkj2939949-4u58995',
    label: 'testtest',
    xPos: 0,
    yPos: 0
  });
  const stateAfter = {
    count: 1,
    all_nodes: [
      {
        _id: 'testUID123akls-asdlkj2939949-4u58995',
        label: 'testtest',
        sensors: [],
        xPos: 50,
        yPos: 100
      }
    ]
  };

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(nodes(stateBefore, action)).toEqual(stateAfter);
};

const testMoveNode = () => {
  const stateBefore = {
    count: 1,
    all_nodes: [
      {
        _id: '59510e6f8eed6e32225a752d',
        label: 'Stuhl',
        sensors: [
          '5937b05823d3e908cc271eab'
        ],
        xPos: 0,
        yPos: 0
      }
    ]
  };
  const action = actions.moveN('59510e6f8eed6e32225a752d', 500, 500);
  const stateAfter = {
    count: 1,
    all_nodes: [
      {
        _id: '59510e6f8eed6e32225a752d',
        label: 'Stuhl',
        sensors: [
          '5937b05823d3e908cc271eab'
        ],
        xPos: 500,
        yPos: 500
      }
    ]
  };

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(nodes(stateBefore, action)).toEqual(stateAfter);
};

const testAddDuplicateNode = () => {
  const stateBefore = {
    count: 1,
    all_nodes: [
      {
        _id: '59510e6f8eed6e32225a752d',
        label: 'Stuhl',
        sensors: [
          '5937b05823d3e908cc271eab'
        ],
        xPos: 0,
        yPos: 0
      }
    ]
  };
  const action = actions.addNode({
    _id: '59510e6f8eed6e32225a752d',
    label: 'testtest',
    xPos: 0,
    yPos: 0
  });
  const stateAfter = stateBefore;

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(nodes(stateBefore, action)).toEqual(stateAfter);
};

const testRemoveNode = () => {
  const stateBefore = {
    count: 1,
    all_nodes: [
      {
        _id: '59510e6f8eed6e32225a752d',
        label: 'Stuhl',
        sensors: [
          '5937b05823d3e908cc271eab'
        ],
        xPos: 0,
        yPos: 0
      }
    ]
  };
  const action = actions.removeNode('59510e6f8eed6e32225a752d');
  const stateAfter = initialNodesState;

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(nodes(stateBefore, action)).toEqual(stateAfter);
};

const testRemoveNode2 = () => {
  const stateBefore = {
    count: 2,
    all_nodes: [
      {
        _id: '59510e6f8eed6e32225a752d',
        label: 'Stuhl',
        sensors: [
          '5937b05823d3e908cc271eab'
        ],
        xPos: 0,
        yPos: 0
      },
      {
        _id: 'asdasdasd',
        label: 'ffffuuuuu',
        sensors: [
          '5937b05823d3e908cc271eab',
          'sdasddddddddddddddddd'
        ],
        xPos: 100,
        yPos: 0
      }
    ]
  };
  const action = actions.removeNode('59510e6f8eed6e32225a752d');
  const stateAfter = {
    count: 1,
    all_nodes: [
      {
        _id: 'asdasdasd',
        label: 'ffffuuuuu',
        sensors: [
          '5937b05823d3e908cc271eab',
          'sdasddddddddddddddddd'
        ],
        xPos: 100,
        yPos: 0
      }
    ]
  };

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(nodes(stateBefore, action)).toEqual(stateAfter);
};

const testRemoveNodeEmpty = () => {
  const stateBefore = initialNodesState;
  const action = actions.removeNode('59510e6f8eed6e32225a752d');
  const stateAfter = initialNodesState;

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(nodes(stateBefore, action)).toEqual(stateAfter);
};

const nodesTests = () => {
  testAddNode();
  testMoveNode();
  testAddDuplicateNode();
  testRemoveNode();
  testRemoveNodeEmpty();
  return true;
};

export default nodesTests;
