import {combineReducers} from 'redux';
import {deepFreeze} from 'deep-freeze';
import {expect} from 'expect';
import Constants from '../constants/';

export function sensors (sensors = [], action) {
  if (action.type === Constants.Actions.ADD_SENSOR) {
    Object.assign(action.sensor, {xPos: action.xPos}, {yPos: action.yPos});
    return [
      ...sensors,
      action.sensor
    ];
  } else {
    return sensors.map(sensor => reduceSensor(sensor, action));
  }
}

export function reduceSensor (sensor, action) {

  if (sensor._id !== action.id) {
    return sensor;
  }

  switch (action.type) {
    case Constants.Actions.MOVE_SENSOR:
      const movedSensor = Object.assign({}, sensor, {
        xPos: action.xPos,
        yPos: action.yPos
        });
      return movedSensor;
    case Constants.Actions.REMOVE_SENSOR:
      //TODO: implement
      return [
        ...state, {
          _id: action.id
        }
      ];
    default:
      return sensor;
  }
}
