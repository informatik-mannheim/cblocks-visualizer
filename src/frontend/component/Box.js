import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ItemTypes } from '../Constants';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import Transducer from './Transducer';

const boxSource = {
  beginDrag(props) {
    // Return the data describing the dragged item
    //const item = { id: props.id };
    const {id, xPos, yPos, label} = props;
    return {id, xPos, yPos, label};
  },

  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      return;
    }

    // When dropped on a compatible target, do something
    const item = monitor.getItem();
    console.log("Dropped on compatible target: " + item);
    const dropResult = monitor.getDropResult();
    console.log(dropResult);
  }
};

function collect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    // You can ask the monitor about the current drag state:
    isDragging: monitor.isDragging()
  };
}

function getBoxStyles(props) {
  const { xPos, yPos, isDragging } = props;
  const transform = `translate3d(${xPos}px, ${yPos}px, 0)`;

  return {
    position: 'absolute',
    transform,
    WebkitTransform: transform,
    opacity: isDragging ? 0 : 1,
    height: isDragging ? 0 : '',
    width: 400,
    border: '1px solid black',
    borderRadius: 5,
    cursor: 'move',
    boxShadow: '0px 13px 40px -10px rgba(0,0,0,0.75)',
  };
}

class Box extends Component {

  componentDidMount() {
      // Use empty image as a drag preview so browsers don't draw it
      // and we can draw whatever we want on the custom drag layer instead.
    this.props.connectDragPreview(getEmptyImage(), {
      // IE fallback: specify that we'd rather screenshot the node
      // when it already knows it's being dragged so we can hide it with CSS.
      captureDraggingState: true,
    });
  }

  render(){
    console.log(this.props.transducers);
    return this.props.connectDragSource(
      <div style={getBoxStyles(this.props)}>
        <div>{this.props.label}</div>
        {this.props.transducers.map((t) => (
          <Transducer key={t} id={t} description={t} />
        ))}
      </div>
    )
  }
}

/*
{this.props.transducers.map((t) => (
  <Transducer key={t} id={t} description={t} />
))}
*/
Box.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  connectDragPreview: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  xPos: PropTypes.number.isRequired,
  yPos: PropTypes.number.isRequired,
  label: PropTypes.string,
  transducers: PropTypes.array
}

Box.defaultProps = {
  width: 400,
  height: 100,
  label: 'MyBox',
};

const mapStateToProps = (state, ownProps) => {
  var thisBoxIndex;
  for (let i=0; i<state.boxes.length; i++){
    if(ownProps.id.localeCompare(state.boxes[i]._id) === 0) {
      thisBoxIndex = i;
    }
  }
  return {
          xPos: state.boxes[thisBoxIndex].xPos,
          yPos: state.boxes[thisBoxIndex].yPos
        };
};

const connectedBox = connect(mapStateToProps)(Box);
const dragSourceBox = DragSource(ItemTypes.BOX, boxSource, collect)(connectedBox);
export default dragSourceBox;
