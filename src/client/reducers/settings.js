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
      if (urlType === 'base') {
        return { ...state, URLs: { ...state.URLs, base: value } };
      } else {
        return { ...state, URLs: { ...state.URLs, MQTT: value } };
      }
    default:
      return state;
  }
};
export default settings;

export const getBaseUrls = state => {
  return { base: state.URLs.base, mqtt: state.URLs.MQTT };
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
