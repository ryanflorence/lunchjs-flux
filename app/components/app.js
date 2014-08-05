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
    if (this.state.auth.authenticated)
      StampActionCreators.trackCursor({
        clientY: event.clientY,
        clientX: event.clientX
      });
  },

  render: function() {
    var stamps = this.state.stamps.map(function(stamp) {
      return <Stamp stamp={stamp} />;
    });

    var cursors = this.state.userCursors.map(function(stamp) {
      return <Stamp stamp={stamp} />;
    });

    var padClass = 'Pad';
    if (this.state.auth.authenticated)
      padClass += ' Pad--authenticated';

    return (
      <div className="App" >
        <div className="Nav">
          <ul className="Nav__List Nav__List--left">
            {this.renderLeftNav()}
          </ul>
          <ul className="Nav__List Nav__List--right">
            {this.renderRightNav()}
          </ul>
        </div>
        <div
          className={padClass}
          onClick={this.handleClick}
          onMouseMove={this.trackCursor}
        >
          {stamps}
          {cursors}
        </div>
      </div>
    );
  },

  renderLeftNav: function() {
    if (this.state.auth.authenticated)
      return (
        <li className="Nav__Item">
          <img className="Nav__Img" src={this.state.auth.user.avatar_url} height="24"/>
          Logged in as {this.state.auth.user.name}
        </li>
      );
  },

  renderRightNav: function() {
    return (this.state.auth.authenticated) ?
      <li><Link className="Nav__Link" to="logout">Logout</Link></li> :
      <li><button onClick={this.signIn}>Sign in</button></li>;
  }

});

