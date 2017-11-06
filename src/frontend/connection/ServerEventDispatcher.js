import { WebSocket } from 'mock-socket';

export const ServerEventDispatcher = (url) => {
  const conn = new WebSocket(url);

  const callbacks = {};

  const dispatch = function (event_name, message){
    console.log('Dispatching: ' + event_name);
    const chain = callbacks[event_name];
    if (typeof chain === 'undefined') return; // no callbacks for this event
    for (let i = 0; i < chain.length; i++){
      chain[i](message);
    }
  };

  this.bind = function (event_name, callback){
    callbacks[event_name] = callbacks[event_name] || [];
    callbacks[event_name].push(callback);
    return this;// chainable
  };

  this.send = function (event_name, event_data){
    const payload = JSON.stringify({event: event_name, data: event_data});
    conn.send(payload); // <= send JSON data to socket server
    return this;
  };

  // dispatch to the right handlers
  conn.onmessage = function (evt){
    dispatch(evt.data.event, evt.data.data);
  };

  conn.onclose = function () {dispatch('close', null);};
  conn.onopen = function () {dispatch('open', null);};

  return this;
};
