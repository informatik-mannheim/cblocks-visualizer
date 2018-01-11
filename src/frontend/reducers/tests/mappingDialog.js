import deepFreeze from 'deep-freeze';
import expect from 'expect';
import { mappingDialog } from '../mappingDialog';
import * as actions from '../../action';

const initialMappingDialog = {
  active: false,
  nodeId: '',
  sensorId: ''
};

const testOpenDialog = () => {
  const stateBefore = initialMappingDialog;
  const action = actions.openMappingDialog('node1_id');
  const stateAfter = {
    active: true,
    nodeId: 'node1_id',
    sensorId: ''
  };

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(mappingDialog(stateBefore, action)).toEqual(stateAfter);
};

const testCloseDialog = () => {
  const stateBefore = {
    active: true,
    nodeId: '',
    sensorId: ''
  };
  const action = actions.closeMappingDialog();
  const stateAfter = {
    active: false,
    nodeId: '',
    sensorId: ''
  };

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(mappingDialog(stateBefore, action)).toEqual(stateAfter);
};

const testUpdateDialog = () => {
  const stateBefore = {
    active: true,
    nodeId: '',
    sensorId: ''
  };
  const action = actions.updateMappingDialog({
    active: true,
    nodeId: 'asd',
    sensorId: 'fgh'
  });
  const stateAfter = {
    active: true,
    nodeId: 'asd',
    sensorId: 'fgh'
  };

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(mappingDialog(stateBefore, action)).toEqual(stateAfter);
};

const testClearDialog = () => {
  const stateBefore = {
    active: true,
    nodeId: 'asd',
    sensorId: 'fgh',
    name: 'testest'
  };
  const action = actions.clearMappingDialog();
  const stateAfter = {
    active: true,
    nodeId: '',
    sensorId: '',
    name: ''
  };

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(mappingDialog(stateBefore, action)).toEqual(stateAfter);
};

const mappingDialogTests = () => {
  testOpenDialog();
  testClearDialog();
  testCloseDialog();
  testUpdateDialog();
  return true;
};

export default mappingDialogTests;
