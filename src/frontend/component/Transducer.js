import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const styles = {
  borderTop: '1px solid black',
};

class Transducer extends Component {

  render() {
    return (
    <div style={styles}>
      {this.props.description}
    </div>
    )
  }

}

Transducer.propTypes = {
  id: PropTypes.string.isRequired,
  description: PropTypes.string,
  resources: PropTypes.array,
}

export default Transducer;
