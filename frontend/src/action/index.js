import Constants from '../constants/';

export * from './sensors';
export * from './connections';
export * from './mappingDialog';
export * from './mappings';
export * from './requests';
export * from './modals';
export * from './pinnedCharts';

export const addHtmlIdMapping = (_id, htmlId) => ({type: Constants.Actions.ADD_HTMLIDMAPPING, _id, htmlId});
