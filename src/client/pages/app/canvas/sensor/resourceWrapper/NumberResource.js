import React from 'react';
import PropTypes from 'prop-types';
import MaterialSlider from '../../../../../components/MaterialSlider';
import SensorBar from '../../../../../components/SensorBar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SvgIcon from '@material-ui/core/SvgIcon';
import svgIcons from '../../../../../images/svgIcons';
import MappingDrawer from './MappingDrawer';
import Expand from 'react-expand-animated';
import { connect } from 'react-redux';
import Constants from '../../../../../constants';
import * as action from '../../../../../action/';

class NumberResource extends React.Component {
  state = { mappingDrawerOpen: false };

  toggleMappingDrawer = () => {
    this.setState(prevState => ({
      mappingDrawerOpen: !prevState.mappingDrawerOpen
    }));
  };

  render () {
    if (this.props.smallForm === false) {
      //Single Resource
      const max = this.props.resource.schema.maximum;
      const min = this.props.resource.schema.minimum;

      const getMappingPalette = i => {
        const COLORS = Constants.Colors;
        switch (i % 3) {
          case 0:
            return COLORS.secondary_1;
          case 1:
            return COLORS.secondary_2;
          case 2:
            return COLORS.complementary;
          default:
            return COLORS.primary;
        }
      };

      const normalizedMappings = mappings => {
        const newMappings = [];

        for (let i = 0; i < mappings.length; i++) {
          const mapping = mappings[i];
          const mappingPalette = getMappingPalette(i);

          switch (mapping.mappingType) {
            case 'category': {
              const normalizedRanges = [];
              const ranges = mapping.ranges;
              let j = 0;
              for (const range of ranges) {
                normalizedRanges.push({
                  color: mappingPalette[j++],
                  label: range.label,
                  low: range.greaterEqualsThan,
                  high: range.lessThan
                });
              }
              newMappings.push({
                label: mapping.label,
                mappingType: mapping.mappingType,
                ranges: normalizedRanges,
                active: mapping.active
              });
              break;
            }
            case 'range': {
              const ranges = [
                {
                  color: mappingPalette[2],
                  label: mapping.label,
                  low: mapping.greaterEqualsThan,
                  high: mapping.lessEqualsThan
                }
              ];
              newMappings.push({
                label: mapping.label,
                mappingType: mapping.mappingType,
                ranges,
                active: mapping.active
              });
              break;
            }
            case 'label':
              // console.log('NOT IMPLEMENTED: label mappings');
              return;
            default:
              console.error(`No such mapping type: ${mapping.mappingType}`);
          }
        }
        return newMappings;
      };

      const chartModalProps = {
        open: true,
        objectID: this.props.objectID,
        instanceID: this.props.instanceID,
        resourceID: this.props.resource.resourceID
      };

      const unit
        = this.props.resource.unit === undefined ? '' : this.props.resource.unit;

      const chartButton
        = this.props.objectID !== 3307 ? (
          <div style={{ position: 'absolute', right: '16px' }}>
            <Button
              variant="fab"
              mini
              aria-label="Show Graph"
              color="primary"
              onClick={() => this.props.showModal('CHART', chartModalProps)}
            >
              <SvgIcon>
                <path d={svgIcons.chart} />
              </SvgIcon>
            </Button>
          </div>
        ) : (
          <React.Fragment />
        );

      const bar
        = this.props.isWriteable === false ? (
          <>
            <SensorBar
              currentValue={this.props.currentValue}
              mappings={normalizedMappings(this.props.mappings)}
              max={max}
              min={min}
              style={{ marginBottom: 0 }}
            />
            <div style={{ display: 'block', float: 'left' }}>
              <Typography variant="body2">{min}</Typography>
            </div>
            <div style={{ display: 'block', float: 'right', marginTop: 0 }}>
              <Typography variant="body2">{max}</Typography>
            </div>
          </>
        ) : (
          <>
            <MaterialSlider
              isMultiResource={false}
              objectID={this.props.objectID}
              instanceID={this.props.instanceID}
              resourceID={this.props.resource.resourceID}
              currentValue={this.props.currentValue}
              maximum={max}
              minimum={min}
              height={20}
              isWriteable={this.props.isWriteable}
              requestChangeToResource={this.props.buildRequest}
              requestChangeToSubresource={this.props.requestChangeToSubresource}
              label={this.props.resource.label}
            />
            <div style={{ display: 'block', float: 'left' }}>
              <Typography variant="body2">{min}</Typography>
            </div>
            <div style={{ display: 'block', float: 'right' }}>
              <Typography variant="body2">{max}</Typography>
            </div>
          </>
        );

      return (
        <div
          style={{
            marginLeft: -24,
            marginRight: -24
          }}
        >
          <Typography
            variant="title"
            align="center"
            style={{ marginBottom: 20 }}
          >
            {this.props.resource.name}
          </Typography>
          {chartButton}
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
              <Typography
                variant="headline"
                align="center"
                style={{ marginBottom: 40 }}
              >
                {this.props.currentValue + ' ' + unit}
              </Typography>
              {bar}
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
              showVisibilityButton
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
    } else {
      //Multi Resource
      const max = this.props.resource.maximum;
      const min = this.props.resource.minimum;

      return (
        <>
          <MaterialSlider
            isMultiResource
            objectID={this.props.objectID}
            instanceID={this.props.instanceID}
            resourceID={this.props.resource.resourceID}
            currentValue={this.props.currentValue}
            maximum={max}
            minimum={min}
            height={20}
            isWriteable={this.props.isWriteable}
            requestChangeToSubresource={this.props.requestChangeToSubresource}
            label={this.props.resource.label}
          />
          <div style={{ display: 'block', float: 'left' }}>
            <Typography variant="body2">{min}</Typography>
          </div>
          <div style={{ display: 'block', float: 'right' }}>
            <Typography variant="body2">{max}</Typography>
          </div>
        </>
      );
    }
  }
}

NumberResource.propTypes = {
  buildRequest: PropTypes.func,
  currentValue: PropTypes.any,
  instanceID: PropTypes.number,
  isWriteable: PropTypes.bool,
  mappings: PropTypes.array,
  objectID: PropTypes.number,
  requestChangeToSubresource: PropTypes.func,
  resource: PropTypes.object,
  setMappingActivity: PropTypes.func,
  showModal: PropTypes.func,
  smallForm: PropTypes.bool
};

NumberResource.defaultProps = {
  smallForm: false
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
)(NumberResource);
