import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Constants from '../../../constants/';
import { DragSource } from 'react-dnd';
import { withStyles } from '@material-ui/core/styles';
import { Avatar, Card, CardContent, CardHeader } from '@material-ui/core';
import { getEmptyImage } from 'react-dnd-html5-backend';
import SvgIcon from '@material-ui/core/SvgIcon';
import * as action from '../../../action/';
import svgIcons from '../../../images/svgIcons';
import LineChart from '../../../components/LineChart';

const chartSource = {
  beginDrag (props) {
    const { chartProps, xPos, yPos } = props;
    return { chartProps, xPos, yPos };
  },
  endDrag (props, monitor, component) {
    if (!monitor.didDrop()) {
      return;
    }
    // When dropped on a compatible target, do something
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();

    if (
      dropResult.dropEffect === 'move'
      && item.chartProps.objectID === component.props.chartProps.objectID
      && item.chartProps.instanceID === component.props.chartProps.instanceID
      && item.chartProps.resourceID === component.props.chartProps.resourceID
    ) {
      component.props.move(
        component.props.chartProps,
        dropResult.xPos,
        dropResult.yPos
      );
    }
  }
};

function collect (cnnct, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDragSource: cnnct.dragSource(),
    connectDragPreview: cnnct.dragPreview(),
    // You can ask the monitor about the current drag state:
    isDragging: monitor.isDragging()
  };
}

const getBoundingDivStyles = props => {
  const { xPos, yPos, isDragging } = props;
  const transform = `translate3d(${xPos}px, ${yPos}px, 0)`;

  return {
    position: 'absolute',
    transform,
    WebkitTransform: transform,
    opacity: isDragging ? 0 : 1,
    height: isDragging ? 0 : ''
  };
};

const styles = () => ({
  card: {
    minWidth: 350,
    border: 0
  },
  cardHeader: {
    background: '#DD302A'
  },
  title: {
    marginBottom: 16,
    fontSize: 30
  },
  chartAvatar: {
    color: 'primary',
    backgroundColor: '#fff'
  }
});

class DraggableChart extends Component {
  componentDidMount () {
    // Use empty image as a drag preview so browsers don't draw it
    this.props.connectDragPreview(getEmptyImage(), {
      // IE fallback: specify that we'd rather screenshot the node
      // when it already knows it's being dragged so we can hide it with CSS.
      captureDraggingState: true
    });
    //this.isVisible = false;
  }

  render () {
    const chartIcon = (
      <SvgIcon color="primary">
        <path d={svgIcons.chart} />
      </SvgIcon>
    );

    const { objectID, instanceID, resourceID } = this.props.chartProps;

    let sensorLabel, resourceLabel;
    for (let i = 0; i < this.props.sensors.length; i++) {
      const currentSensor = this.props.sensors[i];
      if (
        objectID === currentSensor.objectID
        && instanceID === currentSensor.instanceID
      ) {
        sensorLabel = currentSensor.name;
        resourceLabel = currentSensor.resources[resourceID].name;
      }
    }

    const header = (
      <div>
        <CardHeader
          className={this.props.classes.cardHeader}
          style={{ cursor: 'move' }}
          avatar={
            <Avatar className={this.props.classes.chartAvatar}>
              {chartIcon}
            </Avatar>
          }
          title={resourceLabel}
        />
      </div>
    );

    const chartComponent = (
      <div style={getBoundingDivStyles(this.props)}>
        <Card className={this.props.classes.card}>
          {this.props.connectDragSource(header)}
          <CardContent>
            <LineChart
              displayLegend={false}
              chartProps={{
                objectID: this.props.chartProps.objectID,
                instanceID: this.props.chartProps.instanceID,
                resourceID: this.props.chartProps.resourceID
              }}
            />
          </CardContent>
        </Card>
      </div>
    );

    return chartComponent;
  }
}

DraggableChart.propTypes = {
  chartProps: PropTypes.object.isRequired,
  classes: PropTypes.object,
  connectDragPreview: PropTypes.func.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  move: PropTypes.func.isRequired,
  sensors: PropTypes.array,
  xPos: PropTypes.number.isRequired,
  yPos: PropTypes.number.isRequired
};

const mapStateToProps = (state, ownProps) => {
  let chartIndex;
  for (let i = 0; i < state.pinnedCharts.count; i++) {
    if (
      ownProps.chartProps.objectID
        === state.pinnedCharts.all_charts[i].chartProps.objectID
      && ownProps.chartProps.instanceID
        === state.pinnedCharts.all_charts[i].chartProps.instanceID
      && ownProps.chartProps.resourceID
        === state.pinnedCharts.all_charts[i].chartProps.resourceID
    ) {
      chartIndex = i;
    }
  }
  return {
    chartProps: state.pinnedCharts.all_charts[chartIndex].chartProps,
    sensors: state.sensors.all_sensors,
    xPos: state.pinnedCharts.all_charts[chartIndex].xPos,
    yPos: state.pinnedCharts.all_charts[chartIndex].yPos
  };
};

const mapDispatchToProps = dispatch => {
  return {
    move: (chartID, xPos, yPos) =>
      dispatch(action.moveChart(chartID, xPos, yPos))
  };
};

const dragSourceChart = DragSource(
  Constants.ItemTypes.CHART,
  chartSource,
  collect
)(DraggableChart);
const connectedChart = connect(
  mapStateToProps,
  mapDispatchToProps
)(dragSourceChart);
export default withStyles(styles)(connectedChart);
