var Firebase = require('firebase-client');
var SimpleLogin = require('firebase-simple-login');
var AppConstants = require('../constants/AppConstants');
var AuthServerActionCreators = require('../actions/AuthServerActionCreators');

exports.login = login;

function handleAuthChange(err, user) {
  if (err)
    AuthServerActionCreators.receiveError(err);
  else
    AuthServerActionCreators.receiveUser(user);
}

function login() {
  var ref = new Firebase(AppConstants.FIREBASE_HOST);
  var auth = new SimpleLogin(ref, handleAuthChange);
  auth.login('github');
}

function addStamp(stamp) {
  var ref = new Firebase(AppConstants.FIREBASE_STAMPS);
  ref.push(stamp);
}

