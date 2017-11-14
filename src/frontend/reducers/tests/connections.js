import deepFreeze from 'deep-freeze';
import expect from 'expect';
import { connections } from '../connections';
import * as actions from '../../action';

const initialConnectionsState = [];

const testAddConnection = () => {
  const stateBefore = initialConnectionsState;
  const action = actions.addConnection('HTMLIdSensor', 'HTMLIdNode');
  const stateAfter = [{sensorHtmlId: 'HTMLIdSensor', nodeHtmlId: 'HTMLIdNode'}];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(connections(stateBefore, action)).toEqual(stateAfter);
};

const testAddAnotherConnection = ()=> {
  const stateBefore = [{sensorHtmlId: 'HTMLIdSensor', nodeHtmlId: 'HTMLIdNode'}];
  const action = actions.addConnection('HTMLIdSensor2', 'HTMLIdNode2');
  const stateAfter = [{sensorHtmlId: 'HTMLIdSensor', nodeHtmlId: 'HTMLIdNode'},
    {sensorHtmlId: 'HTMLIdSensor2', nodeHtmlId: 'HTMLIdNode2'}];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(connections(stateBefore, action)).toEqual(stateAfter);
};
const testAddDuplicateConnection = ()=> {
  const stateBefore = [{sensorHtmlId: 'HTMLIdSensor', nodeHtmlId: 'HTMLIdNode'}];
  const action = actions.addConnection('HTMLIdSensor', 'HTMLIdNode');
  const stateAfter = [{sensorHtmlId: 'HTMLIdSensor', nodeHtmlId: 'HTMLIdNode'}];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(connections(stateBefore, action)).toEqual(stateAfter);
};

const testRemoveConnection = () => {
  const stateBefore = [{sensorHtmlId: 'HTMLIdSensor', nodeHtmlId: 'HTMLIdNode'},
    {sensorHtmlId: 'HTMLIdSensor2', nodeHtmlId: 'HTMLIdNode2'}];
  const action = actions.removeConnection(
    {sensorHtmlId: 'HTMLIdSensor', nodeHtmlId: 'HTMLIdNode'});
  const stateAfter = [{sensorHtmlId: 'HTMLIdSensor2', nodeHtmlId: 'HTMLIdNode2'}];

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
