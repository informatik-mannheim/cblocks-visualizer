import nodeIdsTests from './nodeIDs'
import nodesTests from './nodes'
import sensorsTests from './sensors'

const tests = () => {
  let successful = nodeIdsTests();
  successful = nodesTests();
  successful = sensorsTests();

  if (successful === true) {
    console.log('All tests passed!');
  }
};

export default tests;
