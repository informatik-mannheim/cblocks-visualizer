import { connect } from 'mqtt';

const MQTTMockDataSupplier = (url) => {
  const client = connect(url);
  const callbacks = {};

  const dispatch = (event_name, message) => {
    const chain = callbacks[event_name];
    if (typeof chain === 'undefined') return;
    for (let i = 0; i < chain.length; i++){
      chain[i](message);
    }
  };

  this.bind = (event_name, callback) => {
    callbacks[event_name] = callbacks[event_name] || [];
    callbacks[event_name].push(callback);
    return this;
  };

  const randomIntFromInterval = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1) + min);
  };

  client.on('connect', () => {
    client.publish('cblocks-ui-event-mocking', 'MQTT mockdata enabled');

    client.publish('nodes/59510e6f8eed6e21115a752d/status', '{"status": "online", "timestamp": "2017-12-01T15:10:55.471392"}');
    client.publish('nodes/59510ef78eed6e21115a7585/status', '{"status": "online", "timestamp": "2017-12-01T15:10:55.555555"}');

    setTimeout(() => {
      client.publish('sensors/5937b05823d3e908cc271eab/status', '{"status": "plugged", "node_id": "59510e6f8eed6e21115a752d", "timestamp": "2017-12-01T15:10:55.123456"}');
      client.publish('sensors/59d4cecad9874343aa55ae6d/status', '{"status": "plugged", "node_id": "59510ef78eed6e21115a7585", "timestamp": "2017-12-01T15:10:55.654321"}');
      setInterval(() => {
        client.publish('sensors/5937b05823d3e908cc271eab/outputs/1', '' + randomIntFromInterval(500, 666));
        client.publish('sensors/59d4cecad9874343aa55ae6d/outputs/1', '1');
      }, 1000);
    }, 300);

  });

  return this;
};

export default MQTTMockDataSupplier;
