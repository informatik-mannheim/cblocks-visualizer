import Constants from '../constants/';

const initialSensorsState = {
  count: 0,
  all_sensors: []
};

export function sensors (state = initialSensorsState, action) {
  switch (action.type) {
    case Constants.Actions.ADD_SENSOR:
      let newSensor;
    if (typeof action.sensor.value === 'undefined') {
      newSensor = Object.assign({}, action.sensor, {xPos: action.xPos}, {yPos: action.yPos}, {value: 0});
    } else {
      newSensor = Object.assign({}, action.sensor, {xPos: action.xPos}, {yPos: action.yPos}, {value: action.sensor.value});
    }
     for (let i = 0; i < state.all_sensors.length; i++) {
       if (state.all_sensors[i]._id === newSensor._id) {
         return state;
       }
     }

     const newAllSensors = state.all_sensors.concat(newSensor);
     return {
       count: newAllSensors.length,
       all_sensors: newAllSensors
     };
    case Constants.Actions.MOVE_SENSOR:
      return {count: state.count, all_sensors: state.all_sensors.map(currentSensor => sensor(currentSensor, action))};
    case Constants.Actions.UPDATE_SENSOR_VALUE:
      if (state.count !== 0) {
        let sensorToUpdate;
        let sensorIndex;

        for (sensorIndex = 0; sensorIndex < state.all_sensors.length; sensorIndex++) {
          if (state.all_sensors[sensorIndex]._id === action._id) {
            sensorToUpdate = state.all_sensors[sensorIndex];
          }
        }
        sensorIndex--;
        const updatedSensor = Object.assign({}, sensorToUpdate, {value: action.value});
        const updatedSensors = [
          ...state.all_sensors.slice(0, sensorIndex),
          updatedSensor,
          ...state.all_sensors.slice(sensorIndex + 1)
        ];
        return {count: updatedSensors.length, all_sensors: updatedSensors};
      } else {
        return state;
      }
    case Constants.Actions.REMOVE_SENSOR:
      if (state.count !== 0) {
        let sensorToRemove;
        let sensorIndex;

        for (sensorIndex = 0; sensorIndex < state.all_sensors.length; sensorIndex++) {
          if (state.all_sensors[sensorIndex]._id === action._id) {
            sensorToRemove = state.all_sensors[sensorIndex];
          }
        }
        sensorIndex--;
        const updatedSensors = [
          ...state.all_sensors.slice(0, sensorIndex),
          ...state.all_sensors.slice(sensorIndex + 1)
        ];
        return {count: updatedSensors.length, all_sensors: updatedSensors};
      }
      break;
    default:
      return state;
  }
}

function sensor (state = {}, action) {
  if (state._id !== action._id) {
    return state;
  }

  switch (action.type) {
    case Constants.Actions.MOVE_SENSOR:
      const movedSensor = Object.assign({}, state, {
        xPos: action.xPos,
        yPos: action.yPos
      });
      return movedSensor;

    case Constants.Actions.UPDATE_SENSOR_VALUE:
      const sensorToUpdate = Object.assign({}, state, {
        value: action.value
      });
      return sensorToUpdate;
    default:
      return state;
  }
}
