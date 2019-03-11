import React from 'react';
import PropTypes from 'prop-types';
import Mapping from './mappingDrawer/Mapping';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

class MappingDrawer extends React.Component {
  render = () => {
    const { objectID, instanceID, resourceID } = this.props;
    const mappingModalProps = {
      open: true,
      objectID,
      instanceID,
      resourceID
    };

    return (
      <div
        style={{
          background: '#F5F5F6',
          boxShadow: 'inset 0 -7px 9px -7px rgba(0,0,0,0.2)'
        }}
        className="mapping-drawer"
      >
        <div style={{ height: 20 }} />
        {Object.entries(this.props.mappings).map(mappingsKeyValue => {
          const currentMapping = mappingsKeyValue[1];
          return (
            <div
              key={currentMapping.mappingID + '_div'}
              style={{ paddingBottom: 16 }}
            >
              <Mapping
                showVisibilityButton={this.props.showVisibilityButton}
                mapping={currentMapping}
                setMappingActivity={this.props.setMappingActivity}
              />
            </div>
          );
        })}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Button
            onClick={() =>
              this.props.showModal('ADD_MAPPING', mappingModalProps)
            }
            style={{ marginBottom: 4 }}
            color="secondary"
          >
            <AddIcon />
            Add New Mapping
          </Button>
        </div>
      </div>
    );
  };
}

MappingDrawer.propTypes = {
  instanceID: PropTypes.number,
  mappings: PropTypes.array,
  objectID: PropTypes.number,
  resourceID: PropTypes.number,
  setMappingActivity: PropTypes.func,
  showModal: PropTypes.func,
  showVisibilityButton: PropTypes.bool
};

export default MappingDrawer;
