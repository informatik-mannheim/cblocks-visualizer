import nodeIdsTests from './nodeIDs';
import nodesTests from './nodes';
import sensorsTests from './sensors';
import connectionsTests from './connections';
import htmlIdsTests from './htmlIds';
import mappingDialogTests from './mappingDialog';
import mappingTests from './mappings';

const tests = () => {
  let successful = nodeIdsTests();
  successful = nodesTests();
  successful = sensorsTests();
  successful = connectionsTests();
  successful = htmlIdsTests();
  successful = mappingDialogTests();
  successful = mappingTests();

  if (successful === true) {
    console.log('All tests passed!');
  }
};

export default tests;
