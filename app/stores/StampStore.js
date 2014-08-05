var EventEmitter = require('events').EventEmitter;
var merge = require('react/lib/merge');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var ActionTypes = AppConstants.ActionTypes;
var AuthStore = require('./AuthStore');

var CHANGE_EVENT = 'change';

var _auth = AuthStore.get();
AuthStore.addChangeListener(function() {
  _auth = AuthStore.get();
  StampStore.emitChange();
});

var _stamps = [
  {src: 'http://ryanflorence.com/blog/img/roast-beef.jpg', x: 10, y: -10 },
  {src: 'http://ryanflorence.com/blog/img/roast-beef.jpg', x: 100, y: -100 }
];

function _addStamp(stamp) {
  _stamps.push(stamp)
  StampStore.emitChange();
}

var StampStore = merge(EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  getAll: function() {
    return _auth.authenticated ? _stamps : [];
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

module.exports = StampStore;
