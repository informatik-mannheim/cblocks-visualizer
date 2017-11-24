import Constants from '../constants';

export const addConnection = (sensorId, nodeId) => ({type: Constants.Actions.ADD_CONNECTION, sensorId, nodeId});

export const addConnectionForSensor = (sensorId) => {
  return (dispatch, getState) => {
    const state = getState();
    state.nodes.all_nodes.forEach((node) => {
      const nodeIndex = node.sensors.indexOf(sensorId);
      if (nodeIndex !== -1) {
        dispatch(addConnection(sensorId, node._id));
      }
    });
  };
};

export const removeConnection = (connection) => ({type: Constants.Actions.REMOVE_CONNECTION, connection});

export const refreshConnection = (connection) => {
  return (dispatch) => {
    dispatch(removeConnection(connection));
    dispatch(addConnection(connection.sensorId, connection.nodeId));
  };
};
