import React, { Component } from 'react'
import { ActivityIndicator } from 'react-native'
import { Colors } from '@hooligram/constants'

export default class extends Component {
  render() {
    return (
      <ActivityIndicator
        color={Colors.boldGreen}
        size={45}
      />
    )
  }
}
