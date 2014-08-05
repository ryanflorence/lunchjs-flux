var AppConstants = require('../constants/AppConstants.js');
var ActionTypes = AppConstants.ActionTypes;
var AppDispatcher = require('../dispatcher/AppDispatcher');

var StampActionCreators = {

  addStamp: function() {
    AppDispatcher.handleViewAction({
      type: ActionTypes.ADD_STAMP
    });
  }

};

module.exports = StampActionCreators;
