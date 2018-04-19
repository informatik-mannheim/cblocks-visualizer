import { combineReducers } from 'redux';
import { sensors } from './sensors';
import { htmlIds } from './htmlIds';
import { connections } from './connections';
import { mappingDialog } from './mappingDialog';
import { requests } from './requests';
import tests from './tests/';


const rootReducer = combineReducers({
  sensors,
  //htmlIds,
  //connections,
  mappingDialog,
  requests
});

tests();
export default rootReducer;
