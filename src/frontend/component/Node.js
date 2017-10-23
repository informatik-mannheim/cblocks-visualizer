import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ItemTypes } from '../Constants';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import Transducer from './Transducer';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import {Button} from 'react-toolbox/lib/button';
import AddButton from './AddButton.js';

const nodeSource = {
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

function getNodeStyles (props) {
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


class Node extends Component {

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
      <div style={getNodeStyles(this.props)}>
        <Card style={{width: '350px'}}>
          <CardTitle
            title={this.props.label}
            subtitle="cBlocks Node"
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
  <Transducer key={t} id={t} description={t} />
))}
*/
Node.propTypes = {
  connectDragPreview: PropTypes.func.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  height: PropTypes.number,
  id: PropTypes.string.isRequired,
  isDragging: PropTypes.bool.isRequired,
  label: PropTypes.string,
  transducers: PropTypes.array,
  width: PropTypes.number,
  xPos: PropTypes.number.isRequired,
  yPos: PropTypes.number.isRequired
};

Node.defaultProps = {
  width: 400,
  height: 100,
  label: 'MyNode'
};

const mapStateToProps = (state, ownProps) => {
  let thisNodeIndex;
  for (let i = 0; i < state.nodes.length; i++){
    if (ownProps.id.localeCompare(state.nodes[i]._id) === 0) {
      thisNodeIndex = i;
    }
  }
  return {
          xPos: state.nodes[thisNodeIndex].xPos,
          yPos: state.nodes[thisNodeIndex].yPos
        };
};

const connectedNode = connect(mapStateToProps)(Node);
const dragSourceNode = DragSource(ItemTypes.NODE, nodeSource, collect)(connectedNode);
export default dragSourceNode;
