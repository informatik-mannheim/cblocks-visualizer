import React, { Component } from 'react';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import Sensor from './Sensor';
import Constants from '../constants/';
import { DropTarget } from 'react-dnd';
import { subscribe } from 'redux-subscriber';
import { enableUniqueIds } from 'react-html-id';
import MappingCreationDialog from './MappingCreationDialog';

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

  constructor () {
    super();
    enableUniqueIds(this);
    let canvasId;
    let state;
  }

  componentDidMount () {
/*
    jsPlumbInstance.ready(function (){
      jsPlumbInstance.setContainer(this.canvasId);
    });
*/
    const unsubscribeFromMoveNode = subscribe('connections', state => {
      //renderConnections(state);
    });

  }
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
  }

  render () {
    const { isOver, canDrop, connectDropTarget } = this.props;

    const dropZoneStyle = {
      top: 200,
      left: 200,
      height: 800,
      width: '100%'
    };
    this.canvasId = this.nextUniqueId();

    return connectDropTarget(
      <div id={this.canvasId} style={dropZoneStyle}>
        {this.props.sensors.all_sensors.map((sensor) => (
          <div key={sensor.objectId + '-' + sensor.instanceID + '_div'}>
            <Sensor objectID={sensor.objectID} instanceID={sensor.instanceID} xPos={sensor.xPos}
              yPos={sensor.yPos} name={sensor.name} resources={sensor.resources} ref={sensor.objectID + '-' + sensor.instanceID}/>
          </div>
        ))}
        <MappingCreationDialog />
      </div>
    );
  }
}

Canvas.propTypes = {
  canDrop: PropTypes.bool,
  connectDropTarget: PropTypes.func,
  connections: PropTypes.array,
  isOver: PropTypes.bool,
  isOverCurrent: PropTypes.bool,
  sensors: PropTypes.object
};

Canvas.defaultProps = {
};

const mapStateToProps = (state) => {
  return {
    connections: state.connections,
    sensors: state.sensors
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

const dropTargetCanvas = DropTarget([Constants.ItemTypes.SENSOR], canvasTarget, collect)(Canvas);
const connectedCanvas = connect(mapStateToProps, mapDispatchToProps)(dropTargetCanvas);
export default connectedCanvas;
