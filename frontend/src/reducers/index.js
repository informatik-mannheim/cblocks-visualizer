import { combineReducers } from 'redux';
import { sensors } from './sensors';
import { mappingDialog } from './mappingDialog';
import { requests } from './requests';
import { modals } from './modals';
import { pinnedCharts } from './pinnedCharts';
import tests from './tests/';


const rootReducer = combineReducers({
  sensors,
  mappingDialog,
  modals,
  requests,
  pinnedCharts
});

tests();
export default rootReducer;
