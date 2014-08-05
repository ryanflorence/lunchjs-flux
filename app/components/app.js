/** @jsx React.DOM */
var React = require('react');
var Link = require('react-router').Link;
var AuthStore = require('../stores/AuthStore');
var StampStore = require('../stores/StampStore');
var AuthActionCreators = require('../actions/AuthActionCreators');
var StampActionCreators = require('../actions/StampActionCreators');
var Stamp = require('./Stamp');

function getStateFromStores() {
  return {
    auth: AuthStore.get(),
    stamps: StampStore.getAll(),
    userCursors: StampStore.getUserCursors()
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
      src: this.state.auth.user.avatar_url
    });
  },

  handleClick: function(event) {
    if (this.state.auth.authenticated)
      this.addStamp(event);
  },

  trackCursor: function(event) {
    if (!this.state.auth.authenticated)
      return;

    var pos = {
      clientY: event.clientY,
      clientX: event.clientX
    };
    //this.setState(pos);
    StampActionCreators.trackCursor(pos);
  },

  render: function() {
    var stamps = this.state.stamps.map(function(stamp) {
      return <Stamp stamp={stamp} />;
    });
    var cursors = this.state.userCursors.map(function(stamp) {
      console.log(stamp);
      return <Stamp stamp={stamp} />;
    });

    var style = { position: 'fixed', left: 0, right: 0, bottom: 0, top: 0 };
    return (
      <div onClick={this.handleClick} onMouseMove={this.trackCursor} style={style}>
        <ul>
          {this.renderAuthLink()}
        </ul>
        {stamps}
        {cursors}
      </div>
    );
  },

  renderAuthLink: function() {
    return this.state.auth.authenticated ?
      <li>
        <img src={this.state.auth.user.avatar_url} height="50"/>
        <Link to="logout">Logout</Link>
      </li> :
      <li><button onClick={this.signIn}>Sign in</button></li>;
  }

});

