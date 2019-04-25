import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Text, TouchableNativeFeedback, View } from 'react-native'
import { Circle } from 'hg/components'
import { colors, dimensions, fontSizes } from 'hg/constants'
import { getFlagEmoji } from 'hg/utils'

export default class extends Component {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    recipient: PropTypes.shape({
      name: PropTypes.string.isRequired,
      sid: PropTypes.string.isRequired
    })
  }

  render() {
    const flagEmoji = getFlagEmoji(this.props.recipient.sid)
    return (
      <TouchableNativeFeedback
        onPress={this.props.onPress}
      >
        <View
          style={
            {
              alignItems: 'center',
              flexDirection: 'row',
              padding: dimensions.PADDING
            }
          }
        >
          <Circle>
            <Text
              style={
                {
                  color: colors.BLACK,
                  fontSize: fontSizes.LARGE
                }
              }
            >
              {flagEmoji}
            </Text>
          </Circle>
          <View
            style={
              {
                flex: 1,
                paddingLeft: dimensions.PADDING
              }
            }
          >
            <Text
              style={
                {
                  color: colors.BLACK
                }
              }
            >
              {this.props.recipient.name || this.props.recipient.sid}
            </Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    )
  }
}
