import React, {Component} from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';

class TitleScreen extends Component {
  render() {
    return (
      <SafeAreaView style={global.style.container}>
        <Text style={global.style.titleText}>CIAN!</Text>

        <TouchableOpacity
          style={global.style.defaultButtonContainer}
          onPress={() => this.props.navigation.navigate('Login')}
          >
          <Text style={global.style.menuText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={global.style.defaultButtonContainer}
          onPress={() => this.props.navigation.navigate('Survey')}
          >
          <Text style={global.style.menuText}>Start</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={global.style.defaultButtonContainer}
          onPress={() => this.props.navigation.navigate('Settings')}
          >
          <Text style={global.style.menuText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={global.style.defaultButtonContainer}
          onPress={() => this.props.navigation.navigate('FAQ')}
          >
          <Text style={global.style.menuText}>About</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={global.style.defaultButtonContainer}
          onPress={() => this.props.navigation.navigate('History')}
          >
          <Text style={global.style.menuText}>History</Text>
        </TouchableOpacity>

      </SafeAreaView>
    );
  }
}

export default TitleScreen
