import Constants from '../constants/';

const initialHtmlIdsState = [];

export function htmlIds (state = initialHtmlIdsState, action) {
  switch (action.type) {
    case Constants.Actions.ADD_HTMLIDMAPPING:
      const newHtmlIdMapping = {
        _id: action._id,
        htmlId: action.htmlId
      };

      //check for duplicates
      for (let i = 0; i < state.length; i++) {
        if (state[i]._id === newHtmlIdMapping._id
          || state[i].htmlId === newHtmlIdMapping.htmlId) {
          return state;
        }
      }

      return [...state, newHtmlIdMapping];

    case Constants.Actions.UPDATE_HTMLIDMAPPING:
    return state;
    default:
      return state;
  }
}
