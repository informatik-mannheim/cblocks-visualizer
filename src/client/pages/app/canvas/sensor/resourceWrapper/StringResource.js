import React from 'react';
import PropTypes from 'prop-types';
import * as action from '../../../../../action/';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import svgIcons from '../../../../../images/svgIcons';
import MappingDrawer from './MappingDrawer';
import Expand from 'react-expand-animated';
import Button from '@material-ui/core/Button';
import SvgIcon from '@material-ui/core/SvgIcon';

class StringResource extends React.Component {
  state = { mappingDrawerOpen: false };

  toggleMappingDrawer = () => {
    this.setState(prevState => ({
      mappingDrawerOpen: !prevState.mappingDrawerOpen
    }));
  };

  render () {
    return (
      <div
        style={{
          marginLeft: -24,
          marginRight: -24
        }}
      >
        <Typography variant="subheading" align="center">
          {this.props.resource.name}
        </Typography>

        <div
          style={{
            marginBottom: 5,
            paddingBottom: 50,
            boxShadow:
              this.state.mappingDrawerOpen === true
                ? '0px 4px 4px 0px rgba(0, 0, 0, 0.2)'
                : '0px 1px 0px 0px rgba(0, 0, 0, 0.2)'
          }}
        >
          <div style={{ marginLeft: 24, marginRight: 24 }}>
            <Typography variant="display1" align="center">
              {this.props.currentValue}
            </Typography>
          </div>
        </div>
        <div style={{ position: 'relative' }}>
          <Button
            variant="fab"
            mini
            aria-label="Show mappings"
            onClick={this.toggleMappingDrawer}
            disableRipple
            style={{
              boxShadow: '0px 4px 3px 0px rgba(0, 0, 0, 0.2)',
              position: 'absolute',
              zIndex: 5001,
              left: 'calc(50% - 20px)',
              transform: 'translate(0, -60%)',
              color: 'primary',
              backgroundColor: '#FFF'
            }}
          >
            <SvgIcon>
              <path
                d={
                  this.state.mappingDrawerOpen === false
                    ? svgIcons.chevron_down
                    : svgIcons.chevron_up
                }
              />
            </SvgIcon>
          </Button>
        </div>
        <Expand open={this.state.mappingDrawerOpen}>
          <MappingDrawer
            expanded
            showVisibilityButton={false}
            objectID={this.props.objectID}
            instanceID={this.props.instanceID}
            resourceID={this.props.resource.resourceID}
            mappings={this.props.mappings}
            setMappingActivity={this.props.setMappingActivity}
            showModal={this.props.showModal}
          />
        </Expand>
      </div>
    );
  }
}

StringResource.propTypes = {
  currentValue: PropTypes.any,
  instanceID: PropTypes.number,
  isWriteable: PropTypes.bool,
  mappings: PropTypes.array,
  objectID: PropTypes.number,
  resource: PropTypes.object,
  setMappingActivity: PropTypes.func,
  showModal: PropTypes.func
};

const mapStateToProps = (state, ownProps) => {
  const mappingIDList = ownProps.resource.mappings;
  const mappings = [];
  if (mappingIDList !== undefined) {
    for (const mappingID of mappingIDList) {
      mappings.push(state.mappings[mappingID]);
    }
  }
  return { mappings };
};

const mapDispatchToProps = dispatch => ({
  setMappingActivity: (mappingID, bool) => {
    dispatch(action.setMappingActivity(mappingID, bool));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StringResource);
