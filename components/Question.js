import React, {Component} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, TouchableOpacity } from 'react-native';
import styles from '../styles/style'

const questions = {
  'question0' : {
    'prompt': 'How would you describe your mood today?',
    'responses' : {
      'response0': 'Jolly!',
      'response1': 'Peaceful',
      'response2': 'Peeved',
      'response3': 'Depressed'
    }
  },
  'question1' : {
    'prompt': 'How are you doing?',
    'responses' : {
      'response0': 'Great!',
      'response1': 'Doing ok.',
      'response2': 'Could be better.',
      'response3': 'Not doing so hot.'
    }
  },
  'question2' : {
    'prompt': 'Describe today in a color?',
    'responses' : {
      'response0': 'Red',
      'response1': 'Orange',
      'response2': 'Yellow',
      'response3': 'Green',
      'response4': 'Blue',
      'response5': 'Indigo',
      'response6': 'Violet'
    }
  },
  'question3' : {
    'prompt': 'Have you felt anxious, restless or tense today?',
    'responses' : {
      'response0': 'OMG yes!',
      'response1': 'I guess so.',
      'response2': 'Not really',
      'response3': 'Cool as a cucumber, dude.'
    }
  },
}

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reply: "",
      question: 0
    };
  }

  revealText = () => {
    this.setState({ reply: "Oh that's interesting to hear." });
  };

  renderResponses = () => {
    console.log('rendering responses');
    var responses = "";
    try {
      const responses = questions['question' + String(this.state.question)]['responses']
      const buttons = [];
      const temp = Object.keys(responses);
      for (var i = 0; i < temp.length; i++) {
        buttons.push(
          <TouchableOpacity
            key={i}
            style={styles.defaultButtonContainer}
            onPress={this.revealText}>

            <Text style={styles.responseText}>{responses[temp[i]]}</Text>
          </TouchableOpacity>
        );
      };
      return buttons;
    } catch {
      return "Loading";
    }

  }

  renderQuestion = () => {
    console.log('Rendering question');
    var prompt = "";
    try {
      prompt = questions['question' + String(this.state.question)]['prompt'];
    }
    catch {
      prompt = "Loading...";
    }
    return <Text style={styles.questionText}>{prompt}</Text>;
  }

  render() {
    return (
      <>
        <View style={styles.surveyContainer}>
          {this.renderQuestion()}

          {this.renderResponses()}

          <TouchableOpacity style={styles.defaultButtonContainer} onPress={() => {
            const newNum = this.state.question + 1;
            this.setState({ question: newNum});
            this.setState({ reply: ""});
            if (newNum >= Object.keys(questions).length ) {
              this.setState({ question: 0 });
              this.props.navigation.navigate('Content');
            }
          }}>
            <Text>Next</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.textContentContainer}>
          <Text style={styles.responseText}>{this.state.reply}</Text>
        </View>

      </>
  );
  }
}

export default Question
