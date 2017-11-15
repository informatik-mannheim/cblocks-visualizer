import Constants from '../constants';

export const addConnection = (sensorHtmlId, nodeHtmlId) => ({type: Constants.Actions.ADD_CONNECTION, sensorHtmlId, nodeHtmlId});

export const addConnectionForSensor = (sensorId) => {
  return (dispatch, getState) => {
    const state = getState();
    state.nodes.all_nodes.forEach((node) => {
      const nodeIndex = node.sensors.indexOf(sensorId);
      if (nodeIndex !== -1) {
        let nodeHtmlId, sensorHtmlId;
        const nodeId = nodeIndex;
        for (let i = 0; i < state.htmlIds.length; i++) {
          if (state.htmlIds[i]._id === node._id) {
            nodeHtmlId = state.htmlIds[i].htmlId;
          }
          if (state.htmlIds[i]._id === sensorId) {
            sensorHtmlId = state.htmlIds[i].htmlId;
          }
        }
        dispatch(addConnection(sensorHtmlId, nodeHtmlId));
      }
    });
  };
};

export const removeConnection = (connection) => ({type: Constants.Actions.REMOVE_CONNECTION, connection});

export const refreshConnection = (connection) => {
  console.log(connection);
  return (dispatch) => {
    dispatch(removeConnection(connection));
    dispatch(addConnection(connection.sensorHtmlId, connection.nodeHtmlId));
  };
};
