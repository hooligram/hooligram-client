import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { appStartup } from 'hg/state/actions/app'
import store from 'hg/state/store'
import Navigation from 'hg/state/middlewares/navigation/stacks'
import { setTopLevelNavigator } from 'hg/state/middlewares/navigation/navigation'

export default class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <Navigation ref={setTopLevelNavigator}/>
      </Provider>
    )
  }

  componentDidMount () {
    store.dispatch(appStartup())
  }

  goToNextScreen = () => console.log('goToNextScreen')
}
