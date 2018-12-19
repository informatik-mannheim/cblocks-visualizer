import { combineReducers } from 'redux';
import { sensors } from './sensors';
import { requests } from './requests';
import { modals } from './modals';
import { mappings } from './mappings';
import { pinnedCharts } from './pinnedCharts';
import { menuDrawer } from './menuDrawer';

import tests from './tests/';

const rootReducer = combineReducers({
  sensors,
  mappings,
  modals,
  requests,
  pinnedCharts,
  menuDrawer
});

tests();
export default rootReducer;
