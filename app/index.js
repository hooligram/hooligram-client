import React, { Component } from 'react'
import { View } from 'react-native'
import { Provider } from 'react-redux'
import { ActivityIndicator } from 'hg/components'
import store from 'hg/store'
import App from './App'

export default class extends Component {
  state = {
    store: null
  }

  render () {
    if (!this.state.store) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center'
          }}
        >
          <ActivityIndicator/>
        </View>
      )
    }

    return (
      <Provider store={this.state.store}>
        <App/>
      </Provider>
    )
  }

  componentWillMount() {
    store.then((store) => {
      this.setState({ store })
    })
  }
}
