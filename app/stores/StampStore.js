var EventEmitter = require('events').EventEmitter;
var merge = require('react/lib/merge');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var ActionTypes = AppConstants.ActionTypes;
var Firebase = require('firebase-client');

var CHANGE_EVENT = 'change';
var _stamps = [];
var stampsRef = new Firebase(AppConstants.FIREBASE_STAMPS);

stampsRef.on('value', function(snapshot) {
  _stamps = toArray(snapshot.val() || {});
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
    return _stamps;
  }

});

StampStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch (action.type) {
    case ActionTypes.ADD_STAMP:
      _addStamp(action.stamp);
      break;
    default:
  }

});

function _addStamp(stamp) {
  stampsRef.push(stamp);
}

module.exports = StampStore;
