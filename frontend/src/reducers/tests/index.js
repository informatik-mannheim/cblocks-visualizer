import sensorsTests from './sensors';
import connectionsTests from './connections';
import requestsTests from './requests';
import pinnedChartsTests from './pinnedCharts';
const tests = () => {
  let successful;
  successful = sensorsTests();
  successful = connectionsTests();
  successful = requestsTests();
  successful = pinnedChartsTests();

  if (successful === true) {
    console.log('All tests passed!');
  }
};

export default tests;
