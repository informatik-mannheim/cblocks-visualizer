import Constants from '../constants';

export const sendRequest = (objectID, instanceID, resourceID, value) => {
  return {type: Constants.Actions.SEND_REQUEST, objectID, instanceID, resourceID, value};
};

export const handleRequestResponse = (requestID, success, message) => {
  return {type: Constants.Actions.HANDLE_REQUEST_RESPONSE, requestID, success, message};
};
