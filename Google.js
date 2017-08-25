import React,{ Component } from 'react';
import { Modal,View,Text,Alert,Button,WebView,Dimensions } from 'react-native';
import Cookie from 'react-native-cookie'
import qs from 'qs';
const {width,height} = Dimensions.get('window')

export default class Google extends Component{

  constructor(props){
    super(props)
    this.state = {
      modalVisible : false,
    }
  }

  onOpen(){
    this.setState({modalVisible : true})
  }
  onClose() {
    this.setState({modalVisible : false})
  }
  onCompleted(webViewCodeAndState) {
    const {url} = webViewCodeAndState
    console.log(url);
    if(url && url.startsWith(this.props.redirectUrl)){
      const match = url.match(/#(.*)/)
      console.log(match);
      if (match && match[1]) {
        const params = qs.parse(match[1])
        console.log(params);
        console.log(params.access_token);
        if (params.access_token) {
          this.onClose()
          this.props.onLoginSuccess(params.access_token)
        }
      } else {
        this.onClose()
      }
      }
  }

  render() {
    const { passingParams,clientId, redirectUrl, scopes } = this.props;
    return(
      <Modal
      visible={this.state.modalVisible}
      onRequestClose = {this.onClose.bind(this)}
      animationType={'slide'} >
      <View style={{flex:1}}>
        <WebView
      source={{ uri: `https://api.instagram.com/oauth/authorize/?client_id=${clientId}&redirect_uri=${redirectUrl}&response_type=token&scope=${scopes.join('+')}` }}
        scalesPageToFit
        startInLoadingState
        onNavigationStateChange={this.onCompleted.bind(this)}
        />
        <Text>{passingParams}</Text>
      </View>
      </Modal>

    );
  }

}
