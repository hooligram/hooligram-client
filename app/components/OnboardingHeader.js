import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { colors, dimensions, fontSizes } from 'hg/constants'

export default class OnboardingHeader extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired
  }

  render() {
    return (
      <View
        style={
          {
            alignItems: 'center',
            paddingVertical: dimensions.PADDING_LARGE
          }
        }
      >
        <Text
          style={
            {
              color: colors.BOLD_GREEN,
              fontSize: fontSizes.LARGE,
              fontWeight: 'bold'
            }
          }
        >
          {this.props.title}
        </Text>
      </View>
    )
  }
}
