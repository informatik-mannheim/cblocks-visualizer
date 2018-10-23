import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import svgIcons from '../../../../../../images/svgIcons';
import blue from '@material-ui/core/colors/blue';

class CategoryMapping extends React.Component {
  render () {
    const { currentValue, min, max} = this.props;
    const { label, value, ranges } = this.props.mapping;
    const defaultValue = this.props.mapping.default;
    const shownValue = (typeof value === 'number') ? Math.round(value * 10) / 10 : value;
    return (
      <div style={{position: 'relative'}}>
        <div style={{position: 'relative', width: '100%'}}>
            <Typography variant='subheading' align='center'>{label}</Typography>
            <Typography variant='headline' align='center' style={{marginTop: 0}}>{shownValue}</Typography>
        </div>
        <div>
          <div style={{float: 'right', position: 'absolute', right: -15, top: 5}}>
            <IconButton variant='fab' aria-label="Toggle Visibility" color='primary' onClick={() => console.log('test')}>
              <SvgIcon color='primary'>
                <path d={svgIcons.eye} />
              </SvgIcon>
            </IconButton>
          </div>
        </div>
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
