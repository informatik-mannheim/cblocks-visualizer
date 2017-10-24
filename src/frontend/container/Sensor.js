import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Constants from '../constants/index.js';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { Card, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import AddButton from '../component/AddButton.js';

const transducerSource = {
  beginDrag (props) {
    // Return the data describing the dragged item
    //const item = { id: props.id };
    const {id, xPos, yPos, label} = props;
    return {id, xPos, yPos, label};
  },

  endDrag (props, monitor, component) {
    if (!monitor.didDrop()) {
      return;
    }

    // When dropped on a compatible target, do something
    const item = monitor.getItem();
    //console.log('Dropped on compatible target: ' + item);
    const dropResult = monitor.getDropResult();
    //console.log(dropResult);
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
          <CardText>'Blabla'</CardText>
          <CardActions style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <AddButton floating primary/>
          </CardActions>
        </Card>
      </div>
    );
  }
}

/*
{this.props.transducers.map((t) => (
  <Sensor key={t} id={t} description={t} />
))}
*/
Sensor.propTypes = {
  connectDragPreview: PropTypes.func.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  height: PropTypes.number,
  id: PropTypes.string.isRequired,
  isDragging: PropTypes.bool.isRequired,
  label: PropTypes.string,
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
  for (let i = 0; i < state.nodes.length; i++){
    if (ownProps.id.localeCompare(state.nodes[i]._id) === 0) {
      thisSensorIndex = i;
    }
  }
  return {
          xPos: state.nodes[thisSensorIndex].xPos,
          yPos: state.nodes[thisSensorIndex].yPos
        };
};

const connectedSensor = connect(mapStateToProps)(Sensor);
const dragSourceSensor = DragSource(Constants.ItemTypes.SENSOR, transducerSource, collect)(connectedSensor);
export default dragSourceSensor;
