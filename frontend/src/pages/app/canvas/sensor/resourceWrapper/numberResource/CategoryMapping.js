import React from 'react';
import PropTypes from 'prop-types';
import SensorBar from '../../../../../../components/SensorBar';
import Typography from '@material-ui/core/Typography';

class CategoryMapping extends React.Component {
  render () {
    const { currentValue, min, max} = this.props;
    const { label, value, ranges } = this.props.mapping;
    const defaultValue = this.props.mapping.default;
    const shownValue = (typeof value === 'number') ? Math.round(value * 10) / 10 : value;
    return (
      <div>
          <Typography variant='subheading' align='center'>{label}</Typography>
          <Typography variant='headline' align='center' style={{marginTop: 0}}>{shownValue}</Typography>
      </div>
    );
  }
}

CategoryMapping.propTypes = {
  currentValue: PropTypes.number,
  mapping: PropTypes.object,
  max: PropTypes.number,
  min: PropTypes.number
};

export default CategoryMapping;
