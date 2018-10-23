import { mappings } from '../mappings';
import Constants from '../../constants/';
import expect from 'expect';

const exampleMapping = {
  mappingID: 'asdfasdf19280u34981uf',
  label: 'ExampleMapping',
  default: 'Unmatched',
  objectID: 3303,
  instanceID: 0,
  resourceID: 0,
  ranges: [{
    label: 'firstRange',
    greaterEqualsThan: 15,
    lessThan: 30
  }, {
    label: 'secondRange',
    greaterEqualsThan: 45,
    lessThan: 80
  }],
  mappingType: 'category',
  value: 'firstRange',
  valueHistory: ['firstRange']
};

const exampleMapping2 = {
  mappingID: 'asdfasdfasdfasdfasdfasdf',
  label: 'ExampleMapping2',
  default: 'Unmatched',
  objectID: 3303,
  instanceID: 0,
  resourceID: 1,
  ranges: [{
    label: 'firstRange2',
    greaterEqualsThan: 15,
    lessThan: 30
  }, {
    label: 'secondRange2',
    greaterEqualsThan: 45,
    lessThan: 80
  }],
  mappingType: 'category',
  value: 'firstRange',
  valueHistory: ['firstRange']
};

describe('mappings reducer', () => {
  it('should return the initial state', () => {
    expect(mappings(undefined, {})).toEqual({});
  });
  it('should add a new mapping to the initial state', () => {
    const addMappingAction = {
      type: Constants.Actions.ADD_MAPPING,
      mapping: exampleMapping
    };
    expect(mappings({}, addMappingAction))
      .toEqual({
        asdfasdf19280u34981uf: {
          mappingID: 'asdfasdf19280u34981uf',
          label: 'ExampleMapping',
          default: 'Unmatched',
          objectID: 3303,
          instanceID: 0,
          resourceID: 0,
          ranges: [{
            label: 'firstRange',
            greaterEqualsThan: 15,
            lessThan: 30
          }, {
            label: 'secondRange',
            greaterEqualsThan: 45,
            lessThan: 80
          }],
          mappingType: 'category',
          value: 'firstRange',
          valueHistory: ['firstRange']
        }
      });
  });
  it('should add another mapping to the state', () => {
    const addMappingAction = {
      type: Constants.Actions.ADD_MAPPING,
      mapping: exampleMapping2
    };
    expect(mappings({
      asdfasdf19280u34981uf: {
        mappingID: 'asdfasdf19280u34981uf',
        label: 'ExampleMapping',
        default: 'Unmatched',
        objectID: 3303,
        instanceID: 0,
        resourceID: 0,
        ranges: [{
          label: 'firstRange',
          greaterEqualsThan: 15,
          lessThan: 30
        }, {
          label: 'secondRange',
          greaterEqualsThan: 45,
          lessThan: 80
        }],
        mappingType: 'category',
        value: 'firstRange',
        valueHistory: ['firstRange']
      }
    }, addMappingAction))
      .toEqual({
        asdfasdf19280u34981uf: {
          mappingID: 'asdfasdf19280u34981uf',
          label: 'ExampleMapping',
          default: 'Unmatched',
          objectID: 3303,
          instanceID: 0,
          resourceID: 0,
          ranges: [{
            label: 'firstRange',
            greaterEqualsThan: 15,
            lessThan: 30
          }, {
            label: 'secondRange',
            greaterEqualsThan: 45,
            lessThan: 80
          }],
          mappingType: 'category',
          value: 'firstRange',
          valueHistory: ['firstRange']
        },
        asdfasdfasdfasdfasdfasdf: {
          mappingID: 'asdfasdfasdfasdfasdfasdf',
          label: 'ExampleMapping2',
          default: 'Unmatched',
          objectID: 3303,
          instanceID: 0,
          resourceID: 1,
          ranges: [{
            label: 'firstRange2',
            greaterEqualsThan: 15,
            lessThan: 30
          }, {
            label: 'secondRange2',
            greaterEqualsThan: 45,
            lessThan: 80
          }],
          mappingType: 'category',
          value: 'firstRange',
          valueHistory: ['firstRange']
        }
      });
  });
  it('should remove a mapping', () => {
    const removeAction = {
      type: Constants.Actions.REMOVE_MAPPING,
      mappingID: 'asdfasdf19280u34981uf'
    };

    expect(mappings({
      asdfasdf19280u34981uf: {
        mappingID: 'asdfasdf19280u34981uf',
        label: 'ExampleMapping',
        default: 'Unmatched',
        objectID: 3303,
        instanceID: 0,
        resourceID: 0,
        ranges: [{
          label: 'firstRange',
          greaterEqualsThan: 15,
          lessThan: 30
        }, {
          label: 'secondRange',
          greaterEqualsThan: 45,
          lessThan: 80
        }],
        mappingType: 'category',
        value: 'firstRange',
        valueHistory: ['firstRange']
      },
      asdfasdfasdfasdfasdfasdf: {
        mappingID: 'asdfasdfasdfasdfasdfasdf',
        label: 'ExampleMapping2',
        default: 'Unmatched',
        objectID: 3303,
        instanceID: 0,
        resourceID: 1,
        ranges: [{
          label: 'firstRange2',
          greaterEqualsThan: 15,
          lessThan: 30
        }, {
          label: 'secondRange2',
          greaterEqualsThan: 45,
          lessThan: 80
        }],
        mappingType: 'category',
        value: 'firstRange',
        valueHistory: ['firstRange']
      }
    }, removeAction)).toEqual({
      asdfasdfasdfasdfasdfasdf: {
        mappingID: 'asdfasdfasdfasdfasdfasdf',
        label: 'ExampleMapping2',
        default: 'Unmatched',
        objectID: 3303,
        instanceID: 0,
        resourceID: 1,
        ranges: [{
          label: 'firstRange2',
          greaterEqualsThan: 15,
          lessThan: 30
        }, {
          label: 'secondRange2',
          greaterEqualsThan: 45,
          lessThan: 80
        }],
        mappingType: 'category',
        value: 'firstRange',
        valueHistory: ['firstRange']
      }});
  });
  it('should do nothing if trying to remove unknown mapping', () => {
    const removeAction = {
      type: Constants.Actions.REMOVE_MAPPING,
      mappingID: 'UNKNOWN'
    };

    expect(mappings({
      asdfasdf19280u34981uf: {
        mappingID: 'asdfasdf19280u34981uf',
        label: 'ExampleMapping',
        default: 'Unmatched',
        objectID: 3303,
        instanceID: 0,
        resourceID: 0,
        ranges: [{
          label: 'firstRange',
          greaterEqualsThan: 15,
          lessThan: 30
        }, {
          label: 'secondRange',
          greaterEqualsThan: 45,
          lessThan: 80
        }],
        mappingType: 'category',
        value: 'firstRange',
        valueHistory: ['firstRange']
      },
      asdfasdfasdfasdfasdfasdf: {
        mappingID: 'asdfasdfasdfasdfasdfasdf',
        label: 'ExampleMapping2',
        default: 'Unmatched',
        objectID: 3303,
        instanceID: 0,
        resourceID: 1,
        ranges: [{
          label: 'firstRange2',
          greaterEqualsThan: 15,
          lessThan: 30
        }, {
          label: 'secondRange2',
          greaterEqualsThan: 45,
          lessThan: 80
        }],
        mappingType: 'category',
        value: 'firstRange',
        valueHistory: ['firstRange']
      }
    }, removeAction)).toEqual({
      asdfasdf19280u34981uf: {
        mappingID: 'asdfasdf19280u34981uf',
        label: 'ExampleMapping',
        default: 'Unmatched',
        objectID: 3303,
        instanceID: 0,
        resourceID: 0,
        ranges: [{
          label: 'firstRange',
          greaterEqualsThan: 15,
          lessThan: 30
        }, {
          label: 'secondRange',
          greaterEqualsThan: 45,
          lessThan: 80
        }],
        mappingType: 'category',
        value: 'firstRange',
        valueHistory: ['firstRange']
      },
      asdfasdfasdfasdfasdfasdf: {
        mappingID: 'asdfasdfasdfasdfasdfasdf',
        label: 'ExampleMapping2',
        default: 'Unmatched',
        objectID: 3303,
        instanceID: 0,
        resourceID: 1,
        ranges: [{
          label: 'firstRange2',
          greaterEqualsThan: 15,
          lessThan: 30
        }, {
          label: 'secondRange2',
          greaterEqualsThan: 45,
          lessThan: 80
        }],
        mappingType: 'category',
        value: 'firstRange',
        valueHistory: ['firstRange']
      }
    });
  });
  it('should update a mapping\'s value and add the previous one to valueHistory', () => {
    const updateAction = {
      type: Constants.Actions.UPDATE_MAPPING_VALUE,
      mappingID: 'asdfasdfasdfasdfasdfasdf',
      value: 'secondRange2'
    };
    expect(mappings({
      asdfasdfasdfasdfasdfasdf: {
        mappingID: 'asdfasdfasdfasdfasdfasdf',
        label: 'ExampleMapping2',
        default: 'Unmatched',
        objectID: 3303,
        instanceID: 0,
        resourceID: 1,
        ranges: [{
          label: 'firstRange2',
          greaterEqualsThan: 15,
          lessThan: 30
        }, {
          label: 'secondRange2',
          greaterEqualsThan: 45,
          lessThan: 80
        }],
        mappingType: 'category',
        value: 'firstRange2',
        valueHistory: ['firstRange2']
      }}, updateAction)
    ).toEqual({
        asdfasdfasdfasdfasdfasdf: {
          mappingID: 'asdfasdfasdfasdfasdfasdf',
          label: 'ExampleMapping2',
          default: 'Unmatched',
          objectID: 3303,
          instanceID: 0,
          resourceID: 1,
          ranges: [{
            label: 'firstRange2',
            greaterEqualsThan: 15,
            lessThan: 30
          }, {
            label: 'secondRange2',
            greaterEqualsThan: 45,
            lessThan: 80
          }],
          mappingType: 'category',
          value: 'secondRange2',
          valueHistory: ['firstRange2', 'secondRange2']
        }
      });
  });
  it('should throw out oldest entry in valueHistory if the vH-size limit is reached', () => {
    const addAction = {
      type: Constants.Actions.UPDATE_MAPPING_VALUE,
      mappingID: 'VH_LIMIT_TESTARRAY',
      value: 'firstRange'
    };

    const fullValueHistory = [];
    const correctValueHistory = [];

    for (let i = 0; i < 100; i++) {
      fullValueHistory.push(i);
      if (i < 99) correctValueHistory.push(i + 1);
    }
    correctValueHistory[99] = 'firstRange';

    expect(mappings({
      VH_LIMIT_TESTARRAY: {
        mappingID: 'VH_LIMIT_TESTARRAY',
        label: 'ExampleMapping',
        default: 'Unmatched',
        objectID: 3303,
        instanceID: 0,
        resourceID: 0,
        ranges: [{
          label: 'firstRange',
          greaterEqualsThan: 15,
          lessThan: 30
        }, {
          label: 'secondRange',
          greaterEqualsThan: 45,
          lessThan: 80
        }],
        mappingType: 'category',
        value: 'firstRange',
        valueHistory: fullValueHistory
      }
    }, addAction)).toEqual({
      VH_LIMIT_TESTARRAY: {
        mappingID: 'VH_LIMIT_TESTARRAY',
        label: 'ExampleMapping',
        default: 'Unmatched',
        objectID: 3303,
        instanceID: 0,
        resourceID: 0,
        ranges: [{
          label: 'firstRange',
          greaterEqualsThan: 15,
          lessThan: 30
        }, {
          label: 'secondRange',
          greaterEqualsThan: 45,
          lessThan: 80
        }],
        mappingType: 'category',
        value: 'firstRange',
        valueHistory: correctValueHistory
      }
    });
  });
  it('should set the mapping to active', () => {
    const setActiveAction = {
      type: Constants.Actions.SET_MAPPING_ACTIVE,
      mappingID: 'asdfasdfasdfasdfasdfasdf'
    };

    expect(mappings({
      asdfasdf19280u34981uf: {
        active: false,
        mappingID: 'asdfasdf19280u34981uf',
        label: 'ExampleMapping',
        default: 'Unmatched',
        objectID: 3303,
        instanceID: 0,
        resourceID: 0,
        ranges: [{
          label: 'firstRange',
          greaterEqualsThan: 15,
          lessThan: 30
        }, {
          label: 'secondRange',
          greaterEqualsThan: 45,
          lessThan: 80
        }],
        mappingType: 'category',
        value: 'firstRange',
        valueHistory: ['firstRange']
      },
      asdfasdfasdfasdfasdfasdf: {
        active: false,
        mappingID: 'asdfasdfasdfasdfasdfasdf',
        label: 'ExampleMapping2',
        default: 'Unmatched',
        objectID: 3303,
        instanceID: 0,
        resourceID: 1,
        ranges: [{
          label: 'firstRange2',
          greaterEqualsThan: 15,
          lessThan: 30
        }, {
          label: 'secondRange2',
          greaterEqualsThan: 45,
          lessThan: 80
        }],
        mappingType: 'category',
        value: 'firstRange',
        valueHistory: ['firstRange']
      }
    }, setActiveAction)).toEqual({
      asdfasdf19280u34981uf: {
        active: false,
        mappingID: 'asdfasdf19280u34981uf',
        label: 'ExampleMapping',
        default: 'Unmatched',
        objectID: 3303,
        instanceID: 0,
        resourceID: 0,
        ranges: [{
          label: 'firstRange',
          greaterEqualsThan: 15,
          lessThan: 30
        }, {
          label: 'secondRange',
          greaterEqualsThan: 45,
          lessThan: 80
        }],
        mappingType: 'category',
        value: 'firstRange',
        valueHistory: ['firstRange']
      },
      asdfasdfasdfasdfasdfasdf: {
        active: true,
        mappingID: 'asdfasdfasdfasdfasdfasdf',
        label: 'ExampleMapping2',
        default: 'Unmatched',
        objectID: 3303,
        instanceID: 0,
        resourceID: 1,
        ranges: [{
          label: 'firstRange2',
          greaterEqualsThan: 15,
          lessThan: 30
        }, {
          label: 'secondRange2',
          greaterEqualsThan: 45,
          lessThan: 80
        }],
        mappingType: 'category',
        value: 'firstRange',
        valueHistory: ['firstRange']
      }
    });
  });
  it('should set the mapping to inactive', () => {
    const setInactiveAction = {
      type: Constants.Actions.SET_MAPPING_INACTIVE,
      mappingID: 'asdfasdfasdfasdfasdfasdf'
    };

    expect(mappings({
      asdfasdf19280u34981uf: {
        active: false,
        mappingID: 'asdfasdf19280u34981uf',
        label: 'ExampleMapping',
        default: 'Unmatched',
        objectID: 3303,
        instanceID: 0,
        resourceID: 0,
        ranges: [{
          label: 'firstRange',
          greaterEqualsThan: 15,
          lessThan: 30
        }, {
          label: 'secondRange',
          greaterEqualsThan: 45,
          lessThan: 80
        }],
        mappingType: 'category',
        value: 'firstRange',
        valueHistory: ['firstRange']
      },
      asdfasdfasdfasdfasdfasdf: {
        active: true,
        mappingID: 'asdfasdfasdfasdfasdfasdf',
        label: 'ExampleMapping2',
        default: 'Unmatched',
        objectID: 3303,
        instanceID: 0,
        resourceID: 1,
        ranges: [{
          label: 'firstRange2',
          greaterEqualsThan: 15,
          lessThan: 30
        }, {
          label: 'secondRange2',
          greaterEqualsThan: 45,
          lessThan: 80
        }],
        mappingType: 'category',
        value: 'firstRange',
        valueHistory: ['firstRange']
      }
    }, setInactiveAction)).toEqual({
      asdfasdf19280u34981uf: {
        active: false,
        mappingID: 'asdfasdf19280u34981uf',
        label: 'ExampleMapping',
        default: 'Unmatched',
        objectID: 3303,
        instanceID: 0,
        resourceID: 0,
        ranges: [{
          label: 'firstRange',
          greaterEqualsThan: 15,
          lessThan: 30
        }, {
          label: 'secondRange',
          greaterEqualsThan: 45,
          lessThan: 80
        }],
        mappingType: 'category',
        value: 'firstRange',
        valueHistory: ['firstRange']
      },
      asdfasdfasdfasdfasdfasdf: {
        active: false,
        mappingID: 'asdfasdfasdfasdfasdfasdf',
        label: 'ExampleMapping2',
        default: 'Unmatched',
        objectID: 3303,
        instanceID: 0,
        resourceID: 1,
        ranges: [{
          label: 'firstRange2',
          greaterEqualsThan: 15,
          lessThan: 30
        }, {
          label: 'secondRange2',
          greaterEqualsThan: 45,
          lessThan: 80
        }],
        mappingType: 'category',
        value: 'firstRange',
        valueHistory: ['firstRange']
      }
    });
  });
});
