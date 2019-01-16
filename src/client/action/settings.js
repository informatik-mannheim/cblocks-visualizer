import Constants from '../constants';

export const changeURL = (urlType, value) => ({
  type: Constants.Actions.CHANGE_URL,
  urlType,
  value
});
