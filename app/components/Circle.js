import React, { Component } from 'react'
import { View } from 'react-native'
import { colors, dimensions } from 'hg/constants'

export default class extends Component {
  render() {
    return (
      <View
        style={
          {
            alignItems: 'center',
            backgroundColor: colors.WHITE,
            borderRadius: dimensions.ICON_BORDER_RADIUS,
            elevation: dimensions.ELEVATION,
            height: dimensions.ICON_SIZE,
            justifyContent: 'center',
            width: dimensions.ICON_SIZE
          }
        }
      >
        {this.props.children}
      </View>
    )
  }
}
