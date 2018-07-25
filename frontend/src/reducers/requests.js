import Constants from '../constants/';

const initialRequestsState = {
  totalRequests: 0,
  unresolvedRequests: [],
  resolvedRequests: []
};

export function requests (state = initialRequestsState, action) {
  switch (action.type) {
    case Constants.Actions.BUILD_REQUEST:

      const newRequest = Object.assign(
        {},
        {requestID: state.totalRequests + 1},
        {objectID: action.objectID},
        {instanceID: action.instanceID},
        {resourceID: action.resourceID},
        {sent: false},
        {value: action.value}
      );

       const newUnresolvedRequests = state.unresolvedRequests.concat(newRequest);
       return {
         totalRequests: state.totalRequests + 1,
         unresolvedRequests: newUnresolvedRequests,
         resolvedRequests: state.resolvedRequests
       };
    case Constants.Actions.SEND_REQUEST:

    const unresolvedRequestsUpdated = state.unresolvedRequests.map(req => {
      if (req.requestID === action.requestID) {
        return Object.assign({}, req, {sent: true});
      }
      return req;
    });
    return Object.assign({}, state, {unresolvedRequests: unresolvedRequestsUpdated});

    case Constants.Actions.HANDLE_REQUEST_RESPONSE:
      //TODO: proper error handling when success false

      const index = state.unresolvedRequests.findIndex(x => x.requestID === action.requestID);

      const newlyResolvedRequest = Object.assign(
        {},
        state.unresolvedRequests[index],
        {success: action.success},
        {message: action.message}
      );

      if (newlyResolvedRequest !== undefined) {
        const updatedUnresolvedRequests = [
          ...state.unresolvedRequests.slice(0, index),
          ...state.unresolvedRequests.slice(index + 1)
        ];

        const updatedResolvedRequests = [
          ...state.resolvedRequests, newlyResolvedRequest
        ];
        return {totalRequests: state.totalRequests, unresolvedRequests: updatedUnresolvedRequests, resolvedRequests: updatedResolvedRequests};
      }

      return state;
    default:
      return state;
  }
}
