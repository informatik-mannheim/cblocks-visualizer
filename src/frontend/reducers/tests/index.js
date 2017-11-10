import nodeIdsTests from './nodeIDs';
import nodesTests from './nodes';
import sensorsTests from './sensors';
import connectionsTests from './connections';

const tests = () => {
  let successful = nodeIdsTests();
  successful = nodesTests();
  successful = sensorsTests();
  successful = connectionsTests();

  if (successful === true) {
    console.log('All tests passed!');
  }
};

export default tests;
