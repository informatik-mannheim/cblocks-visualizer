import { sensors } from '../sensors';
import Constants from '../../constants/';
import expect from 'expect';
import clonedeep from 'lodash.clonedeep';

const initialSensorsState = {
  count: 0,
  all_sensors: []
};
const sensorForAddTesting = {
  name: 'Room Sensor',
  objectID: 3303,
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
  }
};

const sensorForAddTesting2 = clonedeep(sensorForAddTesting);
sensorForAddTesting2.objectID = 3304;

const stateWithOneSensor = {
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
          },
          mappings: []
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
          },
          mappings: []
        }
      },
      name: 'Room Sensor',
      values: {},
      valueHistory: [],
      xPos: 10,
      yPos: 10
    }
  ]
};
const stateWithTwoSensors = {
  count: 2,
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
          },
          mappings: []
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
          },
          mappings: []
        }
      },
      name: 'Room Sensor',
      values: {},
      valueHistory: [],
      xPos: 10,
      yPos: 10
    },
    {
      objectID: 3304,
      instanceID: 1,
      resources: {
        '0': {
          resourceID: 0,
          name: 'Temperature',
          is_writeable: false,
          schema: {
            type: 'number',
            additionalProperties: false
          },
          mappings: []
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
          },
          mappings: []
        }
      },
      name: 'Room Sensor',
      values: {},
      valueHistory: [],
      xPos: 370,
      yPos: 10
    }
  ]
};

describe('sensors reducer', () => {
  it('should return the initial state', () => {
    expect(sensors(undefined, {})).toEqual(initialSensorsState);
  });
  it('should add a sensor with all needed properties', () => {
    const addFirstSensorAction = {
      type: Constants.Actions.ADD_SENSOR,
      sensor: sensorForAddTesting,
      instanceID: 0
    };
    expect(sensors(initialSensorsState, addFirstSensorAction)).toEqual(
      stateWithOneSensor
    );
  });
  it('should add a second sensor to the state', () => {
    const addSecondSensorAction = {
      type: Constants.Actions.ADD_SENSOR,
      instanceID: 1,
      sensor: sensorForAddTesting2
    };
    expect(sensors(stateWithOneSensor, addSecondSensorAction)).toEqual(
      stateWithTwoSensors
    );
  });
  it('should do nothing if duplicate sensor is being added', () => {
    const addSecondSensorAction = {
      type: Constants.Actions.ADD_SENSOR,
      instanceID: 2,
      sensor: sensorForAddTesting2
    };
    expect(
      sensors(
        {
          count: 2,
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
              mappings: [],
              xPos: 10,
              yPos: 10
            },
            {
              objectID: 3304,
              instanceID: 2,
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
              mappings: [],
              xPos: 370,
              yPos: 10
            }
          ]
        },
        addSecondSensorAction
      )
    ).toEqual({
      count: 2,
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
          mappings: [],
          xPos: 10,
          yPos: 10
        },
        {
          objectID: 3304,
          instanceID: 2,
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
          mappings: [],
          xPos: 370,
          yPos: 10
        }
      ]
    });
  });
  it('should remove a sensor from the state', () => {
    const removeSensorAction = {
      type: Constants.Actions.REMOVE_SENSOR,
      objectID: 3303,
      instanceID: 0
    };
    expect(
      sensors(
        {
          count: 2,
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
              mappings: [],
              xPos: 10,
              yPos: 10
            },
            {
              objectID: 3304,
              instanceID: 2,
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
              mappings: [],
              xPos: 370,
              yPos: 10
            }
          ]
        },
        removeSensorAction
      )
    ).toEqual({
      count: 1,
      all_sensors: [
        {
          objectID: 3304,
          instanceID: 2,
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
          mappings: [],
          xPos: 370,
          yPos: 10
        }
      ]
    });
  });
  it('should do nothing if unknown sensorID is trying to be removed', () => {
    const removeSensorAction = {
      type: Constants.Actions.REMOVE_SENSOR,
      objectID: 3305,
      instanceID: 0
    };
    expect(
      sensors(
        {
          count: 2,
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
              mappings: [],
              xPos: 10,
              yPos: 10
            },
            {
              objectID: 3304,
              instanceID: 2,
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
              mappings: [],
              xPos: 370,
              yPos: 10
            }
          ]
        },
        removeSensorAction
      )
    ).toEqual({
      count: 2,
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
          mappings: [],
          xPos: 10,
          yPos: 10
        },
        {
          objectID: 3304,
          instanceID: 2,
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
          mappings: [],
          xPos: 370,
          yPos: 10
        }
      ]
    });
  });
  it("should add a mappingID to the relevant sensor's resource", () => {
    const addMappingAction = {
      type: Constants.Actions.ADD_MAPPING,
      mapping: {
        mappingID: 'asdfasdf19280u34981uf',
        label: 'ExampleMapping',
        default: 'Unmatched',
        objectID: 3303,
        instanceID: 0,
        resourceID: 0,
        ranges: [
          {
            label: 'firstRange',
            greaterEqualsThan: 15,
            lessThan: 30
          },
          {
            label: 'secondRange',
            greaterEqualsThan: 45,
            lessThan: 80
          }
        ],
        mappingType: 'category',
        value: 'firstRange',
        valueHistory: ['firstRange']
      }
    };
    expect(sensors(stateWithOneSensor, addMappingAction)).toEqual({
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
              },
              mappings: ['asdfasdf19280u34981uf']
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
              },
              mappings: []
            }
          },
          name: 'Room Sensor',
          values: {},
          valueHistory: [],
          xPos: 10,
          yPos: 10
        }
      ]
    });
  });
  it('should add a not add duplicate mappingIDs', () => {
    const addMappingAction = {
      type: Constants.Actions.ADD_MAPPING,
      mapping: {
        mappingID: 'asdfasdf19280u34981uf',
        label: 'ExampleMapping',
        default: 'Unmatched',
        objectID: 3303,
        instanceID: 0,
        resourceID: 0,
        ranges: [
          {
            label: 'firstRange',
            greaterEqualsThan: 15,
            lessThan: 30
          },
          {
            label: 'secondRange',
            greaterEqualsThan: 45,
            lessThan: 80
          }
        ],
        mappingType: 'category',
        value: 'firstRange',
        valueHistory: ['firstRange']
      }
    };
    expect(
      sensors(
        {
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
                  },
                  mappings: ['asdfasdf19280u34981uf']
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
                  },
                  mappings: []
                }
              },
              name: 'Room Sensor',
              values: {},
              valueHistory: [],
              xPos: 10,
              yPos: 10
            }
          ]
        },
        addMappingAction
      )
    ).toEqual({
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
              },
              mappings: ['asdfasdf19280u34981uf']
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
              },
              mappings: []
            }
          },
          name: 'Room Sensor',
          values: {},
          valueHistory: [],
          xPos: 10,
          yPos: 10
        }
      ]
    });
  });
  it("should remove a mappingID from the relevant sensor's resource", () => {
    const removeMappingAction = {
      type: Constants.Actions.REMOVE_MAPPING,
      mapping: 'MY_MAPPING_____IDDDDDD'
    };

    const myState = clonedeep(stateWithTwoSensors);
    myState.all_sensors[0].resources[1].mappings[0] = 'MY_MAPPING_____IDDDDDD';
    const newMappingsArray = sensors(myState, removeMappingAction)
      .all_sensors[0].resources[1].mappings;
    expect(newMappingsArray).toEqual([]);
  });
  it('should move the relevant sensor to the given position', () => {
    const moveAction = {
      type: Constants.Actions.MOVE_SENSOR,
      sensorID: 3304,
      instanceID: 1,
      xPos: 500,
      yPos: 500
    };
    const myState = clonedeep(stateWithTwoSensors);
    const newState = sensors(myState, moveAction);
    const pos = {
      x: newState.all_sensors[1].xPos,
      y: newState.all_sensors[1].yPos
    };
    expect(pos).toEqual({ x: 500, y: 500 });
  });
  it("should update the relevant sensor's current value", () => {
    const updateAction = {
      type: Constants.Actions.UPDATE_SENSOR_VALUE,
      sensorID: 3304,
      instanceID: 1,
      resourceID: 0,
      value: 6969
    };
    const stateClone = clonedeep(stateWithTwoSensors);
    stateClone.all_sensors[1].values = { 0: 12345678, 1: 420 };
    const newCurrentValue = sensors(stateClone, updateAction).all_sensors[1]
      .values;
    expect(newCurrentValue).toEqual({ 0: 6969, 1: 420 });
  });
});
