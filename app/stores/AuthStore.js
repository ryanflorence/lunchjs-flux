var EventEmitter = require('events').EventEmitter;
var merge = require('react/lib/merge');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var ActionTypes = AppConstants.ActionTypes;
var Firebase = require('firebase-client');
var SimpleLogin = require('firebase-simple-login');

var CHANGE_EVENT = 'change';

var state = {
  authenticated: false,
  authenticating: false,
  user: {},
  error: false
};

var ref = new Firebase(AppConstants.FIREBASE_HOST);
var auth = new SimpleLogin(ref, handleAuthChange);

function handleAuthChange(err, user) {
  if (err) {
    state.error = err;
  }
  else {
    state.error = false;
    state.authenticated = true;
    state.user = user;
  }
  AuthStore.emitChange();
}

function signin() {
  state.authenticating = true;
  AuthStore.emitChange();
  auth.login('github');
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
      break;

    default:
  }

});

module.exports = AuthStore;
