import {combineReducers} from 'redux';
import {fetchNodeIDsHasErrored, fetchNodeIDsIsLoading, nodeIDs} from './nodeIDs';
import {nodes} from './nodes';
import {sensors} from './sensors';
import { htmlIds } from './htmlIds';
import { connections } from './connections';
import tests from './tests/';


const rootReducer = combineReducers({
  nodes,
  sensors,
  htmlIds,
  connections
});

tests();
export default rootReducer;
