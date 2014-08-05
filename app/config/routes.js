/** @jsx React.DOM */
var Router = require('react-router');
var Routes = Router.Routes;
var Route = Router.Route;

module.exports = (
  <Routes location="history">
    <Route name="index" path="/" handler={require('../components/app')} />
    <Route name="signin" handler={require('../components/signin')} />
    <Route name="logout" handler={require('../components/logout')} />
  </Routes>
);

