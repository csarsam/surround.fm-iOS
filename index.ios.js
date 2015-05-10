/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

var Login = require('./login.ios');
var App = require('./app.ios');

var surroundfm = React.createClass({
  getInitialState: function() {
    return {
      authenticated: false
    };
  },

  render: function() {
    return (
      <View style={styles.container}>
        {this.state.authenticated ? <App token={this.state.token}/> :
          <Login authenticate={this.authenticate} />}
      </View>
    );
  },

  authenticate: function(token) {
    this.setState({ authenticated: true, token: token });
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

AppRegistry.registerComponent('surroundfm', () => surroundfm);
