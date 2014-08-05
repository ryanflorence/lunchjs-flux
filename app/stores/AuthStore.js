var EventEmitter = require('events').EventEmitter;
var merge = require('react/lib/merge');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var ActionTypes = AppConstants.ActionTypes;

var CHANGE_EVENT = 'change';

var _state = {
  authenticated: false,
  authenticating: false
};

function _signin() {
  _state.authenticating = true;
  AuthStore.emitChange();
  setTimeout(function() {
    _state.authenticating = false;
    _state.authenticated = true;
    AuthStore.emitChange();
  }, 1000);
}

var AuthStore = merge(EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  get: function() {
    return _state;
  }

});

AuthStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch (action.type) {
    case ActionTypes.SIGN_IN:
      _signin();
      break;

    default:
  }

});

module.exports = AuthStore;
