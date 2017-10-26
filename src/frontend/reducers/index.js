import {combineReducers} from 'redux';
import {fetchNodeIDsHasErrored, fetchNodeIDsIsLoading, nodeIDs} from './nodeIDs';
import {nodes} from './nodes';


const rootReducer = combineReducers({
  nodeIDs,
  nodes,
  fetchNodeIDsIsLoading,
  fetchNodeIDsHasErrored
});

export default rootReducer;
