import deepFreeze from 'deep-freeze';
import expect from 'expect';
import { connections } from '../connections';
import * as actions from '../../action';

const initialConnectionsState = [];

const testAddConnection = () => {
  const stateBefore = initialConnectionsState;
  const action = actions.addConnection('connectionId', 'IDOfNode', 'IDOfSensor');
  const stateAfter = [{sensorId: 'connectionId', nodeHtmlId: 'IDOfNode', sensorHtmlId: 'IDOfSensor'}];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(connections(stateBefore, action)).toEqual(stateAfter);
};

const testAddAnotherConnection = ()=> {
  const stateBefore = [{sensorId: 'connectionId', nodeHtmlId: 'IDOfNode', sensorHtmlId: 'IDOfSensor'}];
  const action = actions.addConnection('connectionId2', 'IDOfNode2', 'IDOfSensor2');
  const stateAfter = [{sensorId: 'connectionId', nodeHtmlId: 'IDOfNode', sensorHtmlId: 'IDOfSensor'}, {sensorId: 'connectionId2', nodeHtmlId: 'IDOfNode2', sensorHtmlId: 'IDOfSensor2'}];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(connections(stateBefore, action)).toEqual(stateAfter);
};
const testAddDuplicateConnection = ()=> {
  const stateBefore = [{sensorId: 'connectionId', nodeHtmlId: 'IDOfNode', sensorHtmlId: 'IDOfSensor'}];
  const action = actions.addConnection('connectionId', 'IDOfNode', 'IDOfSensor');
  const stateAfter = [{sensorId: 'connectionId', nodeHtmlId: 'IDOfNode', sensorHtmlId: 'IDOfSensor'}];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(connections(stateBefore, action)).toEqual(stateAfter);
};

const connectionsTests = () => {
  testAddConnection();
  testAddAnotherConnection();
  testAddDuplicateConnection();
  return true;
};

export default connectionsTests;
