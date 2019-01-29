import React, { Component } from 'react'
import { Text } from 'react-native'
import { Provider } from 'react-redux'
import store from '@state/store'
import { OnboardingRequestCode } from '@screens'

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <OnboardingRequestCode/>
      </Provider>
    )
  }

  goToNextScreen = () => console.log('goToNextScreen')
}
