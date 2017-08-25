
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Alert,
  NativeModules,
  TouchableOpacity,
  Button
} from 'react-native';

const { RNTwitterSignIn } = NativeModules;

const Constants = {
    //Dev Parse keys
    TWITTER_COMSUMER_KEY: '	MwgCjJKkzjkF8atEzBAD7xz4Q',
    TWITTER_CONSUMER_SECRET: '3MpxMd33iMsIMy03c0adFzvcnPW0dz6rgVjFdSjvY4Sv2gbB09',
};

export default class TwitterButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
    }
    this.handleLogout = this.handleLogout.bind(this);
  }

  _twitterSignIn() {
      RNTwitterSignIn.init(Constants.TWITTER_COMSUMER_KEY, Constants.TWITTER_CONSUMER_SECRET);
      RNTwitterSignIn.logIn()
        .then((loginData)=>{
          console.log(loginData);
          const { authToken, authTokenSecret } = loginData;
          if (authToken && authTokenSecret) {
            this.setState({
              isLoggedIn: true,
            });
            Alert.alert(authToken + authTokenSecret)
            console.log("Auth token :"+authToken);
            console.log("Sceret :"+authTokenSecret);
          }
        }).catch((error)=>{
          console.log(error);
        });
  }

  handleLogout() {
    console.log('logout');
    RNTwitterSignIn.logOut();
    this.setState({
      isLoggedIn: false,
    });
  }

  render() {
    const { isLoggedIn } = this.state;
    return (
      <View style={{flex: 1}}>
        {
          isLoggedIn
          ?
          <TouchableOpacity
            onPress={this.handleLogout}
          >
            <Text>Log out</Text>
          </TouchableOpacity>
          :
          <Button title="Login with Twitter" onPress={this._twitterSignIn.bind(this)}/>
        }
      </View>
    );
  }
};

const styles = StyleSheet.create({
  icon: {
    width: 200,
    height: 50,
  }
});
