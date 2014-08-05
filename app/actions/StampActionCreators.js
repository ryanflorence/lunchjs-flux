var AppConstants = require('../constants/AppConstants.js');
var ActionTypes = AppConstants.ActionTypes;
var AppDispatcher = require('../dispatcher/AppDispatcher');

var StampActionCreators = {

  addStamp: function(stamp) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.ADD_STAMP,
      stamp: stamp
    });
  }

};

module.exports = StampActionCreators;
