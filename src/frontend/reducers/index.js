import { combineReducers } from 'redux';
import { sensors } from './sensors';
import { htmlIds } from './htmlIds';
import { connections } from './connections';
import { mappingDialog } from './mappingDialog';
import tests from './tests/';


const rootReducer = combineReducers({
  sensors,
  htmlIds,
  connections,
  mappingDialog
});

tests();
export default rootReducer;
