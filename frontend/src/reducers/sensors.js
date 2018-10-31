import Constants from '../constants/';
import clonedeep from 'lodash.clonedeep';

const initialSensorsState = {
  count: 0,
  all_sensors: []
};

export function sensors (state = initialSensorsState, action) {
  switch (action.type) {
    case Constants.Actions.ADD_SENSOR:

    //Check if duplicate
    for (let i = 0; i < state.all_sensors.length; i++) {
      if (state.all_sensors[i].objectID === action.sensor.objectID && state.all_sensors[i].instanceID === action.instanceID) {
        return state;
      }
    }

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

      //add "mappings: []" to every resource
      const newResources = {...action.sensor.resources};
      for (const key in action.sensor.resources) {
        newResources[key] = {...newResources[key], mappings: []};
      }

      const newSensor = Object.assign({},
        {objectID: action.sensor.objectID},
        {instanceID: action.instanceID},
        {resources: newResources},
        {name: action.sensor.name},
        {values: {}},
        {valueHistory: []},
        {xPos: xPos},
        {yPos: yPos});

       const newAllSensors = state.all_sensors.concat(newSensor);
       return {
         count: newAllSensors.length,
         all_sensors: newAllSensors
       };
    case Constants.Actions.MOVE_SENSOR:
      return {count: state.count, all_sensors: state.all_sensors.map(currentSensor => sensor(currentSensor, action))};
    case Constants.Actions.UPDATE_SENSOR_VALUE:
      return {count: state.count, all_sensors: state.all_sensors.map(currentSensor => sensor(currentSensor, action))};
    case Constants.Actions.REMOVE_SENSOR:
      if (state.count !== 0) {
        const updatedSensors = state.all_sensors.filter(item => (item.objectID !== action.objectID || item.instanceID !== action.instanceID));
        return {count: updatedSensors.length, all_sensors: updatedSensors};
      }
      return state;
    case Constants.Actions.ADD_MAPPING: {
      const augmentedAction = clonedeep(action);
      augmentedAction.sensorID = action.mapping.objectID;
      augmentedAction.instanceID = action.mapping.instanceID;
      return {count: state.count, all_sensors: state.all_sensors.map(currentSensor => sensor(currentSensor, augmentedAction))};
    }
    case Constants.Actions.REMOVE_MAPPING: {

      const stateClone = clonedeep(state);
      for (const sensorIndex in stateClone.all_sensors) {
        const sens = stateClone.all_sensors[sensorIndex];
        for (const resourceIndex in sens.resources) {
          const res = sens.resources[resourceIndex];
          const newMappings = res.mappings.filter(m => m !== action.mapping);
          res.mappings = newMappings;
        }
      }

      return stateClone;
    }
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
      const sensorToUpdate = clonedeep(state);
      //Replace old values with new values
      const newValues = clonedeep(sensorToUpdate.values);
      newValues[action.resourceID] = action.value;
      sensorToUpdate.values = newValues;

      //Add new values to valueHistory if max 100 values, else delete oldest
      if (sensorToUpdate.valueHistory.length >= 100) sensorToUpdate.valueHistory.shift();
      sensorToUpdate.valueHistory = sensorToUpdate.valueHistory.concat(newValues);

      return sensorToUpdate;
    case Constants.Actions.ADD_MAPPING: {
      const updatedSensor = clonedeep(state);
      if (!state.resources[action.mapping.resourceID].mappings.includes(action.mapping.mappingID)) {
        updatedSensor.resources[action.mapping.resourceID].mappings.push(action.mapping.mappingID);
      }
      return updatedSensor;
    }
    default:
      return state;
  }
}
