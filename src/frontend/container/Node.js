import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Constants from '../constants/';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { Card, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import AddButton from '../component/AddButton.js';
import * as action from '../action/';
import { enableUniqueIds } from 'react-html-id';

const nodeSource = {
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

  constructor () {
        super();
        enableUniqueIds(this);
  }


  componentDidMount () {
    //Drag and Drop preview
    this.props.connectDragPreview(getEmptyImage(), {
      captureDraggingState: true
    });
  }

  render (){
    //console.log(this.props.transducers);
    return this.props.connectDragSource(
      <div id={this.nextUniqueId()} style={getNodeStyles(this.props)}>
        <Card style={{width: '350px'}}>
          <CardTitle title={this.props.label} subtitle="cBlocks Node"/>
          {/*<CardText>'Blabla'</CardText>*/}
          <CardActions style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <AddButton floating primary/>
          </CardActions>
        </Card>
      </div>
    );
  }
}

Node.propTypes = {
  connectDragPreview: PropTypes.func.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  height: PropTypes.number,
  _id: PropTypes.string.isRequired,
  isDragging: PropTypes.bool.isRequired,
  label: PropTypes.string,
  move: PropTypes.func.isRequired,
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
  for (let i = 0; i < state.nodes.count; i++){
    if (ownProps._id.localeCompare(state.nodes.all_nodes[i]._id) === 0) {
      thisNodeIndex = i;
    }
  }
  return {
          xPos: state.nodes.all_nodes[thisNodeIndex].xPos,
          yPos: state.nodes.all_nodes[thisNodeIndex].yPos
        };
};

const mapDispatchToProps = (dispatch) => {
  return {
    move: (_id, xPos, yPos) => dispatch(action.moveNode(_id, xPos, yPos))
  };
};


const dragSourceNode = DragSource(Constants.ItemTypes.NODE, nodeSource, collect)(Node);
const connectedNode = connect(mapStateToProps, mapDispatchToProps)(dragSourceNode);
export default connectedNode;
