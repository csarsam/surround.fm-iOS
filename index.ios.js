/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  AsyncStorage,
  Text,
  View,
} = React;

var Login = require('./login.ios');
var App = require('./app.ios');

var surroundfm = React.createClass({
  token: undefined,

  componentWillMount() {
    var self = this;
    AsyncStorage.getItem('token', function(token) {
      console.log(token);
      self.setState({ token: token });
    });
  },

  getInitialState: function() {
    return {
      token: undefined
    };
  },

  render: function() {
    return (
      <View style={styles.container}>
        {this.state.token != undefined ? <App token={this.state.token}/> :
          <Login authenticate={this.authenticate} />}
      </View>
    );
  },

  authenticate: function(token) {
    AsyncStorage.setItem('token', token);
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
