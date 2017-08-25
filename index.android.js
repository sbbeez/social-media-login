/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button
} from 'react-native';
import TwitterButton from './TwitterButton';
import Ins from './Instagram'
import Cookie from 'react-native-cookie'
import Goo from './Google'
import LinkedIn from './LinkedIn';

export default class twitterLogin extends Component {

    constructor(props) {
      super(props)
      this.state ={
        token_value : false,
        tokenGot :'',
        isLinkedInToken: false
    }
    }

clearCookies() {
  Cookie.clear().then(() => {
    this.setState({token_value: false, tokenGot:''})
  })
}
 logout() {
   Cookie.clear().then(() => {
     this.setState({ token: null })
   })
 }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TwitterButton/>
        {
          !this.state.token_value ?
          (<View>
            <Text >Login</Text>
            <Button title="Login with Instagram" onPress= {()=>this.refs.goo.onOpen()}/>
            </View>)
          :
          (<View>
            <Text>{this.state.tokenGot}</Text>
            <Button title="Logout" onPress= {this.clearCookies.bind(this)}/>
            </View>)
        }
        {
          !this.state.isLinkedInToken? (

            <View>
              <Button title="Login with LinkedIn" onPress= {()=>this.refs.linked.onOpen()}/>
            </View>

          ) : (
            <Button title="Logout"/>
          )
        }

        <Goo
          ref='goo'
          clientId='{Your_client_id}'
          redirectUrl='https://www.google.com'
          scopes={['public_content+follower_list']}
          onLoginSuccess={(tokenGot) =>this.setState({token_value:true, tokenGot}) }/>
        <LinkedIn
        ref='linked'
        redirectUrl = 'http://skreem.io/'
        clientId='{Your_client_id}'
        state = '9750187663'
        clientSceret ='{You_client_sceret}'
        scope= 'r_basicprofile'
        onLoginSuccess={(LinkedInToken) => this.setState({isLinkedInToken:true})}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('twitterLogin', () => twitterLogin);
