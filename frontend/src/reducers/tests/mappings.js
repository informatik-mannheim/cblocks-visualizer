import deepFreeze from 'deep-freeze';
import expect from 'expect';
import { mappings } from '../mappings';
import * as actions from '../../action';
import Constants from '../../constants';

const initialMappingsState = {
  count: 0,
  all_mappings: []
};

const sampleMappingState = {
  count: 1,
  all_mappings: [
    {
      _id: '1001',
      label: 'Chair',
      nodeId: 123,
      sources: [
        {
          port: 0,
          sensorId: 987,
          ressourceId: 1
        }
      ],
      type: Constants.MappingTypes.RANGE,
      sections: [
        {
          sectionId: 0,
          label: 'Empty',
          from: 0,
          to: 300,
          color_code: '#008d00'
        },
        {
          sectionId: 1,
          label: 'Occupied',
          from: 301,
          to: 1023,
          color_code: '#00008d'
        }
      ]
    }
  ]
};

const testAddMapping = () => {
  const stateBefore = initialMappingsState;
  const action = actions.addMapping({
    _id: '1001',
    label: 'Chair',
    nodeId: 123,
    sources: [
      {
        port: 0,
        sensorId: 987,
        ressourceId: 1
      }
    ],
    type: Constants.MappingTypes.RANGE,
    sections: [
      {
        sectionId: 0,
        label: 'Empty',
        from: 0,
        to: 300,
        color_code: '#008d00'
      },
      {
        sectionId: 1,
        label: 'Occupied',
        from: 301,
        to: 1023,
        color_code: '#00008d'
      }
    ]
  });
  const stateAfter = {
    count: 1,
    all_mappings: [
      {
        _id: '1001',
        label: 'Chair',
        nodeId: 123,
        sources: [
          {
            port: 0,
            sensorId: 987,
            ressourceId: 1
          }
        ],
        type: Constants.MappingTypes.RANGE,
        sections: [
          {
            sectionId: 0,
            label: 'Empty',
            from: 0,
            to: 300,
            color_code: '#008d00'
          },
          {
            sectionId: 1,
            label: 'Occupied',
            from: 301,
            to: 1023,
            color_code: '#00008d'
          }
        ]
      }
    ]
  };

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(mappings(stateBefore, action)).toEqual(stateAfter);
};

const testAddAnotherMapping = () => {
  const stateBefore = {
    count: 1,
    all_mappings: [
      {
        _id: '1001',
        label: 'Chair',
        nodeId: 123,
        sources: [
          {
            port: 0,
            sensorId: 987,
            ressourceId: 1
          }
        ],
        type: Constants.MappingTypes.RANGE,
        sections: [
          {
            sectionId: 0,
            label: 'Empty',
            from: 0,
            to: 300,
            color_code: '#008d00'
          },
          {
            sectionId: 1,
            label: 'Occupied',
            from: 301,
            to: 1023,
            color_code: '#00008d'
          }
        ]
      }
    ]
  };
  const action = actions.addMapping({
    _id: '1002',
    label: 'Door',
    nodeId: 1234,
    sources: [
      {
        port: 1,
        sensorId: 123123,
        ressourceId: 2
      }
    ],
    type: Constants.MappingTypes.RANGE,
    sections: [
      {
        sectionId: 0,
        label: 'Closed',
        from: 0,
        to: 500,
        color_code: '#008d00'
      },
      {
        sectionId: 1,
        label: 'Open',
        from: 501,
        to: 1023,
        color_code: '#00008d'
      }
    ]
  });
  const stateAfter = {
    count: 2,
    all_mappings: [
      {
        _id: '1001',
        label: 'Chair',
        nodeId: 123,
        sources: [
          {
            port: 0,
            sensorId: 987,
            ressourceId: 1
          }
        ],
        type: Constants.MappingTypes.RANGE,
        sections: [
          {
            sectionId: 0,
            label: 'Empty',
            from: 0,
            to: 300,
            color_code: '#008d00'
          },
          {
            sectionId: 1,
            label: 'Occupied',
            from: 301,
            to: 1023,
            color_code: '#00008d'
          }
        ]
      },
      {
        _id: '1002',
        label: 'Door',
        nodeId: 1234,
        sources: [
          {
            port: 1,
            sensorId: 123123,
            ressourceId: 2
          }
        ],
        type: Constants.MappingTypes.RANGE,
        sections: [
          {
            sectionId: 0,
            label: 'Closed',
            from: 0,
            to: 500,
            color_code: '#008d00'
          },
          {
            sectionId: 1,
            label: 'Open',
            from: 501,
            to: 1023,
            color_code: '#00008d'
          }
        ]
      }
    ]
  };

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(mappings(stateBefore, action)).toEqual(stateAfter);
};

const testRemoveMapping = () => {
  const stateBefore = {
    count: 2,
    all_mappings: [
      {
        _id: '1001',
        label: 'Chair',
        nodeId: 123,
        sources: [
          {
            port: 0,
            sensorId: 987,
            ressourceId: 1
          }
        ],
        type: Constants.MappingTypes.RANGE,
        sections: [
          {
            sectionId: 0,
            label: 'Empty',
            from: 0,
            to: 300,
            color_code: '#008d00'
          },
          {
            sectionId: 1,
            label: 'Occupied',
            from: 301,
            to: 1023,
            color_code: '#00008d'
          }
        ]
      },
      {
        _id: '1002',
        label: 'Door',
        nodeId: 1234,
        sources: [
          {
            port: 1,
            sensorId: 123123,
            ressourceId: 2
          }
        ],
        type: Constants.MappingTypes.RANGE,
        sections: [
          {
            sectionId: 0,
            label: 'Closed',
            from: 0,
            to: 500,
            color_code: '#008d00'
          },
          {
            sectionId: 1,
            label: 'Open',
            from: 501,
            to: 1023,
            color_code: '#00008d'
          }
        ]
      }
    ]
  };

  const action = actions.removeMapping('1002');
  const stateAfter = {
    count: 1,
    all_mappings: [
      {
        _id: '1001',
        label: 'Chair',
        nodeId: 123,
        sources: [
          {
            port: 0,
            sensorId: 987,
            ressourceId: 1
          }
        ],
        type: Constants.MappingTypes.RANGE,
        sections: [
          {
            sectionId: 0,
            label: 'Empty',
            from: 0,
            to: 300,
            color_code: '#008d00'
          },
          {
            sectionId: 1,
            label: 'Occupied',
            from: 301,
            to: 1023,
            color_code: '#00008d'
          }
        ]
      }
    ]
  };

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(mappings(stateBefore, action)).toEqual(stateAfter);
};

const testRemoveMappingToEmpty = () => {
  const stateBefore = {
    count: 1,
    all_mappings: [
      {
        _id: '1001',
        label: 'Chair',
        nodeId: 123,
        sources: [
          {
            port: 0,
            sensorId: 987,
            ressourceId: 1
          }
        ],
        type: Constants.MappingTypes.RANGE,
        sections: [
          {
            sectionId: 0,
            label: 'Empty',
            from: 0,
            to: 300,
            color_code: '#008d00'
          },
          {
            sectionId: 1,
            label: 'Occupied',
            from: 301,
            to: 1023,
            color_code: '#00008d'
          }
        ]
      }
    ]
  };

  const action = actions.removeMapping('1001');
  const stateAfter = initialMappingsState;

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(mappings(stateBefore, action)).toEqual(stateAfter);
};

const testRemoveMappingFromEmpty = () => {
  const stateBefore = initialMappingsState;

  const action = actions.removeMapping('1001');
  const stateAfter = initialMappingsState;

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(mappings(stateBefore, action)).toEqual(stateAfter);
};


const mappingsTests = () => {
  testAddMapping();
  testAddAnotherMapping();
  testRemoveMapping();
  testRemoveMappingToEmpty();
  testRemoveMappingFromEmpty();
  return true;
};

export default mappingsTests;
