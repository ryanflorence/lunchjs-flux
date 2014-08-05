/** @jsx React.DOM */
var React = require('react');

var Stamp = module.exports = React.createClass({

  getInitialState: function() {
    return { stamp: this.props.stamp };
  },

  componentWillReceiveProps: function(props) {
    this.setState(props);
  },

  render: function() {
    var style = {
      left: this.state.stamp.x,
      top: this.state.stamp.y,
      position: 'fixed'
    };
    return <img height="50" src={this.state.stamp.src} style={style} key={this.state.stamp._key}/>;
  }

});

