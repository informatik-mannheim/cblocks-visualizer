import Constants from '../constants/';

const initialMappingDialog = {
    active: false,
    name: '',
    nodeId: '',
    sensorId: ''
};

/* Mapping Dialog:
{
  _id: 'newMappingDialog',
  nodeId: 'node1',
  sensorId: 'pressure_sensor',
  ressourceId: '2',
  active: false
}
*/

export function mappingDialog (state = initialMappingDialog, action) {
  switch (action.type) {
    case Constants.Actions.OPEN_MAPPING_DIALOG:
      const openedDialog = Object.assign({}, state, {active: true, nodeId: action.nodeId});
      return openedDialog;
    case Constants.Actions.CLEAR_MAPPING_DIALOG:
        return Object.assign({}, initialMappingDialog, {active: state.active});
    case Constants.Actions.CLOSE_MAPPING_DIALOG:
      return Object.assign({}, state, {active: false});
    case Constants.Actions.UPDATE_MAPPING_DIALOG:
      return action.dialog;
    default:
      return state;
  }
}
