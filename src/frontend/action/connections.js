import Constants from '../constants';

export const addConnection = (sensorId, nodeId) => ({type: Constants.Actions.ADD_CONNECTION, sensorId, nodeId});

export const addConnectionForSensor = (sensorId) => {
  return (dispatch, getState) => {
    const state = getState();
    // state.nodes.all_nodes.forEach((node) => {
    //   const nodeIndex = node.sensors.indexOf(sensorId);
    //   if (nodeIndex !== -1) {
    //     dispatch(addConnection(sensorId, node._id));
    //   }
    // });
  };
};

export const removeConnection = (connection) => ({type: Constants.Actions.REMOVE_CONNECTION, connection});

export const removeConnectionFromSensor = (sensorId) => {
  return (dispatch, getState) => {
    const connections = getState().connections;

    connections.forEach((con) => {
      if (con.sensorId === sensorId) {
        dispatch(removeConnection({sensorId: sensorId, nodeId: con.nodeId}));
      }
    });
  };
};

export const refreshConnection = (connection) => {
  return (dispatch) => {
    dispatch(removeConnection(connection));
    dispatch(addConnection(connection.sensorId, connection.nodeId));
  };
};

export const refreshConnections = (connections) => {
  return (dispatch) => {
    connections.forEach((connection) => {
      dispatch(removeConnection(connection));
      dispatch(addConnection(connection.sensorId, connection.nodeId));
    });
  };
};
