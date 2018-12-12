import Constants from '../constants/';

const initialConnectionsState = [];

export function connections (state = initialConnectionsState, action) {
  switch (action.type) {
    case Constants.Actions.ADD_CONNECTION:
      const newConnection = {
        sensorId: action.sensorId,
        nodeId: action.nodeId
      };

      //check for duplicates
      for (let i = 0; i < state.length; i++) {
        if (state[i].sensorId === newConnection.sensorId) {
          return state;
        }
      }

      return [...state, newConnection];

    case Constants.Actions.UPDATE_CONNECTION:
      return state;

    case Constants.Actions.REMOVE_CONNECTION:
      const index = state.findIndex(
        i => i.sensorId === action.connection.sensorId
      );
      return [...state.slice(0, index), ...state.slice(index + 1)];
    default:
      return state;
  }
}
