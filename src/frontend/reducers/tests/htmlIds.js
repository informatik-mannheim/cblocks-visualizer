import deepFreeze from 'deep-freeze';
import expect from 'expect';
import { htmlIds } from '../htmlIds';
import * as actions from '../../action';

const initialHtmlIdsState = [];

const testAddHtmlId = () => {
  const stateBefore = initialHtmlIdsState;
  const action = actions.addHtmlIdMapping('node_id', 'node_html_id');
  const stateAfter = [{_id: 'node_id', htmlId: 'node_html_id'}];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(htmlIds(stateBefore, action)).toEqual(stateAfter);
};

const testAddAnotherHtmlId = ()=> {
  const stateBefore = [{_id: 'node_id', htmlId: 'node_html_id'}];
  const action = actions.addHtmlIdMapping('node_id2', 'node_html_id2');
  const stateAfter = [{_id: 'node_id', htmlId: 'node_html_id'}, {_id: 'node_id2', htmlId: 'node_html_id2'}];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(htmlIds(stateBefore, action)).toEqual(stateAfter);
};
const testAddDuplicateHtmlId = ()=> {
  const stateBefore = [{_id: 'node_id', htmlId: 'node_html_id'}];
  const action = actions.addHtmlIdMapping('node_id', 'other_html_id');
  const stateAfter = [{_id: 'node_id', htmlId: 'node_html_id'}];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(htmlIds(stateBefore, action)).toEqual(stateAfter);
};

const testAddDuplicateId = ()=> {
  const stateBefore = [{_id: 'node_id', htmlId: 'node_html_id'}];
  const action = actions.addHtmlIdMapping('other_node_id', 'node_html_id');
  const stateAfter = [{_id: 'node_id', htmlId: 'node_html_id'}];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(htmlIds(stateBefore, action)).toEqual(stateAfter);
};

const htmlIdsTests = () => {
  testAddHtmlId();
  testAddAnotherHtmlId();
  testAddDuplicateHtmlId();
  testAddDuplicateId();
  return true;
};

export default htmlIdsTests;
