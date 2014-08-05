var AppConstants = require('../constants/AppConstants.js');
var ActionTypes = AppConstants.ActionTypes;
var AppDispatcher = require('../dispatcher/AppDispatcher');

var AuthActionCreators = {

  receiveUser: function(user) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_AUTH_USER,
      user: user
    });
  },

  receiveError: function(error) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_AUTH_ERROR,
      error: error
    });
  }

};

module.exports = AuthActionCreators;
