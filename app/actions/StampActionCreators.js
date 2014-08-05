var AppConstants = require('../constants/AppConstants.js');
var ActionTypes = AppConstants.ActionTypes;
var AppDispatcher = require('../dispatcher/AppDispatcher');
var FirebaseUtils = require('../utils/FirebaseUtils');

var StampActionCreators = {

  addStamp: function(stamp) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.ADD_STAMP,
      stamp: stamp
    });
    FirebaseUtils.addStamp(stamp);
  },

  trackCursor: function(pos) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.TRACK_STAMP,
      pos: pos
    });
    FirebaseUtils.moveUserStamp(pos);
  }

};

module.exports = StampActionCreators;
