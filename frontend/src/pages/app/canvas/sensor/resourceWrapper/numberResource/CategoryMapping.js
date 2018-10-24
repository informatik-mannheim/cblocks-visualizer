import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import svgIcons from '../../../../../../images/svgIcons';

class CategoryMapping extends React.Component {
  render () {
    const { label, value } = this.props.mapping;
    const shownValue = (typeof value === 'number') ? Math.round(value * 10) / 10 : value;
    return (
      <div style={{position: 'relative'}}>
        <div style={{position: 'relative', width: '100%'}}>
            <Typography variant='subheading' align='center'>{label}</Typography>
            <Typography variant='headline' align='center' style={{marginTop: 0}}>{shownValue}</Typography>
        </div>
        <div>
          <div style={{float: 'right', position: 'absolute', right: 7, top: 5}}>
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
  mapping: PropTypes.object
};

export default CategoryMapping;
