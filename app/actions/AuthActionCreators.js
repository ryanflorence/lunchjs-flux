var AppConstants = require('../constants/AppConstants.js');
var ActionTypes = AppConstants.ActionTypes;
var AppDispatcher = require('../dispatcher/AppDispatcher');

var AuthActionCreators = {

  signIn: function() {
    AppDispatcher.handleViewAction({
      type: ActionTypes.SIGN_IN
    });
  }

};

module.exports = AuthActionCreators;
