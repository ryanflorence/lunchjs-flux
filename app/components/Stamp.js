/** @jsx React.DOM */
var React = require('react');

var Stamp = module.exports = React.createClass({

  render: function() {
    var style = {
      left: this.props.stamp.x,
      top: this.props.stamp.y,
      position: 'fixed'
    };
    return <img height="50" src={this.props.stamp.src} style={style}/>;
  }

});

