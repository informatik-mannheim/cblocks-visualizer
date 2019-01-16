import Constants from '../constants/';
const initialState = {
  URLs: {
    base: '37.61.204.167:8081',
    MQTT: '172.16.1.1:1884',
    fetchSensorRoute: 'cblocks',
    categoryMappingRoute: 'category',
    rangeMappingRoute: 'range',
    labelMappingRoute: 'label'
  }
};

const settings = (state = initialState, action) => {
  switch (action.type) {
    case Constants.Actions.CHANGE_URL:
      const { urlType, value } = action;
      let newSettings;
      if (urlType === 'base') {
        newSettings = { ...state, URLs: { ...state.URLs, base: value } };
        state.URLs.base = value;
      } else {
        newSettings = { ...state, URLs: { ...state.URLs, MQTT: value } };
      }

      return newSettings;
    default:
      return state;
  }
};
export default settings;

export const getBaseValues = state => {
  return { base: state.Urls.base, mqtt: state.URLs.MQTT };
};

export const getUrlFor = (state, urlFor) => {
  switch (urlFor) {
    case 'mqtt':
      return `mqtt://${state.URLs.MQTT}`;
    case 'sensors':
      return `http://${state.URLs.base}/cblocks/`;
    case 'category':
      return `http://${state.URLs.base}/mappings/category`;
    case 'range':
      return `http://${state.URLs.base}/mappings/range`;
    case 'label':
      return `http://${state.URLs.base}/mappings/label`;
    default:
      console.error('No such URL');
      return;
  }
};
