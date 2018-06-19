import deepFreeze from 'deep-freeze';
import expect from 'expect';
import { connections } from '../connections';
import * as actions from '../../action';

const initialConnectionsState = [];

const testAddConnection = () => {
  const stateBefore = initialConnectionsState;
  const action = actions.addConnection('IdSensor', 'IdNode');
  const stateAfter = [{sensorId: 'IdSensor', nodeId: 'IdNode'}];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(connections(stateBefore, action)).toEqual(stateAfter);
};

const testAddAnotherConnection = ()=> {
  const stateBefore = [{sensorId: 'IdSensor', nodeId: 'IdNode'}];
  const action = actions.addConnection('IdSensor2', 'IdNode2');
  const stateAfter = [{sensorId: 'IdSensor', nodeId: 'IdNode'},
    {sensorId: 'IdSensor2', nodeId: 'IdNode2'}];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(connections(stateBefore, action)).toEqual(stateAfter);
};
const testAddDuplicateConnection = ()=> {
  const stateBefore = [{sensorId: 'IdSensor', nodeId: 'IdNode'}];
  const action = actions.addConnection('IdSensor', 'IdNode');
  const stateAfter = [{sensorId: 'IdSensor', nodeId: 'IdNode'}];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(connections(stateBefore, action)).toEqual(stateAfter);
};

const testRemoveConnection = () => {
  const stateBefore = [{sensorId: 'IdSensor', nodeId: 'IdNode'},
    {sensorId: 'IdSensor2', nodeId: 'IdNode2'}];
  const action = actions.removeConnection(
    {sensorId: 'IdSensor', nodeId: 'IdNode'});
  const stateAfter = [{sensorId: 'IdSensor2', nodeId: 'IdNode2'}];

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
