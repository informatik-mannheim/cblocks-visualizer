import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import svgIcons from '../../../../../../../images/svgIcons';

class CategoryMapping extends React.Component {
  render () {
    const { label, value, mappingID, active } = this.props.mapping;
    const shownValue
      = typeof value === 'number' ? Math.round(value * 10) / 10 : value;

    const svgIcon
      = active === true ? (
        <SvgIcon color="primary">
          <path d={svgIcons.eye} />
        </SvgIcon>
      ) : (
        <SvgIcon color="disabled">
          <path d={svgIcons.eye_off} />
        </SvgIcon>
      );
    return (
      <div style={{ position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            height: '100%',
            width: 5,
            background: '#ff00ff',
            left: 1
          }}
        />
        <div style={{ position: 'relative', width: '100%' }}>
          <Typography variant="subheading" align="center">
            {label}
          </Typography>
          <Typography
            variant="headline"
            align="center"
            style={{ marginTop: 0 }}
          >
            {shownValue}
          </Typography>
        </div>
        <div>
          <div
            style={{ float: 'right', position: 'absolute', right: 7, top: 5 }}
          >
            <IconButton
              variant="fab"
              aria-label="Toggle Visibility"
              color="primary"
              onClick={() => this.props.setMappingActivity(mappingID, !active)}
            >
              {svgIcon}
            </IconButton>
          </div>
        </div>
      </div>
    );
  }
}

CategoryMapping.propTypes = {
  mapping: PropTypes.object,
  setMappingActivity: PropTypes.func
};

export default CategoryMapping;
