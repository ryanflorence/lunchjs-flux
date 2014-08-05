var EventEmitter = require('events').EventEmitter;
var merge = require('react/lib/merge');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var state = {
  authenticated: false,
  authenticating: false,
  user: {},
  error: false
};

function signin() {
  state.authenticating = true;
}

function handleAuthError(error) {
  state.error = error;
}

function handleAuthUser(user) {
  state.error = false;
  state.user = user;
  state.authenticated = true;
  state.authenticating = false;
}

function handleAuthLogout() {
  state.user = {};
  state.authenticated = false;
}

var AuthStore = merge(EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  get: function() {
    return state;
  }

});

AuthStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch (action.type) {
    case ActionTypes.SIGN_IN:
      signin();
      AuthStore.emitChange();
      break;

    case ActionTypes.RECEIVE_AUTH_ERROR:
      handleAuthError(action.error);
      AuthStore.emitChange();
      break;

    case ActionTypes.RECEIVE_AUTH_USER:
      handleAuthUser(action.user);
      AuthStore.emitChange();
      break;

    case ActionTypes.RECEIVE_AUTH_LOGOUT:
      handleAuthLogout();
      AuthStore.emitChange();
      break;

    default:
  }

});

module.exports = AuthStore;
