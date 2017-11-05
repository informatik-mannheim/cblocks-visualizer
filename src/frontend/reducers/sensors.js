import Constants from '../constants/';

const initialSensorsState = {
  count: 0,
  all_sensors: []
};

export function sensors (state = initialSensorsState, action) {
  switch (action.type) {
    case Constants.Actions.ADD_SENSOR:
      console.log(state);
      const newSensor = Object.assign({}, action.sensor, {xPos: action.xPos}, {yPos: action.yPos});
      const newAllSensors = state.all_sensors.concat(newSensor);
      return {
        count: newAllSensors.length,
        all_sensors: newAllSensors
      };
    case Constants.Actions.MOVE_SENSOR:
      return {count: state.count, all_sensors: state.all_sensors.map(currentSensor => sensor(currentSensor, action))};
    default:
      return state;
  }
}

function sensor (state = {}, action){
  if (state._id !== action.id) {
    return state;
  }

  switch (action.type) {
    case Constants.Actions.MOVE_SENSOR:
      const movedSensor = Object.assign({}, state, {
        xPos: action.xPos,
        yPos: action.yPos
      });
      return movedSensor;
    default:
      return state;
  }
}
