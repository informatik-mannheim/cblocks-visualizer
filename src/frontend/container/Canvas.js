import React, {Component} from 'react';
import {connect} from 'react-redux';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import Node from './Node';
import Sensor from './Sensor';
import Constants from '../constants/';
import * as action from '../action/';
import { DropTarget } from 'react-dnd';
import { subscribe } from 'redux-subscriber';


//import { Button } from 'react-toolbox/lib/button';

/**
 * Specifies the drop target contract.
 * All methods are optional.
 */
const canvasTarget = {
  canDrop (props, monitor) {
    // You can disallow drop based on props or item
    const item = monitor.getItem();
    return true;
    //return canMakeChessMove(item.fromPosition, props.position);
  },

  hover (props, monitor, component) {
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

  drop (props, monitor, component) {
    if (monitor.didDrop()) {
      // If you want, you can check whether some nested
      // target already handled drop
      console.log('nested target already handled drop. ignored here!');
      return;
    }

    // Obtain the dragged item
    const delta = monitor.getDifferenceFromInitialOffset();
    const item = monitor.getItem();

    const left = Math.round(item.xPos + delta.x);
    const top = Math.round(item.yPos + delta.y);

    // You can also do nothing and return a drop result,
    // which will be available as monitor.getDropResult()
    // in the drag source's endDrag() method
    return {item: item._id, xPos: left, yPos: top};
  }
};

/**
 * Specifies which props to inject into your component.
 */
function collect (cnnct, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDropTarget: cnnct.dropTarget(),
    // You can ask the monitor about the current drag state:
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType()
  };
}

class Canvas extends Component {

  componentDidMount () {
    //this.props.fetchNodeIDs();
    const unsubscribe = subscribe('nodes.count', state => {
    });
  }
  //TODO: move nodeId fetching to App.
  componentWillReceiveProps (nextProps) {
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
    //console.log('isOver: ' + this.props.isOver + ', nextProps.isOver: ' + nextProps.isOver + ', isOverCurrent: ' + this.props.isOverCurrent + ', nextProps.isOverCurrent: ' + nextProps.isOverCurrent);
  }

  render () {
    const { isOver, canDrop, connectDropTarget } = this.props;

    const dropZoneStyle = {
      top: 200,
      left: 200,
      height: 800,
      width: '100%',
      zIndex: 100
    };

    return connectDropTarget(
      <div>
        <div style={dropZoneStyle}>
          {this.props.nodes.all_nodes.map((node) => (
              <Node key={node._id} _id={node._id} xPos={node.xPos} yPos={node.yPos} label={node.label} sensors={node.sensors}/>
          ))}
          {this.props.sensors.all_sensors.map((sensor) => (
            <Sensor key={sensor._id} _id={sensor._id} xPos={sensor.xPos} yPos={sensor.yPos} label={sensor.label} />
          ))}
        </div>
      </div>
    );
  }
}


Canvas.propTypes = {
  canDrop: PropTypes.bool,
  connectDropTarget: PropTypes.func,
  isOver: PropTypes.bool,
  isOverCurrent: PropTypes.bool,
  nodeIds: PropTypes.array.isRequired,
  nodes: PropTypes.object,
  sensors: PropTypes.object
};

Canvas.defaultProps = {
  nodeIds: []
};

const mapStateToProps = (state) => {
  return {nodes: state.nodes, nodeIds: state.nodeIDs, sensors: state.sensors, hasErrored: state.fetchNodeIDsHasErrored, isLoading: state.fetchNodeIDsIsLoading};
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchNodeIDs: () => dispatch(action.fetchNodeIDs())
  };
};

const dropTargetCanvas = DropTarget([Constants.ItemTypes.SENSOR, Constants.ItemTypes.NODE], canvasTarget, collect)(Canvas);
const connectedCanvas = connect(mapStateToProps, mapDispatchToProps)(dropTargetCanvas);
export default connectedCanvas;
