import deepFreeze from 'deep-freeze';
import expect from 'expect';
import { sensors } from '../sensors';
import * as actions from '../../action';

const initialSensorsState = {
  count: 0,
  all_sensors: []
};

const testAddSensor = () => {
  const stateBefore = initialSensorsState;
  const action = actions.addSensor({
    _id: '5937b05823d3e908cc271eab',
    label: 'Pressure Sensor',
    resources: [
      'bla'
    ]
  });
  const stateAfter = {
    count: 1,
    all_sensors: [
      {
        _id: '5937b05823d3e908cc271eab',
        label: 'Pressure Sensor',
        resources: [
          'bla'
        ],
        xPos: 0,
        yPos: 0
      }
    ]
  };

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(sensors(stateBefore, action)).toEqual(stateAfter);
};

const sensorsTests = () => {
  testAddSensor();
  return true;
};

export default sensorsTests;
