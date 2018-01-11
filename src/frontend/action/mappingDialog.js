import Constants from '../constants';

export const openMappingDialog = (nodeId) => ({type: Constants.Actions.OPEN_MAPPING_DIALOG, nodeId});

export const clearMappingDialog = () => ({type: Constants.Actions.CLEAR_MAPPING_DIALOG});

export const closeMappingDialog = () => ({type: Constants.Actions.CLOSE_MAPPING_DIALOG});

export const updateMappingDialog = (dialog) => ({type: Constants.Actions.UPDATE_MAPPING_DIALOG, dialog});

export const saveMapping = () => ({type: Constants.Actions.SAVE_MAPPING});
