/** @jsx React.DOM */
var Router = require('react-router');
var Routes = Router.Routes;
var Route = Router.Route;

module.exports = (
  <Routes>
    <Route handler={require('../components/app')} />
    <Route name="logout" handler={require('../components/logout')} />
  </Routes>
);

