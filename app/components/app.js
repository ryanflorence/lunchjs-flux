/** @jsx React.DOM */
var React = require('react');
var Link = require('react-router').Link;
var AuthStore = require('../stores/AuthStore');
var StampStore = require('../stores/StampStore');
var AuthActionCreators = require('../actions/AuthActionCreators');
var StampActionCreators = require('../actions/StampActionCreators');

function getStateFromStores() {
  return {
    auth: AuthStore.get(),
    stamps: StampStore.getAll()
  };
}

var App = module.exports = React.createClass({

  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
    AuthStore.addChangeListener(this._onChange);
    StampStore.addChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getStateFromStores());
  },

  signIn: function() {
    AuthActionCreators.signIn();
  },

  addStamp: function(event) {
    StampActionCreators.addStamp({
      x: event.clientX,
      y: event.clientY,
      src: 'http://ryanflorence.com/blog/img/roast-beef.jpg'
    });
  },

  render: function() {
    return (
      <div>
        <h1>STAMPS!</h1>
        <div>authenticated: {this.state.auth.authenticated ? 'yes' : 'no'}</div>
        <div>authenticating: {this.state.auth.authenticating ? 'yes' : 'no'}</div>
        <ul>
          {this.renderAuthLink()}
        </ul>
        {this.renderStamps()}
      </div>
    );
  },

  renderAuthLink: function() {
    return this.state.auth.authenticated ?
      <li><Link to="logout">Logout</Link></li> :
      <li><button onClick={this.signIn}>Sign in</button></li>;
  },

  renderStamps: function() {
    var stamps = this.state.stamps.map(function(stamp) {
      return <div><img src={stamp.src} height="50" /></div>
    });
    return (
      <div>
        <button onClick={this.addStamp}>Add Stamp</button>
        {stamps}
      </div>
    );
  }

});

