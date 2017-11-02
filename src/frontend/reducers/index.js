import {combineReducers} from 'redux';
import {fetchNodeIDsHasErrored, fetchNodeIDsIsLoading, nodeIDs} from './nodeIDs';
import {nodes} from './nodes';
import {sensors} from './sensors';


const rootReducer = combineReducers({
  nodeIDs,
  nodes,
  sensors,
  fetchNodeIDsIsLoading,
  fetchNodeIDsHasErrored
});

export default rootReducer;
