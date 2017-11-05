import {combineReducers} from 'redux';
import {fetchNodeIDsHasErrored, fetchNodeIDsIsLoading, nodeIDs} from './nodeIDs';
import {nodes} from './nodes';
import {sensors} from './sensors';
import tests from './tests/';


const rootReducer = combineReducers({
  nodeIDs,
  nodes,
  sensors,
  fetchNodeIDsIsLoading,
  fetchNodeIDsHasErrored
});

tests();
export default rootReducer;
