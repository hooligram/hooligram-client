import React, { Component } from 'react'
import { ActivityIndicator as RNActivityIndicator } from 'react-native'
import { colors, dimensions } from 'hg/constants'

export default class ActivityIndicator extends Component {
  render() {
    return (
      <RNActivityIndicator
        color={colors.BOLD_GREEN}
        size={dimensions.BUTTON_ICON_LENGTH}
      />
    )
  }
}
