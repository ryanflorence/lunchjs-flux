var keyMirror = require('react/lib/keyMirror');

module.exports = {

  FIREBASE_HOST: 'https://lunchjs-flux.firebaseio.com',

  ActionTypes: keyMirror({
    SIGN_IN: null,
    ADD_STAMP: null
  }),

  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  })

};
