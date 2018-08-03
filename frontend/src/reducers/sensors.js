import Constants from '../constants/';

const initialSensorsState = {
  count: 0,
  all_sensors: []
};

export function sensors (state = initialSensorsState, action) {
  switch (action.type) {
    case Constants.Actions.ADD_SENSOR:

      //TODO: this...
      const sensorCount = state.all_sensors.length;
      let xPos; const yPos = 10;
      switch (sensorCount) {
        case 0:
          xPos = 10;
          break;
        case 1:
          xPos = 370;
          break;
        case 2:
          xPos = 730;
          break;
        case 3:
          xPos = 1090;
          break;
        case 4:
          xPos = 1090;
          break;
        default:
          xPos = 10;
      }
      const newSensor = Object.assign({},
        {objectID: action.sensor.objectID},
        {instanceID: action.instanceID},
        {resources: action.sensor.resources},
        {name: action.sensor.name},
        {values: {}},
        {valueHistory: []},
        {xPos: xPos},
        {yPos: yPos});

       //Check if duplicate
       for (let i = 0; i < state.all_sensors.length; i++) {
         if (state.all_sensors[i].objectID === newSensor.objectID && state.all_sensors[i].instanceID === newSensor.instanceID) {
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
      return {count: state.all_sensors.length, all_sensors: state.all_sensors.map(currentSensor => sensor(currentSensor, action))};
    case Constants.Actions.REMOVE_SENSOR:
      if (state.count !== 0) {
        const updatedSensors = state.all_sensors.filter(item => (item.objectID !== action.objectID || item.instanceID !== action.instanceID));
        return {count: updatedSensors.length, all_sensors: updatedSensors};
      }
      return state;
    default:
      return state;
  }
}

function sensor (state = {}, action) {
  if (state.objectID !== action.sensorID || state.instanceID !== action.instanceID) {
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
      const sensorToUpdate = Object.assign({}, state);
      //Replace old values with new values
      const newValues = Object.assign({}, sensorToUpdate.values);
      newValues[action.resourceID] = action.value;
      sensorToUpdate.values = newValues;

      //Add new values to valueHistory if max 100 values, else delete oldest
      if (sensorToUpdate.valueHistory.length >= 100) sensorToUpdate.valueHistory.shift();
      sensorToUpdate.valueHistory = sensorToUpdate.valueHistory.concat(newValues);

      return sensorToUpdate;
    default:
      return state;
  }
}
