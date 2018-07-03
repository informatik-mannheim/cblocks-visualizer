import { combineReducers } from 'redux';
import { sensors } from './sensors';
import { mappingDialog } from './mappingDialog';
import { requests } from './requests';
import { modals } from './modals';
import tests from './tests/';


const rootReducer = combineReducers({
  sensors,
  mappingDialog,
  modals,
  requests
});

tests();
export default rootReducer;
