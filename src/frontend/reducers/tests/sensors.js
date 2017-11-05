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

const testMoveSensor = () => {
  const stateBefore = {
    count: 1,
    all_sensors: [
      {
        _id: '59510e6f8eed6e32225a752d',
        label: 'Stuhl',
        sensors: [
          '5937b05823d3e908cc271eab'
        ],
        xPos: 0,
        yPos: 0
      }
    ]
  };
  const action = actions.moveSensor('59510e6f8eed6e32225a752d', 500, 500);
  const stateAfter = {
    count: 1,
    all_sensors: [
      {
        _id: '59510e6f8eed6e32225a752d',
        label: 'Stuhl',
        sensors: [
          '5937b05823d3e908cc271eab'
        ],
        xPos: 500,
        yPos: 500
      }
    ]
  };

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(sensors(stateBefore, action)).toEqual(stateAfter);
};

const sensorsTests = () => {
  testAddSensor();
  testMoveSensor();
  return true;
};

export default sensorsTests;
