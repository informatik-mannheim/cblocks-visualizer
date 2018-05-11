import Constants from '../constants/';

const initialSensorsState = {
  count: 0,
  all_sensors: []
};

export function sensors (state = initialSensorsState, action) {
  switch (action.type) {
    case Constants.Actions.ADD_SENSOR:
      const newSensor = Object.assign({},
        {objectID: action.sensor.objectID},
        {instanceID: action.instanceID},
        {resources: action.sensor.resources},
        {name: action.sensor.name},
        {values: {}},
        {xPos: action.xPos},
        {yPos: action.yPos});

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
        let sensorIndex;
        let sensorToRemove;

        //TODO: Check if this works as intended... seems weird :|
        for (sensorIndex = 0; sensorIndex < state.all_sensors.length; sensorIndex++) {
          if (state.all_sensors[sensorIndex].objectID === action.objectID && state.all_sensors[sensorIndex].instanceID === action.instanceID) {
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
      const newValues = Object.assign({}, sensorToUpdate.values);
      newValues[action.resourceID] = action.value;

      sensorToUpdate.values = newValues;
      return sensorToUpdate;
    default:
      return state;
  }
}
