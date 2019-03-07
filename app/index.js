import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from 'hg/state/store'
import App from './App'

export default class extends Component {
  render () {
    return (
      <Provider store={store}>
        <App/>
      </Provider>
    )
  }
}
