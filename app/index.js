import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { init } from '@state/actions/app'
import { apiInit } from '@state/actions/api'
import store from '@state/store'
import OnboardingStackNavigation from '@navigation/onboarding-stack'
import { setTopLevelNavigator } from '@state/middlewares/navigation/navigation'

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <OnboardingStackNavigation ref={setTopLevelNavigator}/>
      </Provider>
    )
  }

  componentDidMount() {
    store.dispatch(init())
    store.dispatch(apiInit())
  }

  goToNextScreen = () => console.log('goToNextScreen')
}
