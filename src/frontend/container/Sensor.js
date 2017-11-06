import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Constants from '../constants/';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { Card, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import * as action from '../action/';

const sensorSource = {
  beginDrag (props) {
    // Return the data describing the dragged item
    //const item = { _id: props._id };
    const {_id, xPos, yPos, label} = props;
    return {_id, xPos, yPos, label};
  },

  endDrag (props, monitor, component) {
    if (!monitor.didDrop()) {
      return;
    }

    // When dropped on a compatible target, do something
    const item = monitor.getItem();
    //console.log('Dropped on compatible target: ' + item);
    const dropResult = monitor.getDropResult();

    if (dropResult.dropEffect === 'move' && dropResult.item === component.props._id) {
      component.props.move(component.props._id, dropResult.xPos, dropResult.yPos);
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

  componentDidMount () {
      // Use empty image as a drag preview so browsers don't draw it
      // and we can draw whatever we want on the custom drag layer instead.
    this.props.connectDragPreview(getEmptyImage(), {
      // IE fallback: specify that we'd rather screenshot the node
      // when it already knows it's being dragged so we can hide it with CSS.
      captureDraggingState: true
    });
  }

  render (){
    //console.log(this.props.transducers);
    return this.props.connectDragSource(
      <div style={getSensorStyles(this.props)}>
        <Card style={{width: '350px'}}>
          <CardTitle
            title={this.props.label}
            subtitle="cBlocks Sensor"
          />
          <CardText>'TEXTTEXT'</CardText>
          <CardActions style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}/>
        </Card>
      </div>
    );
  }
}

Sensor.propTypes = {
  connectDragPreview: PropTypes.func.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  height: PropTypes.number,
  _id: PropTypes.string.isRequired,
  isDragging: PropTypes.bool.isRequired,
  label: PropTypes.string,
  move: PropTypes.func.isRequired,
  width: PropTypes.number,
  xPos: PropTypes.number.isRequired,
  yPos: PropTypes.number.isRequired
};

Sensor.defaultProps = {
  width: 400,
  height: 100,
  label: 'MySensor'
};

const mapStateToProps = (state, ownProps) => {
  let thisSensorIndex;
  for (let i = 0; i < state.sensors.count; i++){
    if (ownProps._id.localeCompare(state.sensors.all_sensors[i]._id) === 0) {
      thisSensorIndex = i;
    }
  }
  return {
          xPos: state.sensors.all_sensors[thisSensorIndex].xPos,
          yPos: state.sensors.all_sensors[thisSensorIndex].yPos
        };
};

const mapDispatchToProps = (dispatch) => {
  return {
    move: (_id, xPos, yPos) => dispatch(action.moveSensor(_id, xPos, yPos))
  };
};


const dragSourceSensor = DragSource(Constants.ItemTypes.SENSOR, sensorSource, collect)(Sensor);
const connectedSensor = connect(mapStateToProps, mapDispatchToProps)(dragSourceSensor);
export default connectedSensor;
