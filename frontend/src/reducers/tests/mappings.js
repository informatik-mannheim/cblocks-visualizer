import deepFreeze from 'deep-freeze';
import expect from 'expect';
import { mappings } from '../mappings';
import * as actions from '../../action';

const initialMappingsState = {
  count: 0,
  all_mappings: []
};

const exampleMapping = {
  mappingId: 'asdfasdf19280u34981uf',
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
  }]
};

const exampleMapping2 = {
  mappingId: 'asdfasdf19280u349avdrtf3',
  label: 'ExampleMapping2',
  default: 'UnmatchedYOO',
  objectID: 3304,
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
  }]
};

const testAddMappings = () => {
  const stateBefore = initialMappingsState;
  const action = actions.addMappings([exampleMapping]);
  const stateAfter = {
    count: 1,
    all_mappings: [{
      mappingId: 'asdfasdf19280u34981uf',
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
      }]
    }]
  };

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(mappings(stateBefore, action)).toEqual(stateAfter);
};

const testAddMappings2 = () => {
  const stateBefore = initialMappingsState;
  const action = actions.addMappings([exampleMapping, exampleMapping2]);
  const stateAfter = {
    count: 2,
    all_mappings: [{
      mappingId: 'asdfasdf19280u34981uf',
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
      }]
    },
    {
      mappingId: 'asdfasdf19280u349avdrtf3',
      label: 'ExampleMapping2',
      default: 'UnmatchedYOO',
      objectID: 3304,
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
      }]
    }]
  };

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(mappings(stateBefore, action)).toEqual(stateAfter);
};

const testAddMappings3 = () => {
  const stateBefore = {
    count: 2,
    all_mappings: [{
      mappingId: 'asdfasdf19280u34981uf',
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
      }]
    },
    {
      mappingId: 'asdfasdf19280u349avdrtf3',
      label: 'ExampleMapping2',
      default: 'UnmatchedYOO',
      objectID: 3304,
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
      }]
    }]
  };
  const action = actions.addMappings([{
      mappingId: 'asdfasdfasdfasdfasdf',
      label: 'ExampleMADSGGGG',
      default: 'UnmatchedYasdOO',
      objectID: 3304,
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
      }]
    }, exampleMapping2]);
  const stateAfter = {
    count: 3,
    all_mappings: [{
      mappingId: 'asdfasdf19280u34981uf',
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
      }]
    },
    {
      mappingId: 'asdfasdf19280u349avdrtf3',
      label: 'ExampleMapping2',
      default: 'UnmatchedYOO',
      objectID: 3304,
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
      }]
    }, {
      mappingId: 'asdfasdfasdfasdfasdf',
      label: 'ExampleMADSGGGG',
      default: 'UnmatchedYasdOO',
      objectID: 3304,
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
      }]
    }]
  };

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(mappings(stateBefore, action)).toEqual(stateAfter);
};

const testRemoveMapping = () => {
  const stateBefore = {
    count: 1,
    all_mappings: [{
      mappingId: 'asdfasdf19280u34981uf',
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
      }]
    }]
  };

  const action = actions.removeMapping('asdfasdf19280u34981uf');
  const stateAfter = initialMappingsState;

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(mappings(stateBefore, action)).toEqual(stateAfter);
};

const mappingsTests = () => {
  console.log(actions);
  testAddMappings();
  testAddMappings2();
  testRemoveMapping();
  return true;
};

export default mappingsTests;
