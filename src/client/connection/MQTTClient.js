import { connect } from 'mqtt';
import Constants from '../constants/';
import { subscribe } from 'redux-subscriber';

const isParsableJSON = jsonString => {
  try {
    // eslint-disable-next-line
    const o = JSON.parse(jsonString);
    return true;
  } catch (e) {
    //ignore
  }
  return false;
};

const mqttEvents = Constants.MQTTEvents;
const MQTTClient = url => {
  const self = {};
  const client = connect(url);

  const callbacks = {};

  self.requestResourceChange = (objectID, instanceID, resourceID, data) => {
    const topic
      = 'cblocks-ui/' + objectID + '/' + instanceID + '/' + resourceID + '/input';
    console.log(topic);
    const message = {
      requestID: 1234,
      data
    };
    client.publish(topic, message + '');
  };

  const dispatch = (event_name, message) => {
    const chain = callbacks[event_name];
    if (chain === undefined) return;
    for (let i = 0; i < chain.length; i++) {
      chain[i](message);
    }
  };

  self.bind = (event_name, callback) => {
    callbacks[event_name] = callbacks[event_name] || [];
    callbacks[event_name].push(callback);
    return self;
  };

  client.on('connect', () => {
    client.subscribe('#');
    client.publish('cblocks-ui', 'connected');
  });

  client.on('message', function (topic, message) {
    let sensorID, instanceID;

    if (message !== null && message !== undefined) {
      switch (true) {
        /*
        UI topic
        */
        case (/cblocks-ui[^\/]/).test(topic):
          if (message === 'connected') {
            dispatch(mqttEvents.CONNECTION_ESTABLISHED, message);
          }
          break;
        /*
        response to a request
        */
        case (/cblocks-ui\/responses/).test(topic):
          const requestID = JSON.parse(message).requestID;
          const success = JSON.parse(message).success;
          const msg = JSON.parse(message).message;

          if (success === true) {
            dispatch(
              mqttEvents.REQUEST_RESPONSE_RECEIVED,
              requestID,
              success,
              msg
            );
          }
          break;
        /*
        sensor status change
        */
        case (/^\d+\/\d\/status/).test(topic):
          sensorID = Number((/^(\d+)\/(\d)\/status/).exec(topic)[1]);
          instanceID = Number((/^(\d)+\/(\d)\/status/).exec(topic)[2]);

          if (message.toString() === 'online') {
            console.log(sensorID + '-' + instanceID + ': online');
            dispatch(mqttEvents.SENSOR_ADDED, {
              sensorID,
              instanceID
            });
          } else if (message.toString() === 'offline') {
            console.log(sensorID + '-' + instanceID + ': offline');
            dispatch(mqttEvents.SENSOR_REMOVED, {
              sensorID,
              instanceID
            });
          }
          break;
        /*
        sensor value updated
        */
        case (/^\d+\/\d\/\d\/output/).test(topic):
          sensorID = Number((/^(\d+)\/(\d)\/(\d)\/output/).exec(topic)[1]);
          instanceID = Number((/^(\d+)\/(\d)\/(\d)\/output/).exec(topic)[2]);
          const resourceID = Number(
            (/^(\d+)\/(\d)\/(\d)\/output/).exec(topic)[3]
          );

          let value;
          if (isParsableJSON(message.toString())) {
            value = JSON.parse(message);
          } else {
            value = message.toString();
          }

          dispatch(mqttEvents.SENSOR_UPDATED, {
            sensorID,
            instanceID,
            resourceID,
            value
          });
          break;

        /*
          mapping value updated
          */
        case (/mappings\/(.+)\/(.+)\/output/).test(topic):
          const mappingType = (/mappings\/(.+)\/(.+)\/output/).exec(topic)[1];
          const mappingID = (/mappings\/(.+)\/(.+)\/output/).exec(topic)[2];

          if (isParsableJSON(message.toString())) {
            value = JSON.parse(message);
          } else {
            value = message.toString();
          }

          dispatch(mqttEvents.NEW_MAPPING_VALUE, {
            mappingType,
            mappingID,
            value
          });
          break;
        default:
      }
    }
  });

  // subscribes to request substate and publishes them to MQTT
  const unsubscribeFromRequests = subscribe('requests.totalRequests', state => {
    for (const req of state.requests.unresolvedRequests) {
      if (req.sent === false) {
        dispatch(mqttEvents.REQUEST_SENT, req.requestID);
        const topic
          = 'cblocks-ui/'
          + req.objectID
          + '/'
          + req.instanceID
          + '/'
          + req.resourceID
          + '/input';
        const data = Object.assign(
          {},
          { requestID: req.requestID, data: req.value }
        );
        client.publish(topic, JSON.stringify(data));
      }
    }
  });

  self.disconnect = () => {
    client.end();
  };

  return self;
};

export default MQTTClient;
