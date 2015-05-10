'use strict';

var Button = require('react-native-button');
var React = require('react-native');
var Constants = require('./constants');
var {
  AppRegistry,
  StyleSheet,
  TextInput,
  Text,
  View,
} = React;

var Login = React.createClass({
  username: '',
  password: '',

  getInitialState() {
    return {error: ''};
  },

  render() {
    return (
      <View>
        <Text style={styles.title}>Surround.fm</Text>
        <TextInput onChangeText={this.handleUsernameChange}
         style={styles.input} placeholder='last.fm username' />
        <TextInput onChangeText={this.handlePasswordChange}
         style={styles.input} placeholder='last.fm password' password />
        <Text>{this.state.error}</Text>
        <Button style={styles.submit} onPress={this.logIn}>Log In</Button>
      </View>
    );
  },

  logIn() {
    var credentials = {
      username: this.username,
      password: this.password
    };
    console.log(credentials);
    fetch(Constants.baseUrl + 'user/register', {
      method: 'POST',
      headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    }).then((response) => {
      if (response.status == 200)
        this.props.authenticate(JSON.parse(response._bodyText).token);
      else {
        this.setState({error: JSON.parse(response._bodyText).message});
      }
    })
    .catch((error) => {
      console.log(error);
    });
  },

  handleUsernameChange(username) {
    this.username = username;
  },

  handlePasswordChange(password) {
    this.password = password;
  },
});

var styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderRadius: 2,
    width: 300,
    margin: 10,
    padding: 5,
    borderWidth: 2,
  },
  title: {
    fontSize: 30,
    textAlign: 'center'
  },
  submit: {
    padding: 20
  }
});

module.exports = Login;