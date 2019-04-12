import React, { Component } from 'react'
import { View } from 'react-native'
import { ActivityIndicator } from 'hg/components'

export default class Splash extends Component {
  render() {
    return (
      <View
        style={
          {
            flex: 1,
            justifyContent: 'center'
          }
        }
      >
        <ActivityIndicator/>
      </View>
    )
  }
}
