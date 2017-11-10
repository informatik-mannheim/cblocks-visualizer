import deepFreeze from 'deep-freeze';
import expect from 'expect';
import { connections } from '../connections';
import * as actions from '../../action';

const initialConnectionsState = [];

const testAddConnection = () => {
  const stateBefore = initialConnectionsState;
  const action = actions.addConnection('IDOfNode', 'IDOfSensor');
  const stateAfter = [{ nodeHtmlId: 'IDOfNode', sensorHtmlId: 'IDOfSensor'}];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(connections(stateBefore, action)).toEqual(stateAfter);
};

const testAddAnotherConnection = ()=> {
  const stateBefore = [{ nodeHtmlId: 'IDOfNode', sensorHtmlId: 'IDOfSensor'}];
  const action = actions.addConnection('IDOfNode2', 'IDOfSensor2');
  const stateAfter = [{ nodeHtmlId: 'IDOfNode', sensorHtmlId: 'IDOfSensor'}, { nodeHtmlId: 'IDOfNode2', sensorHtmlId: 'IDOfSensor2'}];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(connections(stateBefore, action)).toEqual(stateAfter);
};
const testAddDuplicateConnection = ()=> {
  const stateBefore = [{ nodeHtmlId: 'IDOfNode', sensorHtmlId: 'IDOfSensor'}];
  const action = actions.addConnection('IDOfNode', 'IDOfSensor');
  const stateAfter = [{ nodeHtmlId: 'IDOfNode', sensorHtmlId: 'IDOfSensor'}];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(connections(stateBefore, action)).toEqual(stateAfter);
};

const testRemoveConnection = () => {
  const stateBefore = [{ nodeHtmlId: 'IDOfNode', sensorHtmlId: 'IDOfSensor'}, { nodeHtmlId: 'IDOfNode2', sensorHtmlId: 'IDOfSensor2'}];
  const action = actions.removeConnection({ nodeHtmlId: 'IDOfNode', sensorHtmlId: 'IDOfSensor'});
  const stateAfter = [{ nodeHtmlId: 'IDOfNode2', sensorHtmlId: 'IDOfSensor2'}];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(connections(stateBefore, action)).toEqual(stateAfter);
};

const connectionsTests = () => {
  testAddConnection();
  testAddAnotherConnection();
  testAddDuplicateConnection();
  testRemoveConnection();
  return true;
};

export default connectionsTests;
