import Constants from '../constants';

export const moveChart = (chartProps, xPos, yPos) => {
  return {type: Constants.Actions.MOVE_CHART, chartProps: chartProps, xPos: xPos, yPos: yPos};
};

export const pinChart = (chartProps, xPos = 500, yPos = 100) => {
  return {type: Constants.Actions.PIN_CHART, chartProps, xPos, yPos};
};

export const unpinChart = (chartID) => {
  return {type: Constants.Actions.UNPIN_CHART, chartID};
};
