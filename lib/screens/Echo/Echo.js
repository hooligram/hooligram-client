import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'

class Echo extends Component {
  static propTypes = {
    messages: PropTypes.arrayOf(PropTypes.string).isRequired,
    currentMessage: PropTypes.string.isRequired,
    handleChangeText: PropTypes.func.isRequired,
    handlePressButton: PropTypes.func.isRequired
  }

  render() {
    const {
      messages = [],
      currentMessage,
      handleChangeText,
      handlePressButton
    } = this.props

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to Hooligram!</Text>
        {messages.map((msg, i) => {
          return (
            <Text
              key={`${msg}-${i}`}
              style={styles.messages}>
              Server: {msg}
            </Text>
          )
        })}
        <TextInput
          style={styles.textInput}
          multiline={true}
          onChangeText={handleChangeText}
          value={currentMessage}
        />
        <Button
          title='get echo'
          onPress={handlePressButton}
        />
      </View>
    )
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
  messages: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  textInput: {
    backgroundColor: 'grey',
    width: '100%'
  }
})

export default Echo
