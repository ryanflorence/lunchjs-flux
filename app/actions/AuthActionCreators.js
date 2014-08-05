var AppConstants = require('../constants/AppConstants.js');
var ActionTypes = AppConstants.ActionTypes;
var AppDispatcher = require('../dispatcher/AppDispatcher');
var FirebaseUtils = require('../utils/FirebaseUtils');

var AuthActionCreators = {

  signIn: function() {
    AppDispatcher.handleViewAction({
      type: ActionTypes.SIGN_IN
    });
    FirebaseUtils.login();
  },

  logout: function() {
    AppDispatcher.handleViewAction({
      type: ActionTypes.LOGOUT
    });
    FirebaseUtils.logout();
  }

};

module.exports = AuthActionCreators;
