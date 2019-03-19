import React, { Component } from 'react';
import {
  Text, View, AppRegistry, Image, TextInput, Button, Alert, StyleSheet, TouchableNativeFeedback, TouchableHighlight, FlatList,
  SectionList
} from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';

GoogleSignin.configure({
  webClientId: '33548242999-23qan6fmrb66et8ahv00jhfmttlhop42.apps.googleusercontent.com',
})

class Greeting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
      text: '',
    }
    // setInterval(() => {
    //   this.setState({
    //     show: !this.state.show
    //   });
    // }, 1000)

  }

  render() {
    const { name } = this.props;
    const { show } = this.state;
    return (
      show &&
      <View>
        <Text>Hello {name}</Text>
      </View>

    )
  }
}

export default class App extends Component {
  state = {
    userInfo: null,
  }
  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices()
      const userInfo = await GoogleSignin.signIn();
      console.log('userinfo ' + userInfo.idToken);
      this.setState({ userInfo })
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('SignInCancelled ');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('IN_PROGRESS');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('play not avail');
      } else {
        Alert.alert('SignInCancelled');
      }
    }
  }
  render() {
    return (
      <View style={styles.container}>
        {/* <SectionList
          sections={[
            { title: 'captain', data: [{ key: 'Sourabh' }, { key: 'Tanvi2' }, { key: 'Tanvi2' }] },
            { title: 'member', data: [{ key: 'Tanvi' }] },
            { title: 'member', data: [{ key: 'rawat' }] },
          ]}
          renderItem={({ item }) => <Text key={item.key}>{item.key}</Text>}
          renderSectionHeader={({ section }) => <Text style={styles.sectionHeader}>{section.title}</Text>}
        /> */}
        {this.state.userInfo && <Text>{this.state.userInfo.user.email}</Text>}
        <GoogleSigninButton
          style={{ width: 192, height: 48 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={this._signIn}
          disabled={this.state.isSigninInProgress}
          onPress={() => this.signIn()} />
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  defaultText: {
    flex: 1,
    justifyContent: 'center',
    fontSize: 42,
  },
  sectionHeader: {
    fontSize: 32,
    textDecorationLine: 'underline',
  }
})

AppRegistry.registerComponent('AwesomeProject', () => App);