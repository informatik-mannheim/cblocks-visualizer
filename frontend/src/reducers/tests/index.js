import sensorsTests from './sensors';
import connectionsTests from './connections';
import htmlIdsTests from './htmlIds';
import mappingDialogTests from './mappingDialog';
import mappingTests from './mappings';
import requestsTests from './requests';
import pinnedChartsTests from './pinnedCharts';
const tests = () => {
  let successful;
  successful = sensorsTests();
  successful = connectionsTests();
  successful = htmlIdsTests();
  successful = mappingDialogTests();
  successful = mappingTests();
  successful = requestsTests();
  successful = pinnedChartsTests();

  if (successful === true) {
    console.log('All tests passed!');
  }
};

export default tests;
