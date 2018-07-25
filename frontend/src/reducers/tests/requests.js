import deepFreeze from 'deep-freeze';
import expect from 'expect';
import { requests } from '../requests';
import * as actions from '../../action';

const initialRequestsState = {
  totalRequests: 0,
  unresolvedRequests: [],
  resolvedRequests: []
};

const testBuildRequest = () => {
  const stateBefore = initialRequestsState;
  const action = actions.buildRequest(3303, 0, 0, 100);
  const stateAfter = {
    totalRequests: 1,
    unresolvedRequests: [
      {
        requestID: 1,
        objectID: 3303,
        instanceID: 0,
        resourceID: 0,
        sent: false,
        value: 100
      }
    ],
    resolvedRequests: []
  };

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(requests(stateBefore, action)).toEqual(stateAfter);
};

const testSendRequest = () => {
  const stateBefore = {
    totalRequests: 1,
    unresolvedRequests: [
      {
        requestID: 1,
        objectID: 3303,
        instanceID: 0,
        resourceID: 0,
        sent: false,
        value: 100
      }
    ],
    resolvedRequests: []
  };
  const action = actions.sendRequest(1);
  const stateAfter = {
    totalRequests: 1,
    unresolvedRequests: [
      {
        requestID: 1,
        objectID: 3303,
        instanceID: 0,
        resourceID: 0,
        sent: true,
        value: 100
      }
    ],
    resolvedRequests: []
  };

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(requests(stateBefore, action)).toEqual(stateAfter);
};

const testHandleResponseFrom1 = () => {
  const stateBefore = {
    totalRequests: 1,
    unresolvedRequests: [
      {
        requestID: 1,
        objectID: 3303,
        instanceID: 0,
        resourceID: 0,
        value: 100
      }
    ],
    resolvedRequests: []
  };
  const action = actions.handleRequestResponse(1, true, '');
  const stateAfter = {
    totalRequests: 1,
    unresolvedRequests: [],
    resolvedRequests: [
      {
        requestID: 1,
        objectID: 3303,
        instanceID: 0,
        resourceID: 0,
        value: 100,
        success: true,
        message: ''
      }
    ]
  };
  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(requests(stateBefore, action)).toEqual(stateAfter);
};

const testHandleResponseFrom2 = () => {
  const stateBefore = {
    totalRequests: 2,
    unresolvedRequests: [
      {
        requestID: 1,
        objectID: 3303,
        instanceID: 0,
        resourceID: 0,
        value: 100
      },
      {
        requestID: 2,
        objectID: 3303,
        instanceID: 0,
        resourceID: 0,
        value: 101
      }
    ],
    resolvedRequests: []
  };
  const action = actions.handleRequestResponse(1, true, '');
  const stateAfter = {
    totalRequests: 2,
    unresolvedRequests: [
      {
        requestID: 2,
        objectID: 3303,
        instanceID: 0,
        resourceID: 0,
        value: 101
      }
    ],
    resolvedRequests: [
      {
        requestID: 1,
        objectID: 3303,
        instanceID: 0,
        resourceID: 0,
        value: 100,
        success: true,
        message: ''
      }
    ]
  };
  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(requests(stateBefore, action)).toEqual(stateAfter);
};

const testHandleResponseFrom3WithSomeDone = () => {
  const stateBefore = {
    totalRequests: 5,
    unresolvedRequests: [
      {
        requestID: 3,
        objectID: 3303,
        instanceID: 0,
        resourceID: 0,
        value: 100
      },
      {
        requestID: 4,
        objectID: 3303,
        instanceID: 0,
        resourceID: 0,
        value: 101
      },
      {
        requestID: 5,
        objectID: 3303,
        instanceID: 0,
        resourceID: 0,
        value: 101
      }
    ],
    resolvedRequests: [
      {
        requestID: 1,
        objectID: 3303,
        instanceID: 0,
        resourceID: 0,
        value: 100,
        success: true,
        message: ''
      },
      {
        requestID: 2,
        objectID: 3303,
        instanceID: 0,
        resourceID: 0,
        value: 100,
        success: true,
        message: ''
      }
    ]
  };
  const action = actions.handleRequestResponse(4, true, '');
  const stateAfter = {
    totalRequests: 5,
    unresolvedRequests: [
      {
        requestID: 3,
        objectID: 3303,
        instanceID: 0,
        resourceID: 0,
        value: 100
      },
      {
        requestID: 5,
        objectID: 3303,
        instanceID: 0,
        resourceID: 0,
        value: 101
      }
    ],
    resolvedRequests: [
      {
        requestID: 1,
        objectID: 3303,
        instanceID: 0,
        resourceID: 0,
        value: 100,
        success: true,
        message: ''
      },
      {
        requestID: 2,
        objectID: 3303,
        instanceID: 0,
        resourceID: 0,
        value: 100,
        success: true,
        message: ''
      },
      {
        requestID: 4,
        objectID: 3303,
        instanceID: 0,
        resourceID: 0,
        value: 101,
        success: true,
        message: ''
      }
    ]
  };
  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(requests(stateBefore, action)).toEqual(stateAfter);
};


const requestsTests = () => {
  testBuildRequest();
  testHandleResponseFrom1();
  testHandleResponseFrom2();
  testHandleResponseFrom3WithSomeDone();
  testSendRequest();
  return true;
};

export default requestsTests;
