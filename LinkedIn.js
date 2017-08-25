import React, { Component } from 'react';
import {View,Text,WebView,Alert,ToastAndroid,Modal} from 'react-native';
import Cookie from 'react-native-cookie';
import qs from 'qs';
import Player from './Player';

export default class LinkedInLogin extends Component{

constructor(props){
  super(props)
  this.state = {
    visible : false
  }
}

onOpen() {
  this.setState({visible:true});
}

  onClose() {
    this.setState({visible:false});
    Cookie.clear();
  }
  onNavigationChange(webViewCodeAndState) {
    const { url } = webViewCodeAndState;
    if (url && url.startsWith(this.props.redirectUrl)) {
      const codeObject = qs.parse(url)
      const code = codeObject[this.props.redirectUrl+"?code"]
      console.log(code);
      fetch(`https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code=${code}&redirect_uri=${this.props.redirectUrl}&client_id=${this.props.clientId}&client_secret=${this.props.clientSceret}`,
        {method:'POST',
        headers:{
          'Content-Type':'application/x-www-form-urlencoded'
        }
      }).then((response) => (response.json())).then((data) => {
        Alert.alert(data.access_token);
          console.log(data.access_token);
        });
        this.onClose();
    }
  }
render() {
  const {clientId, redirectUrl, state,scope} = this.props
  return(
    <Modal
      visible={this.state.visible}
      animationType = {'slide'}
      onRequestClose={this.onClose.bind(this)}
      >
      <View style={{flex:1}}>
      <WebView
      source ={{uri:`https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUrl}&state=${state}&scope=${scope}`}}
        startInLoadingState
        scalesPageToFit
        onNavigationStateChange = {this.onNavigationChange.bind(this)}
      />
      </View>
    </Modal>

  )
}

}
