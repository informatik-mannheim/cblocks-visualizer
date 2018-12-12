import Constants from '../constants/';

const getIDFromProps = props => {
  return (
    'chart-' + props.objectID + '-' + props.instanceID + '-' + props.resourceID
  );
};

const getPropsFromID = id => {
  const splitID = id.split('-');
  return {
    objectID: splitID[1],
    instanceID: splitID[2],
    resourceID: splitID[3]
  };
};

const checkIfPropsOK = props => {
  if (props.objectID === undefined) return false;
  if (props.instanceID === undefined) return false;
  if (props.resourceID === undefined) return false;
  return true;
};

const initialState = { count: 0, all_charts: [] };

export function pinnedCharts (state = initialState, action) {
  switch (action.type) {
    case Constants.Actions.PIN_CHART:
      if (checkIfPropsOK(action.chartProps)) {
        const newChart = Object.assign(
          {},
          { chartID: getIDFromProps(action.chartProps) },
          { chartProps: action.chartProps },
          { xPos: action.xPos },
          { yPos: action.yPos }
        );

        //Check if duplicate
        for (let i = 0; i < state.all_charts.length; i++) {
          if (state.all_charts[i].chartID === newChart.chartID) {
            return state;
          }
        }

        const newAllCharts = state.all_charts.concat(newChart);
        return {
          count: newAllCharts.length,
          all_charts: newAllCharts
        };
      }
      return state;
    case Constants.Actions.MOVE_CHART:
      return {
        count: state.count,
        all_charts: state.all_charts.map(currentChart =>
          chart(currentChart, action)
        )
      };
    case Constants.Actions.UNPIN_CHART:
      if (state.count !== 0) {
        const updatedCharts = state.all_charts.filter(
          item => item.chartID !== action.chartID
        );
        return { count: updatedCharts.length, all_charts: updatedCharts };
      }
      return state;
    default:
      return state;
  }
}

function chart (state = {}, action) {
  if (state.chartID !== getIDFromProps(action.chartProps)) {
    return state;
  }

  switch (action.type) {
    case Constants.Actions.MOVE_CHART:
      const movedChart = Object.assign({}, state, {
        xPos: action.xPos,
        yPos: action.yPos
      });
      return movedChart;
    default:
      return state;
  }
}
