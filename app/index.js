import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { appStartup } from '@state/actions/app'
import store from '@state/store'
import Navigation from '@navigation'
import { setTopLevelNavigator } from '@state/middlewares/navigation/navigation'

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation ref={setTopLevelNavigator}/>
      </Provider>
    )
  }

  componentDidMount() {
    store.dispatch(appStartup())
  }

  goToNextScreen = () => console.log('goToNextScreen')
}
