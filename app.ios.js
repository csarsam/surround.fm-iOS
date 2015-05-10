'use strict';

var React = require('react-native');
var Constants = require('./constants');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

var App = React.createClass({
  componentWillMount() {
    navigator.geolocation.getCurrentPosition(
      (initialPosition) => this.setLocation(initialPosition),
      (error) => console.error(error)
    );
  },

  render() {
    return (
      <Text>Surround.fm</Text>
    );
  },

  setLocation(position) {
    fetch(Constants.baseUrl + 'user/location', {
      method: 'POST',
      headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
      },
      body: JSON.stringify(position)
    }).then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
  }
});

module.exports = App;