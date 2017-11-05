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
    id: 'testUID123akls-asdlkj2939949-4u58995',
    label: 'testtest',
    xPos: 0,
    yPos: 0
  });
  const stateAfter = {
    count: 1,
    all_nodes: [
      {
        id: 'testUID123akls-asdlkj2939949-4u58995',
        label: 'testtest',
        xPos: 0,
        yPos: 0
      }
    ]
  };

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(nodes(stateBefore, action)).toEqual(stateAfter);
};

const nodesTests = () => {
  testAddNode();
  return true;
};

export default nodesTests;
