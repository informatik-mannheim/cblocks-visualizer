import React, {Component} from 'react'
import {connect} from 'react-redux';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import Box from './Box';
import {URLs, ItemTypes} from '../Constants';
import * as action from '../action/';
import { DropTarget } from 'react-dnd';

//import { Button } from 'react-toolbox/lib/button';


/**
 * Specifies the drop target contract.
 * All methods are optional.
 */
const canvasTarget = {
  canDrop(props, monitor) {
    // You can disallow drop based on props or item
    const item = monitor.getItem();
    return true;
    //return canMakeChessMove(item.fromPosition, props.position);
  },

  hover(props, monitor, component) {
    // This is fired very often and lets you perform side effects
    // in response to the hover. You can't handle enter and leave
    // here—if you need them, put monitor.isOver() into collect() so you
    // can just use componentWillReceiveProps() to handle enter/leave.

    // You can access the coordinates if you need them
    const clientOffset = monitor.getClientOffset();
    const componentRect = findDOMNode(component).getBoundingClientRect();
    // You can check whether we're over a nested drop target
    const isJustOverThisOne = monitor.isOver({ shallow: true });

    // You will receive hover() even for items for which canDrop() is false
    const canDrop = monitor.canDrop();
  },

  drop(props, monitor, component) {
    if (monitor.didDrop()) {
      // If you want, you can check whether some nested
      // target already handled drop
      console.log("nested target already handled drop. ignored here!");
      return;
    }

    // Obtain the dragged item
    const delta = monitor.getDifferenceFromInitialOffset();
    const item = monitor.getItem();

    let left = Math.round(item.xPos + delta.x);
    let top = Math.round(item.yPos + delta.y);

    component.props.moveABox(item.id, left, top);

    // You can also do nothing and return a drop result,
    // which will be available as monitor.getDropResult()
    // in the drag source's endDrag() method
    return { moved: true };
  }
};

/**
 * Specifies which props to inject into your component.
 */
function collect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDropTarget: connect.dropTarget(),
    // You can ask the monitor about the current drag state:
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType()
  };
}

class Canvas extends Component {

  //TODO: move boxId fetching to App.
  componentWillReceiveProps(nextProps) {
    if (!this.props.isOver && nextProps.isOver) {
      // You can use this as enter handler
    }

    if (this.props.isOver && !nextProps.isOver) {
      // You can use this as leave handler
    }

    if (this.props.isOverCurrent && !nextProps.isOverCurrent) {
      // You can be more specific and track enter/leave
      // shallowly, not including nested targets
    }
    console.log("isOver: " + this.props.isOver + ", nextProps.isOver: " + nextProps.isOver + ", isOverCurrent: " + this.props.isOverCurrent + ", nextProps.isOverCurrent: " + nextProps.isOverCurrent);
  }

  componentDidMount() {
    this.props.fetchBoxIDs(URLs.FETCH_BOX_IDS_URL);
  }

  render() {

    const { isOver, canDrop, connectDropTarget } = this.props;

    if (this.props.hasErrored) {
      return <p>Error loading items from API</p>;
    }
    if (this.props.isLoading) {
      return <p>Loading...</p>;
    }
    var dropZoneStyle = {
      top: 200,
      left: 200,
      color: 'rgba(100,0,0,1)',
      border: '1px solid red',
      height: 800,
      width: '100%',
      zIndex: 100,
    };

    return connectDropTarget(
      <div>
          <div style={dropZoneStyle}></div>
          {this.props.boxes.map((b) => (
            <Box key={b._id} id={b._id} xPos={b.xPos} yPos={b.yPos} label={b.label} transducers={b.transducers}/>
          ))}
      </div>
    );
  }
}


Canvas.propTypes = {
    fetchBoxIDs: PropTypes.func.isRequired,
    moveABox: PropTypes.func,
    boxIds: PropTypes.array.isRequired,
    boxes: PropTypes.array,
    hasErrored: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired
};

Canvas.defaultProps = {
  boxIds: []
};

const mapStateToProps = (state) => {
  return {boxes: state.boxes, boxIds: state.boxIDs, hasErrored: state.fetchBoxIDsHasErrored, isLoading: state.fetchBoxIDsIsLoading};
};

const mapDispatchToProps = (dispatch) => {
  //TODO: remove moveABox once not needed anymore
  return {
    fetchBoxIDs: (url) => dispatch(action.fetchBoxIDs(url)),
    moveABox: (id, xPos, yPos) =>  dispatch(action.moveBox(id, xPos, yPos))
  };
};


const dropTargetCanvas = DropTarget(ItemTypes.BOX, canvasTarget, collect)(Canvas);
const connectedCanvas = connect(mapStateToProps, mapDispatchToProps)(dropTargetCanvas);
export default connectedCanvas;
