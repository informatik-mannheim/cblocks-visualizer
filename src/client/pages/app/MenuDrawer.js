import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SettingsIcon from '@material-ui/icons/Settings';

import * as action from '../../action';

class MenuDrawer extends React.Component {
  onURLSettingsClick = () => {
    this.props.closeDrawer();
    this.props.openURLSettings();
  };

  render () {
    const menuList = (
      <List style={{ width: 250 }}>
        <ListItem button>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="URLs" />
        </ListItem>
      </List>
    );
    return (
      <Drawer open={this.props.drawerOpen} onClose={this.props.closeDrawer}>
        <div
          tabIndex={0}
          role="button"
          onClick={this.onURLSettingsClick.bind(this)}
          onKeyDown={this.props.closeDrawer}
        >
          {menuList}
        </div>
      </Drawer>
    );
  }
}

MenuDrawer.propTypes = {
  closeDrawer: PropTypes.func,
  drawerOpen: PropTypes.bool,
  openURLSettings: PropTypes.func
};

const mapStateToProps = state => {
  return {
    drawerOpen: state.menuDrawer.open
  };
};
const mapDispatchToProps = dispatch => {
  return {
    closeDrawer: () => dispatch(action.closeMenuDrawer()),
    openURLSettings: () =>
      dispatch(action.showModal('URL_SETTINGS', { open: true }))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuDrawer);
