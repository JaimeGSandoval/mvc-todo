// EventDispatcher.js - This is a class with two methods, attach() and notify().

// The attach() method accepts a function as a parameter. You can call attach() as many times as you want, and the function you pass can contain whatever code inside you want.

// Once you call the notify method on that Event object, each function you attached to that Event will be ran.

var Event = function (sender) {
  this._sender = sender;
  this._listeners = [];
}

Event.prototype = {

  attach: function (listener) {
    this._listeners.push(listener);
  },

  notify: function (args) {
    for (var i = 0; i < this._listeners.length; i += 1) {
      // this._sender is the name of the task that was set to an Event object
      // example would be addTaskEvent
      // which has it's own this._listeners array that we're looping through here
      // console.log('LISTENERS', this._listeners[i], 'SENDER', this._sender, 'ARGS', args)
      // console.log(this._listeners);
      this._listeners[i](this._sender, args);
    }
  }

};
