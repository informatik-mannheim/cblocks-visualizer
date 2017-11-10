import nodeIdsTests from './nodeIDs';
import nodesTests from './nodes';
import sensorsTests from './sensors';
import connectionsTests from './connections';
import htmlIdsTests from './htmlIds';

const tests = () => {
  let successful = nodeIdsTests();
  successful = nodesTests();
  successful = sensorsTests();
  successful = connectionsTests();
  successful = htmlIdsTests();

  if (successful === true) {
    console.log('All tests passed!');
  }
};

export default tests;
