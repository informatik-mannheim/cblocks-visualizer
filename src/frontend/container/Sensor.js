import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Constants from '../constants/';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { Card, CardTitle} from 'react-toolbox/lib/card';
import ResourceWrapper from './Resources/ResourceWrapper';
import {HorizontalDividerLine} from '../component/HorizontalDividerLine';
import * as action from '../action/';

const sensorSource = {
  beginDrag (props) {
    // Return the data describing the dragged item
    const {objectID, instanceID, name, xPos, yPos} = props;
    return {objectID, instanceID, name, xPos, yPos};
  },

  endDrag (props, monitor, component) {
    if (!monitor.didDrop()) {
      return;
    }
    // When dropped on a compatible target, do something
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();

    if (dropResult.dropEffect === 'move' && item.objectID === component.props.objectID && item.instanceID === component.props.instanceID) {
      //console.log(dropResult);
      component.props.move(component.props.objectID, component.props.instanceID, dropResult.xPos, dropResult.yPos);
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

function getSensorStyles (props) {
  const { xPos, yPos, isDragging } = props;
  const transform = `translate3d(${xPos}px, ${yPos}px, 0)`;

  return {
    position: 'absolute',
    transform,
    WebkitTransform: transform,
    opacity: isDragging ? 0 : 1,
    height: isDragging ? 0 : '',
    cursor: 'move'
  };
}


class Sensor extends Component {
  constructor () {
    super();
  }

  componentDidMount () {
      // Use empty image as a drag preview so browsers don't draw it
      // and we can draw whatever we want on the custom drag layer instead.
    this.props.connectDragPreview(getEmptyImage(), {
      // IE fallback: specify that we'd rather screenshot the node
      // when it already knows it's being dragged so we can hide it with CSS.
      captureDraggingState: true
    });
  }

  render () {
    return this.props.connectDragSource(
      <div style={getSensorStyles(this.props)}>
        <Card style={{width: '350px'}}>
          <CardTitle
            title={this.props.name}
            subtitle="cBlocks Sensor"
          />
          {Object.entries(this.props.resources).map((resourceKeyValue) => {
            const currentResource = resourceKeyValue[1];
            const multiResource = currentResource.schema.properties === undefined ? false : true;
            if (this.props.values[currentResource.resourceID] !== undefined) {
              return (
              <div key={this.props.objectID + '-' + this.props.instanceID + '-' + currentResource.resourceID + '_div'}>
                <HorizontalDividerLine/>
                <ResourceWrapper
                  resource={currentResource}
                  currentValue={this.props.values[currentResource.resourceID]}
                  multiResource={multiResource}
                  isWriteable={currentResource.is_writeable}/>
              </div>);
            }
          })}
        </Card>
      </div>
    );
  }
}

Sensor.propTypes = {
  connectDragPreview: PropTypes.func.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  height: PropTypes.number,
  instanceID: PropTypes.number.isRequired,
  isDragging: PropTypes.bool.isRequired,
  move: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  objectID: PropTypes.number.isRequired,
  resources: PropTypes.object.isRequired,
  values: PropTypes.object,
  width: PropTypes.number,
  xPos: PropTypes.number.isRequired,
  yPos: PropTypes.number.isRequired
};

Sensor.defaultProps = {
  width: 400,
  height: 100,
  xPos: 500,
  yPos: 100
};

const mapStateToProps = (state, ownProps) => {
  let thisSensorIndex;
  for (let i = 0; i < state.sensors.count; i++){
    if (ownProps.objectID === state.sensors.all_sensors[i].objectID
      && ownProps.instanceID === state.sensors.all_sensors[i].instanceID) {
          thisSensorIndex = i;
    }
  }
  return {
          xPos: state.sensors.all_sensors[thisSensorIndex].xPos,
          yPos: state.sensors.all_sensors[thisSensorIndex].yPos,
          values: state.sensors.all_sensors[thisSensorIndex].values
        };
};

const mapDispatchToProps = (dispatch) => {
  return {
    move: (sensorID, instanceID, xPos, yPos) => dispatch(action.moveSensor(sensorID, instanceID, xPos, yPos))
  };
};


const dragSourceSensor = DragSource(Constants.ItemTypes.SENSOR, sensorSource, collect)(Sensor);
const connectedSensor = connect(mapStateToProps, mapDispatchToProps)(dragSourceSensor);
export default connectedSensor;
