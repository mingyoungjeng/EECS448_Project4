import axios from 'axios';
import React, {Component} from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Set up clientside encryption
// Why does bcrypt fail?
const bcrypt = require('bcryptjs');
const saltRounds = 10;


class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      username: "daniel",
      email: "bishop",
      password: "wadsworth",
      reply: ""
    };
  }

  // Use something like this if we start to get different kinds of errors from different sources.
  getReply = (reply) => {
    var defaultReply = "Bad credentials";
    if (reply.data.message) {
      defaultReply = reply.data.message;
    } else if (reply.username) {
      defaultReply = `Welcome back ${reply.username}`;
    } else {
      defaultReply = reply.message;
    }
    return defaultReply;
  }

  // User registers account with username
  register = async (username, email, password) => {
    console.log("Calling register...");
    console.log(`Attempting to create user: ${username}, ${email}`);

    // Encrypt password before sending to server
    axios.post('http://localhost:5000/api/users', {
      username: username,
      email: email,
      password: password
    })
    .then(
      // 
      result => {console.log(`post response = ${JSON.stringify(result.data.message)}`); this.setState({ reply: this.getReply(result) });}
    )
    .catch(err => console.log(err));
    // .catch(err => this.setState(err.message.value))
          
  }

  render() {
    return (
      <SafeAreaView style={global.style.container}>

      <View style={global.style.textContentContainer}>
        <Text> Login or Register Below </Text>
      </View>

      <TextInput style={global.style.textContentContainer}
        placeholder="username"
        onChangeText={text => this.setState({ username: text})}
        // defaultValue="bbbbb"
      />
      <TextInput style={global.style.textContentContainer}
        placeholder="email"
        onChangeText={text => this.setState({ email: text})}
        // defaultValue="bbbbb"
      />
      <TextInput style={global.style.textContentContainer}
        placeholder="password"
        onChangeText={text => this.setState({ password: text})}
        // defaultValue="bbbbb"
      />

      <Text>
        {this.state.reply}
      </Text>

     

      <TouchableOpacity
        style={global.style.defaultButtonContainer}
        onPress = {() => {
          console.log(this.state);
          const { username, email, password } = this.state;
          this.register(username, email, password);
        }}
      >
      <Text>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={ global.style.defaultButtonContainer }
        onPress = {() => {
          console.log("Retrieving info...");
          axios.post('http://localhost:5000/api/authorization', {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
          })
            .then(async (res) => {
              this.setState({ reply: `Welcome back ${this.state.username}`} );
              await AsyncStorage.clear()
              await AsyncStorage.setItem('token', JSON.stringify(res))
                .then(() => console.log(`Welcome back ${this.state.username}`))
                .catch(err => console.log(err));
            })
            .catch(err => console.error(err));
        }}
      >
      <Text>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={ global.style.defaultButtonContainer }
        onPress = {async () => {
          let token = await AsyncStorage.getItem('token')
            .catch(err => console.log(err));

          if (token) {
            token = JSON.parse(token);
            console.log(token);
  
            console.log("Retrieving info...");
            axios.get('http://localhost:5000/api/users/me', {
              params: {
                username: this.state.username,
                password: this.state.password
              },
              headers: {
              'x-auth-token': token.data
            }})
              .then(res => console.log(res))
              .catch(err => console.error(err));
          }
        }}
      >
      <Text>Get info</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={global.style.defaultButtonContainer}
        onPress={() => this.props.navigation.navigate('Title')}
        >
        <Text style={global.style.menuText}>Return</Text>
      </TouchableOpacity>
      </SafeAreaView>
    );
  }
}


export default LoginScreen
