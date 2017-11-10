import {combineReducers} from 'redux';
import {fetchNodeIDsHasErrored, fetchNodeIDsIsLoading, nodeIDs} from './nodeIDs';
import {nodes} from './nodes';
import {sensors} from './sensors';
import { connections } from './connections';
import tests from './tests/';


const rootReducer = combineReducers({
  nodes,
  sensors,
  connections
});

tests();
export default rootReducer;
