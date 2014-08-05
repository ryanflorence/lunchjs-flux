var Firebase = require('firebase-client');
var SimpleLogin = require('firebase-simple-login');
var AppConstants = require('../constants/AppConstants');
var AuthServerActionCreators = require('../actions/AuthServerActionCreators');
var AuthStore = require('../stores/AuthStore');

exports.login = login;
exports.addStamp = addStamp;
exports.moveUserStamp = moveUserStamp;

var auth = new SimpleLogin(new Firebase(AppConstants.FIREBASE_HOST), handleAuthChange);

function handleAuthChange(err, user) {
  if (err)
    AuthServerActionCreators.receiveError(err);
  else
    AuthServerActionCreators.receiveUser(user);
}

function login() {
  auth.login('github');
}

function addStamp(stamp) {
  var ref = new Firebase(AppConstants.FIREBASE_STAMPS);
  ref.push(stamp);
}

function moveUserStamp(pos) {
  var user = AuthStore.get().user;
  var ref = new Firebase(AppConstants.FIREBASE_HOST+'/userCursors/'+user.login);
  var stamp = {
    x: pos.clientX,
    y: pos.clientY,
    src: user.avatar_url
  };
  ref.set(stamp);
}

