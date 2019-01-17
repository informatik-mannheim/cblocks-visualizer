import { combineReducers } from 'redux';
import { sensors } from './sensors';
import { requests } from './requests';
import { modals } from './modals';
import { mappings } from './mappings';
import { pinnedCharts } from './pinnedCharts';
import { menuDrawer } from './menuDrawer';
import settings, * as fromSettings from './settings';

// import tests from './tests/';

const rootReducer = combineReducers({
  sensors,
  mappings,
  modals,
  requests,
  pinnedCharts,
  menuDrawer,
  settings
});

// tests();
export default rootReducer;

export const getUrlFor = (state, urlFor) => {
  return fromSettings.getUrlFor(state.settings, urlFor);
};

export const getBaseUrls = state => {
  return fromSettings.getBaseUrls(state.settings);
};
