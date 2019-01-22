import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import hooligramApi from './lib/hooligram-api'

export default class App extends Component {
  state = {
    messages: [],
    currentMessage: '',
  }

  store = {
    dispatch: (action) => {
      console.log('action', action)

      switch (action.type) {
        case 'SEND_MESSAGE': {
          console.log('(kinda) reducer')
          const {
            payload: {
              message
            }
          } = action
          const { messages } = this.state
          this.setState({
            messages: messages.concat(message)
          })
        }
        default:
          break
      }
    },
    setState: (newState) => {
      console.log('prevState', this.state)
      this.setState(newState, () => {
        console.log('nextState', newState)
      })
    },
    getState: () => {
      return this.state
    }
  }

  api = hooligramApi(this.store)

  render() {
    const { messages, currentMessage } = this.store.getState()
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
          onChangeText={this.handleChangeText}
          value={currentMessage}
        />
        <Button
          title='get echo'
          onPress={this.handlePressButton}
        />
      </View>
    )
  }

  handleChangeText = (value) => {
    this.store.setState({ currentMessage: value })
  }

  handlePressButton = () => {
    const { currentMessage: message } = this.store.getState()
    const action = {
      type: 'SEND_MESSAGE',
      payload: {
        message
      }
    }
    this.store.setState({ currentMessage: '' })
    this.api.send(JSON.stringify(action))
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
