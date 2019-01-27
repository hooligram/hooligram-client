import React, { Component } from 'react'
import { Text } from 'react-native'
import { Provider } from 'react-redux'
import store from '@state/store'

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Text>Welcome to Hooligram</Text>
      </Provider>
    )
  }

  goToNextScreen = () => console.log('goToNextScreen')
}
