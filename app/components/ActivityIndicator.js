import React, { Component } from 'react'
import { ActivityIndicator } from 'react-native'
import { colors, dimensions } from 'hg/constants'

export default class extends Component {
  render() {
    return (
      <ActivityIndicator
        color={colors.BOLD_GREEN}
        size={dimensions.BUTTON_ICON_LENGTH}
      />
    )
  }
}
