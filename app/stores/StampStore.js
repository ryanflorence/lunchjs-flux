var EventEmitter = require('events').EventEmitter;
var merge = require('react/lib/merge');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var ActionTypes = AppConstants.ActionTypes;
var Firebase = require('firebase-client');

var CHANGE_EVENT = 'change';

var _state = {
  stamps: [],
  userCursors: []
};

var ref = new Firebase(AppConstants.FIREBASE_HOST).limit(1000);

ref.on('value', function(snapshot) {
  var val = snapshot.val();
  _state = {
    stamps: toArray(val.stamps || {}),
    userCursors: toArray(val.userCursors || {})
  };
  StampStore.emitChange();
});

function toArray(obj) {
  var arr = [];
  for (var key in obj)
    arr.push(obj[key]);
  return arr;
}

var StampStore = merge(EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  getAll: function() {
    return _state.stamps;
  },

  getUserCursors: function() {
    return _state.userCursors;
  }

});

StampStore.dispatchToken = AppDispatcher.register(function(payload) {
  // I don't care about anything ...
});

module.exports = StampStore;
