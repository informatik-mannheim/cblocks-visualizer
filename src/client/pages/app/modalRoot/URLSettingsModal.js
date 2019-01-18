import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import * as action from '../../../action';
import { getBaseUrls } from '../../../reducers';
import Check from '@material-ui/icons/Check';
import Close from '@material-ui/icons/Close';

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  }
});

const getModalStyle = () => {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
};

class URLSettingsModal extends React.Component {
  state = {
    base: '',
    mqtt: ''
  };
  componentDidMount = () => {
    this.setState({
      base: this.props.base,
      mqtt: this.props.mqtt
    });
  };
  handleBaseChange = e => {
    this.setState({ base: e.target.value });
  };
  handleMQTTChange = e => {
    this.setState({ mqtt: e.target.value });
  };
  handleClick = () => {
    this.props.changeBaseUrl(this.state.base);
    this.props.changeMQTTUrl(this.state.mqtt);
  };
  handleClose = () => {
    this.props.hideModal('URL_SETTINGS');
  };
  render () {
    const { open, classes, mqtt, base } = this.props;
    return (
      <Modal open={open} onClose={this.handleClose}>
        <div style={getModalStyle()} className={classes.paper}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 2fr 2fr 1fr',
              gridTemplateRows: '2fr 1fr 2fr 2fr 1fr 2fr'
            }}
          >
            <Typography
              variant="headline"
              style={{ gridColumn: '1/-1', gridRow: '1/1' }}
            >
              URL Settings
            </Typography>
            <Typography
              variant="body2"
              style={{
                gridColumn: '1',
                gridRow: '3',
                alignSelf: 'center'
              }}
            >
              Backend Url
            </Typography>
            <div
              style={{
                gridColumn: '5',
                gridRow: '3',
                alignSelf: 'center',
                justifySelf: 'center'
              }}
            >
              {this.props.base === this.state.base ? <Check /> : <Close />}
            </div>

            <Input
              style={{ gridColumn: '3/5', gridRow: '3' }}
              defaultValue={base}
              placeholder="URL:Port"
              className={classes.input}
              inputProps={{
                'aria-label': 'Backend URL'
              }}
              onChange={this.handleBaseChange}
            />
            <Typography
              variant="body2"
              style={{ gridColumn: '1', gridRow: '4', alignSelf: 'center' }}
            >
              MQTT Url
            </Typography>
            <Input
              style={{ gridColumn: '3/5', gridRow: '4' }}
              defaultValue={mqtt}
              placeholder="URL:Port"
              className={classes.input}
              inputProps={{
                'aria-label': 'MQTT URL'
              }}
              onChange={this.handleMQTTChange}
            />
            <div
              style={{
                gridColumn: '5',
                gridRow: '4',
                alignSelf: 'center',
                justifySelf: 'center'
              }}
            >
              {this.props.mqtt === this.state.mqtt ? <Check /> : <Close />}
            </div>
            <Button
              style={{ gridColumn: '4/6', gridRow: '6' }}
              onClick={this.handleClick}
              color="secondary"
            >
              SET URLs
            </Button>
          </div>
        </div>
      </Modal>
    );
  }
}

URLSettingsModal.propTypes = {
  base: PropTypes.string,
  changeBaseUrl: PropTypes.func,
  changeMQTTUrl: PropTypes.func,
  classes: PropTypes.object,
  hideModal: PropTypes.func,
  mqtt: PropTypes.string,
  open: PropTypes.bool
};

const mapStateToProps = state => {
  return getBaseUrls(state);
};

const mapDispatchToProps = dispatch => {
  return {
    changeBaseUrl: url => {
      dispatch(action.changeURL('base', url));
    },
    changeMQTTUrl: url => {
      dispatch(action.changeURL('mqtt', url));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(URLSettingsModal));
