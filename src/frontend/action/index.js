import Constants from '../constants/';

export const addNode = (node, xPos = 0, yPos = 0) => ({type: Constants.Actions.ADD_NODE, node, xPos, yPos});

export const addHtmlIdMapping = (_id, htmlId) => ({type: Constants.Actions.ADD_HTMLIDMAPPING, _id, htmlId});


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

export const fetchNodeIDsHasErrored = (bool) =>
  ({type: Constants.Actions.FETCH_NODE_IDS_HAS_ERRORED, hasErrored: bool});

export const fetchNodeIDsIsLoading = (bool) =>
  ({type: Constants.Actions.FETCH_NODE_IDS_IS_LOADING, isLoading: bool});

export const fetchNodeHasErrored = (bool) =>
  ({type: Constants.Actions.FETCH_NODE_HAS_ERRORED, hasErrored: bool});

export const fetchNodeIsLoading = (bool) =>
  ({type: Constants.Actions.FETCH_NODE_IS_LOADING, isLoading: bool});

export const fetchNode = (url) => {
  return (dispatch) => {
    dispatch(fetchNodeIsLoading(true));

    fetch(url).then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      dispatch(fetchNodeIsLoading(false));
      return response;
    }).then((response) => response.json()
      ).then(
        (node) => {
          console.log('asdasd');
          dispatch(addNode(node));
          dispatch(fetchSensorsForNode(node));
        }
     ).catch(() => dispatch(fetchNodeHasErrored(true)));
  };
};

export const fetchNodeIDsSuccess = (nodeIds) => {
  return (dispatch) => {
    nodeIds.forEach((nodeId) => {
      dispatch(fetchNode(Constants.URLs.FETCH_NODE_URL + nodeId));
    });
  };
};

export const fetchNodeIDs = () => {
  return (dispatch) => {
    dispatch(fetchNodeIDsIsLoading(true));
    fetch(Constants.URLs.FETCH_NODE_IDS_URL).then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      dispatch(fetchNodeIDsIsLoading(false));
      return response;
    }).then((response) => response.json()).then((nodeIds) =>
      dispatch(fetchNodeIDsSuccess(nodeIds))
      ).catch(() => dispatch(fetchNodeIDsHasErrored(true)));
  };
};

export const fetchNodeSuccess = (node) => {
  return {type: Constants.Actions.FETCH_NODE_SUCCESS, node};
};

export const refreshConnection = (connection) => {
  console.log(connection);
  return (dispatch) => {
    dispatch(removeConnection(connection));
    dispatch(addConnection(connection.sensorHtmlId, connection.nodeHtmlId));
  };
};

export const move = (componentType, componentId, xPos, yPos) => {
  let actionType;
  switch (componentType) {
    case 'sensor':
      actionType = Constants.Actions.MOVE_SENSOR;
      break;
    case 'node':
      actionType = Constants.Actions.MOVE_NODE;
      break;
    default:
  }
  console.log('move');
  return {type: actionType, _id: componentId, xPos: xPos, yPos: yPos};
};

export const moveNode = (nodeId, xPos, yPos) => {
  return (dispatch, getState) => {
    const nodes = getState().nodes;
    //type: Constants.Actions.MOVE_SENSOR, _id: sensorId, xPos: xPos, yPos: yPos};
    //console.log(move('node', nodeId, xPos, yPos))
    return dispatch(move('node', nodeId, xPos, yPos));
  };
};

export const moveSensor = (sensorId, xPos, yPos) => {
  return (dispatch, getState) => {
    const htmlIds = getState().htmlIds;
    let sensorHtmlId;
    getState().htmlIds.forEach((mapping) => {
      if (mapping._id === sensorId) {
        sensorHtmlId = mapping.htmlId;
      }
    });
    let thisConnection;
    getState().connections.forEach((conn) => {
      if (conn.sensorHtmlId === sensorHtmlId) {
        thisConnection = conn;
      }
    });
    //type: Constants.Actions.MOVE_SENSOR, _id: sensorId, xPos: xPos, yPos: yPos};
    dispatch(move('sensor', sensorId, xPos, yPos));
    dispatch(refreshConnection(thisConnection));
  };
};


export const addSensor = (sensor, xPos = 0, yPos = 0) => {
  return {type: Constants.Actions.ADD_SENSOR, sensor, xPos, yPos};
};

export const fetchSensorHasErrored = (bool) =>
  ({type: Constants.Actions.FETCH_SENSOR_HAS_ERRORED, hasErrored: bool});

export const fetchSensorIsLoading = (bool) =>
  ({type: Constants.Actions.FETCH_SENSOR_IS_LOADING, isLoading: bool});

export const fetchSensorSuccess = (sensor) =>
  ({type: Constants.Actions.FETCH_SENSOR_SUCCESS, sensor});

export const fetchSensor = (url) => {
  return (dispatch) => {
    dispatch(fetchSensorIsLoading(true));
    fetch(url).then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      dispatch(fetchSensorIsLoading(false));
      return response;

    }).then((response) => response.json()
  ).then((sensor) => dispatch(addSensor(sensor))
        ).catch(() => dispatch(fetchSensorHasErrored(true)));
  };
};

export const fetchSensorsForNode = (node) => {
  return (dispatch) => {
    node.sensors.forEach((sensorId) => {
      dispatch(fetchSensor(Constants.URLs.FETCH_SENSORS_URL + sensorId));
    });
  };
};

export const updateSensorValue = (_id, value) => {
  return {type: Constants.Actions.UPDATE_SENSOR_VALUE, _id, value};
};
