'use strict';

var React = require('react-native');
var Constants = require('./constants');
var {
  AppRegistry,
  StyleSheet,
  ListView,
  Text,
  View,
} = React;

var App = React.createClass({
  getInitialState() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return { source: ds, users: [] };
  },

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(
      (initialPosition) => this.setLocation(initialPosition),
      (error) => console.error(error)
    );

    this.getUserList();
    setInterval(
      this.getUserList, 5000);
  },

  render() {
    console.log(this.state.source);
    return (
      <View>
        <Text style={styles.title}>Surround.fm</Text>
        <ListView
          dataSource={this.state.source}
          renderRow={(rowData) => <Text>
            {rowData.lastfm.currentSong ? rowData.username + ": " + rowData.lastfm.currentSong.song + ' ' + rowData.lastfm.currentSong.artist : ''}</Text>}
        />
      </View>
    );
  },

  setLocation(position) {
    fetch(Constants.baseUrl + 'user/location', {
      method: 'POST',
      headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
      },
      body: JSON.stringify({token: this.props.token, lat: position.coords.latitude, lng: position.coords.longitude})
    }).then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
  },

  getUserList: function() {
    fetch(Constants.baseUrl + 'user', {
      method: 'GET',
      headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
      }
    }).then((response) => {
      console.log(JSON.parse(response._bodyInit));
      this.setState({ source: this.state.source.cloneWithRows(JSON.parse(response._bodyInit)) });
    })
    .catch((error) => {
      console.log(error);
    });
  }
});

var styles = StyleSheet.create({
  title: {
    fontSize: 30,
    top: -100,
    textAlign: 'center'
  },
});

module.exports = App;