import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const getOffset = (el) => {
    const rect = el.getBoundingClientRect();
    return {
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height
    };
};

const getStyles = (node, sensor) => {
  const thickness = 2;
  const off1 = getOffset(node);
  const off2 = getOffset(sensor);

  const x1 = off1.left + off1.width;
  const y1 = off1.top + (off1.height / 2);

  const x2 = off2.left;
  const y2 = off2.top + (off2.height / 2);
  // distance
  const length = Math.round(Math.sqrt(((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1))));
  // center
  const cx = Math.round(((x1 + x2) / 2) - (length / 2));
  const cy = Math.round(((y1 + y2) / 2) - (thickness / 2));
  // angle
  const angle = Math.round(Math.atan2((y1 - y2), (x1 - x2)) * (180 / Math.PI));

  const transform = `rotate(${angle}deg)`;
  const styles = {
    padding: '0px',
    margin: '0px',
    height: '2px',
    backgroundColor: '#6f6f6f',
    lineHeight: '1px',
    position: 'absolute',
    left: cx + 'px',
    top: cy + 'px',
    width: length + 'px',
    transform,
    WebkitTransform: transform
  };
  return styles;
};

const getSensor = (props) => {
  for (const key of Object.keys(props.refs)) {
    if (key === props.sensorId) {
      return ReactDOM.findDOMNode(props.refs[key]);
    }
  }
};

const getNode = (props) => {
  for (const key of Object.keys(props.refs)) {
    if (key === props.nodeId) {
      return ReactDOM.findDOMNode(props.refs[key]);
    }
  }
  //return ReactDOM.findDOMNode(props.refs.node2_id);
};

class Connection extends React.Component {

  constructor (props) {
    super(props);
    this.sensor = getSensor(props);
    this.node = getNode(props);
    this.connectionStyles = getStyles(this.node, this.sensor);
  }

  render () {
    return (
      <div style={this.connectionStyles}/>
    );
  }
}

Connection.propTypes = {
  nodeId: PropTypes.string,
  refs: PropTypes.object,
  sensorId: PropTypes.string
};

export default Connection;
