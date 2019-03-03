import React, { Component } from 'react'
import { ActivityIndicator } from 'react-native'
import { colors } from 'hg/constants'

export default class extends Component {
  render() {
    return (
      <ActivityIndicator
        color={colors.boldGreen}
        size={45}
      />
    )
  }
}
