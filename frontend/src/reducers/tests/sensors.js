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
    objectID: 3303,
    instanceID: 0,
    resources: {
      '0': {
        resourceID: 0,
        name: 'Temperature',
        is_writeable: false,
        schema: {
          type: 'number',
          additionalProperties: false
        }
      },
      '1': {
        resourceID: 1,
        name: 'Humidity',
        is_writeable: false,
        schema: {
          type: 'number',
          minimum: 0,
          maximum: 100,
          additionalProperties: false
        }
      }
    },
    name: 'Room Sensor',
    values: {},
    xPos: 500,
    yPos: 100
  }, 0);
  const stateAfter = {
    count: 1,
    all_sensors: [
      {
        objectID: 3303,
        instanceID: 0,
        resources: {
          '0': {
            resourceID: 0,
            name: 'Temperature',
            is_writeable: false,
            schema: {
              type: 'number',
              additionalProperties: false
            }
          },
          '1': {
            resourceID: 1,
            name: 'Humidity',
            is_writeable: false,
            schema: {
              type: 'number',
              minimum: 0,
              maximum: 100,
              additionalProperties: false
            }
          }
        },
        name: 'Room Sensor',
        values: {},
        valueHistory: [],
        xPos: 500,
        yPos: 100
      }
    ]
  };

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(sensors(stateBefore, action)).toEqual(stateAfter);
};

const testAddDuplicateSensor = () => {
  const stateBefore = {
    count: 1,
    all_sensors: [
          {
            objectID: 3303,
            instanceID: 0,
            resources: {
              '0': {
                resourceID: 0,
                name: 'Temperature',
                is_writeable: false,
                schema: {
                  type: 'number',
                  additionalProperties: false
                }
              },
              '1': {
                resourceID: 1,
                name: 'Humidity',
                is_writeable: false,
                schema: {
                  type: 'number',
                  minimum: 0,
                  maximum: 100,
                  additionalProperties: false
                }
              }
            },
            name: 'Room Sensor',
            values: {},
            xPos: 500,
            yPos: 100
          }
        ]
      };
  const action = actions.addSensor({
    objectID: 3303,
    instanceID: 0,
    resources: {
      '0': {
        resourceID: 0,
        name: 'Temperature',
        is_writeable: false,
        schema: {
          type: 'number',
          additionalProperties: false
        }
      },
      '1': {
        resourceID: 1,
        name: 'Humidity',
        is_writeable: false,
        schema: {
          type: 'number',
          minimum: 0,
          maximum: 100,
          additionalProperties: false
        }
      }
    },
    name: 'Room Sensor',
    values: {},
    xPos: 500,
    yPos: 100
  }, 0);
  const stateAfter = stateBefore;

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(sensors(stateBefore, action)).toEqual(stateAfter);
};

const testMoveSensor = () => {
  const stateBefore = {
    count: 1,
    all_sensors: [
      {
        objectID: 3303,
        instanceID: 0,
        resources: {
          '0': {
            resourceID: 0,
            name: 'Temperature',
            is_writeable: false,
            schema: {
              type: 'number',
              additionalProperties: false
            }
          },
          '1': {
            resourceID: 1,
            name: 'Humidity',
            is_writeable: false,
            schema: {
              type: 'number',
              minimum: 0,
              maximum: 100,
              additionalProperties: false
            }
          }
        },
        name: 'Room Sensor',
        values: {},
        xPos: 0,
        yPos: 100
      }
    ]
  };
  const action = actions.move(3303, 0, 500, 500);
  const stateAfter = {
    count: 1,
    all_sensors: [
      {
        objectID: 3303,
        instanceID: 0,
        resources: {
          '0': {
            resourceID: 0,
            name: 'Temperature',
            is_writeable: false,
            schema: {
              type: 'number',
              additionalProperties: false
            }
          },
          '1': {
            resourceID: 1,
            name: 'Humidity',
            is_writeable: false,
            schema: {
              type: 'number',
              minimum: 0,
              maximum: 100,
              additionalProperties: false
            }
          }
        },
        name: 'Room Sensor',
        values: {},
        xPos: 500,
        yPos: 500
      }
    ]
  };

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(sensors(stateBefore, action)).toEqual(stateAfter);
};

const testUpdateSensorValue = () => {
  const stateBefore = {
    count: 1,
    all_sensors: [
          {
            objectID: 3303,
            instanceID: 0,
            resources: {
              '0': {
                resourceID: 0,
                name: 'Temperature',
                is_writeable: false,
                schema: {
                  type: 'number',
                  additionalProperties: false
                }
              },
              '1': {
                resourceID: 1,
                name: 'Humidity',
                is_writeable: false,
                schema: {
                  type: 'number',
                  minimum: 0,
                  maximum: 100,
                  additionalProperties: false
                }
              }
            },
            name: 'Room Sensor',
            values: {
              0: 22.2,
              1: 33.3
            },
            valueHistory: [{0: 22.2, 1: 99}, {0: 22.4, 1: 98}, {0: 22.3, 1: 97}, {0: 23, 1: 95}, {0: 22.9, 1: 96}],
            xPos: 500,
            yPos: 100
          }
        ]
      };
  const action = actions.updateSensorValue(3303, 0, 1, 100);
  const stateAfter = {
    count: 1,
    all_sensors: [
          {
            objectID: 3303,
            instanceID: 0,
            resources: {
              '0': {
                resourceID: 0,
                name: 'Temperature',
                is_writeable: false,
                schema: {
                  type: 'number',
                  additionalProperties: false
                }
              },
              '1': {
                resourceID: 1,
                name: 'Humidity',
                is_writeable: false,
                schema: {
                  type: 'number',
                  minimum: 0,
                  maximum: 100,
                  additionalProperties: false
                }
              }
            },
            name: 'Room Sensor',
            values: {
              0: 22.2,
              1: 100
            },
            valueHistory: [{0: 22.2, 1: 99}, {0: 22.4, 1: 98}, {0: 22.3, 1: 97}, {0: 23, 1: 95}, {0: 22.9, 1: 96}, {0: 22.2, 1: 100}],
            xPos: 500,
            yPos: 100
          }
        ]
      };

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(sensors(stateBefore, action)).toEqual(stateAfter);
};

const testRemoveSensor = () => {
  const stateBefore = {
    count: 1,
    all_sensors: [
      {
        objectID: 9999,
        instanceID: 0,
        label: 'Pressure Sensor',
        resources: [
          'bla'
        ],
        xPos: 0,
        yPos: 0,
        value: 0
      }
    ]
  };
  const action = actions.removeSensor(9999, 0);
  const stateAfter = initialSensorsState;

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(sensors(stateBefore, action)).toEqual(stateAfter);
};

const sensorsTests = () => {
  testAddSensor();
  testAddDuplicateSensor();
  testMoveSensor();
  testUpdateSensorValue();
  testRemoveSensor();
  return true;
};

export default sensorsTests;
