import Constants from '../constants';

export const buildRequest = (objectID, instanceID, resourceID, value) => ({
  type: Constants.Actions.BUILD_REQUEST,
  objectID,
  instanceID,
  resourceID,
  value
});

export const sendRequest = requestID => ({
  type: Constants.Actions.SEND_REQUEST,
  requestID
});

export const handleRequestResponse = (requestID, success, message) => ({
  type: Constants.Actions.HANDLE_REQUEST_RESPONSE,
  requestID,
  success,
  message
});
