import deepFreeze from 'deep-freeze';
import expect from 'expect';
import { pinnedCharts } from '../pinnedCharts';
import * as actions from '../../action';

const initialState = {count: 0, all_charts: []};

const testPinChart = () => {
  const stateBefore = initialState;
  const action = actions.pinChart({
    objectID: 3303,
    instanceID: 1,
    resourceID: 0
  });
  const stateAfter = {
    count: 1,
    all_charts: [
      {
        chartID: 'chart-3303-1-0',
        chartProps: {
          objectID: 3303,
          instanceID: 1,
          resourceID: 0
        },
        xPos: 500,
        yPos: 100
      }
    ]
  };

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(pinnedCharts(stateBefore, action)).toEqual(stateAfter);
};

const testPinAnotherChart = () => {
  const stateBefore = {
    count: 1,
    all_charts: [
      {
        chartID: 'chart-3303-1-0',
        chartProps: {
          objectID: 3303,
          instanceID: 1,
          resourceID: 0
        },
        xPos: 500,
        yPos: 100
      }
    ]
  };
  const action = actions.pinChart({
    objectID: 3303,
    instanceID: 0,
    resourceID: 0
  });
  const stateAfter = {
    count: 2,
    all_charts: [
      {
        chartID: 'chart-3303-1-0',
        chartProps: {
          objectID: 3303,
          instanceID: 1,
          resourceID: 0
        },
        xPos: 500,
        yPos: 100
      },
      {
        chartID: 'chart-3303-0-0',
        chartProps: {
          objectID: 3303,
          instanceID: 0,
          resourceID: 0
        },
        xPos: 500,
        yPos: 100
      }
    ]
  };

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(pinnedCharts(stateBefore, action)).toEqual(stateAfter);
};

const testPinDuplicateChart = () => {
  const stateBefore = {
    count: 1,
    all_charts: [
      {
        chartID: 'chart-3303-1-0',
        chartProps: {
          objectID: 3303,
          instanceID: 1,
          resourceID: 0
        },
        xPos: 500,
        yPos: 100
      }
    ]
  };
  const action = actions.pinChart({
    objectID: 3303,
    instanceID: 1,
    resourceID: 0,
    xPos: 1000,
    yPos: 1999
  });
  const stateAfter = {
    count: 1,
    all_charts: [
      {
        chartID: 'chart-3303-1-0',
        chartProps: {
          objectID: 3303,
          instanceID: 1,
          resourceID: 0
        },
        xPos: 500,
        yPos: 100
      }
    ]
  };

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(pinnedCharts(stateBefore, action)).toEqual(stateAfter);
};

const testUnpinChartFrom1 = () => {
  const stateBefore = {
    count: 1,
    all_charts: [
      {
        chartID: 'chart-3303-1-0',
        chartProps: {
          objectID: 3303,
          instanceID: 1,
          resourceID: 0
        },
        xPos: 500,
        yPos: 100
      }
    ]
  };
  const action = actions.unpinChart('chart-3303-1-0');
  const stateAfter = initialState;

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(pinnedCharts(stateBefore, action)).toEqual(stateAfter);
};

const testUnpinChartFrom2 = () => {
  const stateBefore = {
    count: 2,
    all_charts: [
      {
        chartID: 'chart-3303-1-0',
        chartProps: {
          objectID: 3303,
          instanceID: 1,
          resourceID: 0
        },
        xPos: 500,
        yPos: 100
      },
      {
        chartID: 'chart-3303-0-0',
        chartProps: {
          objectID: 3303,
          instanceID: 0,
          resourceID: 0
        },
        xPos: 500,
        yPos: 100
      }
    ]
  };
  const action = actions.unpinChart('chart-3303-1-0');
  const stateAfter = {
    count: 1,
    all_charts: [
      {
        chartID: 'chart-3303-0-0',
        chartProps: {
          objectID: 3303,
          instanceID: 0,
          resourceID: 0
        },
        xPos: 500,
        yPos: 100
      }
    ]
  };

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(pinnedCharts(stateBefore, action)).toEqual(stateAfter);
};

const testMoveChart = () => {
  const stateBefore = {
    count: 2,
    all_charts: [
      {
        chartID: 'chart-3303-1-0',
        chartProps: {
          objectID: 3303,
          instanceID: 1,
          resourceID: 0
        },
        xPos: 500,
        yPos: 100
      },
      {
        chartID: 'chart-3303-0-0',
        chartProps: {
          objectID: 3303,
          instanceID: 0,
          resourceID: 0
        },
        xPos: 500,
        yPos: 100
      }
    ]
  };
  const action = actions.moveChart({
    objectID: 3303,
    instanceID: 0,
    resourceID: 0
  }, 1000, 5000);
  const stateAfter = {
    count: 2,
    all_charts: [
      {
        chartID: 'chart-3303-1-0',
        chartProps: {
          objectID: 3303,
          instanceID: 1,
          resourceID: 0
        },
        xPos: 500,
        yPos: 100
      },
      {
        chartID: 'chart-3303-0-0',
        chartProps: {
          objectID: 3303,
          instanceID: 0,
          resourceID: 0
        },
        xPos: 1000,
        yPos: 5000
      }
    ]
  };

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(pinnedCharts(stateBefore, action)).toEqual(stateAfter);
};

const pinnedChartsTests = () => {
  testPinChart();
  testPinAnotherChart();
  testPinDuplicateChart();
  testUnpinChartFrom1();
  testUnpinChartFrom2();
  testMoveChart();
  return true;
};

export default pinnedChartsTests;
